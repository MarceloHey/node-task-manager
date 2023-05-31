const mongoose = require('mongoose')

const connectDB = async (url) => {
  return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
      console.log('CONNECTED TO DB...');
    }).catch((err) => {
      console.log(err);
    })
}

module.exports = { connectDB }

