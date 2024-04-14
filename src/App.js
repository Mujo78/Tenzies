import { useEffect, useState } from "react";
import "./App.css";
import Die from "./components/Die.js";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [stateValue, setStateValue] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = stateValue.every((n) => n.isHeld);
    const firstOne = stateValue[0].value;
    const allSameValue = stateValue.every((n) => n.value === firstOne);
    if (allHeld && allSameValue) {
      console.log("You won!");
      setTenzies(true);
    }
  }, [stateValue]);

  function allNewDice() {
    const arrayOfIt = [];
    for (let i = 0; i < 10; i++) {
      arrayOfIt.push(generateNewDie());
    }
    return arrayOfIt;
  }
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function NewDiceRoll() {
    if (!tenzies) {
      setStateValue((n) =>
        n.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setStateValue(allNewDice());
    }
  }

  function holdDice(id) {
    setStateValue((n) =>
      n.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  const newState = stateValue.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      onHandleClick={() => holdDice(die.id)}
    />
  ));

  return (
    <main className="main">
      {tenzies && <Confetti />}
      <div className="main-div">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{newState}</div>
        <div className="die-roll">
          <button onClick={NewDiceRoll} className="roll">
            {tenzies ? "New game" : "Roll"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
