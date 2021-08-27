import React from "react";

import { Checkbox, Button } from "../../../../../";
import { useMyFiles } from "../../../../../../hooks";

const MyFiles = (props) => {
  const { fileState, fileActions } = useMyFiles();

  const { tableData, sortedColumn, sortingOrder } = fileState;
  const { updateCheckbox, sortColumn } = fileActions;
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th className="hide-on-collapse">
            <Checkbox className="m-0" name="bulkCheck" id="bulkCheck" />
          </th>
          <th
            data-toggle="sort"
            onClick={() => sortColumn("name")}
            className={`${sortedColumn === "name" && sortingOrder}`}
          >
            Name
          </th>
          <th
            data-toggle="sort"
            onClick={() => sortColumn("owner")}
            className={`hide-on-collapse ${
              sortedColumn === "owner" && sortingOrder
            }`}
          >
            Owner
          </th>
          <th
            data-toggle="sort"
            onClick={() => sortColumn("dotCount")}
            className={`${sortedColumn === "dotCount" && sortingOrder}`}
          >
            Dot Count
          </th>
          <th
            data-toggle="sort"
            onClick={() => sortColumn("lastOpened")}
            className={`hide-on-collapse ${
              sortedColumn === "lastOpened" && sortingOrder
            }`}
          >
            Last Opened
          </th>
          <th className="hide-on-collapse">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tableData &&
          tableData.length &&
          tableData.map((data) => (
            <tr key={data.id}>
              <td className="hide-on-collapse">
                <Checkbox
                  className="m-0"
                  name={data.id}
                  id={data.id}
                  checked={data.isChecked}
                  onChange={() => updateCheckbox(data.id)}
                />
              </td>
              <td>{data.name}</td>
              <td className="hide-on-collapse">{data.owner}</td>
              <td>{data.dotCount}</td>
              <td className="hide-on-collapse">{data.lastOpened}</td>
              <td className="hide-on-collapse">
                <Button kind="secondary" icon="edit" />
                <Button kind="danger" icon="trash" disabled={!data.isChecked} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default MyFiles;
