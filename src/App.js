import "./styles/styles.css";
import "./styles/global-background.css";
import "./styles/home.css";
import RevPred from "./components/RevPred";
import Bio from "./components/Bio";
import S2 from "./components/S2";
import CrediTrust from "./components/CrediTrust";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Feedback from "./components/Feedback";
import FreelanceMusic from "./components/FreelanceMusic";
import Starfield from "./components/Starfield";
import Layout from "./components/Layout";

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

  // Determine which routes should use the Layout
  const layoutRoutes = ['/', '/bio', '/projects'];
  // Add a regex check for project detail routes (/project/1, /project/2, etc.)
  const isProjectDetailRoute = /^\/project\/\d+$/.test(location.pathname);
  
  const currentPathname = location.pathname;
  const useLayout = layoutRoutes.includes(currentPathname) || isProjectDetailRoute;
  
  // Conditionally render header based on current route and layout usage
  const isHomePage = currentPathname === '/';

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
      {/* Add starfield to non-home pages that aren't using the layout */}
      {!isHomePage && !useLayout && <Starfield />}
      
      <div className="container">
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Layout cards={cards} />} />
          
          {/* Bio route */}
          <Route path="/bio" element={<Layout cards={cards}><Bio /></Layout>} />
          
          {/* Projects routes - the Layout component handles rendering CardGrid */}
          <Route path="/projects" element={<Layout cards={cards} />} />
          
          {/* Project detail routes - the Layout component handles rendering ProjectDetail */}
          <Route path="/project/:id" element={<Layout cards={cards} />} />
          
          {/* Routes not using the layout */}
          <Route path="/s2" element={<S2 />} />
          <Route path="/portfolio" element={<Feedback />} />
          <Route path="/revpred" element={<RevPred />} />
          <Route path="/freelance-music" element={<FreelanceMusic />} />
          <Route path="/credit" element={<CrediTrust />} />
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