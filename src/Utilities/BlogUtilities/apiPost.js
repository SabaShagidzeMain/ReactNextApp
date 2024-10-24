export async function apiPost(obj, meth) {
  const url = "https://dummyjson.com/posts";

  try {
    const response = await fetch(url, {
      method: meth,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Object successfully sent:", result);
    } else {
      console.error("IMMITATION OF REQUEST SENDING:", response.statusText);
    }
  } catch (error) {
    console.error("JUST AN IMMITATION", error);
  }
}
