import React, { useState, useEffect } from "react";
import axios from '../../../axios';
import Table from '../../../components/TableData/Table/Table';
import Unauthorized from "../../Unauthorized/Unauthorized";

function FilterTableComponent() {
    const [loadingData, setLoadingData] = useState(true);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'Name',
            },
            {
                Header: 'UserName',
                accessor: 'UserName'
            },
            {
                Header: 'Email',
                accessor: 'Email'
            },
            {
                Header: 'Address',
                accessor: 'Address'
            },
            {
                Header: 'Website',
                accessor: 'Website'
            },
            {
                Header: 'Company',
                accessor: 'Company'
            },
        ]
    )

    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            await axios
                .get("/users.json")
                .then((response) => {
                    const employees = Object.keys(response.data)
                    const testdata = employees.map(key => {
                        const employee = response.data[key]
                        return {
                            // Key: key,
                            Name: employee.Name,
                            UserName: employee.UserName,
                            Email: employee.Email,
                            Address: employee.Address,
                            Website: employee.Website,
                            Company: employee.Company,
                        }
                    });
                    setData(testdata);
                    setLoadingData(false);
                });
        }
        if (loadingData) {
            getData();
        }
    }, []);
    
    return (
        localStorage.getItem('authenticated') === "true" ?
        <Table columns={columns} data={data} /> : <Unauthorized/>
    )
}

export default FilterTableComponent;