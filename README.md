Restaurant Management System

Getting Started
Follow these steps to set up and run the project:

Prerequisites:
Ensure you have the following installed:

Node.js
npm


Installation
Clone the repository:
git clone <https://github.com/karan229/Restaurant-Management-system>

Navigate to the project directory and install dependencies for both the backend and frontend:
cd BackEnd
npm install
cd ../FrontEnd
npm install

Install additional packages for the payment gateway in the frontend directory:

npm install @stripe/react-stripe-js @stripe/stripe-js
npm install jspdf html2canvas


Install the Stripe package in the backend directory:
cd ../BackEnd
npm install stripe

Running the Project
Start the backend server:
cd BackEnd
nodemon server.js

In a separate terminal, start the frontend development server:
cd FrontEnd
In first terminal: npm run watch
In second terminal:  npm start

Admin Login
For security reasons, admin registration is disabled(To prevent random user to Register as Admin). Use the following credentials to log in as an admin:

Admin 1:
Email: admin.meet@gmail.com
Password: 12345
Admin 2:
Email: admin2@example.com
Password: password2
Admin 3:
Email: admin3@example.com
Password: password3
User Login
Users can log in using one of the following methods:

Method 1: Register and Log In
Users can register themselves and log in with different user types (Customer and User).

Method 2: Use Existing Credentials
Customer Login:
Email: meetcs@gmail.com
Password: meet12345

For the Payment Integration in Online Order Module use the below link for Card number as payment gateway is for developers(Also adding some cards to make it easy):
https://docs.stripe.com/testing

Card number: 4242424242424242
Date: Any future Date
CVC: Any 3 digit number
Make sure to fill All the details
