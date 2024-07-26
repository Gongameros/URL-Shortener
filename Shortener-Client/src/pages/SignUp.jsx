import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;
    return hasUpperCase && hasSpecialChar && isValidLength;
  };

  const validateEmail = (email) => {
    return email.includes("@");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("Invalid email address. Must contain '@'.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long, contain a capital letter, and a special character."
      );
      return;
    }

    setErrorMessage(""); // Clear error message if validation passes

    try {
      const response = await fetch(
        "http://localhost:5053/api/Authentication/Register?role=user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed. Please try again.");
      }

      setRedirect(true);
    } catch (error) {
      setErrorMessage(`Registration failed: ${error.message}`);
    }
  };

  // Effect to handle redirection
  useEffect(() => {
    if (redirect) {
      navigate("/sign-in");
    }
  }, [redirect, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="bg-white rounded-lg shadow-lg p-6 w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
