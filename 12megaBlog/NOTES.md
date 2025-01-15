# Blogging website

- Creating a blogging website with tools and technologies like `react-router-dom`, `react-redux`, `Redux Toolkit`, `appwrite`, `html-react-parser`, `tinymce-react`, and `react-hook-form`is a great choice for building a dynamic and feature-rich application.

- Here's a breakdown of the project plan and steps to get started:
  - **Frontend**: React with modern libraries for state management, routing, form handling, and rich text editing.
  - **Backend**: Appwrite for authentication, database, and API.
  - **Editor**: TinyMCE for creating and editing blog content.
  - **State Management**: Redux Toolkit for efficient global state handling

```bash
# Step 1: Create a new project
npm create vite@latest blogging-website --template react

# Navigate into the project directory
cd blogging-website

# Step 2: Install required dependencies
npm install react-router-dom react-redux @reduxjs/toolkit appwrite html-react-parser tinymce-react react-hook-form
```

---

## > How to create an environment variable and access it.

### 1. Create a new environment variable and adding it into `.gitignore`

- Create an environment file `.env` in the project root directory to store sensitive configuration details.
- Add `.env` to the `.gitignore` file to ensure it is not tracked in version control.
- To provide a reference for environment variables, create a `.env.sample` file in the root directory. This file will include placeholders for the required variables and will be pushed to the GitHub repository as a template for other developers.

### 2. Accessing environment variable

- Accessing environment variable varies according to the technologies which are used to create the app.
- For **Create React App** :
  - `REACT_API_URL`=https://api.example.com
  - To access :
  - `process.env.REACT_APP_NAME`
- For **Vite** :
  - `VITE_API_URL`=https://vite.example.com
  - To access :
  - `import.meta.env.VITE_API_URL`

---

## > How to set up `AppWrite`

**1. Create a New Project in AppWrite**

- Go to the AppWrite console.
- Create a new project and copy the API Endpoint and Project ID.
  - **API Endpoint**
    `VITE_APPWRITE_URL` = https://your-appwrite-url.com
  - **Project ID for Appwrite**
    `VITE_APPWRITE_PROJECT_ID` = your-project-id

---

**2. Create a New Database**

- In the AppWrite console, create a new database.
- Name it whatever you prefer (here I named it `blog`), and copy the database ID.
  - **Database ID**
    `VITE_APPWRITE_DATABASE_ID` = your-database-id

---

- In the database, create a collection.
- Name it whatever you prefer(here I named it `article`), and copy the collection ID.
  - **Collection ID**
  - `VITE_APPWRITE_COLLECTION_ID` = your-collection-id

---

- In **Article > Settings > Permissions**, grant update permissions to `all users`.
- Tick the tasks they can perform, allowing users to `create`, `read`, `update`, and `delete` articles.

- In **Articles > Attributes**, create the following attributes to store different values for the article:

  - `title` (string, required, size: 255)
  - `content` (string, required, size: 255)
  - `featuredImage` (string, required, size: 255)
  - `status` (string, size: 255)
  - `userId` (string, required, size: 255)

- In **articles > Indexes**, create a new index with the following settings:

  - `Index Key`: **status**
  - `Index Type`: **Key**
  - `Attribute`: **status**
  - `Order`: **ASC**

---

- In the **database > storage > Create Bucket**
- Name it whatever you prefer (here I named it `images`), and copy the bucket ID.
- `VITE_APPWRITE_BUCKET_ID` = your-bucket-id
- In **images > Settings > Permissions**, grant update permissions to `all users`.
- Tick the tasks they can perform, allowing users to `create`, `read`, `update`, and `delete` articles.

---

## > Why Use a Configuration Object for Environment Variables?

### Objective

- Using a configuration object to manage environment variables in your project is a **best practice** for modern development. Here’s a brief summary of the benefits

---

### **1. Centralized Management**

- All environment variables are stored in a single object, making them easier to access and update.

---

### **2. Improved Security**

