const mongoose = require("mongoose");

const schemaUser = new mongoose.Schema({ name: String });
const UserModel = mongoose.model("user",schemaUser);

module.exports = UserModel;