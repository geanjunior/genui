import { useNavigate } from "react-router-dom";

import "./home.screen.css";

const HomeScreen = () => {
  const navigate = useNavigate();

  return <section className="home-section">
    <button onClick={() => navigate("/random")}>Random Individual</button>
    <br />
    <button>Start Genetic Evolution</button>
  </section>;
}

export default HomeScreen;