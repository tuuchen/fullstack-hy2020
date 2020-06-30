import React, { useState } from 'react';
import Filter from './components/Filter';
import Header from './components/Header';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [namesToShow, setNamesToShow] = useState(persons);

  const addPerson = (e) => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(personObject));
    setNamesToShow(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  const handlePersonChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterName(e.target.value);
    setNamesToShow(
      persons.filter((person) =>
        person.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <Header header="Phonebook" />
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
      />
      <Persons namesToShow={namesToShow} />
    </div>
  );
};

export default App;
