import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";

export default function HeaderFooterLayout() {
  return (
    <>
      <Header />
      
        <main className="bg-[#FEF1E8] mt-16 px-6 py-4 min-h-screen bg-gray-50">
          <Outlet />
        </main>
      
      <Footer />
    </>
  );
}
