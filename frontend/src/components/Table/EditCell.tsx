import { MouseEvent } from "react";

export const EditCell = ({ row, table }) => {
  const meta = table.options.meta;

  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
        ...old,
        [row.id]: !old[row.id],
      }
    ));

    if (elName !== "edit") {
      e.currentTarget.name === "cancel" ? 
        meta?.revertData(row.index) : meta?.updateRow(row.index);
    }
  };

  const removeRow = () => {
    meta?.removeRow(row.index);
  };

  return (
    <div className="editCellContainer">
      {meta?.editedRows[row.id] ? (
        <div className="editCellActions">
          <button 
            className="editCellActionsCan" 
            name="cancel" 
            onClick={setEditedRows}> ⚊ </button>
          <button
            className="editCellActionsDon"
            name="done" 
            onClick={setEditedRows}> ✔ </button>
        </div>
      ) : (
        <div className="editCellActions">
          <button className="editCellActionsEdit" name="edit" onClick={setEditedRows}>
            ✐
          </button>
          <button className="editCellActionsDel" name="remove" onClick={removeRow}>
            X
          </button>
        </div>
      )}
      <input
        className="editCelCheckbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        type="checkbox"
      />
    </div>
  );
};
