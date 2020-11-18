import { CSVLink } from 'react-csv';
import React from "react";
import ColumnResizer from "react-column-resizer";
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination, useColumnOrder } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import DefaultColumnFilter from '../DefaultColumnFilter/DefaultColumnFilter';
import GlobalFilter from '../GlobalFilter/GlobalFilter';


const getItemStyle = ({ isDragging, isDropAnimating }, draggableStyle) => ({
    ...draggableStyle,
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
  
    ...(!isDragging && { transform: "translate(0,0)" }),
    ...(isDropAnimating && { transitionDuration: "0.001s" })
  
    // styles we need to apply on draggables
  });

function Table({ columns, data }) {
    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
            width: 150
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        flatColumns,
        setColumnOrder,
        // page,
        // canPreviousPage,
        // canNextPage,
        // pageOptions,
        // pageCount,
        // gotoPage,
        // nextPage,
        // previousPage,
        // setPageSize,
        // state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            // initialState: { pageIndex: 2, pageSize: 5 },
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useColumnOrder
    )
    // const [d, setData] = useState([]);
    // const exportData = (data) => {
    //     const dd = data.map((row, i) => {
    //         debugger;
    //         prepareRow(row)
    //         return (
    //             <tr {...row.getRowProps()}>
    //                 {row.cells.map(cell => {
    //                     debugger;
    //                     console.log(cell.render('Cell'))
    //                     return (cell.render('Cell'))
    //                 })}
    //             </tr>
    //         )
    //     })
    //     setData(dd);
    // }
    const currentColOrder = React.useRef();

    return (
        <div>
            <CSVLink data={preGlobalFilteredRows}>Download me</CSVLink><br />
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <DragDropContext
                        onDragStart={() => {
                          currentColOrder.current = columns.map(o => o.id);
                        }}
                        
                        onDragUpdate={(dragUpdateObj, b) => {
                          // console.log("onDragUpdate", dragUpdateObj, b);
                          
                          const colOrder = [...currentColOrder.current];
                          const sIndex = dragUpdateObj.source.index;
                          const dIndex =
                            dragUpdateObj.destination && dragUpdateObj.destination.index;
          
                          if (typeof sIndex === "number" && typeof dIndex === "number") {
                              
                            colOrder.splice(sIndex, 1);
                            colOrder.splice(dIndex, 0, dragUpdateObj.draggableId);
                            setColumnOrder(colOrder);
          
                            // console.log(
                            //   "onDragUpdate",
                            //   dragUpdateObj.destination.index,
                            //   dragUpdateObj.source.index
                            // );
                            // console.log(temp);
                          }
                        }}
                      >
                        <Droppable droppableId="droppable" direction="horizontal">
                          {(droppableProvided, snapshot) => (
                            <tr {...headerGroup.getHeaderGroupProps()} ref={droppableProvided.innerRef}>
                              {headerGroup.headers.map((column, index) => (
                                <Draggable
                                  key={column.id}
                                  draggableId={column.id}
                                  index={index}
                                  isDragDisabled={column.accessor}
                                  isDragging={snapshot.isDragging}
                                >
                                  {(provided, snapshot) => {
                                    // console.log(column.getHeaderProps());
          
                                    // const {
                                    //   style,
                                    //   ...extraProps
                                    // } = column.getHeaderProps();
          
                                    // console.log(style, extraProps);
          
                                    return (
                                        <><td {...column.getHeaderProps(column.getSortByToggleProps())}>
                                          <div {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          // {...extraProps}
                                          ref={provided.innerRef}
                                          style={{
                                            ...getItemStyle(
                                              snapshot,
                                              provided.draggableProps.style
                                            )
                                            // ...style
                                          }}
                                        ><div>{column.canFilter ? column.render('Filter') : null}
                                        {/* {column.canResize && (
                                            <div
                                                {...column.getResizerProps()}
                                                className={`resizer ${
                                                    column.isResizing ? 'isResizing' : ''
                                                    }`}
                                            />
                                        )} */}
                                    </div>

                                    {/* Add a sort direction indicator */}
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
                              {/* {droppableProvided.placeholder} */}
                            </tr>
                          )}
                        </Droppable>
                      </DragDropContext>
                        // <tr {...headerGroup.getHeaderGroupProps()}>
                        //     {headerGroup.headers.map(column => (
                        //         <>
                        //             <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        //                 {column.render('Header')}
                        //                 <div>{column.canFilter ? column.render('Filter') : null}
                        //                     {/* {column.canResize && (
                        //                         <div
                        //                             {...column.getResizerProps()}
                        //                             className={`resizer ${
                        //                                 column.isResizing ? 'isResizing' : ''
                        //                                 }`}
                        //                         />
                        //                     )} */}
                        //                 </div>

                        //                 {/* Add a sort direction indicator */}
                        //                 <span>
                        //                     {column.isSorted
                        //                         ? column.isSortedDesc
                        //                             ? ' '
                        //                             : ' '
                        //                         : ''}
                        //                 </span>
                        //             </th>
                        //             <ColumnResizer className="columnResizer" /></>
                        //     ))}
                        // </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (<><td {...cell.getCellProps()}>{cell.render('Cell')}</td><td></td></>)
                                })}
                            </tr>
                        )
                    })}
                    {/* {rows.map((row, i) => {
                        debugger;
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (<><td {...cell.getCellProps()}>{cell.render('Cell')}</td><td></td></>)
                                })}
                            </tr>
                        )
                    })} */}
                </tbody>
            </table>
            {/* <ul className="pagination">
                <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <a className="page-link">First</a>
                </li>
                <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <a className="page-link">{'<'}</a>
                </li>
                <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                    <a className="page-link">{'>'}</a>
                </li>
                <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <a className="page-link">Last</a>
                </li>
                <li>
                    <a className="page-link">
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </a>
                </li>
                <li>
                    <a className="page-link">
                        <input
                            className="form-control"
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px', height: '20px' }}
                        />
                    </a>
                </li>{' '}
                <select
                    className="form-control"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    style={{ width: '120px', height: '38px' }}
                >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </ul> */}
            <br />
            {/* <div>Showing the first 20 results of {rows.length} rows</div>
            <div>
                <pre>
                    <code>{JSON.stringify(state.filters, null, 2)}</code>
                </pre>
            </div> */}
        </div>
    )
}

export default Table;