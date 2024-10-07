const baseUrl = 'http://localhost:3001';

// GET request to fetch all clothing items
export const getItems = async () => {
  try {
    const response = await fetch(`${baseUrl}/items`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

// POST request to add a new clothing item
export const addItem = async (name, imageUrl, weather) => {
  try {
    const response = await fetch(`${baseUrl}/items`, {
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
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding item:', error);
  }
};

// DELETE request to remove a clothing item
export const deleteItem = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/items/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return 'Item deleted successfully';
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};
