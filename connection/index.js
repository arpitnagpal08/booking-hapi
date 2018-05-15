const model = require('../models');
const sqlconn = require('./sqlconnection.js');
const mongoconn = require('./mongoconnection.js');
const boom = require('boom');
let connection = async function () {

    try {
        await sqlconn();
        await mongoconn();
        await model();
    } catch (error) {
        boom.badImplementation('database error');
    }
}
module.exports = connection;