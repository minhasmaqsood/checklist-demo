import {Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Checklist from "./components/Checklist";
function App() {
  return (
   <Fragment>
       <header className="App App-header text-secondary">
           CHECKLIST
       </header>
       <div className="container mt-5">
           <Checklist/>
       </div>
   </Fragment>
  );
}

export default App;
