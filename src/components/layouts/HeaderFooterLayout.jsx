import Header from "../Header/Header";
import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";

export default function HeaderFooterLayout() {
  return (
    <>
      <Header />
      
        <main className="bg-[#FEF1E8] mt-16 min-h-screen bg-gray-50">
          <Outlet />
        </main>
      
      <Footer />
    </>
  );
}
