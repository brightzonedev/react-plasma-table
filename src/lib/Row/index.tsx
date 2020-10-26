import React, { Fragment } from "react";

import { useSearch } from "../hooks/useSearch";
import RenderCustomComponents from "../RenderCustomComponents";
import "./Row.css";

export type ColumnProps = {
  id: number;
  name: string | number;
  dataKey: string | number;
  component?: (props: any) => JSX.Element;
  sortable?: boolean;
  searchable?: boolean;
};

export interface TableRowProps {
  data: any[];
  columns: ColumnProps[];
  // children?: JSX.Element;
  searchQuery?: string | undefined;
  onRowClick?: (event: React.MouseEvent, row: any, index: number) => any;
}

export const Row = ({ data, columns, searchQuery, onRowClick }) => {
  const searchColumns = columns
    ?.filter((i: ColumnProps) => i?.searchable)
    .map((i: ColumnProps) => i?.searchable && i?.dataKey);
  const { filteredData } = useSearch(data, searchQuery, searchColumns);

  const handleRowClick = (event: React.MouseEvent, row, index: number) => {
    if (onRowClick) {
      onRowClick(event, row, index);
    }
  };

  return (
    <div className="plasma-rows-wrapper">
      {filteredData?.map((row, index: number) => (
        <div
          key={index}
          className="plasma-row"
          onClick={(e) => handleRowClick(e, row, index)}
        >
          {columns?.map(({ id, dataKey, component }) => (
            <Fragment key={id}>
              {component && (
                <div className="plasma-row-cell">
                  {RenderCustomComponents(component, row[dataKey], row)}
                </div>
              )}
              {!component && row[dataKey] && (
                <div className="plasma-row-cell">{row[dataKey]}</div>
              )}
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};
