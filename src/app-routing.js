import { Route } from 'react-router-dom';
import Login from './containers/Login/Login';
import CreateEdit from './containers/CreateEdit/CreateEdit';
import ManageEmployee from './components/ManageEmployee/ManageEmployee';
import Employees from './EmployeesTest';

const routes = () => {
    return (
        <>
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login} />
            <Route path="/manage-employees" exact component={ManageEmployee} />
            <Route path="/edit/:id" exact component={CreateEdit} />
            <Route path="/create" exact component={CreateEdit} />
            <Route path="/employees" exact component={Employees} />
        </>
    );
}

export default routes;