import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  // Handle missing image by providing a default placeholder
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : "/placeholder.jpg";

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={imageUrl}
            alt={title || "Untitled Post"}
            className="rounded-xl object-cover w-full h-48"
          />
        </div>
        <h2 className="text-xl font-bold">{title || "Untitled Post"}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
