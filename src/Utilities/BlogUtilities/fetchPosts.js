import axios from "axios";

export const fetchPosts = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/posts");
    return response.data.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
