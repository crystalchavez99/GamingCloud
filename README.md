# GamingCloud
## About This Project
GamingCloud is a SoundCloud clone that focuses on both the listeners and the artists to embrace a gaming music platform. Users can create their own tracks and share with others, and can find new gaming music to listen to love and support artists. It's primary focus is to help independent artists build and grow their careers for industries to notice them.
[Live Link](https://gamingcloud.herokuapp.com/)
## Wiki
* [Feature List](https://github.com/crystalchavez99/GamingCloud/wiki/Feature-List)
* [Database Schema](https://github.com/crystalchavez99/GamingCloud/wiki/Database-Schema)
## Built With
* JavaScript | Node.js | Express.js | React.js | Redux | PostgreSQL | Sequelize | HTML | CSS | Git
# Getting Started
1. Clone the repository
    ```
     git clone git@github.com:crystalchavez99/GamingCloud.git
     ```
2. Make sure you npm install dependencies on the root directory (not in back or front)
    ```
    npm install
    ```
3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL
   ```
   psql
   CREATE USER (name) WITH CREATEDB PASSWORD ('password');
   ```
4. Add an .env file containing the variables from the .env.example file in backend.
   1. Enter your username and password into the .env file along with the database name of your choice and port (PREFERRABLY 5000);
5. Use the Sequelize CLI to apply the provided database migrations and seeder.
   ```
   npx dotenv sequelize db:migrate
   ```
   ```
   npx dotenv sequelize db:seed:all
   ```
6. Add a proxy to your frontend package.json, replace or keep the port of your choice to match the port config in your .env file.
   ```
   "proxy": "http://localhost:5000"
   ```
7. Create database,migrate, and seed models.
   ```
   npx dotenv sequelize db:create
   npx dotenv sequelize db:migrate
   npx dotenv sequelize db:seed:all
   ```
8. Start services in backend and frontend directories
   1. If frontend doesn't auto open browser, direct on your browser to http://localhost:3000
   ```
   npm start
   ```
9.  Can now use the demo user or create an account to start using **GamingCloud**
