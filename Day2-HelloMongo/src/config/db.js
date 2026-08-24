const { default: mongoose } = require("mongoose");

const connectDb = async () => {
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  console.log(username,password)
  if (!password) {
    console.error("MongoDB password is missing");
    return;
  }
  try {
    await mongoose.connect(
      `mongodb+srv://adnankhaan09_db_user:${password}@cluster0.yeg1dae.mongodb.net/`,
    );

    console.log("DB connection successful");
  } catch (error) {
    console.log("Error while connecting to DB : ", error);
  }
};
module.exports = connectDb;
