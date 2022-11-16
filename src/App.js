
import Login from './pages/Login';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route  path="/" element={<Login />}/>
        </Routes>
      </Router>
      
      <Login />
     
    </div>
  );
}

export default App;
