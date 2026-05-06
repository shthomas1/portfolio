import "./styles/styles.css";
import "./styles/home.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Layout from "./components/Layout";
import Home from "./components/Home";
import { CardData } from "./components/Card";
import { TechnologyTag } from "./types/Technology";
import { BioData } from "./types/Bio";
import { Project } from "./types/Project";
import { getTechCategory } from "./utils/techCategories";

const fallbackCards: CardData[] = [];

const AppContent = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [bioData, setBioData] = useState<BioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJson = async <T,>(path: string): Promise<T> => {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    };

    const loadCards = async () => {
      try {
        return await fetchJson<CardData[]>("cardinfo.json");
      } catch (error) {
        console.error("Unable to load card data", error);
        return fallbackCards;
      }
    };

    const loadProjects = async () => {
      try {
        return await fetchJson<Project[]>("projects.json");
      } catch (error) {
        console.error("Unable to load project detail data", error);
        return [];
      }
    };

    const loadBio = async () => {
      try {
        return await fetchJson<BioData>("bioinfo.json");
      } catch (error) {
        console.error("Unable to load bio data", error);
        return null;
      }
    };

    const loadData = async () => {
      setLoading(true);
      try {
        const [cardData, projectData, bio] = await Promise.all([
          loadCards(),
          loadProjects(),
          loadBio(),
        ]);

        setCards(cardData);
        setProjects(projectData);
        setBioData(bio);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const technologies: TechnologyTag[] = useMemo(() => {
    const techStrings = cards.flatMap((card) =>
      card.technologies
        ? card.technologies.split(",").map((item) => item.trim())
        : []
    );
    const filteredTechs: string[] = techStrings.filter((tech) => tech.length > 0);
    const uniqueTechs: string[] = Array.from(new Set<string>(filteredTechs));
    return uniqueTechs.map((tech, index) => ({
      id: index + 1,
      name: tech,
      category: getTechCategory(tech),
    }));
  }, [cards]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout cards={cards} projects={projects} bioData={bioData}>
            <Home
              cards={cards}
              bioData={bioData}
              technologies={technologies}
              loading={loading}
            />
          </Layout>
        }
      />
      <Route
        path="/project/:id"
        element={<Layout cards={cards} projects={projects} bioData={bioData} />}
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
