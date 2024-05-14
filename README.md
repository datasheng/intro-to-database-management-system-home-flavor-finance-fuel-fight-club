# README
All files for the program on the main branch.

### Setup

#### Required Packages:
node module,
package.json,
npm install exceljs in the server terminal,
Make sure you have the .env file with the JWT_SECRET token inside
Than put this in your package.json inside the server file

{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo "Error: no test specified" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "morgan": "^1.10.0",
    "mysql": "^2.18.1",
    "mysql2": "^3.9.7",
    "node": "^22.1.0",
    "nodemon": "^3.1.0"
  }
}
Then run node app.js