- Sensitive data, like API keys and URLs, are stored in a `.env` file and excluded from version control using `.gitignore`, ensuring they remain private.

---

### **3. Better Code Organization**

- Replacing direct calls to `import.meta.env` with meaningful keys (e.g., `conf_variable.appwriteUrl`) makes your code more readable and easier to maintain.

---

### **4. Scalability**

- Adding new environment variables becomes seamless, as they can be integrated into the same configuration object without cluttering the codebase.

---

### **5. Testing and Debugging**

- Mocking the configuration object in tests ensures isolated and efficient testing of your application logic.

```js
const conf_variable = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf_variable;
```

---

## **> Notes on Implementing Authentication with Appwrite**

#### **Objective**

- The aim is to create a modular and scalable authentication service using Appwrite that prevents vendor lock-in by adhering to platform-agnostic practices.
- The focus is on creating reusable methods to handle common authentication tasks, such as account creation, login, logout, and fetching user details.

---

### **Code Walkthrough**

#### **1. Class Setup**

- **File Structure**: Use a dedicated `auth.js` file under the `appwrite` folder for authentication logic.
- **Client Initialization**:
  - The `Client` is initialized with the Appwrite URL and Project ID using values from a configuration file (`conf_variable`).
  - This ensures that sensitive data remains secure and easily configurable.

```javascript
import conf_variable from "../conf_variable/conf_variable.js";
import { Client, Account, ID } from "appwrite";

// AuthService class for handling authentication-related tasks
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf_variable.appwriteUrl)
      .setProject(conf_variable.appwriteProjectId);
    this.account = new Account(this.client);
  }
}

const authService = new AuthService();
export default authService;
```

---

#### **2. Creating an Account**

- **Method**: `createAccount`
- **Purpose**:
  - Registers a new user in the system by calling the `account.create` method.
  - Ensures modularity to facilitate easy replacement of the backend service if required.
- **Implementation**:
  - Generates a unique user ID using `ID.unique()`.
  - Captures user email, password, and name as parameters.
  - Handles errors gracefully by throwing exceptions.

```javascript
async createAccount({ email, password, name }) {
  try {
    const userAccount = await this.account.create(
      ID.unique(),
      email,
      password,
      name
    );
    if (userAccount) {
      // Additional logic, e.g., auto-login after registration, can be added here.
    } else {
      return userAccount;
    }
  } catch (error) {
    throw error; // Propagate error for further handling.
  }
}
```

---

#### **3. Logging In a User**

- **Method**: `login`
- **Purpose**:
  - Logs in a user by creating an email-password session.
  - Uses `createEmailPasswordSession` method from Appwrite's `Account` API.
- **Implementation**:
  - Accepts `email` and `password` as input.
  - Returns a session object if the login is successful.
  - Throws any errors encountered during the process for debugging or handling.

```javascript
async login({ email, password }) {
  try {
    return await this.account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw error;
  }
}
```

---

#### **4. Fetching the Current User**

- **Method**: `getCurrentUser`
- **Purpose**:
  - Retrieves the details of the currently logged-in user.
  - Uses `account.get` to fetch user information.
  - Returns `null` if the request fails, ensuring the application can handle such scenarios gracefully.
- **Implementation**:
  - Logs any errors encountered for easier debugging.

```javascript
async getCurrentUser() {
  try {
    return await this.account.get();
  } catch (error) {
    console.log("Appwrite service :: getCurrentUser :: error: ", error);
  }

  return null;
}
```

#### **5. Logging Out**

- **Method**: `logout`
- **Purpose**:
  - Logs out the currently authenticated user by deleting all active sessions.
  - Uses the `deleteSessions` method from Appwrite's `Account` API.
- **Implementation**:
  - Ensures any errors during the logout process are logged for debugging purposes.

```javascript
async logout() {
  try {
    await this.account.deleteSessions();
  } catch (error) {
    console.log("Appwrite service :: logout :: error: ", error);
  }
}
```

