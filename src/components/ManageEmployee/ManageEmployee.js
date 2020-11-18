import {Component} from 'react';
import { Link } from 'react-router-dom';

import Employees from '../ManageEmployee/Employees/Employees';
import classes from '../../main.module.css';
import Unauthorized from '../Unauthorized/Unauthorized';

class ManageEmployee extends Component {
    logoutHandler = () => {
        localStorage.setItem('authenticated', false);
        this.props.history.push("/login");
    }
    render() {
        const authenticated = localStorage.getItem('authenticated');
        return (
            authenticated === "true" ? 
            <div className={classes.ManageEmp}>
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/manage-employees">List of Employees</Link></li>
                            <li><Link to="/create">Add Employee</Link></li>
                        </ul>
                    </nav>

                    <button className={classes.btnLogout} onClick={this.logoutHandler}>Logout</button>
                </header>
                <Employees />
            </div>
            : <Unauthorized/>
        );
    }

}

export default ManageEmployee;