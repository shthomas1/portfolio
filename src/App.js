import "./styles/styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CardGrid from "./components/CardGrid";
import RevPred from "./components/RevPred";
import Bio from "./components/Bio";
import S2 from "./components/S2";
import CrediTrust from "./components/CrediTrust";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Feedback from "./components/Feedback";
import FreelanceMusic from "./components/FreelanceMusic";

function App() {
  const [cards, setCards] = useState([]);

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

  return (
    <div className="App">
      <div className="container">
        <Router>
          <Header></Header>
          <Routes>
            <Route path="/" element={<CardGrid cards={cards} />}></Route>
            <Route path="/bio" element={<Bio />}></Route>
            <Route path="/s2" element={<S2 />}></Route>
            <Route path="/portfolio" element={<Feedback />}></Route>
            <Route path="/revpred" element={<RevPred />}></Route>
            <Route path= "/freelance-music" element={<FreelanceMusic></FreelanceMusic>}></Route>
            <Route path= "/credit" element={<CrediTrust></CrediTrust>}></Route>
          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
