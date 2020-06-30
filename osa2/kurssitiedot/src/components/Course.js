import React from "react";

const Header = ({ course }) => (
  <>
    <h1>{course}</h1>
  </>
);

const Part = ({ name, exercises }) => (
  <>
    <p>
      {name} {exercises}
    </p>
  </>
);

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((val) => (
        <Part key={val.id} name={val.name} exercises={val.exercises} />
      ))}
    </>
  );
};

const Total = ({ parts }) => (
  <p>
    Number of excercises:{" "}
    {parts.reduce((sum, val) => (sum += val.exercises), 0)}
  </p>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
