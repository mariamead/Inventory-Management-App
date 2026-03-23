import { Outlet } from "react-router";
import { Footer } from "./footer/Footer";
import NavInterface from "../components/navInterface/navInterface";

export default function Layout() {
  return (
    <>
        <NavInterface />
        <Outlet />
        <Footer />
    </>
  );
}
