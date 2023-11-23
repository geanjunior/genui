import { BrowserRouter, Route, Routes } from "react-router-dom"
import RandomScreen from "./screens/random.screen"
import HomeScreen from "./screens/home.screen"
import EvolutionScreen from "./screens/evolution.screen"

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" Component={HomeScreen} />
      <Route path="/random" Component={RandomScreen} />
      <Route path="/evolution" Component={EvolutionScreen} />
    </Routes>
  </BrowserRouter>
}

export default App
