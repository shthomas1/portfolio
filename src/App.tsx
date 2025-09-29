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
import WhoBrew from "./components/WhoBrew";

const fallbackCards: CardData[] = [
  {
    id: 1,
    title: "CrediTrust AI",
    description:
      "Credit acceptance prediction platform for PNC Bank's AIS SCLC 2025 challenge.",
    role: "Team Developer",
    technologies: "C#, Javascript, html, css, Random Forest",
    year: "2024-2025",
    results:
      "Contender for the AIS 2025 Fintech challenge. Team project from Nov 2024 to Feb 2025 with model accuracy just over 70% on a random test set.",
  },
  {
    id: 2,
    title: "Freelance Music",
    description:
      "Platform for teachers to post their music lesson schedule online for students to join. My first school-sanctioned team project where I learned leadership and followership.",
    role: "Scrum Master/Data Engineer",
    technologies: "C#, Javascript, html, MySQL",
    year: "2025",
    results:
      "Client was satisfied with app outcome, and we got a perfect grade in the course.",
  },
  {
    id: 3,
    title: "Restaurant Revenue ML Model",
    description: "CLI predicting restaurant sales using LightGBM gradient boosting",
    role: "Solo Developer",
    technologies: "C#, Machine Learning, LightGBM, Gradient Boosting",
    year: "2024",
    results: "Two-week project completed in Nov–Dec 2024 with 2% error on real sales",
  },
  {
    id: 4,
    title: "Secure Communications App",
    description:
      "Demo application showcasing AES-256 encryption and one-time pads for a Business Programming course.",
    role: "Solo Developer",
    technologies: "C#, Rust, AES-256 encryption, Javascript, html",
    year: "2025",
    results:
      "Prototype used successfully in training with Army Special Forces. Developed March–April 2025.",
  },
];

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
        try {
          return await fetchJson<CardData[]>("movies.json");
        } catch (fallbackError) {
          console.error("Unable to load card data", error, fallbackError);
          return fallbackCards;
        }
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
    const uniqueTechs = Array.from(new Set(techStrings.filter(Boolean)));
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
          <Layout cards={cards} projects={projects}>
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
        path="/whobrew"
        element={
          <Layout cards={cards} projects={projects}>
            <WhoBrew />
          </Layout>
        }
      />
      <Route
        path="/project/:id"
        element={<Layout cards={cards} projects={projects} />}
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
