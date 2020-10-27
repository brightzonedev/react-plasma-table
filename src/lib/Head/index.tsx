import React from "react";

import "./Head.css";

export type ColumnProps = {
  id: number;
  name: string | number;
  dataKey: string | number;
  component?: (props: any) => JSX.Element;
  sortable?: boolean;
};

interface InvoiceHeader {
  columns: ColumnProps[];
  sort?: (columnName: string | number) => void;
  sortConfig?: {
    key: string | number;
    direction: string;
  } | null;
}

const InvoiceHeader: React.FC<InvoiceHeader> = ({
  columns,
  sort,
  sortConfig,
}) => {
  const onSort = (dataKey: string | number, isSortable) => {
    if (isSortable && sort) {
      sort(dataKey);
    }
  };

  return (
    <div className="plasma-head">
      {columns?.map(({ id, name, dataKey, sortable, ...rest }) => (
        <div className="plasma-head-cell">
          <button
            className="plasma-sort-btn"
            type="button"
            onClick={() => onSort(dataKey, sortable)}
          >
            {name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default InvoiceHeader;
