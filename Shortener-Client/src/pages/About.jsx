import React, { useState, useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const About = () => {
  const [aboutText, setAboutText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newAboutText, setNewAboutText] = useState("");
  const authUser = useAuthUser();
  const userRoles = authUser?.roles || [];

  useEffect(() => {
    const savedText = localStorage.getItem("aboutText");
    setAboutText(
      savedText ||
        `Our URL shortening service uses a sophisticated algorithm to generate unique shortened URLs. Here's an overview of how the process works:
The algorithm begins by generating a unique code for the shortened URL. This is achieved through the GenerateUniqueCodeAsync method, which creates a random string of characters based on the length specified in ShortLinkSettings.Length and the characters defined in ShortLinkSettings.Alphabet. The alphabet includes uppercase letters, lowercase letters, and digits. The method selects random indices from this alphabet to form the code and checks if the generated code already exists in the database. This loop continues until a unique code is found.
Once a unique code is generated, it is used in the CreateLinkAsync method. This method creates a new Link object, which includes the original URL, the generated shortened URL, the creator's username, the creation date, and an expiration date set to one year from creation. This link is then added to the database and saved.
The settings for URL shortening are defined in the ShortLinkSettings class. The Length property determines the length of the shortened URL, while the Alphabet property specifies the characters used for generating the URL.
This approach ensures that each shortened URL is unique and can effectively redirect users to the original URL.`
    );
  }, []);

  const handleEditClick = () => {
    setNewAboutText(aboutText);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setAboutText(newAboutText);
    localStorage.setItem("aboutText", newAboutText);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">About Our URL Shortening Service</h1>
      {isEditing ? (
        <div>
          <textarea
            className="border border-gray-300 rounded p-2 w-full"
            rows="10"
            value={newAboutText}
            onChange={(e) => setNewAboutText(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={handleSaveClick}
          >
            Save
          </button>
          <button
            className="bg-gray-600 text-white font-bold py-2 px-4 rounded mt-2 ml-2"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      ) : (
        <p className="text-base mb-4">{aboutText}</p>
      )}
      {userRoles.includes("Admin") && !isEditing && (
        <button
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={handleEditClick}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default About;
