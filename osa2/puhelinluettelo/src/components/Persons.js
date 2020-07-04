import React from 'react';

const Persons = ({ namesToShow }) => {

  if (namesToShow) {
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
  }

  return (
    <>
      <h2>Loading..</h2>
    </>
  );
  
};

export default Persons;


/* 

// Simple map

{namesToShow.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}

// Simple component

const Persons = ({ namesToShow }) => {
  return (
    <>
      <h2>Numbers</h2>
      {namesToShow.length > 0 && (
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
      )}
    </>
  );
};

*/
