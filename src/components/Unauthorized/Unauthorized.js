import { Link } from 'react-router-dom';

const unauthorized = () => {
    return <><h2>You are not Authorized</h2><Link to="/"> Click here to login </Link></>
}

export default unauthorized;