const mongoose = require('mongoose')

async function setupDB() {
    await mongoose.connect("mongodb://127.0.0.1:27017/address")
}

module.exports = {setupDB}