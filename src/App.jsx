import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Main } from "./comps/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrintCards } from "./comps/PrintCards";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/print/:number" element={<PrintCards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
