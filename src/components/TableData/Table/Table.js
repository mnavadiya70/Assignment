import React from "react";
import ColumnResizer from "react-column-resizer";
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination, useColumnOrder, useRowSelect } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import axios from '../../../axios';
import DefaultColumnFilter from '../DefaultColumnFilter/DefaultColumnFilter';
// import GlobalFilter from '../GlobalFilter/GlobalFilter';
import CsvData from '../../../components/TableData/CsvData/CsvData';
import classes from '../../../main.module.css';
import IndeterminateCheckbox from '../../IndeterminateCheckbox/IndeterminateCheckbox';

const getItemStyle = ({ isDragging, isDropAnimating }, draggableStyle) => ({
    ...draggableStyle,
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "",

    ...(!isDragging && { transform: "translate(0,0)" }),
    ...(isDropAnimating && { transitionDuration: "0.001s" })

    // styles we need to apply on draggables
});

const setElementStyle = (row) => (
    {
        background: row.getToggleRowSelectedProps().checked ? "gray" : "",
        color: row.getToggleRowSelectedProps().checked ? "white" : ""
    }
);

export default function Table({ columns, data }) {
    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter,
            width: 150
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        // state,
        preGlobalFilteredRows,
        // setGlobalFilter,
        setColumnOrder,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        allColumns,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: { pageIndex: Number(localStorage.getItem('PageIndex')), pageSize: Number(localStorage.getItem('PageSize')) },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useColumnOrder,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: "selection",
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({ row }) => (
                        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                    ),
                },
                ...columns,
            ]);
        },
        )

    localStorage.setItem('PageSize', pageSize);
    localStorage.setItem('PageIndex', pageIndex);

    const currentColOrder = React.useRef();

    return (
        <>
            <div style={{ textAlign: 'left' }}>
                <p><b>Show/Hide columns here</b></p>
                <p style={{ display: 'flex' }}>
                    {allColumns.map(column => (
                        column.id === "selection"
                            ? null
                            :
                            <label key={column.id}>
                                <input type="checkbox" {...column.getToggleHiddenProps()} />&nbsp;&nbsp;
                                {column.id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </label>
                    ))}</p>
                <br />
            </div>
            <div>
                <div>
                    <div style={{ float: 'left' }} >
                        <CsvData data={preGlobalFilteredRows} columns={columns} />
                    </div>
                    <div style={{ float: 'right' }}>
                        <label><b>Per page record : </b></label>
                        <input type="Number" value={pageSize}
                            onChange={e => {
                                if (e.target.value === "") {
                                    setPageSize(data.length)
                                    localStorage.setItem('PageSize', data.length);
                                }
                                else {
                                    setPageSize(Number(e.target.value))
                                    localStorage.setItem('PageSize', Number(e.target.value));
                                }
                            }} />
                    </div>
                </div>
                <br /><br />
                {/* <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            /> */}
                <div className={classes.tableDiv}>
                    <table className="table" {...getTableProps()}>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <DragDropContext
                                    onDragStart={() => {
                                        currentColOrder.current = columns.map(o => o.id);
                                    }}

                                    onDragUpdate={(dragUpdateObj, b) => {

                                        const colOrder = [...currentColOrder.current];
                                        const sIndex = dragUpdateObj.source.index;
                                        const dIndex =
                                            dragUpdateObj.destination && dragUpdateObj.destination.index;

                                        if (typeof sIndex === "number" && typeof dIndex === "number") {

                                            colOrder.splice(sIndex, 1);
                                            colOrder.splice(dIndex, 0, dragUpdateObj.draggableId);
                                            setColumnOrder(colOrder);
                                        }
                                    }}>
                                    <Droppable droppableId="droppable" direction="horizontal">
                                        {(droppableProvided, snapshot) => (
                                            <tr {...headerGroup.getHeaderGroupProps()} ref={droppableProvided.innerRef} key={droppableProvided.placeholder.Key}>
                                                {headerGroup.headers.map((column, index) => (
                                                    <Draggable
                                                        key={column.id}
                                                        draggableId={column.id}
                                                        index={index}
                                                        isDragDisabled={column.accessor}
                                                        isDragging={snapshot.isDragging}
                                                    >
                                                        {(provided, snapshot) => {

                                                            return (
                                                                <><td {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                                    <div {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        ref={provided.innerRef}
                                                                        style={{
                                                                            ...getItemStyle(
                                                                                snapshot,
                                                                                provided.draggableProps.style
                                                                            )
                                                                        }}
                                                                    ><div>{column.canFilter ? column.render('Filter') : null}
                                                                        </div>
                                                                        <span>
                                                                            {column.isSorted
                                                                                ? column.isSortedDesc
                                                                                    ? ' '
                                                                                    : ' '
                                                                                : ''}
                                                                        </span>
                                                                        {column.render("Header")}
                                                                    </div></td><ColumnResizer className="columnResizer" /></>
                                                            );
                                                        }}
                                                    </Draggable>
                                                ))}
                                                <td></td>
                                            </tr>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()} style={{ ...setElementStyle(row) }} key={row.id}>
                                        {row.cells.map(cell => {

                                            return (
                                                <><td {...cell.getCellProps()}>{cell.render('Cell')}</td><td></td></>
                                            )
                                        })}
                                        <td>
                                            <Link to={`/edit/${row.original.Key}`} className={classes.ButtonEdit}>Edit</Link>&nbsp;&nbsp;
                                            <button className={classes.ButtonDelete} onClick={() => {
                                                return (
                                                    axios.delete('/users/' + row.original.Key + '.json').then(response => {
                                                        window.location.reload();
                                                    })
                                                )
                                            }}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <ul className="pagination">
                    <li className="page-item page-link" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        First
                    </li>
                    <li className="page-item page-link" onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </li>
                    <li className="page-item page-link" onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </li>
                    <li className="page-item page-link" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        Last
                    </li>
                    <li className="page-link">
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>
                    </li>
                </ul>
            </div></>
    )
}