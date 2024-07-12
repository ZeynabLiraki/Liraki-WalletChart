import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Table = ({ data, columns, rowsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const navigate = useNavigate();
  const totalPages = Math.ceil(data?.length / rowsPerPage);

  const handleClick = (event, page) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];
        if (valueA < valueB) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const selectedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  const handleShow = (record) => {
    navigate("/detail", { state: record });
  };

  return (
    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                onClick={() => handleSort(column.accessor)}
              >
                {column.header}{" "}
                {sortConfig.key === column.accessor
                  ? sortConfig.direction === "ascending"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedData.map((item, index) => (
            <tr
              style={{ cursor: "pointer" }}
              key={index}
              onClick={() => handleShow(item)}
            >
              {columns.map((column) => (
                <td key={`${index}-${column.accessor}`}>
                  {item[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={(e) => handleClick(e, i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;