---

### **Benefits of this Approach**

1. **Modular Design**: Each method handles a specific task, making the codebase easy to understand and maintain.
2. **Error Handling**: Robust error handling ensures smooth user experiences and simplified debugging.
3. **Scalability**: Encapsulation within the `AuthService` class allows for future additions (e.g., OAuth support) without affecting other parts of the application.
4. **Platform Independence**: Abstracting Appwrite-specific logic into methods allows for quick backend replacements if needed.

---

## > Appwrite database, file upload and custom queries

### **Objective**

- The goal is to implement a flexible and modular solution for managing data and files using Appwrite's Database and Storage services.
- This includes `creating`, `reading`, `updating`, and `deleting` data while ensuring efficient file storage and retrieval.
- Additionally, custom queries will enable precise data filtering and manipulation to meet `specific application requirements`, `fostering scalability`, `maintainability`, and `vendor independence.`

---

### **Code Walkthrough**

#### **1. Database Setup**

- **File Structure :** The `database.js `or `config.js` file will be located under the `appwrite` folder, similar to the `auth.js` file. This allows you to handle all database-related interactions in one place, making it easier to manage and extend.
- **Client Initialization :** As with the authentication service, the `Client` from Appwrite will be initialized, and an instance of the `Database` service will be created to interact with Appwrite's collections and documents.

```javascript
// config.js

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
}

const service = new Service();
export default service;
```

---

## 2. Implementation Details

### Database Operations

The `Service` class encapsulates all interactions with the Appwrite Database. This modular approach allows for cleaner and more maintainable code. Below is a detailed breakdown of the methods:

### 2.1. `createPost()`

- **Purpose:** Adds a new document (post) to the database.
- **Parameters:**
  - `title`, `slug`, `content`, `featuredImage`, `status`, `userId`.
- **Appwrite Method Used:** `databases.createDocument`.
- **Key Notes:**
  - Utilizes `slug` as the `DocumentID` for easy retrieval and unique identification.

```javascript
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
    console.log("Appwrite service :: createPost :: error: " + error.message);
  }
}
```

### 2.2. `updatePost()`

- **Purpose:** Updates an existing post by its `slug`.
- **Parameters:**
  - `slug` (DocumentID), and the fields to update.
- **Appwrite Method Used:** `databases.updateDocument`.
- **Key Notes:**
  - Allows partial updates by passing only the fields to modify.

```javascript

async updatePost(slug, { title, content, featuredImage, status }) {
  try {
    return await this.databases.updateDocument(
      conf_variable.appwriteDatabaseId,
      conf_variable.appwriteCollectionId,
      slug,
      {
        title,
        content,
        featuredImage,
        status,
      }
    );
  } catch (error) {
    console.log("Appwrite service :: updatePost :: error: " + error.message);
  }
}


```

### 2.3. `deletePost()`

- **Purpose:** Deletes a post by its `slug`.
- **Appwrite Method Used:** `databases.deleteDocument`.
- **Key Notes:**
  - Returns `true` on success, `false` otherwise.

```javascript

async deletePost(slug) {
  try {
    await this.databases.deleteDocument(
      conf_variable.appwriteDatabaseId,
      conf_variable.appwriteCollectionId,
      slug
    );
    return true;
  } catch (error) {
    console.log("Appwrite service :: deletePost :: error: " + error.message);
    return false;
  }
}


```

### 2.4. `getPostBySlug()`

- **Purpose:** Retrieves a single post by its `slug`.
- **Appwrite Method Used:** `databases.getDocument`.
- **Key Notes:**
  - Returns `false` if an error occurs, ensuring the method is fail-safe.

```javascript

async getPostBySlug(slug) {
  try {
    return await this.databases.getDocument(
      conf_variable.appwriteDatabaseId,
      conf_variable.appwriteCollectionId,
      slug
    );
  } catch (error) {
    console.log(
      "Appwrite service :: getPostBySlug :: error: " + error.message
    );
    return false;
  }
}


```

