
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./components/AddProduct";
import LowStock from "./pages/LowStock";
import ExpiredItems from "./pages/ExpiredItems";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/add-product" element={<AddProduct/>}/>
        <Route path="/low-stock" element={<LowStock/>}/>
        <Route path="/expired" element={<ExpiredItems/>}/>
      </Routes>
    </Router>
  );
}

export default App;
