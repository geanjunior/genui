import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GeneticProvider } from './genetic'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GeneticProvider>
    <App />
  </GeneticProvider>,
)
