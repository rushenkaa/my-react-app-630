import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import NasaPhoto from "./components/NasaPhoto";
import LineChart from "./LineChart";
import Chart from './ResponsiveBar';

function App() {
  return (
    
    <BrowserRouter>
      <div>
        <Route component={Home} path="/" exact/>
        <Route component={NasaPhoto} path="/nasaphoto" />
      </div>
    </BrowserRouter>
    
    
    /* <div className="App">
      <header className="App-header">
        <LineChart />
        <Chart />
      </header>
    </div> /*
  );
}

export default App;