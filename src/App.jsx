import './App.css';
import React from 'react';
import { BrowserRouter as  Router, Route, Switch} from 'react-router-dom'
import Inicio from './Components/Inicio';
import Login from './Components/Login';
import Admin from './Components/Admin';
import Menu from './Components/Menu';
import Usuarios from './Components/Usuarios';


function App() {
  return (
    <div className="container">
      
      <Router>
        <Menu></Menu>
        <Switch>
          <Route exact path="/" component={Inicio}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/usuarios" component={Usuarios}></Route>
              
        </Switch>
      </Router>  
    </div>

  );
}

export default App;
