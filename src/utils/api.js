const baseUrl = 'http://localhost:3001';

// Helper function to check the response status
function checkResponse(response) {
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return response.json(); // Parse the response as JSON if OK
}

// Helper function to make requests and apply the response check
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// GET request to fetch all clothing items
export const getItems = async () => {
  return request(`${baseUrl}/items`);
};

// POST request to add a new clothing item
export const addItem = async (name, imageUrl, weather) => {
  return request(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};

// DELETE request to remove a clothing item
export const deleteItem = async (id) => {  
  return request(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
  });
};
