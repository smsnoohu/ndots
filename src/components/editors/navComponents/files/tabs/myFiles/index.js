import React from "react";

import "./table.scss";

const MyFiles = (props) => {
  return (
    <table className="data-table sort-table">
      <thead>
        <tr>
          <th className="hide-on-collapse">
            <input type="checkbox" name="bulkCheck" id="bulkCheck" />
          </th>
          <th className="desc">Name</th>
          <th className="hide-on-collapse">Owner</th>
          <th>Dot Count</th>
          <th className="hide-on-collapse">Last Opened</th>
          <th className="hide-on-collapse no-sort">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="hide-on-collapse">
            <input type="checkbox" name="bulkCheck" id="bulkCheck" />
          </td>
          <td>All Thesis</td>
          <td className="hide-on-collapse">Me</td>
          <td>25</td>
          <td className="hide-on-collapse">13:45</td>
          <td className="hide-on-collapse">ccc</td>
        </tr>
        <tr>
          <td className="hide-on-collapse">
            <input type="checkbox" name="bulkCheck" id="bulkCheck" />
          </td>
          <td>All Thesis</td>
          <td className="hide-on-collapse">Me</td>
          <td>25</td>
          <td className="hide-on-collapse">13:45</td>
          <td className="hide-on-collapse">ccc</td>
        </tr>
      </tbody>
    </table>
  );
};

export default MyFiles;
