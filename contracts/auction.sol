// SPDX-License-Identifier: GPL-3.0

// Import necessary OpenZeppelin libraries and interfaces
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity ^0.8.17;

contract Trading 
{
   
    struct InfoUser 
    {
        uint256 quantity;
        uint256 cityCode;
        uint256 aadharNo ;
    }

    struct InfoOrder
     {
        address seller;
        address buyer;
        uint256 quantity;
        uint256 price;
    }

    struct InfoAuction {
        address manager;
        address winner;
        uint256 minBidPrice;
        uint256 auctionStartTime;
        uint256 auctionEndTime;
        uint256 maxBidPrice;
        address highestBidder;
        bool flag;
        bool open;
        uint256 quantity; // Added quantity property
    }

    struct returnAuctionInfo
    {
        uint256 maxBidPrice ;
        bool open ; 
        uint256 quantity; 
        address manager ; 
    }

    uint256 userNo;
    uint256 orderNo;
    uint256 totalAuctions;
    address owner;
    IERC20 paymentToken;

    mapping(uint256 => InfoAuction) auctions;
    mapping(address => InfoUser) private users;
    mapping(uint256 => InfoOrder) orders;
    address[] authorizerWallets;
   
    
    event AuctionCreated(
        uint256 indexed auctionNo,
        uint256 basePrice,
        uint256 time
    );
    event AuctionEnded(
        uint256 indexed auctionNo,
        uint256 highestBid,
        address winner
    );
    event ElectricityClaimed(
        address claimer,
        uint256 quantity,
        uint256 price,
        address seller
    );
   
    constructor(address _paymentTokenAddress) {
        owner = msg.sender;
        paymentToken = IERC20(_paymentTokenAddress);
    }

    // Function modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not a valid account");
        _;
    }

    function addUser(uint256 _quantity, uint256 _cityCode , uint256 aadharNo)
        public
        onlyOwner
        returns (bool) 
    {
        
        require(users[msg.sender].quantity == 0, "User already registered");
        users[msg.sender] = InfoUser(_quantity, _cityCode , aadharNo);
        userNo++;
        return true;
    }

    function orderSell(uint256 _price, uint256 _quantity , address seller )public payable returns (uint256)
    {   
        uint256 amount = _price*_quantity ;

        
            require(paymentToken.transferFrom(
                msg.sender,
                seller,
                amount ), "Payment failed"
            ) ;
           
        
        orders[orderNo] = InfoOrder(msg.sender , seller , _quantity, _price);
    
        emit ElectricityClaimed(msg.sender, _quantity, _price, seller);
        orderNo++;
        return orderNo - 1;
    }

    function placeBid(uint256 _auctionNo, uint256 _bidPrice) public {
        // require(Auction[_auctionNo].open, "Auction has already ended"); -------------
        InfoAuction storage auction = auctions[_auctionNo];
        require(auction.open, "Auction has already ended");
        require(block.timestamp < auction.auctionEndTime, "Auction has ended");
    
        require(
           _bidPrice >= auctions[_auctionNo].maxBidPrice,
            "Bid amount must be greater than or equal to bid price"
        );
   

            // Refund the previous bidder if one exists
            address previousBidder = auctions[_auctionNo].highestBidder;
            uint256 previousBid = auctions[_auctionNo].maxBidPrice;
            payable(previousBidder).transfer(previousBid);
            payable(address(this)).transfer(_bidPrice);
            auctions[_auctionNo].highestBidder = msg.sender ;
            auctions[_auctionNo].maxBidPrice = _bidPrice ; 
    }

    function highestBidValue(uint256 _auctionNo) public view returns (uint256) {
        return auctions[_auctionNo].maxBidPrice;
    }

    

    function endAuction(uint256 _auctionNo) public returns(bool) {
        InfoAuction storage auction = auctions[_auctionNo];
        require(
            block.timestamp >= auction.auctionEndTime,
            "Auction has not ended yet"
        );
        require(auction.open, "Auction has already ended");

        auction.open = false;
        auctions[_auctionNo].winner = auctions[_auctionNo].highestBidder ;
        emit AuctionEnded(_auctionNo, auctions[_auctionNo].maxBidPrice, auctions[_auctionNo].highestBidder);
        return true ;
    }

function claimElectricity(uint256 _auctionNo) public {
        InfoAuction storage auction = auctions[_auctionNo];
        require(!auction.open, "Auction is still ongoing");
        require(
            msg.sender == auction.winner,
            "Only the highest bidder can claim the electricity"
        );
        require(auction.flag, "Electricity has already been claimed");

        // Perform any actions needed for electricity transfer, or emit events
        // related to the electricity transfer here

        auction.flag = false;
        emit ElectricityClaimed(
            msg.sender,
            auction.quantity,
            auction.maxBidPrice,
            auction.manager
        );
    }


    function returnAuction() public view returns (returnAuctionInfo[] memory) {
        returnAuctionInfo[] memory tokens = new returnAuctionInfo[](totalAuctions);
        for (uint256 i = 0; i < totalAuctions; i++) {
            tokens[i].manager  = auctions[i].manager;
            tokens[i].quantity  = auctions[i].quantity;
            tokens[i].maxBidPrice  = auctions[i].maxBidPrice;
            tokens[i].open  = auctions[i].open;
            // tokens[i].manager  = auctions[i].manager;
        }
        return tokens;
    }

    function returnOrders() public view returns (InfoOrder[] memory) {
        InfoOrder[] memory tokens = new InfoOrder[](orderNo);
        for (uint256 i = 0; i < orderNo; i++) {
            tokens[i] = orders[i];
        }
        return tokens;
    }

    function createAuction(uint256 _basePrice , uint256 time , uint256 _quantity) public returns (uint256) {
        // auctions[totalAuctions].quantity = quantity;    --------
        require(auctions[totalAuctions].manager == address(0), "Auction already exists");
        auctions[totalAuctions] = InfoAuction
        (
            msg.sender,
            address(0),
            _basePrice,
            block.timestamp + time ,
            0,
            0,
            address(0) ,
            true,
            true,
            _quantity// Quantity is initialized to 0; you may need to set it accordingly.
        ) ;
        emit AuctionCreated(totalAuctions, _basePrice, block.timestamp);
        totalAuctions++;
        return totalAuctions;
    }
}