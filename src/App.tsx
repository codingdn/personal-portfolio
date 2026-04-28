import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Photography from '@/components/Photography'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path="projects" element={<Projects />} />
          <Route path="photography" element={<Photography />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
