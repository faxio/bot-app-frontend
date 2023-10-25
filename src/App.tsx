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

const initalState = {
  command: "",
  message: "",
};

function App() {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formInteraction, setFormInteraction] =
    useState<Interaction>(initalState);

  useEffect(() => {
    fetch(`${url}/api/command`)
      .then((response) => response.json())
      .then(({ data }) => setInteractions(data));
  }, [interactions]);

  const botEventStop = (action: string) => {
    fetch(`${url}/api/bot/${action}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const botEventStart = (action: string) => {
    fetch(`${url}/api/bot/${action}`, {
      method: "POST",
      body: JSON.stringify({ interactions: interactions }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const botEventUpdate = (action: string) => {
    fetch(`${url}/api/bot/${action}`, {
      method: "POST",
      body: JSON.stringify({ interactions: interactions }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const onEventHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormInteraction({ ...formInteraction, [e.target.name]: e.target.value });
  };

  const createInteraction = () => {
    fetch(`${url}/api/command`, {
      method: "POST",
      body: JSON.stringify(formInteraction),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
    setInteractions([...interactions, formInteraction]);
    setFormInteraction(initalState);
  };

  const searchInteraction = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInteractions(
      interactions.filter((interaction) =>
        interaction.command.includes(event.target.value)
      )
    );
    console.log(interactions);
  };

  if (interactions.length === 0) return <div> Cargando..</div>;

  return (
    <>
      {/* HEADER */}
      <Header>
        <Title>Bot APP</Title>
        <button onClick={() => botEventUpdate("update")}>Reiniciar</button>
        <button onClick={() => botEventStart("start")}>Iniciar</button>
        <button onClick={() => botEventStop("stop")}>Parar</button>
      </Header>

      <article>
        {/* Search bar */}

        <input
          placeholder="Search"
          onChange={(event) => searchInteraction(event)}
        ></input>

        {/* Create interaction*/}
        <button onClick={() => setIsOpen(!isOpen)}> Create Interaction</button>
        {isOpen && (
          <div>
            <input
              placeholder="command"
              name="command"
              onChange={(event) => onEventHandler(event)}
              value={formInteraction.command}
            ></input>
            <textarea
              placeholder="message"
              name="message"
              onChange={(event) => onEventHandler(event)}
              value={formInteraction.message}
            ></textarea>
            <button onClick={() => createInteraction()}>
              Crear Interacción
            </button>
          </div>
        )}

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
