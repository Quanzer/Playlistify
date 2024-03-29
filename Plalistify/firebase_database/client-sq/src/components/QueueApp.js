import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard.js';
import Login from './Login.js';

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return code ? <Dashboard code ={code}/> : <Login/> 

}

export default App;
