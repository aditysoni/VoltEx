import React from 'react';
import { useNavigate } from 'react-router-dom';

// Function to delete a cookie by setting its expiration date to a past date
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

const Logout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          deleteCookie("token");
          navigate("/login");
        }}
        className="mx-4 text-red-300 font-bold text-lg border-b-2 border-transparent hover:text-purple-500 hover:border-b-2 hover:border-purple-300 transition duration-500"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
