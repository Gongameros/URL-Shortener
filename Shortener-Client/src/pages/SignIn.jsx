import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("Sign In", { username, password });

    try {
      const response = await fetch(
        "http://localhost:5053/api/Authentication/Login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Sign In failed. Please check your credentials.");
      }

      const data = await response.json();
      console.log("TOKEN: " + data.token);
      console.log("EXPIRATION: " + data.expiration);

      signIn({
        auth: {
          token: data.token,
          type: "Bearer"
        },
        userState: {
            name: username
        }
      });
      console.log("CHECKING DATA");
      setRedirect(true);
    } catch (error) {
      setErrorMessage(`Sign In failed: ${error.message}`);
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate("/");
    }
  }, [redirect, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignIn}
        className="bg-white rounded-lg shadow-lg p-6 w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Sign In</h2>
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
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
