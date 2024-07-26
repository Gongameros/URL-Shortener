import React, { useState, useEffect } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const Home = () => {
  const [urls, setUrls] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [detailsUrl, setDetailsUrl] = useState(null);
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const username = authUser?.name;
  const userRoles = authUser?.roles || [];

  useEffect(() => {
    fetch("http://localhost:5107/api/Links")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUrls(data);
      })
      .catch((error) => {
        setErrorMessage(`Failed to fetch URLs: ${error.message}`);
      });
  }, []);

  const handleUrlClick = (id) => {
    console.log("Redirecting to URL Info for ID:", id);
  };

  const handleDeleteUrl = (id) => {
    const url = urls.find((url) => url.id === id);

    if (!url) {
      setErrorMessage("URL not found.");
      return;
    }

    const isAdmin = userRoles.includes("Admin");
    const isCreator = url.createdBy === username;

    if (!isAdmin && !isCreator) {
      setErrorMessage("You are not owner to delete this URL.");
      return;
    }

    fetch(`http://localhost:5107/api/Links/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setUrls(urls.filter((url) => url.id !== id));
      })
      .catch((error) => {
        setErrorMessage(`Failed to delete URL: ${error.message}`);
      });
  };

  const handleAddUrl = (e) => {
    e.preventDefault();
    const createdBy = username;

    const newLink = {
      originalUrl: newUrl,
      createdBy: createdBy,
    };

    fetch("http://localhost:5107/api/Links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLink),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUrls([...urls, data]);
        setNewUrl("");
      })
      .catch((error) => {
        setErrorMessage(`Failed to add URL: ${error.message}`);
      });
  };

  const handleShowDetails = (url) => {
    setDetailsUrl(url);
  };

  const handleCloseDetails = () => {
    setDetailsUrl(null);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Short URLs Table</h1>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {isAuthenticated && (
        <form onSubmit={handleAddUrl} className="mb-4">
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Enter Original URL"
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold mt-3 py-2 px-4 rounded mt-2"
          >
            Add New Link
          </button>
        </form>
      )}

      <table className="mt-10 min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-gray-300 md:table-row">
            <th className="border border-gray-300 p-2 md:table-cell">Original URL</th>
            <th className="border border-gray-300 p-2 md:table-cell">Short URL</th>
            {isAuthenticated && (
              <th className="border border-gray-300 p-2 md:table-cell">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {urls.map((url) => (
            <tr key={url.id} className="border border-gray-300 md:table-row">
              <td
                className="border border-gray-300 p-2 md:table-cell cursor-pointer"
                onClick={() => handleUrlClick(url.id)}
              >
                {url.originalUrl}
              </td>
              <td
                className="border border-gray-300 p-2 md:table-cell cursor-pointer"
                onClick={() => handleUrlClick(url.id)}
              >
                {url.shortenedUrl}
              </td>
              {isAuthenticated && (
                <td className="border border-gray-300 p-2 md:table-cell text-center">
                  <button
                    className="bg-green-600 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleShowDetails(url)}
                  >
                    Show Details
                  </button>
                  <button
                    className="bg-red-600 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDeleteUrl(url.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Details Modal */}
      {detailsUrl && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-5 max-w-md w-full">
            <h2 className="text-xl font-bold mb-2">Link Details</h2>
            <p><strong>Original URL:</strong> {detailsUrl.originalUrl}</p>
            <p><strong>Shortened URL:</strong> {detailsUrl.shortenedUrl}</p>
            <p><strong>Created By:</strong> {detailsUrl.createdBy}</p>
            <p><strong>Created Date:</strong> {new Date(detailsUrl.createdDate).toLocaleString()}</p>
            <p><strong>Expiration Date:</strong> {new Date(detailsUrl.expirationDate).toLocaleString()}</p>
            <button
              className="bg-gray-600 text-white font-bold py-1 px-2 rounded mt-4"
              onClick={handleCloseDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;