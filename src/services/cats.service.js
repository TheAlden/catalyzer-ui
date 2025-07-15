const backend = 'http://localhost:3000/graphql';

// Get All Cats
export async function getCats() {
  const query = `
    query {
      cats {
        _id
        name
        age
        color
      }
    }
  `;

  const response = await fetch(backend, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors.map(e => e.message).join(', '));
  }

  return result.data.cats;
}

// Get a Specific Cat by ID
export async function getCat(catId) {
  const query = `
    query GetCat($id: String!) {
      cat(id: $id) {
        _id
        name
        age
        color
      }
    }
  `;

  const variables = { id: catId };

  const response = await fetch(backend, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors.map(e => e.message).join(', '));
  }

  return result.data.cat;
}

// Add a Cat
export async function addCat(catInput) {
  const mutation = `
    mutation CreateCat($createCatDto: CreateCatDto!) {
      createCat(createCatDto: $createCatDto) {
        _id
        name
        age
        color
      }
    }
  `;

  const variables = {
    createCatDto: {
      name: catInput.name,
      age: parseInt(catInput.age), // Ensure it's a number
      color: catInput.color,
    },
  };

  const response = await fetch(backend, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors.map(e => e.message).join(', '));
  }

  return result.data.createCat;
}

// Remove a Cat by ID
export async function removeCat(catId) {
  const mutation = `
    mutation DeleteCat($id: String!) {
      deleteCat(id: $id) {
        _id
        name
        age
        color
      }
    }
  `;

  const variables = { id: catId };

  const response = await fetch(backend, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors.map(e => e.message).join(', '));
  }

  return result.data.deleteCat;
}

// Update a Cat by ID
export async function updateCat(id, catInput) {
  const mutation = `
    mutation UpdateCat($id: String!, $updateCatDto: UpdateCatDto!) {
      updateCat(id: $id, updateCatDto: $updateCatDto) {
        _id
        name
        age
        color
      }
    }
  `;

  const variables = {
    id: id,
    updateCatDto: {
      name: catInput.name,
      age: parseInt(catInput.age), // Ensure it's a number
      color: catInput.color,
    },
  };

  const response = await fetch(backend, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors.map((e) => e.message).join(', '));
  }

  return result.data.updateCat;
}

