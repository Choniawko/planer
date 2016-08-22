var mongoURI = process.env.MONGOLAB_BROWN_URI || "mongodb://heroku_vj4mnbbn:udev0r2fukkdfq1gbm9igmtrtn@ds063725.mlab.com:63725/heroku_vj4mnbbn"
module.exports = {

    'secret': 'secretpassword',
    'database': mongoURI

};