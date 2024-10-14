import axios from "axios";

export async function fetchPosts() {
  try {
    const response = await axios.get("https://dummyjson.com/posts");
    return response.data.posts || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}
