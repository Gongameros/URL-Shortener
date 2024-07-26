import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

const Navbar = () => {
  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/sign-in");
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Short URL Service</div>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded"
          >
            Short URLs
          </Link>
          {!isAuthenticated && (
            <>
              <Link
                to="/sign-in"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded"
              >
                Sign Up
              </Link>
            </>
          )}
          <Link
            to="/about"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded"
          >
            About
          </Link>
          {isAuthenticated && (
            <button
              onClick={handleSignOut}
              className="text-white hover:bg-blue-700 px-3 py-2 rounded"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
