const GRAPHQL_ENDPOINT = "http://localhost:3000/graphql";
const LOGIN_ENDPOINT = "http://localhost:3000/auth/login";

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

  if (!result.access_token) {
    throw new Error("Login failed");
  }

  return result.access_token;
}
