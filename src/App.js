import { BrowserRouter } from 'react-router-dom';

import classes from './main.module.css';
import Routes from './app-routing';

function App() {
  return (
    <BrowserRouter>
      <div className={classes.App}>
          <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
