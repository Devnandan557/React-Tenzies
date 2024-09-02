import './App.css';
import React from 'react';
import Die from './Die';
import { nanoid } from "nanoid";
import Confetti from 'react-confetti';

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  // All dice should be in held state & all dice should be selected--you won!

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld === true)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("you won");
    }
  }, [dice])

  // generateNewDie === randomNumbers

  function randomNumbers() {
    return {
      value: Math.floor(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }

    // return newArr
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(randomNumbers())
    }
    return newDice
  }


  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die : randomNumbers()
      }))
    }
    else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }



  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }



  const dieElements = dice.map(die => (
    <Die key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))


  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same.
        Click each die to freeze it at its current value between rolls.
        Once all dice are green and all value becomes same: Congratulations 🎉 You Won!!!
        </p>
      <div className="dice-container">
        {dieElements}
      </div>
      <button
        onClick={rollDice}
        className="roll-dice">{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}


