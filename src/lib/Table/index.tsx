import React, { Fragment } from "react";

import TableRow from "../TableRow";
import TableHead from "../TableHead";
import useSort from "../hooks/useSort";
import RenderCustomComponents from "../RenderCustomComponents";

type ColumnProps = {
  id: number;
  name: string | number;
  dataKey: string | number;
  component?: (props: any) => JSX.Element;
  sortable?: boolean;
}[];

type sortConfig = {
  key: string;
  direction: string;
} | null;

export interface TableProps {
  data: any[];
  columns: ColumnProps;
  customLogic?: boolean;
  // sort?: (columnName: string | number) => void;
  // sortConfig?: sortConfig;
  semantic?: boolean;
  children?: JSX.Element;
}
export const Table: React.FC<TableProps> = ({
  data,
  columns,
  customLogic = false,
  semantic,
  children,
}) => {
  const { sortedData, sort, sortConfig } = useSort(data);

  console.log("sort sortConfig: ", sortConfig);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  if (semantic) {
    return (
      <table className="plasma-table" cellPadding={0} cellSpacing={0}>
        <thead className="plasma-thead">
          {columns?.map((c) => (
            <th className="plasma-th">
              <button
                className="plasma-sort-btn"
                type="button"
                onClick={() => sort(c?.dataKey)}
              >
                {c?.name}
              </button>
            </th>
          ))}
        </thead>
        <tbody className="plasma-body">
          {data?.map((row, index) => (
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
  }

  if (customLogic) {
    return <>{children}</>;
  }

  return (
    <>
      <TableHead columns={columns} sort={sort} sortConfig={sortConfig} />
      <TableRow data={sortedData} columns={columns} />
      {children}
    </>
  );
};
