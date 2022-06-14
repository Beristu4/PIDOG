import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Inicial from './components/Inicial'
import Home from './components/Home';
import DetailsRaza from './components/DetailsRaza';
import CreateRaza from './components/CreateRaza'
function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
        <Route exact path='/' component={Inicial}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/dogs/:id' component={DetailsRaza}/>
        <Route exact path='/CreateRaza' component={CreateRaza}/>
    </Switch>  
    </div>
    </BrowserRouter>
  );
}

export default App;
