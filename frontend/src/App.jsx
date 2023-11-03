import { useState, useEffect } from "react";
import styled from "styled-components";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data från backend:", data);
        setData(data);
      })
      .catch((error) => console.error("Fel vid hämtning av data:", error));
  }, []);

  return (
    <Container>
      <h1>Family Lopes Da luz</h1>
      <DataTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Namn</th>
            <th>Ålder</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  margin: 20px;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
  }
`;

export default App;
