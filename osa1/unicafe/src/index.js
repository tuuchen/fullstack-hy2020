import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const StatisticLine = ({ value, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;
  let average = ((good - bad) / total).toFixed(2) + " / 1";
  let positive = ((good / total) * 100).toFixed(2) + "%";

  if (total === 0) {
    return <h3>Please give feedback!</h3>;
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine value={good} text="Good" />
          <StatisticLine value={neutral} text="Neutral" />
          <StatisticLine value={bad} text="Bad" />
          <StatisticLine value={total} text="All" />
          <StatisticLine value={average} text="Average" />
          <StatisticLine value={positive} text="Positive" />
        </tbody>
      </table>
    </>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = () => {
    setGood(good + 1);
  };

  const setToNeutral = () => {
    setNeutral(neutral + 1);
  };

  const setToBad = () => {
    setBad(bad + 1);
  };

  const setToZero = () => {
    setGood(0);
    setNeutral(0);
    setBad(0);
  };

  return (
    <div>
      <Header title="Give feedback" />
      <Button handleClick={setToGood} text="good" />
      <Button handleClick={setToNeutral} text="neutral" />
      <Button handleClick={setToBad} text="bad" />
      <Button handleClick={setToZero} text="Reset" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
