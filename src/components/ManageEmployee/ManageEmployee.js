import Layout from '../Layout/Layout';
import Employees from '../ManageEmployee/Employees/Employees';
import Unauthorized from '../Unauthorized/Unauthorized';

const manageEmployee = () => {
    const authenticated = localStorage.getItem('authenticated');
    return (
        authenticated === "true" ?
            <>
                <Layout />
                <Employees />
            </>
            : <Unauthorized />
    );
}

export default manageEmployee;