import React, { Fragment } from "react";

// import TableRow from "../TableRow";
// import TableHead from "../TableHead";
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
  children?: JSX.Element;
}
export const Table: React.FC<TableProps> = ({
  data,
  columns,
  children,
}) => {
  const { sortedData, sort, sortConfig } = useSort(data);

  console.log("sort sortConfig: ", sortConfig);
  // const getClassNamesFor = (name) => {
  //   if (!sortConfig) {
  //     return;
  //   }
  //   // eslint-disable-next-line consistent-return
  //   return sortConfig.key === name ? sortConfig.direction : undefined;
  // };

  const onSort = (dataKey, isSortable) => {
    if (isSortable && sort) {
      sort(dataKey);
    }
  };

  return (
    <table className="plasma-table" cellPadding={0} cellSpacing={0}>
      <thead className="plasma-thead">
        {columns?.map(({ id, name, dataKey, sortable, ...rest }) => (
          <th className="plasma-th" {...rest}>
            <button
              className="plasma-sort-btn"
              type="button"
              onClick={() => onSort(dataKey, sortable)}
            >
              {name}
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

  // if (customLogic) {
  //   return <>{children}</>;
  // }

  // return (
  //   <>
  //     <TableHead columns={columns} sort={sort} sortConfig={sortConfig} />
  //     <TableRow data={sortedData} columns={columns} />
  //     {children}
  //   </>
  // );
};
