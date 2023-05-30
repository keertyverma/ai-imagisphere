import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { FormField, Loader } from "../components";
import { getRandomPrompt } from "../utils";

const CreatePost = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [isGenerating, setGenerating] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlerSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(post.prompt);
    setPost((prev) => ({ ...prev, prompt: randomPrompt }));
  };

  const generateImage = async () => {
    if (post.prompt) {
      try {
        setGenerating(true);

        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: post.prompt }),
        });

        const data = await response.json();
        if (response.ok) {
          setPost((prev) => ({
            ...prev,
            photo: `data:image/jpeg;base64,${data.photo}`,
          }));
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      } finally {
        setGenerating(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-gray-600 text-lg max-w[500px]">
          Create Imaginative and visually stunning images through DALL-E AI 🤖
          and share them with the community ✨
        </p>
      </div>
      <form className="max-w-3xl mt-16" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            label="Your Name"
            type="text"
            name="name"
            placeholder="Keerty V"
            value={post.name}
            handleChange={handleChange}
            required
          />
          <FormField
            label="Prompt"
            type="text"
            name="prompt"
            placeholder="The long-lost Star Wars 1990 Japanese Anime"
            value={post.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handlerSurpriseMe={handlerSurpriseMe}
            required
          />
          <div className="relative w-64 h-64 flex justify-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3">
            {post.photo ? (
              <img
                src={post.photo}
                alt={post.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt={preview}
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {isGenerating && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="w-full sm:w-auto bg-green-700 text-white text-sm text-center font-medium rounded-md px-5 py-2.5"
          >
            {isGenerating ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[14px] text-gray-600">
            You can share image with the community, once image is created
          </p>
          <button
            type="submit"
            className="mt-3 w-full sm:w-auto bg-[#6469ff] text-white font-medium text-sm rounded-md px-5 py-2.5 text-center"
          >
            {isLoading ? "Sharing" : "Share with community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
