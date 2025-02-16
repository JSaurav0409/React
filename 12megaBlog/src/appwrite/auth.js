import conf_variable from "../conf_variable/conf_variable.js";
import { Client, Account, ID } from "appwrite";

// AuthService class for handling authentication-related tasks
export class AuthService {
  // Initializing the Appwrite Client and Account service
  client = new Client();
  account;

  // Constructor to set up the client with Appwrite URL and Project ID
  constructor() {
    // class constructor
    this.client
      .setEndpoint(conf_variable.appwriteUrl)
      .setProject(conf_variable.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // account creation, here we make sure that the application do not get vendor lock-in.
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        return await this.login({ email, password });
      }
      return null;
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }
  

  // account login
  async login({ email, password }) {
    try {
      await this.account.createEmailPasswordSession(email, password);
      return await this.getCurrentUser(); // Return user data after login
    } catch (error) {
      throw error;
    }
  }

  // Getting the current user
  async getCurrentUser() {
    try {
      const session = await this.account.getSession("current"); // Check if session exists
      if (!session) {
        console.log("No active session found.");
        return null;
      }
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error: ", error);
      return null;
    }
  }

  // Logging out
  async logout() {
    try {
      await this.account.deleteSession("current"); // Delete only current session
      console.log("User logged out successfully.");
    } catch (error) {
      console.log("Appwrite service :: logout :: error: ", error);
    }
  }
}

// Create an instance of the AuthService class
const authService = new AuthService(); // object

export default authService;
