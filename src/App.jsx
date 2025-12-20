import { Routes, Route } from "react-router-dom";
import Home from "./Login";
import Success from "./Success";
import Failure from "./Failure";
import Error from "./Error";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminPrivateRoute from "./Routes/AdminPrivateRoute";


function App() {
  return (
    <Routes>
            <Route path="/" element={<Home />} />
      <Route path="/:sl" element={<Home />} />
       <Route path='/success' element={<Success/>} />
       <Route path='/failure' element={<Failure/>} />
        <Route path='/admin/login' element={<AdminLogin/>} />
        <Route
        path="/admin/dashboard"
        element={
          <AdminPrivateRoute>
            <AdminDashboard />
          </AdminPrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
