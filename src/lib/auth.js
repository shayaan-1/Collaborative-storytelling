// lib/auth.js
export async function loginUser(email, password) {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      credentials: 'include', // This ensures the browser sends and accepts cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // You can return user details or message if needed
    return data; // { message, user: { id, email, username, admin } }
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
}


export async function registerUser({ username, email, password }) {
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Registration failed');
  }

  return await res.json();
}
