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
        // Appwrite SDK's createDocument method
        // Parameters:(<DatabaseID>, <CollectionID>, <DocumentID>,{ })
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

  // For updating a post.
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        // Appwrite SDK's updateDocument method
        // Parameters:(<DatabaseID>, <CollectionID>, <DocumentID>,{ })
        conf_variable.appwriteDatabaseId,
        conf_variable.appwriteCollectionId,
        slug,
        {
          // passing things which we want to update.
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error:: " + error.message);
    }
  }

  // For deleting a post.
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        // Appwrite SDK's deleteDocument method
        // Parameters:(<DatabaseID>, <CollectionID>, <DocumentID>)
        conf_variable.appwriteDatabaseId,
        conf_variable.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error:: " + error.message);
      return false;
    }
  }

  // For fetching a post by its slug.
  async getPostBySlug(slug) {
    try {
      return await this.databases.getDocument(
        // Appwrite SDK's getDocument method
        // Parameters:(<DatabaseID>, <CollectionID>, <DocumentID>)
        conf_variable.appwriteDatabaseId,
        conf_variable.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(
        "Appwrite service :: getPostBySlug :: error:: " + error.message
      );
      return false;
    }
  }

  // For fetching all posts.
  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        // Appwrite SDK's listDocuments method
        // Parameters:(<DatabaseID>, <CollectionID>, { filters: {}, orderby: {}, limit: 10, offset: 0 })
        conf_variable.appwriteDatabaseId,
        conf_variable.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(
        "Appwrite service :: getAllPosts :: error:: " + error.message
      );
      return false;
    }
  }

  // File upload method
  async uploadFile({ file }) {
    try {
      return await this.storage.createFile(
        // Appwrite SDK's createFile method
        // Parameters:(<StorageID>, <FileID>, <File>, { })
        conf_variable.appwriteStorageId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error:: " + error.message);
      return false;
    }
  }

  // File deletion method
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(
        // Appwrite SDK's deleteFile method
        // Parameters:(<StorageID>, <FileID>)
        conf_variable.appwriteStorageId,
        fileId
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error:: " + error.message);
      return false;
    }
  }

  // File Preview Method
  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf_variable.appwriteStorageId, fileId);
  }
}

const service = new Service();
export default service;
