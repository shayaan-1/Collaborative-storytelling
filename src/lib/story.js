export async function createStory({ title, genre, content, thumbnail }) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('genre', genre);
  formData.append('content', content);
  if (thumbnail) {
    formData.append('thumbnail', thumbnail);
  }

  const res = await fetch('/api/story/create', {
    method: 'POST',
    body: formData, // no need to set Content-Type, browser sets it automatically
    credentials: 'include'    // no duplex needed when sending FormData
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to create story');
  }

  return data;
}
