import { createContext, useContext } from "react";

// Table Context for managing column configuration
const TableContext = createContext();

function Table({ columns, children }) {
  // console.log(columns);

  return (
    <TableContext.Provider value={{ columns }}>
      <div
        className="border border-gray-200 bg-gray-50 rounded-lg overflow-hidden m-2"
        role="table"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      style={{ gridTemplateColumns: columns }}
      className="grid gap-x-6 items-center px-6 py-4 bg-gray-50 border-b border-gray-100 uppercase tracking-wide font-semibold text-gray-600"
      role="row"
    >
      {children}
    </div>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      style={{ gridTemplateColumns: columns }}
      className="grid gap-x-6 items-center px-6 py-3 border-b last:border-b-0 border-gray-100"
      role="row"
    >
      {children}
    </div>
  );
}

function Body({ data, render }) {
  if (!data.length)
    return (
      <p className="text-center text-gray-600 font-medium text-lg my-6">
        Currently no data
      </p>
    );

  return <section className="my-1">{data.map(render)}</section>;
}

function Footer({ children }) {
  return (
    <footer
      className={`bg-gray-50 flex justify-center items-center px-4 py-3 ${
        children ? "block" : "hidden"
      }`}
    >
      {children}
    </footer>
  );
}

// Assigning subcomponents to Table
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
