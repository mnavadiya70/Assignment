import { CSVLink } from 'react-csv';

const csvData = (props) => {
    const colHeader = props.columns
        .map((col) => ({ name: col.Header }));
    const dataToDownload = props.data.map((row) => {
        return colHeader.map((col) => row.values[col.name]);
    });
    // const headerNames = colHeader.map((col) => col.name);
    // const exportData = { fields: headerNames, dataToDownload };
    return (
        <CSVLink data={dataToDownload} filename="data.csv"><b>Click here to export data</b></CSVLink>
    )
}
export default csvData;