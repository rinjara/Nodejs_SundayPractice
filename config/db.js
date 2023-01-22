const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.DATABASE_CONNECT);
    console.log(
      `MongoDB is connected on PORT:${db.connection.port}, name: ${db.connection.name}, on host: ${db.connection.host}`
        .green.bold
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
};

module.exports = connectDb;
// const Cat = mongoose.model("Cat", { name: String });
// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));
