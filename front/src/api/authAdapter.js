const apiBaseUrl = "http://localhost:8080/api/users";

// Helper function to handle the fetch request
async function fetchHelper(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Request failed");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error.message);
    return { error: error.message };
  }
}

// Function to handle user signup
async function signupUser({ username, fullName, email, password, userType, github_repo, github_token }) {
  const payload = { username, fullName, email, password, userType, github_repo, github_token };

  return await fetchHelper(`${apiBaseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// Function to handle user login
async function loginUser({ username, password }) {
  const payload = { username, password };

  return await fetchHelper(`${apiBaseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// Function to retrieve a user by their ID
async function getUserByUserName(userName) {
  return await fetchHelper(`${apiBaseUrl}/user/${userName}`, {
    method: "GET",
  });
}

// Function to update a user by their ID
async function updateUserByUserName(userName, { username, fullName, email, password, userType, github_repo, github_token }) {
  const payload = { username, fullName, email, password, userType, github_repo, github_token };

  return await fetchHelper(`${apiBaseUrl}/user/${userName}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// Function to delete a user by their ID
async function deleteUserByUserName(userName) {
  return await fetchHelper(`${apiBaseUrl}/user/${userName}`, {
    method: "DELETE",
  });
}

// Export functions to use elsewhere
export { signupUser, loginUser, getUserByUserName, updateUserByUserName, deleteUserByUserName };