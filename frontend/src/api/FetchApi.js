// API endpoints making request to the server, they interact with the servers API endpoints
//----------------------

//fetches data from the server. Sends a GET request to api and json response
export const fetchData = async () => {
  try {
    const response = await fetch("/api");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    //return json response
    return await response.json();
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
};

//ADD a new entry to the server API sends POST request to api/add
export const addEntry = async (newEntry) => {
  try {
    const response = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry), // new entry to json
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    //return the json
    return await response.json();
  } catch (error) {
    throw new Error("Error adding entry: " + error.message);
  }
};

//UPDATE existing entry. Sends a PUT request to api/update/:id and id is replaced with entry ID
export const updateEntry = async (id, updatedEntry) => {
  try {
    const response = await fetch(`/api/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      //update entry to json
      body: JSON.stringify(updatedEntry),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    //return the json response
    return await response.json();
  } catch (error) {
    throw new Error("Error updating entry: " + error.message);
  }
};

//DELETE entry from server API
//sends delete request to api/delete/:id
export const deleteEntry = async (id) => {
  try {
    const response = await fetch(`/api/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    //return json response
    return await response.json();
  } catch (error) {
    throw new Error("Error deleting entry: " + error.message);
  }
};
