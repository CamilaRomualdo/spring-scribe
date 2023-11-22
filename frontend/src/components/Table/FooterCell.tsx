export const FooterCell = ({ table }) => {
  const meta = table.options.meta;
  const selectedRows = table.getSelectedRowModel().rows;

  const removeRows = () => {
    meta.removeSelectedRows(
      table.getSelectedRowModel().rows.map((row: any) => row.index)
    );
    table.resetRowSelection();
  };

  return (
    <div className="footerCellContainer">
      {selectedRows.length > 0 && (
        <button className="footerCellRemoveBtn" onClick={removeRows}>
          Remove Selected
        </button>
      )}
    </div>
  );
};
