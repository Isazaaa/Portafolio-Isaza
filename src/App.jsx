import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Works from "./components/Works.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Works />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
