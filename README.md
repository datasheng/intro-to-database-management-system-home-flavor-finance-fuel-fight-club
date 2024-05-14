# README
All files for the program on the main branch.

### Backend Setup
cd into the server directory
do: npm init
then: npm install exceljs bcrypt cors dotenv express jsonwebtoken morgan mysql2 nodemon

Make sure you have the .env file in /server with the JWT_SECRET token inside. Also include the PORT number.

### Frontend Setup

Run `npm install` to install the necessary dependencies.

Create a `package.json` file with the following content:
    ```
    {
      "version": "0.1.0",
      "private": true,
      "proxy": "http://localhost:3001",
      "dependencies": {
        "@testing-library/jest-dom": "^5.17.0",
        "@testing-library/react": "^13.4.0",
        "@testing-library/user-event": "^13.5.0",
        "axios": "^1.6.8",
        "bcrypt": "^5.1.1",
        "bootstrap": "^5.3.3",
        "cors": "^2.8.5",
        "dotenv": "^16.4.5",
        "express": "^4.19.2",
        "jwt-decode": "^4.0.0",
        "mysql": "^2.18.1",
        "nodemon": "^3.1.0",
        "react": "^18.2.0",
        "react-bootstrap": "^2.10.2",
        "react-dom": "^18.2.0",
        "react-helmet": "^6.1.0",
        "react-icon": "^1.0.0",
        "react-icons": "^5.1.0",
        "react-router-dom": "^6.22.3",
        "react-scripts": "^5.0.1",
        "styled-components": "^6.1.8",
        "web-vitals": "^2.1.4"
      },
      "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
      },
      "eslintConfig": {
        "extends": [
          "react-app",
          "react-app/jest"
        ]
      },
      "browserslist": {
        "production": [
          ">0.2%",
          "not dead",
          "not op_mini all"
        ],
        "development": [
          "last 1 chrome version",
          "last 1 firefox version",
          "last 1 safari version"
        ]
      }
    }
    ```
    
If necessary, reinstall `react-scripts` by running `npm install react-scripts`.

Change to the `src` directory:
    ```sh
    cd src
    ```
    
Start the development server:
    ```sh
    npm start
    ```


