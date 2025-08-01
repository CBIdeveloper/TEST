import React from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy } from 'react-table';
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

import './Table.scss';

function useRowSpanHeader(instance) {
  const { allColumns } = instance;

  let rowSpanHeaders = [];

  allColumns.forEach((column) => {
    const { id, enableRowSpan } = column;

    if (enableRowSpan) {
      rowSpanHeaders = [
        ...rowSpanHeaders,
        { id, topCellValue: null, topCellIndex: 0 },
      ];
    }
  });

  Object.assign(instance, { rowSpanHeaders });
}

function Table({
  columns,
  data,
  initialState = {},
  onRowClicked = () => { },
  rowLink = null
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    rowSpanHeaders,
  } = useTable(
    { columns, data, initialState, autoResetSortBy: false },
    useSortBy,
    (hooks) => {
      hooks.useInstance.push(useRowSpanHeader);
    },
  );

  const handleRowClicked = (row) => {
    const rowData = row.original;
    onRowClicked(rowData);
  };

  const createRowLink = (row) => {
    const rowData = row.original;
    return rowLink(rowData);
  };

  const displaySortIcon = (column) => {
    if (column.isSorted) {
      return column.isSortedDesc ? (
        <MdOutlineArrowDropDown size={25} />
      ) : (
        <MdOutlineArrowDropUp size={25} />
      );
    }
    return '';
  };

  const selectCellClassname = (column) =>
    column.id === 'selectButton' ? 'select-cell' : '';

  const cellClassname = (rowSpan) => (rowSpan > 0 ? 'grouped' : '');

  const paddingClassname = (noPadding, index) =>
    noPadding || index === 0 ? 'no-padding' : '';

  return (
    <div className="table-component">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={column.className}
                >
                  <div
                    className={`head-content ${selectCellClassname(column)}`}
                  >
                    <div>{column.render('Header')}</div>
                    <span className="icon">{displaySortIcon(column)}</span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            for (let i = 0; i < row.allCells.length; i += 1) {
              const cell = row.allCells[i];
              const rowSpanHeader = rowSpanHeaders.find(
                (x) => x.id === cell.column.id,
              );
              if (rowSpanHeader !== undefined) {
                if (
                  rowSpanHeader.topCellValue === null ||
                  rowSpanHeader.topCellValue !== cell.value.toString()
                ) {
                  cell.isRowSpanned = false;
                  rowSpanHeader.topValue = cell.value.toString();
                  rowSpanHeader.topCellIndex = index;
                  cell.rowSpan = 1;
                } else {
                  rows[rowSpanHeader.topCellIndex].allCells[i].rowSpan += 1;
                  cell.isRowSpanned = true;
                }
              }
            }
            return null;
          })}
          {rows.map((row) => (
            <tr {...row.getRowProps()} onClick={() => handleRowClicked(row)}>
              {row.cells.map((cell, index) => {
                if (cell.isRowSpanned) return null;
                return (
                  <td
                    className={`cell ${cellClassname(
                      cell.rowSpan,
                    )} ${paddingClassname(
                      cell.column.noPadding,
                      index,
                    )} ${selectCellClassname(cell.column)} ${(cell.column.className)}`}
                    rowSpan={cell.rowSpan}
                    {...cell.getCellProps()}
                  >
                    {index === 0 && rowLink !== null ? (
                      <NavLink
                        to={createRowLink(row)}
                        className="nav-link"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <div className="link-cell">{cell.render('Cell')}</div>
                      </NavLink>
                    ) : (
                      cell.render('Cell')
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(Object).isRequired,
  data: PropTypes.arrayOf(Object).isRequired,
  initialState: PropTypes.objectOf(Object),
  onRowClicked: PropTypes.func,
  rowLink: PropTypes.func,
};

export default Table;
