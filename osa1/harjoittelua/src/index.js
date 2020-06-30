import React, { useState } from "react";
import ReactDOM from "react-dom";

/* 
let props = {
  name: "World",
  age: 31,
};

const Footer = () => {
  return (
    <div>
      greeting app created by
      <a href="https://github.com/mluukkai"> mluukkai</a>
    </div>
  );
};

const Hello = ({ name, age }) => {
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
    </div>
  );
};

const App = ({ name, age }) => {
  const now = new Date();
  const a = 10;
  const b = 20;

  return (
    <>
      <h1>Greetings</h1>
      <Hello name={name} age={age} />
      <Footer />
      <p>
        Hello {name}, it is {now.toString()}
      </p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </>
  );
};

ReactDOM.render(
  <App name={props.name} age={props.age} />,
  document.getElementById("root")
);

*/

/* 
const Display = ({ counter }) => {
  return <div>{counter}</div>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = (props) => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  console.log("rendering...", counter);

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={decreaseByOne} text="minus" />
      <Button handleClick={setToZero} text="zero" />
    </div>
  );
}; */

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const Button = (props) => {
  // console.log(props);
  const { handleClick, text } = props;
  return <button onClick={handleClick}>{text}</button>;
};

/* const Display = (props) => {
    return <div>{props.counter}</div>;
  }; */

const Display = ({ counter }) => {
  return <div>{counter}</div>;
};

const App = (props) => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const [value, setValue] = useState(0);
  const [counter, setCounter] = useState(0);

  // const [helloValue, setHello] = useState("");

  /* const [clicks, setClicks] = useState({
    left: 0, right: 0
  }) */

  /* const handleLeftClick = () => {
  const newClicks = { 
    ...clicks, 
    left: clicks.left + 1 
  }
  setClicks(newClicks)
}

const handleRightClick = () => {
  const newClicks = { 
    ...clicks, 
    right: clicks.right + 1 
  }
  setClicks(newClicks)
}  */

  /* const handleLeftClick = () => {
    setClicks({ ...clicks, left: clicks.left + 1 });
  };

  const handleRightClick = () => {
    setClicks({ ...clicks, right: clicks.right + 1 });
  }; */

  const increaseByOne = () => {
    setCounter(counter + 1);
  };

  const decreaseByOne = () => {
    setCounter(counter - 1);
  };
  const setToZero = () => {
    setCounter(0);
  };

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };

  /* const hello = (who) => {
    const handler = () => {
      console.log("hello", who);
    };

    return handler;
  };

  const hello = (who) => {
    return () => {
      console.log("hello", who);
    };
  }; */

  const hello = (who) => () => {
    console.log("hello", who);
  };

  const setToHello = (newValue) => {
    console.log("hello", newValue);
  };

  const setToValue = (newValue) => () => {
    setValue(newValue);
  };

  const setToValueB = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
        {left}
        <Button handleClick={handleLeftClick} text="left" />
        <Button handleClick={handleRightClick} text="right" />
        {right}
        <History allClicks={allClicks} />
        <Button
          handleClick={() => console.log("clicked the button")}
          text="button"
        />
        <br />
        <br />
        <Button handleClick={hello("react")} text="Hello" />
        <Button handleClick={() => setToHello("react")} text="Hello" />
        <br />
        <br />
        {value}
        <Button handleClick={setToValue(value + 1)} text="Increment" />
        <Button handleClick={() => setToValueB(value + 1)} text="IncrementB" />
        <Button
          handleClick={function () {
            setToValueB(value + 1);
          }}
          text="IncrementC"
        />
        <Display counter={counter} />
        <Button handleClick={increaseByOne} text="plus" />
        <Button handleClick={setToZero} text="zero" />
        <Button handleClick={decreaseByOne} text="minus" />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
