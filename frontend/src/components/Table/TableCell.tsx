import { useState, useEffect, ChangeEvent } from "react";

export const TableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();

  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;

  const [value, setValue] = useState(initialValue);
  const [validationMessage, setValidationMessage] = useState<string>("");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    displayValidationMessage(e);
    tableMeta?.updateData(row.index, column.id, value, e.target.validity.valid);
  };

  const displayValidationMessage = 
    <T extends HTMLInputElement | HTMLSelectElement>(e: ChangeEvent<T>) => {
      if (columnMeta?.validate) {
        const isValid = columnMeta.validate(e.target.value);
        if (isValid) {
          e.target.setCustomValidity("");
          setValidationMessage("");
        } else {
          e.target.setCustomValidity(columnMeta.validationMessage);
          setValidationMessage(columnMeta.validationMessage);
        }
      } else if (e.target.validity.valid) {
        setValidationMessage("");
      } else {
        setValidationMessage(e.target.validationMessage);
      }
  };

  if (tableMeta?.editedRows[row.id]) {
    return <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      type={columnMeta?.type || "text"}
      required={columnMeta?.required}
      pattern={columnMeta?.pattern}
      title={validationMessage}
    />
  }

  return <span>{value}</span>;
};
