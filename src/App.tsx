import "./App.css";
import styled from "styled-components";
import { useState, useEffect } from "react";
const url = import.meta.env.VITE_URL_ENDPOINTS;

const Header = styled.header`
  background-color: #fbfbfe;
  margin: 0;
  padding: 1rem;
  border-bottom: 1px solid black;
`;

const Title = styled.h1`
  color: #050315;
  font-size: 2rem;
  font-weight: 400;
`;

interface Interaction {
  command: string;
  message: string;
}

function App() {
  const [interactions, setInteractions] = useState<Interaction[]>([]);

  useEffect(() => {
    fetch(`${url}/api/command`)
      .then((response) => response.json())
      .then(({ data }) => setInteractions(data));
  }, []);

  return (
    <>
      {/* HEADER */}
      <Header>
        <Title>Bot APP</Title>
        <button>Reiniciar</button>
        <button>Iniciar</button>
        <button>Parar</button>
      </Header>

      <article>
        {/* Search bar */}

        <input placeholder="Search"></input>

        {/* Create interaction*/}
        <button> Create Interaction</button>

        {/* Interactions */}
        {interactions.map((interaction: Interaction, Index) => (
          <div key={Index}>
            <p>{interaction.command}</p>
            <p>{interaction.message}</p>
          </div>
        ))}
      </article>
    </>
  );
}

export default App;
