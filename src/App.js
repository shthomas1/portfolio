import "./styles/styles.css";
import "./styles/global-background.css"; // Add this import
import Header from "./components/Header";
import Footer from "./components/Footer";
import CardGrid from "./components/CardGrid";
import RevPred from "./components/RevPred";
import Bio from "./components/Bio";
import S2 from "./components/S2";
import CrediTrust from "./components/CrediTrust";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Feedback from "./components/Feedback";
import FreelanceMusic from "./components/FreelanceMusic";
import Home from "./components/Home";
import Starfield from "./components/Starfield"; // Import Starfield

function AppContent() {
  const [cards, setCards] = useState([]);
  const location = useLocation();

  useEffect(() => {
    console.log("Attempting to fetch cardinfo.json...");

    fetch("cardinfo.json")
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Successfully loaded data:", data);
        setCards(data);
      })
      .catch((error) => {
        console.error("Error loading from /cardinfo.json:", error);

        console.log("Attempting to fetch movies.json as fallback...");
        fetch("movies.json")
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Successfully loaded movies.json data:", data);
            setCards(data);
          })
          .catch((fallbackError) => {
            console.error(
              "Error loading from fallback movies.json:",
              fallbackError
            );

            setCards([
              {
                id: 1,
                title: "Test Project",
                image: "default.jpg",
                description:
                  "This is a test project to see if cards display correctly.",
                role: "Developer",
                technologies: "React",
                year: "2025",
                results: "Debugging successful",
              },
            ]);
          });
      });
  }, []);

  console.log("Current state of cards:", cards);

  // Conditionally render header based on current route
  const showHeader = location.pathname !== '/';
  const isHomePage = location.pathname === '/';

  // Apply special body class for home page
  useEffect(() => {
    if (isHomePage) {
      document.body.classList.add('home-page-body');
    } else {
      document.body.classList.remove('home-page-body');
    }
    
    return () => {
      document.body.classList.remove('home-page-body');
    };
  }, [isHomePage]);

  return (
    <div className={`App ${isHomePage ? 'home-page-layout' : ''}`}>
      {/* Add starfield to non-home pages */}
      {!isHomePage && <Starfield />}
      
      <div className="container">
        {showHeader && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/s2" element={<S2 />} />
          <Route path="/portfolio" element={<Feedback />} />
          <Route path="/revpred" element={<RevPred />} />
          <Route path="/freelance-music" element={<FreelanceMusic />} />
          <Route path="/credit" element={<CrediTrust />} />
          <Route path="/projects" element={<CardGrid cards={cards} />} />
        </Routes>
      </div>
      {!isHomePage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;