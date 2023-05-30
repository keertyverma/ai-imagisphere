import { useState, useEffect } from "react";

import { Card, FormField, Loader } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0)
    return data.map((post) => <Card key={post._id} {...post} />);

  return (
    <h2 className="mt-5 font-bold text-xl text-[#6449ff] uppercase">{title}</h2>
  );
};

const Home = () => {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    // avoid searching for every keystroke
    setSearchTimeout(
      setTimeout(() => {
        setSearchedResults(
          posts.filter(
            (post) =>
              post.name.toLowerCase().includes(searchText.toLowerCase()) ||
              post.prompt.toLowerCase().includes(searchText.toLowerCase())
          )
        );
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Community Showcase
        </h1>
        <p className="mt-2 text-gray-600 text-lg max-w[500px]">
          Browse through a collection of imaginative and visually stunning
          images generated by DALL-E AI 🤖
        </p>
      </div>
      <div className="mt-16">
        <FormField
          label="Search posts"
          type="text"
          name="search-text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-xl text-gray-500  mb-3">
                Showing results for{" "}
                <span className="text-gray-900">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No search result found"
                />
              ) : (
                <RenderCards data={posts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
