import React, { Fragment } from "react";

import { useSort } from "../hooks/useSort";
import { useSearch } from "../hooks/useSearch";
import RenderCustomComponents from "../RenderCustomComponents";

type ColumnProps = {
  id: number;
  name: string | number;
  dataKey: string | number;
  component?: (props: any) => JSX.Element;
  sortable?: boolean;
  searchable?: boolean;
}[];

export interface TableProps {
  data: any[];
  columns: ColumnProps;
  sortUpIcon?: (props: any) => JSX.Element;
  sortDownIcon?: (props: any) => JSX.Element;
  searchQuery?: string | undefined;
  onRowClick?: (event: React.MouseEvent, row: any, index: number) => any;
}
export const Table: React.FC<TableProps> = ({
  data,
  columns,
  sortUpIcon,
  sortDownIcon,
  searchQuery,
  onRowClick,
}) => {
  const searchColumns = columns
    ?.filter((i) => i?.searchable)
    .map((i) => i?.searchable && i?.dataKey);
  const { filteredData } = useSearch(data, searchQuery, searchColumns);

  const { sortedData, sort, sortConfig } = useSort(
    searchQuery ? filteredData : data
  );

  const onSort = (dataKey, isSortable) => {
    if (isSortable && sort) {
      sort(dataKey);
    }
  };

  const handleRowClick = (event: React.MouseEvent, row, index: number) => {
    if (onRowClick) {
      onRowClick(event, row, index);
    }
  };

  return (
    <table className="plasma-table" cellPadding={0} cellSpacing={0}>
      <thead className="plasma-thead">
        <tr className="plasma-header-tr">
          {columns?.map(({ id, name, dataKey, sortable, ...rest }) => (
            <th className="plasma-th" key={id}>
              <button
                className="plasma-sort-btn"
                type="button"
                onClick={() => onSort(dataKey, sortable)}
              >
                {name}
                <span className="plasma-sort-icon">
                  {sortDownIcon &&
                    sortConfig?.direction === "ascending" &&
                    sortConfig?.key === dataKey &&
                    RenderCustomComponents(sortDownIcon)}
                </span>
                <span className="plasma-sort-icon">
                  {sortUpIcon &&
                    sortConfig?.direction === "descending" &&
                    sortConfig?.key === dataKey &&
                    RenderCustomComponents(sortUpIcon)}
                </span>
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="plasma-body">
        {sortedData?.map((row, index) => (
          <tr
            className="plasma-tr"
            key={index}
            onClick={(e) => handleRowClick(e, row, index)}
          >
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