### 2.5. `getAllPosts()`

- **Purpose:** Fetches all posts matching specific queries (default query filters by `status="active"`).
- **Appwrite Method Used:** `databases.listDocuments`.
- **Key Notes:**
  - Supports custom queries for flexibility in data retrieval.

```javascript

async getAllPosts(queries = [Query.equal("status", "active")]) {
  try {
    return await this.databases.listDocuments(
      conf_variable.appwriteDatabaseId,
      conf_variable.appwriteCollectionId,
      queries
    );
  } catch (error) {
    console.log("Appwrite service :: getAllPosts :: error: " + error.message);
    return false;
  }
}


```

---

## 3. File Storage Operations

The `Service` class also integrates Appwrite's Storage service for handling file operations.

### 3.1. `uploadFile()`

- **Purpose:** Uploads a file to the storage.
- **Parameters:**
  - `file` (JavaScript `File` object or Blob).
- **Appwrite Method Used:** `storage.createFile`.
- **Key Notes:**
  - Uses `ID.unique()` for generating a unique File ID.

```javascript

async uploadFile({ file }) {
  try {
    return await this.storage.createFile(
      conf_variable.appwriteStorageId,
      ID.unique(),
      file
    );
  } catch (error) {
    console.log("Appwrite service :: uploadFile :: error: " + error.message);
    return false;
  }
}


```

### 3.2. `deleteFile()`

- **Purpose:** Deletes a file from the storage.
- **Parameters:** `fileId`.
- **Appwrite Method Used:** `storage.deleteFile`.
- **Key Notes:**
  - Returns `true` on success, `false` otherwise.

```javascript

async deleteFile(fileId) {
  try {
    await this.storage.deleteFile(
      conf_variable.appwriteStorageId,
      fileId
    );
    return true;
  } catch (error) {
    console.log("Appwrite service :: deleteFile :: error: " + error.message);
    return false;
  }
}


```

### 3.3. `getFilePreview()`

- **Purpose:** Retrieves a preview URL for a file.
- **Parameters:** `fileId`.
- **Appwrite Method Used:** `storage.getFilePreview`.
- **Key Notes:**
  - Useful for displaying images or files in the application.

```javascript

getFilePreview(fileId) {
  return this.storage.getFilePreview(conf_variable.appwriteStorageId, fileId);
}

```

---

## 4. Best Practices and Observations

### 4.1. Error Handling

- Each method includes error logging to help debug issues during runtime (using `console.log` with specific method context).
- Returning `false` or `true` in case of failure ensures predictable behavior.

### 4.2. Reusability and Extensibility

- Centralizing database and storage logic within the `Service` class promotes reusability.
- Future operations (e.g., adding a new collection or service) can be added easily.

### 4.3. Parameterization

- Using `conf_variable` ensures the solution is vendor-agnostic and environment-friendly.

---

## 5. Potential Enhancements

### 5.1. Error Propagation

- Instead of logging errors directly in the methods, consider throwing exceptions or returning them for the calling function to handle.

### 5.2. Batch Operations

- Add batch processing for handling bulk file uploads or post updates.

### 5.3. Caching

- Introduce caching for frequently accessed posts or files to reduce API calls and improve performance.

---

## > Configuring Redux Toolkit (RTK) for Large-Scale Projects

### Objective

- To establish Redux Toolkit (RTK) in a scalable, maintainable, and modular architecture for a large project.
- This setup emphasizes separation of concerns, effective state management, and ease of scalability.

---

### **Code Walkthrough**

#### **1. Setting Up the Store**

**Step 1: Create a Store**

- In the `src` directory, create a new folder named `store`.
- Inside the `store` folder, create a file named `store.js`.

- **store.js**

```javascript
// store.js - Setting up the Redux Toolkit (RTK) store

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
});

export default store;
```

#### 2. Set Up and export the Reducers (Slices)

