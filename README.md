# GamingCloud
A clone of SoundCloud.
(Will Update Soon)
[Live Link](https://gamingcloud.herokuapp.com/)
## About This Project
GamingCloud is a SoundCloud clone that focuses on both the listeners and the artists to embrace a gaming music platform. Users can create their own tracks and share with others, and can find new gaming music to listen to love and support artists. It's primary focus is to help independent artists build and grow their careers for industries to notice them.
## Wiki
* [Feature List](https://github.com/crystalchavez99/GamingCloud/wiki/Feature-List)
* [Database Schema](https://github.com/crystalchavez99/GamingCloud/wiki/Database-Schema)

## Built With
* JavaScript | Node.js | Express.js | React.js | Redux | PostgreSQL | Sequelize | HTML | CSS | Git
# Getting Started
1. Clone the repository
   * Either way works depending on cloning SSH or HTTPS
    ```
     git@github.com:crystalchavez99/GamingCloud.git
     ```
    ```
    https://github.com/crystalchavez99/GamingCloud.git
    ```
2. Make sure you npm install dependencies on all folders
    ```
    npm install
    ```
3. Add an .env file containing the variables from the .env.example file
4. Use the Sequelize CLI to apply the provided database migrations and seeder.
   ```
   npx dotenv sequelize db:migrate
   ```
   ```
   npx dotenv sequelize db:seed:all
   ```
5. You can now test the application, must be on both ends to run (front and back end directories)
   ```
   npm start
   ```
6. You can sign in via Demo User or create an account yourself
