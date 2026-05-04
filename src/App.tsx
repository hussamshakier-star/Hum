import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import About from './components/About';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <Gallery />
        <About />
      </main>
      <Footer />
    </div>
  );
}