- **Folder Structure:**

  - Create a `reducers` folder and name it whatever you want. Inside this folder, organize slices into separate folders.
  - Use the `createSlice` function from `@reduxjs/toolkit` to create the slices.

Organize slices by feature into their respective folders for better modularity and maintainability.

```plaintext
src/
├── reducers/
│   ├── auth/
│   │   └── authSlice.js
│   ├── posts/
│   │   └── postsSlice.js
│   ├── comments/
│       └── commentsSlice.js
```

**Example: Creating a Slice**

```javascript
// authSlice.js
// * Slice for verifying if the user is authenticated or not using store.

import { createSlice } from "@reduxjs/toolkit";

// ? Step 1: Define the initial state
const initialState = {
  status: false,
  userData: null,
};

// ? Step 2: Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ? Step 3: Define actions

    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

// ? Step 4: Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
```

Repeat this process for other features like `postsSlice.js` and `commentsSlice.js`.

#### 3. Set up the Components.

- **Folder Structure:**

  - Create a `components` folder.
  - Inside `components`, create separate folders for each component (`Header`, `Footer`).

```plaintext
components/
├── Header/
│   └── Header.jsx
├── Footer/
│   └── Footer.jsx


```

- **Header.jsx**

```jsx
// Header.jsx

import React from "react";

function Header() {
  return <div>Header</div>;
}

export default Header;
```

- **Footer.jsx**

```jsx
// Footer.jsx
import React from "react";

function Footer() {
  return <div>Footer</div>;
}

export default Footer;
```

#### 4. Wrapping the main.jsx in provider.

- In **main.jsx**, wrap the `<App />` component with the Redux `<Provider>`.
- Pass the `store` object from `store/store.js` to `<Provider>`.

- **main.jsx**

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

#### 5. Add Logic in `App.jsx`.

- Use `authService` to check if the user is logged in or not.
- Dispatch `login` or `logout` actions accordingly.
- Use a `loading` state to display content only after the authentication check is complete.

- **App.jsx**

```jsx
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./features/auth/authSlice.js";
import { Footer, Header } from "./components/index.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // conditional rendering

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400 ">
      <div className="w-full block">
        <Header />
        <main>TODO: {/* {outlet} */}</main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
```

---

## > Production grade react components.

### Objective

- To design and develop reliable, reusable, scalable, and high-performance React components for production-grade applications.
- This approach ensures maintainability, testability, and adherence to best practices in modern React development.
- The development will follow a component-based design methodology to maximize efficiency and scalability.

---

### **Code Walkthrough**

#### **1. Setting Up the Container**

- Create a new folder inside the `components` directory and name it **contaner**.
- Within that folder, create a file named **Container.jsx**.
- **Container.jsx**

```jsx
import React from "react";

function Container({ children }) {
  return <div className="w-full max-w-7xl mx-auto px-4">{children}</div>;
}

export default Container;
```

#### **2. Setting Up the Footer**

- **2.1. Creating the Logo component.**

  1. Navigate to the `components` directory.
  2. Create a new file named `Logo.jsx` to define a reusable logo component.

- **2.2.Creating the Footer component.**
  1. The `Footer` component is built with mostly hardcoded content for simplicity.
- **Footer.jsx**

```jsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
```

#### **3. Setting Up the Header**

In the Header, we will display different components based on the user's authentication state (logged in or logged out).

- **3.1 Creating the Logout Button.**

  1. Navigate to the `components/Header` directory.
  2. Create a new file named `LogoutBtn.jsx` to define the logout button functionality.

- **LogoutBtn.jsx**

```jsx
import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../features/auth/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
      Logout
    </button>
  );
}

export default LogoutBtn;
```

- **3.2 Setting up the Header.jsx .**
  1. Here we will use conditional rendering .
  2. If user are logged in than we will render the **LogoutBtn.jsx** in the header.
- **Header.jsx**

