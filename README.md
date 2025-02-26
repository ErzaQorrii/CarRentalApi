<h1 align="center">Car Rental API</h1>

 <h5 align = "center">Node.js and Express-based backend with MongoDB, enabling users to register, log in, view available cars, sort, and filter cars based on year, color, steering type, and number of seats.</h5>

<h2> Features</h2>

<ul>
  <li>User Registration & Authentication – Secure JWT-based authentication for profile access</li>
  <li>View & Filter Rental Cars – Filter by year, color, steering type, and number of seats</li>
  <li>Sorting Cars by Price – Sort cars from lowest to highest and vice versa</li>
  <li>Data Validation & Error Handling – Ensuring input correctness and robust error handling</li>
  <li>Unit & Integration Testing – Fully tested using Jest, Supertest, and Postman</li>
</ul>


<h2>Prerequisites</h2>
<p>Before setting up the project, ensure you have the following installed:</p>
<ul>
  <li>Node.js</li>
  <li>MongoDB </li>
</ul>

<h3>🔹 Setup Instructions </h3>

<h4>1) Clone the Repository</h4>
<pre>
git clone https://github.com/ErzaQorrii/Car-Rental-API.git
cd Car-Rental-API
</pre>

<h4>2️)Install Dependencies</h4>
<pre>
npm install
</pre>

<h4>3) Set Up Environment Variables</h4>
<p>Create a <code>.env</code> file in the root directory and add:</p>
<pre>
MONGO_URI=mongodb://localhost:27017
PORT=5000
DB_NAME=carRental
JWT_SECRET=your-secret-key
NODE_ENV=development
</pre>

<h4>4️) Start MongoDB Locally</h4>
<pre>
mongosh
</pre>

<h4>5️) Run the Application</h4>
<pre>
node server.js
</pre>


<h3>🔹 Instructions for Running Tests</h3>
<p>This project uses Jest for testing along with Supertest for API endpoint validation.</p>

<p>Run the following commands to test different functionalities:</p>
<pre>
npx jest test/login.test.js
npx jest test/register.test.js
npx jest test/car.test.js
npx jest test/getMyProfile.test.js
</pre>

<h3>🔹 Instructions for Importing Postman Collection & Testing Endpoints</h3>
<p>To test API endpoints efficiently, you can import the Postman collection into Postman.</p>

<p>Follow these steps to import the collection:</p>
<ul>
  <li>Open Postman.</li>
  <li> Download Car-Rental-API Postman Collection from github</li>
  <li>Click <strong>Upload Files</strong> and select the Postman collection JSON file.</li>
  <li>Click <strong>Import</strong> to load the API requests.</li>
</ul>
