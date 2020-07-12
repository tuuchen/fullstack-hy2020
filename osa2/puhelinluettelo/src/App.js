import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Header from './components/Header';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import PersonService from './services/PersonService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [namesToShow, setNamesToShow] = useState(persons);

  useEffect(() => {
    PersonService.getAll().then((response) => {
      setPersons(response);
      setNamesToShow(response);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const NameExists = persons.some((person) => person.name === newName);

    if (
      NameExists &&
      window.confirm(`${newName} already exists, update phone number?`)
    ) {
      const indexOfnewName = persons.findIndex((i) => i.name === newName);
      PersonService.update(indexOfnewName + 1, personObject)
        .then((response) => {
          console.log('Success!', `updated ${response.name}`);
          const updatedPerson = persons.map((person) => {
            console.log(persons[indexOfnewName].name);
            return person.id !== persons[indexOfnewName].id ? person : response;
          });
          setPersons(updatedPerson);
          setNamesToShow(updatedPerson);
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          console.log('Failure! ', error);
        });
    } else if (NameExists) {
      return;
    } else {
      PersonService.create(personObject)
        .then((response) => {
          console.log('Success!', `${response.name} added to phonebook!`);
          setPersons(persons.concat(response));
          setNamesToShow(persons.concat(response));
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          console.log(error, 'Entry not saved into phonebook!');
        });
    }
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

  const handlePersonRemove = (id, name) => (e) => {
    if (window.confirm(`Delete ${name}?`)) {
      PersonService.remove(id).then(() => {
        console.log('Removed', name);
        setPersons(persons.filter((n) => n.id !== id));
        setNamesToShow(persons.filter((n) => n.id !== id));
        setNewName('');
        setNewNumber('');
      });
    }
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
      <Persons namesToShow={namesToShow} deletePerson={handlePersonRemove} />
    </div>
  );
};

export default App;
