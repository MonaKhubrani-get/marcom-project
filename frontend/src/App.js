import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration"; // تأكد من المسار
import Login from "./components/Login"; // إن وجد
import Users from "./components/Users"; // إن وجد

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
