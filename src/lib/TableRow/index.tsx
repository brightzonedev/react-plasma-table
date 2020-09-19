import React, { Fragment } from "react";

import RenderCustomComponents from "../RenderCustomComponents";

type ColumnProps = {
  id: number;
  name: string | number;
  dataKey: string | number;
  component?: (props: any) => JSX.Element;
  sortable?: boolean;
}[];

export interface TableRowProps {
  data: any[];
  columns: ColumnProps;
  // children?: JSX.Element;
  onRowClick?: (event: React.MouseEvent, row: any, index: number) => any;
}

export const TableRow = ({ data, columns, onRowClick }) => {
  const handleRowClick = (event: React.MouseEvent, row, index: number) => {
    if (onRowClick) {
      onRowClick(event, row, index);
    }
  };

  return (
    <div className="plasma-rows-wrapper">
      {data?.map((row, index) => (
        <div
          key={index}
          className="plasma-row"
          onClick={(e) => handleRowClick(e, row, index)}
          style={{ display: "flex" }}
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
