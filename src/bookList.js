import { useTable, useSortBy, usePagination } from "react-table";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function BookList() {
  const history = useHistory();

  const [data, setData] = useState([]);

  async function delete_book(index) {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      await axios.delete(
        "https://react-demo-library.herokuapp.com/db/books/" + index["id"]
      );

      const result = await axios(
        "https://react-demo-library.herokuapp.com/db/books/"
      );

      setData(result.data);
    }
  }

  function update_book(index) {
    history.push("/update/" + index["id"]);
  }

  useEffect(() => {
    (async () => {
      const result = await axios(
        "https://react-demo-library.herokuapp.com/db/books/"
      );
      setData(result.data);
    })();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Book Name",
        accessor: "book_name",
      },
      {
        Header: "Author",
        accessor: "author",
      },
      {
        Header: "Published Date",
        accessor: "published_date",
      },
      {
        Header: "Genre",
        accessor: "genre",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Popular",
        accessor: "popular",
      },

      {
        Header: "Update",
        Cell: ({ row }) => (
          <div
            className="update-button"
            onClick={() => update_book(row.original)}
          >
            <button>Update</button>
          </div>
        ),
      },
      {
        Header: "Delete",
        Cell: ({ row }) => (
          <div
            className="delete-button"
            onClick={() => delete_book(row.original)}
          >
            <button>Delete</button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, hiddenColumns: ["id"] },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="mt-4">
      <div className="text-center m-auto mb-5">
        All the books in the library!
        <table {...getTableProps()} className="table mt-4 ">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <div>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination pt-4">
          <div className="page">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </button>{" "}
            <button
              id="last"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
            &nbsp;&nbsp;&nbsp; | Go to page:{"     "}
            &nbsp;&nbsp;&nbsp;
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
            &nbsp;&nbsp;&nbsp;
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

export default BookList;
