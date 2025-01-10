import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    // Link component from react-router-dom to navigate to the detailed post page
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        {/* Container for the image */}
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl object-cover w-full h-48"
          />
        </div>
        {/* Post title, with a fallback to "Untitled Post" if the title is missing */}
        <h2 className="text-xl font-bold">{title || "Untitled Post"}</h2>
      </div>
    </Link>
  );
}

export default PostCard;