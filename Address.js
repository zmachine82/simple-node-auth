const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    address: String,
    userId: String
});



const Address = mongoose.model("Address", addressSchema);

module.exports = Address

