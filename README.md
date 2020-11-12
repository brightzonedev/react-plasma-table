<p>&nbsp;</p>
<p align='center'>React Plasma Table</p>
<p>&nbsp;</p>

[![](https://img.shields.io/npm/dt/react-plasma-table?style=for-the-badge)]()

### React plasma table

- ✅ Super simple and intuitive API
- ✅ Semantically opinionated rendered tables vs modern customizeable tables - the choice is yours
- ✅ Perfect for small and large projects
- ✅ Written in Typescript
- ✅ Sortable out of the box
- ✅ Searchable (✨ New! ✨)
- ✅ Now with pagination (✨ New! ✨)
- ✅ Collapsable (✨ New! - In development ✨)

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
         You'll have access to the entire row object
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

## Examples

- [Table bare bones example with no styling](https://codesandbox.io/s/fervent-easley-z1jei)
- [Pagination example](https://codesandbox.io/s/thirsty-edison-sz5bd)

## API

The documentation is still a work in progress.

### `Table`:

#### props

- `data` (required): `array of objects`
- `columns` (required): `array of objects` => `{ id: number (required) name: string or number (required) - what you see in the table head dataKey: string or number (required) - the key of the data object to connet to component: JSX element (optional) sortable: boolean (optional) searchable: boolean (optional) }`
- `sortUpIcon` (optional): `JSX element`
- `sortDownIcon` (optional): `JSX element`
- `searchQuery` (optional): `string or undefined`
- `onRowClick`(optional): `function(event, row, index)`

- 💡 You can pass down custom components to your table rows alongside other children
- 💡 You can get all the individual keys as props in your custom component coming from your api.

## Roadmap

- Search (done)
- Pagination (done)
- Collapsable rows (In development)
- Selection
- PDF, CSV and Excel exporting
- Examples
