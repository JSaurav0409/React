import conf_variable from "../conf_variable/conf_variable.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf_variable.appwriteUrl)
      .setProject(conf_variable.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // For creating a post.
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf_variable.appwriteDatabaseId,
        conf_variable.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error:: " + error.message);
    }
  }

  // For fetching all posts.
  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      const response = await this.databases.listDocuments(
        conf_variable.appwriteDatabaseId,
        conf_variable.appwriteCollectionId,
        queries
      );
      console.log("API Response from getAllPosts:", response); // Debugging
      return response;
    } catch (error) {
      console.log(
        "Appwrite service :: getAllPosts :: error:: " + error.message
      );
      return { documents: [] };
    }
  }

  // File Preview Method (Handles Missing `fileId`)
  getFilePreview(fileId) {
    if (!fileId) {
      console.error("Missing fileId in getFilePreview");
      return "/placeholder.jpg"; // Provide a default placeholder
    }
    return this.storage.getFilePreview(conf_variable.appwriteStorageId, fileId);
  }
}

const service = new Service();
export default service;
