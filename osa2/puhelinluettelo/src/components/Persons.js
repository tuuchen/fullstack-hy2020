import React from 'react';

const Persons = ({ namesToShow }) => {
  return (
    <>
      <h2>Numbers</h2>
      <div>
        {namesToShow.map((person) => {
          if (!person.number) person.number = '(no number)';
          return (
            <p key={person.name}>
              {person.name}, {person.number}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default Persons;
