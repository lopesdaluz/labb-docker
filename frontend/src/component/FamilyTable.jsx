import { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchData, addEntry, updateEntry, deleteEntry } from "../api/FetchApi";

function FamilyTable() {
  const [data, setData] = useState([]);
  const [newEntry, setNewEntry] = useState({ name: "", age: "" });
  const [editId, setEditId] = useState(null);

  //fetching data from the backend when component mounts
  useEffect(() => {
    fetchData()
      .then((data) => {
        console.log("Data from backend:", data);
        setData(data);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  //adding new family members to the family list
  const handleAdd = () => {
    addEntry(newEntry)
      .then((updatedData) => {
        setData(updatedData);
        setNewEntry({ name: "", age: "" });
      })
      .catch((error) => console.error("Error adding entry:", error));
  };

  //edit
  const handleEdit = (id) => {
    setEditId(id);
  };

  //saving changes that are made with edit
  const handleSave = () => {
    if (editId !== null) {
      updateEntry(editId, newEntry)
        .then((updatedData) => {
          setData(updatedData);
          setEditId(null);
        })
        .catch((error) => console.error("Error updating entry:", error));
    }
  };

  //deleting family memebers from the list
  const handleDelete = (id) => {
    deleteEntry(id)
      .then((updatedData) => {
        setData(updatedData);
      })
      .catch((error) => console.error("Error deleting entry:", error));
  };

  return (
    <Container>
      <h1>Family Lopes Da Luz</h1>
      <DataTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Family members</th>
            <th>Age</th>
            <th>Changes</th>
          </tr>
        </thead>
        <tbody>
          {/*loop through data */}
          {data.map((item) => (
            <tr key={item.id}>
              {" "}
              {/*displays items ID */}
              <td>{item.id}</td>
              <td>
                {/*if edit, display input field */}
                {editId === item.id ? (
                  <input
                    type="text"
                    value={newEntry.name}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, name: e.target.value })
                    }
                  />
                ) : (
                  item.name // otherwise, display item name
                )}
              </td>
              <td>
                {/*if edit, display input field */}
                {editId === item.id ? (
                  <input
                    type="text"
                    value={newEntry.age}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, age: e.target.value })
                    }
                  />
                ) : (
                  item.age // otherwise, display item name
                )}
              </td>
              <td>
                {/*if edit, display a "save" button */}
                {editId === item.id ? (
                  <button onClick={handleSave}>Save</button> //calling handleSave function
                ) : (
                  // otherwise display "edit" and "delete" buttons
                  <EditDeleteButtons>
                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </EditDeleteButtons>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </DataTable>
      {/*input field for name and age  */}
      <InputFields>
        <input
          type="text"
          placeholder="Name"
          value={newEntry.name}
          onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Age"
          value={newEntry.age}
          onChange={(e) => setNewEntry({ ...newEntry, age: e.target.value })}
        />
        {/*Calling handleAdd function */}
        <button onClick={handleAdd}>Add</button>
      </InputFields>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  margin: 20px;
  background-color: #fff;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;

  th,
  td {
    border: 1px solid #ccc;
    padding: 5px;
  }

  th {
    background-color: #a49a9a;
  }
`;

const InputFields = styled.div`
  margin: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
  input {
    font-size: 10px;
    padding: 10px;
  }
`;

const EditDeleteButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

export default FamilyTable;
