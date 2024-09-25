import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Sistema de gerenciamento de Projetos.</h1>
      <div className="card">
        <p>Registrar, visualizar,
          editar e remover projetos e tarefas de um 
          usuário, controlando o status das tarefas e projetos.
        </p>
      </div>
    </>
  )
}

export default App
