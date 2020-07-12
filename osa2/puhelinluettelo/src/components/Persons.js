import React from 'react';
import Button from './Button';

const Persons = ({ namesToShow, deletePerson }) => {
  return (
    <>
      <h2>Numbers</h2>
      <div>
        {namesToShow.map((person) => {
          if (!person.number) person.number = '(no number)';
          return (
            <p key={person.name}>
              {person.name}, {person.number}{' '}
              <Button
                handleClick={deletePerson(person.id, person.name)}
                text={'delete'}
              />
            </p>
          );
        })}
      </div>
    </>
  );
};

export default Persons;