```jsx
import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * Header Component
 * A responsive header with dynamic navigation items based on authentication status.
 */
function Header() {
  // Fetching authentication status from the Redux store
  const authStatus = useSelector((state) => state.auth.status);

  // React Router navigation hook
  const navigate = useNavigate();

  // Navigation Items Configuration
  const navItems = [
    {
      name: "Home", // Display name of the item
      slug: "/", // Path of the item
      active: true, // Always active
    },
    {
      name: "Login", // Display name for login
      slug: "/login", // Path for login page
      active: !authStatus, // Active only if the user is logged out
    },
    {
      name: "All Posts", // Display name for all posts
      slug: "/all-posts", // Path for all posts page
      active: authStatus, // Active only if the user is logged in
    },
    {
      name: "Add Post", // Display name for adding a post
      slug: "/add-post", // Path for adding a post
      active: authStatus, // Active only if the user is logged in
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          {/* Logo Section */}
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          {/* Navigation Items */}
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {/* Logout Button: Visible only if authStatus is true */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
```

- **3.3 Designing Common UI Components**
  To create reusable components for commonly used UI elements like buttons and input boxes, follow these steps:

  1. Navigate to the `components` Directory:
     - Go to the `src/components` directory in your project.
  2. Create a New File:
     - Name the file **Button.jsx** and **InputBox.jsx**.

- **Button.jsx**

```jsx
import React from "react";

/**
 * Button Component
 * A reusable button component with customizable styles and props.
 *
 * @param {React.ReactNode} children - The content inside the button (e.g., text or icons).
 * @param {string} type - The type of the button (e.g., "button", "submit", "reset"). Default is "button".
 * @param {string} bgColor - Background color classes for the button. Default is "bg-blue-600".
 * @param {string} textColor - Text color classes for the button. Default is "text-white".
 * @param {string} className - Additional CSS classes for customization.
 * @param {object} props - Any additional props to be passed to the button element (e.g., onClick, disabled).
 */
function Button({
  children, // Content inside the button
  type = "button", // Default button type
  bgColor = "bg-blue-600", // Default background color
  textColor = "text-white", // Default text color
  className = "", // Additional custom classes
  ...props // Additional props like onClick, aria-label, etc.
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} // Combine default and custom classes
      {...props} // Spread additional props
    >
      {children} {/* Render button content */}
    </button>
  );
}

export default Button;
```

- **InputBox.jsx**

```jsx
import React, { useId } from "react";

/**
 * InputBox Component
 * A reusable input component with optional label support and customizable styles.
 *
 * @param {string} label - The label text displayed above the input field.
 * @param {string} type - The type of the input (e.g., "text", "password", "email"). Default is "text".
 * @param {string} className - Additional CSS classes for customization.
 * @param {object} props - Any additional props to be passed to the input element.
 * @param {React.Ref} ref - A forwarded ref for the input element.
 */
const InputBox = React.forwardRef(function InputBox(
  { label, type = "text", className = "", ...props }, // Destructure props
  ref // Forwarded ref for input element
) {
  // Generate a unique ID for accessibility
  const id = useId();

  return (
    <div className="w-full">
      {/* Render the label if provided */}
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      {/* Render the input field with dynamic classes and props */}
      <input
        type={type} // Set the input type
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} // Combine default and custom classes
        ref={ref} // Attach forwarded ref
        {...props} // Spread additional props
        id={id} // Assign unique ID for label association
      />
    </div>
  );
});

export default InputBox;
```

---

## > How to Use React-Hook-Form in Production

- Leverage React-Hook-Form to efficiently manage form state and validation in production-grade applications.
- Ensure lightweight, performant, and flexible forms with minimal re-renders.

---

### **Code Walkthrough**

#### **Steps to Integrate React-Hook-Form**

#### 1. Create a different Components

- **1.1.** In src/components directory, create a new file and name it `SelectActiveStatus.jsx`
- **SelectActiveStatus.jsx**

