import { Routes, Route } from "react-router-dom";
import Home from "./Login";
import Success from "./Success";
import Failure from "./Failure";
import Error from "./Error";


function App() {
  return (
    <Routes>
            <Route path="/" element={<Home />} />
      <Route path="/:sl" element={<Home />} />
       <Route path='/success' element={<Success/>} />
       <Route path='/failure' element={<Failure/>} />

    </Routes>
  );
}

export default App;
