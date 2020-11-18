import { BrowserRouter, Route } from 'react-router-dom';

import classes from './main.module.css';
import Login from './containers/Login/Login';
import Employees from './components/ManageEmployee/Employees/Employees';
import CreateEdit from './containers/CreateEdit/CreateEdit';
import ManageEmployee from './components/ManageEmployee/ManageEmployee';
import Application from './Employees';

function App() {
  return (
    <BrowserRouter>
      <div className={classes.App}>
      {/* <Application/> */}
        <Route path="/login" exact component={Login}/>
        <Route path="/" exact component={Login}/>
        <Route path="/manage-employees" exact component={ManageEmployee}/>
        <Route path="/create/:id" exact component={CreateEdit} />
        <Route path="/create" exact component={CreateEdit} />
      </div>
    </BrowserRouter>
  );
}

export default App;
