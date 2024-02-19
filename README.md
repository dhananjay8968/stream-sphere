
## Overview

This project is a web application built using Node.js and Express.js, with MongoDB as the database for managing user data and Cloudinary for handling media assets such as images and videos. The application focuses on providing a platform for users to register, upload, and share videos. Additionally, users can interact with the content through features like liking videos and managing their user profiles.

**API Documentation** - https://documenter.getpostman.com/view/27664505/2sA2r9UNAb

## Technologies Used

-   **Node.js**: A JavaScript runtime used for building the server-side logic of the application.
    
-   **Express.js**: A web application framework for Node.js that simplifies the process of building robust and scalable web applications.
    
-   **MongoDB**: A NoSQL database used to store user information, video details, and other relevant data.
    
-   **Cloudinary**: A cloud-based media management platform used to handle image and video uploads, storage, and transformations.
    

## Features

1.  **User Authentication**: Users can register, log in, and log out securely.
    
2.  **Video Management**: Users can upload videos, update video details, and delete videos.
    
3.  **Profile Customization**: Users can customize their profiles by updating their details, avatars and cover images.
    
4.  **Likes and Interactions**: Users can like videos, and the application tracks user interaction history.
    
5.  **Search**: Videos can be searched based on user-specific criteria 
    
6.  **Token-based Authentication**: I used token-based authentication, utilizing access tokens for short-lived user sessions and refresh tokens for secure token renewal, with a focus on rotating refresh tokens for enhanced security.
    


## Steps to run the project

  

1.  **Fork the repository**

2.  **Clone the repository & install npm packages:**

```bash

git clone https://github.com/dhananjay8968/stream-sphere.git

cd stream-sphere

npm install

```

3.  **Environment variables**

Create a .env file in the root directory and add the following:

```

PORT=3000

MONGO_URI=your-mongodb-uri

ACCESS_TOKEN_SECRET=your-access-token-secret

REFRESH_TOKEN_SECRET=your-refresh-token-secret

CLOUDINARY_API_KEY=your-cloudinary-api-key

CLOUDINARY_API_SECRET=your-cloudinary-api-secret

CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name

```

4.  **Start the project**

prod environment- ```npm start```

dev environment- ```npm run dev```

