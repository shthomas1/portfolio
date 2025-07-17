import "./styles/styles.css";
import "./styles/home.css";
import Bio from "./components/Bio";
import Timeline from "./components/Timeline";
import { CardData } from "./components/Card";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import './styles/backButton.css';

function AppContent() {
  const [cards, setCards] = useState<CardData[]>([]);
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
  
  const currentPathname = location.pathname;
  
  const isHomePage = currentPathname === '/';

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
      
      <div className="container">
        <Routes>
          <Route path="/" element={<Layout cards={cards} />} />
          <Route path="/bio" element={<Layout cards={cards}><Bio /></Layout>} />
          <Route path="/timeline" element={<Layout cards={cards}><Timeline /></Layout>} />
          <Route path="/project/:id" element={<Layout cards={cards} />} />
        </Routes>
      </div>
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
