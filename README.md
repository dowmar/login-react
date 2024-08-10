# Login App

## Preview
- Login
![Screenshot from 2024-08-10 17-52-55](https://github.com/user-attachments/assets/dbf9c0a9-28a3-40ae-b166-327dbb806145)

- Sign Up
![Screenshot from 2024-08-10 18-01-51](https://github.com/user-attachments/assets/6476fe2f-b85a-4e39-9e48-0102c9c24166)

- Change Password
![Screenshot from 2024-08-10 18-01-33](https://github.com/user-attachments/assets/62de6ace-e2c5-487a-92b2-5aa116d0e154)

- Change Name
![Screenshot from 2024-08-10 18-01-41](https://github.com/user-attachments/assets/291c57dc-f571-4a22-ae77-73c87180f0e2)

- Dashboard (unverified)
![Screenshot from 2024-08-10 17-53-35](https://github.com/user-attachments/assets/7a0369e2-2ac1-43c0-960f-8ab811c24ba8)

- Verify Email
![Screenshot from 2024-08-10 17-54-23](https://github.com/user-attachments/assets/017f9050-b4f6-49fd-919f-5047622481a2)

- Email Verified
![Screenshot from 2024-08-10 17-54-34](https://github.com/user-attachments/assets/a5099200-a120-46fa-8cac-0be154fe68b7)

- Dashboard
![Screenshot from 2024-08-10 17-54-46](https://github.com/user-attachments/assets/19543fd8-7e70-4930-b36c-d66a2256b648)




## Features

Sign Up / Sign In with Google and / or Facebook Auth

Email Verification wih Nodemailer

State Management, Cookies

User Statistic

## Technologies Used

- Frontend: React.js with Vite

- Backend: Node.js with Express.js

- Database: PostgreSQL

- State Management: Redux



# Getting Started

## Prequisites

- Node.js and npm/yarn installed

- PostgreSQL database setup

## Installation
- Clone the Repository:

```bash
git clone https://github.com/dowmar/login-react
cd login-react
```
- Install Dependencies:
- We user force for FE due to problems with meta-api
```bash
# For frontend
cd login-incit
npm install --force

# For backend
cd backend
npm install
```
- Set Up Environment Variables:
Create a .env file in the server directory with the following content:
```bash
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD
DB_HOST=YOUR_HOST
DB_PORT=YOUR_PORT
DB_NAME=YOUR_DB_NAME
ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET
ENCRYPTION_SECRET
OUTLOOK_EMAIL
OUTLOOK_PASS
SERVER_URL
CLIENT_URL
CLIENT_URL2=
```

- Initialize the Database:

Ensure your PostgreSQL database is set up and accessible using the connection string provided in the .env file.

- Run the Application
```bash
# In the login-incit directory
npm run dev

# In the backend directory
npm start
```


## Folder Structure
- Frontend (login-incit/): Contains all React.js frontend code.
- Backend (backend/): Contains the Express.js API and database interaction logic.


## License

[MIT](https://choosealicense.com/licenses/mit/)
