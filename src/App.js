import Router from "./router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Suspense } from "react";

function App() {

  return <>
    <Suspense fallback={<>Loading...</>}>
      <Header />
      <Router />
      <Footer />
    </Suspense>
  </>
}
export default App;
