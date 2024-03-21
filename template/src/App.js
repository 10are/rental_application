import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Uav from "./pages/Uav"
// import Home from "./pages/Home"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Navbar from "./components/Navbar";

function App() {
  return (
<>    
      <Router>
      <Navbar />
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<h1>Not Found</h1>} />
            <Route path="/" element={<Uav />} />
          </Routes>
        </Router>

</>
  );
}

export default App;
