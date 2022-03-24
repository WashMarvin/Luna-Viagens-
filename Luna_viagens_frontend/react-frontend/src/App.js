import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pacotes from './views/Pacote/Index'
import PacoteCreate from './views/Pacote/PacoteCreate'
import Destinos from './views/Destino/Index'
import DestinoCreate from './views/Destino/DestinoCreate'
import Clientes from './views/Cliente/index'
import ClienteCreate from './views/Cliente/ClienteCreate'

import Home from './views/Home'
import Menu from './components/Menu'
import Footer from './components/Footer'

import '../src/css/estilo.css';

function App() {
  return (
    <BrowserRouter>
      <section className="fundobg-index">
        <main>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Pacotes" element={<Pacotes />} />
            <Route path="/Pacote-Create" element={<PacoteCreate />} />
            <Route path="/Pacote-Update/:id" element={<PacoteCreate />} />
            <Route path="/Destinos" element={<Destinos />} />
            <Route path="/Destino-Create" element={<DestinoCreate />} />
            <Route path="/Destino-Update/:id" element={<DestinoCreate />} />
            <Route path="/Clientes" element={<Clientes />} />
            <Route path="/Cliente-Create" element={<ClienteCreate />} />
            <Route path="/Cliente-Update/:id" element={<ClienteCreate />} />
          </Routes>
          <Footer />
        </main>
      </section>
    </BrowserRouter>
  )
}

export default App;
