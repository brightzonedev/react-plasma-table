import React, { Fragment } from "react";

// import Header from "../Header";
// import Row from "../Row";
import useSort from "../hooks/useSort";
import RenderCustomComponents from "../RenderCustomComponents";

type column = {
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

interface Table {
  data: any;
  columns: {
    id: number;
    name: string | number;
    dataKey: string | number;
    component?: (props: any) => JSX.Element;
    sortable?: boolean;
  }[];
  customLogic?: boolean;
  sort?: (columnName: string | number) => void;
  sortConfig?: sortConfig;
  semantic?: boolean;
  children?: JSX.Element;
}
const Table: React.FC<Table> = ({
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
        <thead className="plasma-table-head">
          {columns?.map((c) => (
            <th className="plasma-head">
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
            <tr className="plasma-row" key={index}>
              {columns?.map(({ id, dataKey, component }) => (
                <Fragment key={id}>
                  {component && (
                    <td className="plasma-cell">
                      {RenderCustomComponents(component, row[dataKey], row)}
                    </td>
                  )}
                  {!component && row[dataKey] && <td>{row[dataKey]}</td>}
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

  return null;
  // return (
  //   <>
  //     <Header columns={columns} sort={sort} sortConfig={sortConfig} />
  //     <Row data={sortedData} columns={columns} />
  //     {children}
  //   </>
  // );
};

export default Table;
