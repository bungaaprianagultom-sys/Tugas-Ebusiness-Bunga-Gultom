import { Routes, Route, Link, Outlet } from "react-router-dom";
import AboutUs from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Home from "./pages/home";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <>
      <header className="navbar">
        <div className="logo">Tugas Bunga Gultom </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login" >Login</Link>
        </nav>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </>
  );
}

export default App;
