import React from "react";

function Sort({ sort, onSortFiles }) {
  return (
    <div>
      <select
        value={sort}
        onChange={(e) => onSortFiles(e.target.value)}
        className="cursor-pointer disk__select"
      >
        <option value="name">Name</option>
        <option value="type">Type</option>
        <option value="date">Date</option>
      </select>
    </div>
  );
}

export default Sort;
