// fetchPosts.js
export const fetchPosts = async () => {
  try {
    const response = await fetch("API_ENDPOINT"); // Replace with actual API endpoint
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return an empty array to avoid breaking the app
  }
};
