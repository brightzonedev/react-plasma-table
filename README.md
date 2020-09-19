<p>&nbsp;</p>
<p align='center'>React Plasma Table</p>
<p>&nbsp;</p>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]() [![](https://img.shields.io/npm/dt/react-plasma-table?style=for-the-badge)]()

### React plasma table .

```
yarn add react-plasma-table
```

### How to use

This version only provides a semantic and dynamic table component.

```javascript
import { Table } from "react-plasma-table";
import { format } from "../my-date-formatting-function";

// Define you logic here
const columns = [
  {
    id: 1, // required
    name: "Email", // required
    dataKey: "email", // required
  },
  {
    id: 2, // required
    name: "First name", // required
    dataKey: "first_name", // required
    sortable: true,
  },
  {
    id: 3, // required
    name: "Last name", // required
    dataKey: "last_name", // required
    sortable: true,
  },
  {
    id: 4, // required,
    name: "Birthday", // required
    dataKey: "birthday", // required
    sortable: true,
    component: ({ birthday }) => (
      <>{format(new Date(invoiceDate), "dd.MM.yyyy")}</>
    ),
  },
];

// Defile your sorting icons
const sortUp = () => <SortUpIcon />; // Wrong way: const sortUp = <SortUpIcon />
const sortDown = () => <SortUpIcon />;

const App = () => (
  <Table
    data={data}
    columns={columns}
    sortDownIcon={sortDown}
    sortUpIcon={sortUp}
  />
);
```

## Documentation

The documentation is a work in progress.

- You are free to choose any sorts of sorting icons as long as you pass them down to Table in the form of a component.
- You can pass down custom components to your table rows alongside other children
- You can get all the individual keys as props in your custom component coming from your api.

* Don't worry about the documentation. We're working on it! 😉
