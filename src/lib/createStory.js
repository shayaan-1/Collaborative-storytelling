export async function createStoryBackend(storyData) {
  const res = await fetch(`/api/createStory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(storyData),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Failed to create story');
  }

  return res.json();
}