import { Schema, model } from "mongoose";

const postSchema = new Schema({
  name: { type: String, required: [true, "name is requried."] },
  prompt: { type: String, required: [true, "prompt is requried."] },
  photo: { type: String, required: [true, "photo is requried."] },
});

const Post = model("Post", postSchema);

export default Post;
