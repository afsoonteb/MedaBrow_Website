const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
                        host: process.env.DB_HOST,
                        port: process.env.DB_PORT,
                        dialect: 'postgres',
                        logging: false
});

sequelize
    .authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

const connectDB = async () => {
    sequelize
        .sync({alter: true})
        .then(() => console.log('Database and tables synced...'))
        .catch(err => console.log('Error syncing database: ' + err));
}

module.exports = { sequelize, connectDB};