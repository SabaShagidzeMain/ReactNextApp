export const normalizePosts = (savedPosts, fetchedPosts) => {
  const allPosts = [...savedPosts, ...fetchedPosts];
  const usedIds = new Set();

  return allPosts.map((post) => {
    let id = post.id;
    while (usedIds.has(id)) {
      id += 1;
    }
    usedIds.add(id);
    return { ...post, id };
  });
};

// Function to load posts from localStorage
export const loadSavedPosts = () =>
  JSON.parse(localStorage.getItem("localPosts")) || [];

// Function to add a new post to localStorage
export const addPostToLocalStorage = (posts) => {
  localStorage.setItem("localPosts", JSON.stringify(posts));
};

// Function to fetch and update posts with error handling
export const fetchAndUpdatePosts = async (
  setPosts,
  setIsLoading,
  fetchPosts
) => {
  try {
    const savedPosts = loadSavedPosts();
    const fetchedPosts = await fetchPosts();
    const normalizedPosts = normalizePosts(savedPosts, fetchedPosts);

    setPosts(normalizedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    setIsLoading(false); 
  }
};

// Function to handle deleting a post
export const handleDeletePost = async (
  id,
  setPosts,
  apiPost,
  setPostToDelete
) => {
  setPosts((prev) => {
    const updatedPosts = prev.filter((element) => element.id !== id);
    addPostToLocalStorage(updatedPosts);
    return updatedPosts;
  });

  try {
    await apiPost(id, "DELETE");
  } catch (error) {
    console.error("Error deleting post:", error);
  } finally {
    setPostToDelete(null);
  }
};

// Function to handle adding a new post
export const handleAddNewPost = (newPost, setPosts) => {
  setPosts((prevPosts) => {
    const newId =
      prevPosts.length > 0
        ? Math.max(...prevPosts.map((post) => post.id)) + 1
        : 1;
    const updatedPosts = [{ ...newPost, id: newId }, ...prevPosts];
    addPostToLocalStorage(updatedPosts);
    return updatedPosts;
  });
};
