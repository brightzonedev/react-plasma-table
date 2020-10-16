<p>&nbsp;</p>
<p align='center'>React Plasma Table</p>
<p>&nbsp;</p>

[![](https://img.shields.io/npm/dt/react-plasma-table?style=for-the-badge)]()

### React plasma table

- ✅ Super simple and intuitive API
- ✅ Semantically opinionated rendered tables vs modern customizeable tables (Not available yet) - the choice is yours
- ✅ Perfect for small and large projects
- ✅ Written in Typescript
- ✅ Sortable out of the box
- ✅ Searchable (✨ New! ✨)
- ✅ Now with pagination (✨ New! ✨)

```
yarn add react-plasma-table
```

### How to use

This version only provides a semantic and dynamic table component.

```javascript
import React, { useState } from "react";
import { Table, usePaginate } from "react-plasma-table";
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
  const {
    goNext, // function()
    goPrev, // function()
    goToPage, // function(page number)
    currentData,
    currentPage,
    lastPage,
  } = usePaginate(data, 5);
  return (
    <>
      <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
      <Table
        data={data}
        // When using pagination then pass data={currentData}
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

- [Bare bones example with no styling](https://codesandbox.io/s/fervent-easley-z1jei)

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
- Collapsable rows
- Selection
- PDF, CSV and Excel exporting
- Examples

### Version 1.0.0

We have included a custom pagination hook that allows you to add it to your own or any third party pagination logic, that can be placed anywhere on the page as it won't be bound to the Table component.

### Version 0.8.0

This version adds a global filtering feature to easily search for any data from any column you define yourself to be searchable.
