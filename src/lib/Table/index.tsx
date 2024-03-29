import React, { Fragment, useState } from "react";

import { useSort } from "../hooks/useSort";
import { useSearch } from "../hooks/useSearch";
import RenderCustomComponents from "../RenderCustomComponents";

export type RowTypes = {
  [key: string]: any;
  subRows?: any[];
};

export type ColumnProps = {
  id: number | string;
  name: string | number;
  dataKey: string | number;
  component?: (props: any) => JSX.Element;
  columnComponent?: (props: any) => JSX.Element;
  sortable?: boolean;
  searchable?: boolean;
  subRowComponent?: (props: any) => JSX.Element;
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
  data = [],
  columns,
  sortUpIcon,
  sortDownIcon,
  searchQuery,
  onRowClick,
}) => {
  const [expandedRows, setExpandedRows] = useState<RowTypes[]>([]);
  const searchColumns = columns
    ?.filter((i) => i?.searchable)
    .map((i) => i?.searchable && i?.dataKey);
  const { filteredData } = useSearch(data, searchQuery, searchColumns);

  const { sortedData, sort, sortConfig } = useSort(
    searchQuery ? filteredData : data
  );

  const onSort = (dataKey: string | number, isSortable) => {
    if (isSortable && sort) {
      sort(dataKey);
    }
  };

  const handleRowClick = (
    event: React.MouseEvent,
    row: RowTypes,
    index: number
  ) => {
    if (onRowClick) {
      onRowClick(event, row, index);
    }
    const isRowExpanded = expandedRows.find((i: RowTypes) => i === row);
    if (isRowExpanded) {
      setExpandedRows((prevRows: RowTypes[]) =>
        prevRows.filter((i: RowTypes) => i !== row)
      );
    }
    if (!isRowExpanded) {
      setExpandedRows((prevRows: RowTypes[]) => [...prevRows, row]);
    }
  };

  return (
    <table className="plasma-table" cellPadding={0} cellSpacing={0}>
      <thead className="plasma-thead">
        <tr className="plasma-header-tr">
          {columns?.map(({ id, name, dataKey, sortable, columnComponent }) => (
            <th className="plasma-th" key={id}>
              <button
                className="plasma-sort-btn"
                type="button"
                onClick={() => onSort(dataKey, sortable)}
              >
                {columnComponent && RenderCustomComponents(columnComponent)}
                {!columnComponent && name}
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
        {sortedData?.map((row: RowTypes, index) => (
          <Fragment key={index}>
            <tr
              className={
                expandedRows?.find((i: RowTypes) => i === row)
                  ? "plasma-tr plasma-tr-open"
                  : "plasma-tr"
              }
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
                  {!component && !row[dataKey] && (
                    <td className="plasma-td"></td>
                  )}
                </Fragment>
              ))}
            </tr>
            {expandedRows?.find((i: RowTypes) => i === row) &&
              row?.subRows?.map((subRow, index) => (
                <tr className="plasma-tr plasma-sub-tr" key={index}>
                  {columns?.map(({ id, dataKey, subRowComponent }) => (
                    <Fragment key={id}>
                      {subRowComponent && (
                        <td className="plasma-td plasma-sub-td">
                          {RenderCustomComponents(
                            subRowComponent,
                            subRow[dataKey],
                            subRow
                          )}
                        </td>
                      )}
                      {!subRowComponent && subRow[dataKey] && (
                        <td className="plasma-td plasma-sub-td">
                          {subRow[dataKey]}
                        </td>
                      )}
                      {!subRowComponent && !subRow[dataKey] && (
                        <td className="plasma-td plasma-sub-td"></td>
                      )}
                    </Fragment>
                  ))}
                </tr>
              ))}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};
