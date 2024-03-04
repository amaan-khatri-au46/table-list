import TableDelete from "./TableDelete";
import { TableListForm } from "./TableListForm";
import { TableListing } from "./TableListing";

export const TableList = () => {
  return (
    <div>
      <TableDelete />
      <TableListForm />
      <TableListing />
    </div>
  );
};
