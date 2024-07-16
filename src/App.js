import { useCallback, useEffect, useState } from 'react';
import './App.css';

import CharacterSheet from './CharacterSheet';

const API_URL = "https://recruiting.verylongdomaintotestwith.ca/api/kashav/character"


function App() {
  const [characters, setCharacters] = useState([]);

  const handleUpdateData = index => {
    return (delta) => {
      setCharacters(prevCharacters => {
        prevCharacters[index] = {
          ...prevCharacters[index],
          ...delta,
        }

        return [...prevCharacters];
      })
    }
  }

  const handleAddNewCharacter = () => {
    const newCharacter = {};
    setCharacters(prevCharacters => [...prevCharacters, newCharacter]);
  };

  const handleSaveCharacters = async () => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characters)
      };
      await fetch(API_URL, options)
    } catch (error) {
      console.error(error);
    }
  }

  const handleLoadCharacters = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json();
      setCharacters(data.body);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <button onClick={handleAddNewCharacter}>Add character</button>
        <button onClick={handleSaveCharacters}>Save characters</button>
        <button onClick={handleLoadCharacters}>Load characters</button>
      </section>
      {characters.map((character, i) => {
        return (
          <section className="App-section" key={i}>
            <p>Character {i + 1}</p>
            <CharacterSheet key={i} characterData={character} />
          </section>
        )
      })}
    </div>
  );
}

export default App;
