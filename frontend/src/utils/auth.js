export function getLoggedInUser() {
  const userString = localStorage.getItem("user");

  // Check for null or the string "undefined"
  if (!userString || userString === "undefined") return null;

  try {
    return JSON.parse(userString);
  } catch (e) {
    console.error("Failed to parse user from localStorage", e);
    return null;
  }
}
