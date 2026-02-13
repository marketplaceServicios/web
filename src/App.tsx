import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import PlansPage from "./pages/PlansPage";
import CategoriesPage from "./pages/CategoriesPage";
import DetailsPage from "./pages/DetailsPage";
import ReservationPage from "./pages/ReservationPage";
import OrderPage from "./pages/OrderPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planes" element={<PlansPage />} />
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/planes/:id" element={<DetailsPage />} />
          <Route path="/reserva/:id" element={<ReservationPage />} />
          <Route path="/orden" element={<OrderPage />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
