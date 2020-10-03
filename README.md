<p>&nbsp;</p>
<p align='center'>React Plasma Table</p>
<p>&nbsp;</p>

[![](https://img.shields.io/npm/dt/react-plasma-table?style=for-the-badge)]()

### React plasma table

- ✅ Simple and intuitive API
- ✅ Semantically opinionated rendered tables vs modern customizeable tables (Not available yet) - the choice is yours
- ✅ Perfect for small and large projects and 100% not an overkill!
- ✅ Sortable out of the box
- ✅ Searchable (✨ New! ✨)

```
yarn add react-plasma-table
```

### How to use

This version only provides a semantic and dynamic table component.

```javascript
import React, { useState } from "react";
import { Table } from "react-plasma-table";
import { format } from "../my-date-formatting-function";

// Define you logic here
const columns = [
  {
    id: 1, // required
    name: "Email", // required
    dataKey: "email", // required
    searchable: true,
  },
  {
    id: 2, // required
    name: "First name", // required
    dataKey: "first_name", // required
    sortable: true,
    searchable: true,
  },
  {
    id: 3, // required
    name: "Last name", // required
    dataKey: "last_name", // required
    sortable: true,
    searchable: true,
  },
  {
    id: 4, // required,
    name: "Birthday", // required
    dataKey: "birthday", // required
    sortable: true,
    component: ({ birthday, ...rest }) => (
      <>{format(new Date(birthday), "dd.MM.yyyy")}</>
    ),
  },
];

// Defile your sorting icons
const sortUp = () => <SortUpIcon />; // Wrong way: const sortUp = <SortUpIcon />
const sortDown = () => <SortUpIcon />;

const onRowClick = (event, row, index) => {
  /* === You'll have access to the event in case you need it
         You'll have access to the entier row object
         You'll have access to the index of the row starting with 0 === */
  // Your row click handling logic here
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
      <Table
        data={data}
        columns={columns}
        sortDownIcon={sortDown}
        sortUpIcon={sortUp}
        searchQuery={searchQuery}
        onRowClick={(event, row, index) => onRowClick(event, row, index)}
      />
    </>
  );
};
```

## Documentation

The documentation is still a work in progress.

- 💡 You are free to choose any sorting icons you wish, as long as you pass them down to Table in the form of a component.
- 💡 You can pass down custom components to your table rows alongside other children
- 💡 You can get all the individual keys as props in your custom component coming from your api.

## Roadmap

- Search (done)
- Pagination
- Collapsable rows
- Selection
- PDF, CSV and Excel exporting

### Version 0.8.0

This version adds a global filtering feature to easily search for any data from any column you define yourself to be searchable.
