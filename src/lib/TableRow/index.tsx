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
  children?: JSX.Element;
}

const TableRow = ({ data, columns }) => {
  return (
    <div className="plasma-rows-wrapper">
      {data?.map((row) => (
        <div className="plasma-row">
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

export default TableRow;