```jsx
import React, { useId } from "react";

/**
 *^ SelectActiveStatus Component
 ** A reusable dropdown component with label and customizable options.
 *
 * @param {Array} options - Array of options for the dropdown. Each option should have a `value` and `label`.
 * @param {string} label - The label text displayed above the dropdown.
 * @param {string} className - Additional CSS classes for styling the dropdown.
 * @param {object} props - Any additional props to be passed to the select element.
 * @param {React.Ref} ref - Forwarded ref for the select element.
 */

function SelectActiveStatus({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {/* Optionally looping, if there is value in options than the loop will work */}
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(SelectActiveStatus);
```

- **1.2.** In src/components directory, create a new file and name it `PostCard.jsx`
- **PostCard.jsx**

```jsx
import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    // Link component from react-router-dom to navigate to the detailed post page
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        {/* Container for the image */}
        <div className="w-full justify-center mb-4">
          <img
            src={service.getFilePreview(featuredImage)}
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
```

#### 2. Installation and Use of `React-Hook-Form`

**2.1. Installation of `React-Hook-Form`**

- Integration of **react-hook-form** begins from here.
- If you haven't already installed the library at the beginning of your project, use the following command:

```bash
npm install react-hook-form
```

**2.2. Use of react-hook-form**

- Import `useForm` from `react-hook-form` in your component to manage form state and validation.

```javascript
import { useForm } from "react-hook-form";
```

- Initialize the `useForm` hook in your functional component

```javascript
const { register, handleSubmit } = useForm();
```

- `register`: Used to bind input elements and specify validation rules.
- `handleSubmit`: Handles form submission and triggers validation.

---

**useNavigate()**: The `useNavigate` hook is part of the `react-router-dom` library and is used for programmatic navigation in React applications.

- Here's a breakdown of its usage:

```javascript
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const handleSignup = (data) => {
  // Perform signup logic
  navigate("/welcome"); // Redirect to the Welcome page
};
```

**Benefits of useNavigate:**

- Flexible and clean redirection logic.
- Easily pass state or parameters to the target route.

---

- To ensure modularity and reusability, you can design input components separately for fields like username and password.

- **Login.jsx**:

```jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../features/auth/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError(""); // clearing the error
    try {
      const session = await authService.login(data); // Call auth service to login
      if (session) {
        const userData = await authService.getCurrentUser(); // Fetch current user
        if (userData) {
          dispatch(authLogin({ userData })); // Dispatch login action
          navigate("/"); // Navigate to the home page
        }
      }
    } catch (error) {
      setError(error?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email"), {
                required: true,
                validate: {
                  patternMatch: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email format",
                }
              }}
            />
            <Input
            label= "Password"
            type="password"
            placeholder="Enter your password"
            {...register("password"), {
              required: true,
            }}
            />
            <Button
            type="submit"
            className="w-full"
            >Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
```

- **Signup.jsx**:

```jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError(""); // clearing the error
    try {
      const createdUser = await authService.createAccount(data);
      if (createdUser) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser)); // Dispatch login action
          navigate("/"); // Navigate to the home page
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
```

---

**> RTE ( Real Time Editor )**

- The `RTE` component integrates a rich text editor (TinyMCE) with the `react-hook-form` library. It allows users to input and format content with advanced text editing features.
- **Key Features**
  **1. Integration with react-hook-form:**
  - Uses the `Controller` component to manage the state and value of the editor, ensuring seamless form integration.
    **2. Rich Text Editing with TinyMCE:**
  - Provides an advanced editing experience, including features like lists, links, images, and more.
    **3.Customizable Toolbar and Plugins:**
  - Includes a variety of plugins and toolbar options to enhance user interaction.
    **4.Responsive Design:**
  - Ensures a smooth experience with a fixed editor height of 500px and a responsive layout.

**RTE.jsx**

