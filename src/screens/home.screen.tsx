import { useNavigate } from "react-router-dom";

import "./home.screen.css";

const HomeScreen = () => {
  const navigate = useNavigate();

  return <section className="home-section">
    <div><button onClick={() => navigate("/random")}>Random Individual</button></div>
    <div><button onClick={() => navigate("/evolution")}>Start Genetic Evolution</button></div>
  </section>;
}

export default HomeScreen;