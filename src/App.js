import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EmailChecker from "./components/EmailChecker";
import UserTable from "./components/UserTable";
import { Container, Button } from "@mui/material";
import Count from "./components/Count";
import Tontine from "./components/Tontine";

function App() {
  return (
    <Router>
      <Container style={{ textAlign: "center", marginTop: "20px" }}>
        {/* <Button variant="contained" color="primary" style={{ marginRight: "10px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>Vérification</Link>
        </Button>
        <Button variant="contained" color="secondary">
          <Link to="/users" style={{ textDecoration: "none", color: "white" }}>Liste des utilisateurs</Link>
        </Button> */}

        <Routes>
          <Route path="/" element={<EmailChecker />} />
          <Route path="/count" element={<Count />} />
          <Route path="/tontine" element={<Tontine/>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
