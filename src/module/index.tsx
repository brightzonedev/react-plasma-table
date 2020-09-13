import React from "react";
// import "../../App.css";
import Table from "../lib/Table";

const columns = [
  {
    id: 1,
    name: "id",
    dataKey: "invoiceId",
  },
  {
    id: 2,
    name: "name",
    dataKey: "name",
  },
];

const data = [
  {
    invoiceId: 66,
    name: "John Smith",
  },
  {
    invoiceId: 26,
    name: "Jane Doe",
  },
];

function App() {
  return (
    <div className="App">
      <Table data={data} columns={columns} semantic />
    </div>
  );
}

export default App;
