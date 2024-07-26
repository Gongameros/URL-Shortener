import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">About Our URL Shortening Service</h1>
      <p className="text-lg mb-4">
        Our URL shortening service uses a sophisticated algorithm to generate unique shortened URLs. Here's an overview of how the process works:
      </p>
      <p className="text-base mb-4">
        The algorithm begins by generating a unique code for the shortened URL. This is achieved through the <code className="bg-gray-100 px-1 rounded">GenerateUniqueCodeAsync</code> method, which creates a random string of characters based on the length specified in <code className="bg-gray-100 px-1 rounded">ShortLinkSettings.Length</code> and the characters defined in <code className="bg-gray-100 px-1 rounded">ShortLinkSettings.Alphabet</code>. The alphabet includes uppercase letters, lowercase letters, and digits. The method selects random indices from this alphabet to form the code and checks if the generated code already exists in the database. This loop continues until a unique code is found.
      </p>
      <p className="text-base mb-4">
        Once a unique code is generated, it is used in the <code className="bg-gray-100 px-1 rounded">CreateLinkAsync</code> method. This method creates a new <code className="bg-gray-100 px-1 rounded">Link</code> object, which includes the original URL, the generated shortened URL, the creator's username, the creation date, and an expiration date set to one year from creation. This link is then added to the database and saved.
      </p>
      <p className="text-base mb-4">
        The settings for URL shortening are defined in the <code className="bg-gray-100 px-1 rounded">ShortLinkSettings</code> class. The <code className="bg-gray-100 px-1 rounded">Length</code> property determines the length of the shortened URL, while the <code className="bg-gray-100 px-1 rounded">Alphabet</code> property specifies the characters used for generating the URL.
      </p>
      <p className="text-base">
        This approach ensures that each shortened URL is unique and can effectively redirect users to the original URL.
      </p>
    </div>
  );
};

export default About;
