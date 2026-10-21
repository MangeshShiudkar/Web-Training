
const API_URL = "http://localhost:3000/users";

export async function fetchUsers() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export async function createUser(newUser) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return response.json();
}


export async function deleteUser(userId) {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
  return response.json();
}

