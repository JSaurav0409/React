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
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method which forcefully login the user
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // account login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // Getting the current user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error: ", error);
    }

    return null;
  }

  // Logging out
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error: ", error);
    }
  }
}

// Create an instance of the AuthService class
const authService = new AuthService(); // object

export default authService;