```javascript
import React from "react";
import { Editor } from "@tinymce/tinymce-react"; // Import TinyMCE Editor
import { Controller } from "react-hook-form"; // Import Controller from react-hook-form for form integration

/**
 * RTE Component - A Rich Text Editor integrated with react-hook-form
 * @param {string} name - The field name for react-hook-form
 * @param {object} control - The control object from react-hook-form
 * @param {string} label - The label displayed above the editor
 * @param {string} defaultValue - The initial value of the editor content
 */

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {/* Render the label if provided */}
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      {/* Integrate TinyMCE Editor with react-hook-form using Controller */}
      <Controller
        name={name || "Content"} // Default name if not provided
        control={control} // react-hook-form control object
        render={({ field: { onChange } }) => (
          <Editor
            // Set initial value for the editor
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue, // Optional: Initialize content value
              height: 500, // Set the editor height (in pixels)
              menubar: true, // Enable the menubar
              plugins: [
                // Plugins to extend the editor's functionality
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                // Define toolbar actions for the editor
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                // Default styling for the content within the editor
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            // Handle changes in the editor's content
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
```

---

**> PostForm.jsx Component Explanation**

The `PostForm.jsx` component is a versatile and modular form designed to create or edit posts. It features auto-generation of a slug from the title, dynamic content management, and file handling for post images. Below is a detailed breakdown of its structure and functionality:

**Features :**

**1.Form Initialization**

- Uses `react-hook-form` for efficient form handling and validation.
- Pre-fills fields if editing an existing post.

**2.Slug Auto-Generation**

- Dynamically transforms the title into a URL-friendly slug.
- Ensures the slug is updated in real-time as the title changes.

**3.Post Management**

- Supports both post creation and post editing.
- Automatically uploads and manages featured images.
- Deletes old images when uploading a new one during post updates.

**4.Backend Integration**

- Integrates with Appwrite for file storage and database operations.
- Associates posts with the logged-in user’s ID.

**5.Responsive Layout**

- Divides the form into two sections: content inputs and additional settings.
- Ensures a clean and organized user interface.

**6.Rich Text Editor (RTE)**

- Provides an intuitive editor for creating or editing post content.
- Fully integrated with `react-hook-form`.

**7.Validation**

- Enforces required fields for title, slug, status, and image (when creating a post).
- Allows real-time validation for dynamic inputs.

**8.Dynamic Behavior**

- Updates slug and featured image dynamically based on user inputs.

```jsx
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm() {
  // Initializing the form with react-hook-form, including default values
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "", // Default to post's title if editing, else empty
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active", // Default status is "active"
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData); // Fetch user data from Redux store

  const submit = async (data) => {
    // Check if editing a post
    if (post) {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0]) // Upload new file if provided
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage); // Delete old featured image
      }

      // Update post details
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.id}`); // Redirect to the updated post's page
      }
    } else {
      // For new post creation
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0]) // Upload featured image
        : null;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId; // Add featured image ID to the data
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id, // Associate post with current user
        });
        if (dbPost) {
          navigate(`/post/${dbPost.id}`); // Redirect to the created post's page
        }
      }
    }
  };

  // Function to transform title into a slug
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-") // Remove unwanted characters
        .replace(/\s/g, "-"); // Replace spaces with dashes

    return "";
  }, []);

  // Watch for title changes and auto-generate slug
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true })); // Set slug value based on title
      }
    });

    return () => {
      subscription.unsubscribe(); // Cleanup subscription
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      {/* Left section: Form inputs */}
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })} // Title is required
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })} // Slug is required
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true, // Validate after updating slug
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control} // Rich text editor with react-hook-form
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right section: File upload, status, and submit */}
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif" // Only accept image files
          {...register("image", { required: !post })} // Image is required for new posts
        />
        {post && (
          <div className="w-full mb-4">
            {/* Display current featured image if editing */}
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]} // Status options
          label="Status"
          className="mb-4"
          {...register("status", { required: true })} // Status is required
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined} // Green button for editing
          className="w-full"
        >
          {post ? "Update" : "Submit"} {/* Dynamic button text */}
        </Button>
      </div>
    </form>
  );
}
```
