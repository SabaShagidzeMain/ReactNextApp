import axios from "axios";

export async function fetchPost(id) {
  try {
    const response = await axios.get(`https://dummyjson.com/posts/${id}`);
    return response.data || null;
  } catch (error) {
    console.error("Error Fetching The Post", error);
    return null;
  }
}
