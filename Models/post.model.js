const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  title: String,
  desc: String,
  user: String,
});

const PostModel = mongoose.model("post", postSchema);

module.exports = {
  PostModel,
};
