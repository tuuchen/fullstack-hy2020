import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const AnecdoteOfTheDay = ({ anecdote, points }) => {
  return (
    <>
      <h2>Anecdote of the day</h2>
      <p>{anecdote}</p>
      <h5>Rating {points}</h5>
    </>
  );
};

const BestAnecdote = ({ top, anecdote, max }) => {
  if (top === 0) {
    return (
      <>
        <p>Vote for the best Anecdote!</p>
      </>
    );
  }

  return (
    <>
      <h2>Anecdote with the most votes</h2>
      <p>{anecdote[top]}</p>
      <h5>Rating {max}</h5>
    </>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const [top, setTop] = useState(0);
  const [max, setMax] = useState(0);
  const copy = [...points];

  useEffect(() => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const vote = () => {
    copy[selected]++;
    setPoints(copy);
    if (copy[selected] > max) {
      setMax(copy[selected]);
      setTop(selected);
    }
  };

  return (
    <div>
      <AnecdoteOfTheDay
        anecdote={anecdotes[selected]}
        points={points[selected]}
      />
      <Button handleClick={vote} text="Give vote" />
      <Button handleClick={nextAnecdote} text="Show next anecdote" />
      <BestAnecdote top={top} anecdote={anecdotes} max={max} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
