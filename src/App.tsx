import { BrowserRouter, Route, Routes } from "react-router-dom"
import RandomScreen from "./screens/random.screen"

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" Component={RandomScreen} />
    </Routes>
  </BrowserRouter>
}

export default App
