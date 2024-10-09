# File Converter Application using Long Polling Design Pattern

## Overview

The File Converter Application allows users to upload DOCX files and convert them to PDF format. The application uses a combination of Node.js, MongoDB, and various libraries to handle file uploads, conversions, and status tracking.

## Features

-   **File Upload**: Users can upload DOCX files for conversion.
-   **File Conversion**: Converts DOCX files to PDF format in the background.
-   **Status Tracking**: Users can check the conversion status using a job ID.
-   **File Download**: Users can download the converted PDF files once the conversion is complete.
-   **User Authentication**: Integrated Google OAuth for user login.

## Technologies Used

-   **Node.js**: Server-side JavaScript runtime.
-   **Express.js**: Web framework for building APIs.
-   **MongoDB**: NoSQL database for storing user and job data.
-   **docx-pdf**: Library for converting DOCX files to PDF.
-   **Multer**: Middleware for handling file uploads.
-   **Passport**: Authentication middleware for Node.js.

### Prerequisites

#### Environment Variables :

Please set the following environment variables in a `.env` file for configuring your ChatBuddy application:

-   `PORT`: The port number the server will listen on.
-   `WHITE_LIST`: A comma-separated list of domains that are allowed to make cross-origin requests.
-   `DB_HOST`: The connection string for your MongoDB database host.
-   `DB_NAME` = "fileConverter"
-   `JWT_SECRET_KEY`: The secret key for generating and verifying JSON Web Tokens.
-   `GOOGLE_CLIENT_ID`: <your_google_client_id>
-   `GOOGLE_CLIENT_SECRET`: <your_google_client_secret>
-   `GOOGLE_CALLBACK_URL`: <your_google_callback_url>

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd file-converter

    ```

2. Install NPM packages
    ```sh
    npm install npm@latest -g
    ```

3. Run Server
    ```sh
    npm run start:dev
    ```

