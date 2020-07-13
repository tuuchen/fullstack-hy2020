import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Header from './components/Header';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import PersonService from './services/PersonService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [namesToShow, setNamesToShow] = useState(persons);
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('');
  const [timeoutCounter, setTimeoutCounter] = useState('');

  useEffect(() => {
    PersonService.getAll().then((response) => {
      updatePersons(response);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const NameExists = persons.some((person) => person.name === newName);

    if (!newName) return;

    if (!NameExists) {
      PersonService.create(personObject)
        .then((response) => {
          notificationMessage(
            `${response.name} added to phonebook!`,
            'success'
          );
          updatePersons(persons.concat(response));
          clearNewPerson();
        })
        .catch((error) => {
          console.log('Failure! ', error);
        });
      return;
    }

    if (window.confirm(`${newName} already exists, update phone number?`)) {
      const indexOfnewName = persons.findIndex((i) => i.name === newName);
      PersonService.update(indexOfnewName + 1, personObject)
        .then((response) => {
          notificationMessage(`Updated ${response.name}!`, 'success');
          const updatedPerson = persons.map((person) => {
            console.log(persons[indexOfnewName].name);
            return person.id !== persons[indexOfnewName].id ? person : response;
          });
          updatePersons(updatedPerson);
          clearNewPerson();
        })
        .catch((error) => {
          console.log('Failure! ', error);
          notificationMessage(
            `Failure! ${error}. (Person is already removed from server!)`,
            'error'
          );
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
      PersonService.remove(id)
        .then(() => {
          console.log(`Removed ${name}`);
          notificationMessage(`Removed ${name}`, 'success');
          updatePersons(persons.filter((n) => n.id !== id));
          clearNewPerson();
        })
        .catch((error) => {
          console.log('Failure! ', error);
        });
    }
  };

  const notificationMessage = (message, className) => {
    const timer = setTimeout(() => {
      setMessageClass(null);
      setMessage(null);
    }, 5000);
    clearTimeout(timeoutCounter);
    setTimeoutCounter(timer);
    setMessageClass(className);
    setMessage(message);
  };

  const updatePersons = (val) => {
    setPersons(val);
    setNamesToShow(val);
  };

  const clearNewPerson = () => {
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <Header header="Phonebook" />
      <Notification className={messageClass} message={message} />
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
