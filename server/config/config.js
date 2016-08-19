var dbConUrl = process.env.MONGOLAB_URI|| 'mongodb://localhost:27017/test';

module.exports = {

    'secret': 'secretpassword',
    'database': dbConUrl

};