const baseURL = import.meta.env.VITE_BASE_URL
const GRAPHQL_ENDPOINT = baseURL + '/graphql';
const LOGIN_ENDPOINT = baseURL + '/auth/login';

export async function signUp(username, password) {
  const createUserMutation = `
    mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
        _id
        username
      }
    }
  `;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: createUserMutation,
      variables: { input: { username, password } },
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.createUser;
}

export async function login(username, password) {
  const response = await fetch(LOGIN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result.access_token;
}