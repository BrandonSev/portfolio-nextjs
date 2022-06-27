import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollTop from "../components/ScrollTop";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(undefined);
  const router = useRouter();
  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      window.localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    if (theme !== undefined) {
      if (theme === "dark") {
        document.documentElement.removeAttribute("data-theme");
        window.localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        window.localStorage.setItem("theme", "light");
      }
    }
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );
    setTheme(initialColorValue === "dark" ? "dark" : "light");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {router.pathname !== "/_error" && <Navbar />}
      <Component {...pageProps} />
      {router.pathname !== "/_error" && <ScrollTop />}
      {router.pathname !== "/_error" && <Footer />}
    </ThemeContext.Provider>
  );
}

export default MyApp;
