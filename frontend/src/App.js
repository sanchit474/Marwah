import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import "@/App.css";
import { AuthProvider } from "@/context/AuthContext";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Academics from "@/pages/Academics";
import Admissions from "@/pages/Admissions";
import Faculty from "@/pages/Faculty";
import Gallery from "@/pages/Gallery";
import NewsEvents from "@/pages/NewsEvents";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

const withLayout = (el) => <Layout>{el}</Layout>;

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" richColors />
          <Routes>
            <Route path="/" element={withLayout(<Home />)} />
            <Route path="/about" element={withLayout(<About />)} />
            <Route path="/academics" element={withLayout(<Academics />)} />
            <Route path="/admissions" element={withLayout(<Admissions />)} />
            <Route path="/faculty" element={withLayout(<Faculty />)} />
            <Route path="/gallery" element={withLayout(<Gallery />)} />
            <Route path="/news" element={withLayout(<NewsEvents />)} />
            <Route path="/contact" element={withLayout(<Contact />)} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
