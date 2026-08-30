import { useScrollReveal } from "./lib/useScrollReveal.js";
import Header from "./components/sections/Header.jsx";
import Hero from "./components/sections/Hero.jsx";
import Services from "./components/sections/Services.jsx";
import Works from "./components/sections/Works.jsx";
import About from "./components/sections/About.jsx";
import Contact from "./components/sections/Contact.jsx";
import Footer from "./components/sections/Footer.jsx";

export default function App() {
  useScrollReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Works />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
