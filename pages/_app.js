import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      {router.pathname !== "/_error" && <Navbar />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
