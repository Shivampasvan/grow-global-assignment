const express = require("express");
const postRouter = express.Router();
const { PostModel } = require("../Models/post.model");

// --------------->>>>>>>> Get Specific Post  <<<<<<<<-------------------

postRouter.get("/get", async (req, res) => {
  try {
    const post = await PostModel.find();
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// --------------->>>>>>>> Add Post <<<<<<<<-------------------

postRouter.post("/add", async(req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    res.status(200).send({ msg: "New Post Added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// --------------->>>>>>>> Post Details Update <<<<<<<<-------------------

postRouter.patch("/update/:_id",  async (req, res) => {
  const { _id } = req.params;
  try {
    const post = await PostModel.findByIdAndUpdate(_id, req.body);
    res.status(200).send({ msg: "Post Details Updated" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// --------------->>>>>>>> Post Details Delete <<<<<<<<-------------------

postRouter.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const post = await PostModel.findByIdAndDelete(_id);
    res.status(200).send({ msg: "Post Deleted" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = {
  postRouter,
};
