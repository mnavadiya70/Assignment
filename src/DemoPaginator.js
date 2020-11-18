// /* eslint-disable react/prop-types */
import {Component} from 'react';
// import segmentize from 'segmentize';

// import Paginator from '../src/index.jsx';
import {CSVLink, CSVDownload} from 'react-csv';
// const DemoPaginator = ({
//   labels, ellipsis, pagination, pages, onSelect, ...props
// }) => (
//   <Paginator.Context className="pagify-pagination" {...props}
//     segments={segmentize({
//       page: pagination.page,
//       pages: pages,
//       beginPages: 3,
//       endPages: 3,
//       sidePages: 2
//     })} onSelect={onSelect}>
//     <Paginator.Button
//       className={pagination.page > 1 ? '' : 'disabled'}
//       page={pagination.page - 1}
//     >
//       {labels.previous}
//     </Paginator.Button>

//     <Paginator.Segment field="beginPages" />

//     <Paginator.Ellipsis className="ellipsis"
//       previousField="beginPages" nextField="previousPages">{ellipsis}</Paginator.Ellipsis>

//     <Paginator.Segment field="previousPages" />
//     <Paginator.Segment field="centerPage" className="selected" />
//     <Paginator.Segment field="nextPages" />

//     <Paginator.Ellipsis className="ellipsis"
//       previousField="nextPages" nextField="endPages">{ellipsis}</Paginator.Ellipsis>

//     <Paginator.Segment field="endPages" />

//     <Paginator.Button
//       className={pagination.page + 1 < pages ? '' : 'disabled'}
//       page={pagination.page + 1}
//     >
//       {labels.next}
//     </Paginator.Button>
//   </Paginator.Context>
// );
// DemoPaginator.defaultProps = {
//   labels: {
//     previous: 'Previous',
//     next: 'Next'
//   }
// }

// export default DemoPaginator;




class button extends Component{
    render(){
      const data = this.props.data.map((row, i) => {
        debugger;
        return (
            <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                    debugger;
                    console.log(cell.render('Cell'))
                    return (cell.render('Cell'))
                })}
            </tr>
        )
    });
      return (
        <CSVLink data={data} filename="data.csv"></CSVLink>)
    }
}
export default button;