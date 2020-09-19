import React, { Fragment } from "react";

import useSort from "../hooks/useSort";
import RenderCustomComponents from "../RenderCustomComponents";

type ColumnProps = {
  id: number;
  name: string | number;
  dataKey: string | number;
  component?: (props: any) => JSX.Element;
  sortable?: boolean;
}[];

export interface TableProps {
  data: any[];
  columns: ColumnProps;
  sortUpIcon?: (props: any) => JSX.Element;
  sortDownIcon?: (props: any) => JSX.Element;
}
export const Table: React.FC<TableProps> = ({
  data,
  columns,
  sortUpIcon,
  sortDownIcon,
}) => {
  const { sortedData, sort, sortConfig } = useSort(data);

  const onSort = (dataKey, isSortable) => {
    if (isSortable && sort) {
      sort(dataKey);
    }
  };

  return (
    <table className="plasma-table" cellPadding={0} cellSpacing={0}>
      <thead className="plasma-thead">
        {columns?.map(({ id, name, dataKey, sortable, ...rest }) => (
          <th className="plasma-th" key={id} {...rest}>
            <button
              className="plasma-sort-btn"
              type="button"
              onClick={() => onSort(dataKey, sortable)}
            >
              {name}
              {sortDownIcon &&
                sortConfig?.direction === "ascending" &&
                sortConfig?.key === dataKey &&
                RenderCustomComponents(sortDownIcon)}
              {sortUpIcon &&
                sortConfig?.direction === "descending" &&
                sortConfig?.key === dataKey &&
                RenderCustomComponents(sortUpIcon)}
            </button>
          </th>
        ))}
      </thead>
      <tbody className="plasma-body">
        {sortedData?.map((row, index) => (
          <tr className="plasma-tr" key={index}>
            {columns?.map(({ id, dataKey, component }) => (
              <Fragment key={id}>
                {component && (
                  <td className="plasma-td">
                    {RenderCustomComponents(component, row[dataKey], row)}
                  </td>
                )}
                {!component && row[dataKey] && (
                  <td className="plasma-td">{row[dataKey]}</td>
                )}
              </Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
