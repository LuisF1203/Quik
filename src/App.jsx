import { BrowserRouter, Routes, Route } from "react-router-dom";
import{
  Home,
  Register,
  NotFound,
}from "./views"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App
