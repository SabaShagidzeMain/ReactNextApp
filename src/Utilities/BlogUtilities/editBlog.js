export const loadPost = (id) => {
  const localPosts = JSON.parse(localStorage.getItem("localPosts")) || [];
  return localPosts.find((post) => post.id === Number(id));
};

export const fetchLocalPost = async (id, fetchPost) => {
  const localPost = loadPost(id);
  if (localPost) {
    return localPost;
  } else {
    try {
      const fetchedPost = await fetchPost(id);
      return fetchedPost || null;
    } catch {
      throw new Error("Error fetching post.");
    }
  }
};

export const updateLocalStorage = (updatedPost) => {
  const localPosts = JSON.parse(localStorage.getItem("localPosts")) || [];
  const updatedLocalPosts = localPosts.map((p) =>
    p.id === updatedPost.id ? updatedPost : p
  );
  localStorage.setItem("localPosts", JSON.stringify(updatedLocalPosts));
};
