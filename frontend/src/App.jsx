// import React from "react";
import FamilyTable from "./component/FamilyTable";

function App() {
  return (
    <div>
      <FamilyTable />
    </div>
  );
}

export default App;

//--------------FRONTEND-------------

//My FamilyTable renders table with family members. When component mounts(useEffect) with fetchData send a Get request to /api endpoint on the server to fetch family members data. If its successfull, the data is displayed in the table.

//When im adding new members and click on "add" im triggering the "handleAdd" function. The function sends a post request to the api/add endpoint in my server. It adds the new memebers data in the request body, If the request post is successful the server respond with new members data that is displayed.

//when editing members and cliking on save button im triggering handleSave and saving existing family members data its sending a put request to the /api/update/id endpoint when clicking on "save" button.

//I can delete family members by by triggering my handleDelete function sending a delete request to the api/delete/id enpoint when clicking on the "delete" button.

//--------------BACKEND-------------

//My node.js server listen for request. My server contains different endpoints that my frontend interact with.

//When my server gets requests and the database operation is successful the server respond with the data. If there is an error during the operation the server respond with an error message
