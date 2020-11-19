import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import Unauthorized from '../Unauthorized/Unauthorized';
import classes from '../../main.module.css';

export default function Layout() {
    const history = useHistory()
    function logout() {
        localStorage.setItem('authenticated', false);
        history.push("/login");
    }
    return (
        localStorage.getItem('authenticated') === "true" ?
            <nav>
                <ul className={classes.navItems}>
                    <li className={classes.navItem}><Link to="/manage-employees">List of Employees</Link></li>
                    <li className={classes.navItem}><Link to="/create">Add Employee</Link></li>
                    {/* <li className={classes.navItem}><Link to="/employees">Employees</Link></li> */}
                    <li className={classes.navItem}><button className={classes.btnLogout} onClick={() => logout()}>Logout</button></li>
                </ul>
            </nav>
            : <Unauthorized />
    );
}
