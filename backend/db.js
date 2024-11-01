const mongoose = require("mongoose");
const mongooseURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = () => {
	mongoose.connect(mongooseURI).then(() => {
		console.log("connected to mongodb................");
	});
};

module.exports = connectToMongo;
