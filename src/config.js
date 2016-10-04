const config = {};

config.mongodbPath = process.env.ENV === 'Test'
                      ? 'mongodb://localhost/bookAPI'
                      : 'mongodb://localhost/bookAPI_test';

module.exports = config;
