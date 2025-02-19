import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ContaBancaria from "./contabancaria";

import './App.css'
import './conta.css'

function App() {
  return (
    <div>
      <h1>Sistema Bancário</h1>
      <ContaBancaria numero={1} agNumero={100} agNome="Sede" tipo={1} />
    </div>
  );
}

export default App;