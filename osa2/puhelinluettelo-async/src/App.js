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
    getInitialPersons();
    // eslint-disable-next-line
  }, []);

  const getInitialPersons = async () => {
    const initialPersons = await PersonService.getAll();
    console.log(initialPersons);
    updatePersons(initialPersons);
  };

  const addPerson = async (e) => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const NameExists = persons.some((person) => person.name === newName);

    if (!newName) return;

    if (!NameExists) {
      try {
        const newPerson = await PersonService.create(personObject);
        console.log(newPerson);
        notificationMessage(`${newPerson.name} added to phonebook!`, 'success');
        updatePersons(persons.concat(newPerson));
        clearNewPerson();
      } catch (err) {
        console.log('Failure! ', err.response);
        notificationMessage(err.response.data.error, 'error');
      }
      return;
    }

    if (window.confirm(`${newName} already exists, update phone number?`)) {
      const indexOfnewName = persons.findIndex((i) => i.name === newName);
      const personId = persons[indexOfnewName].id;
      try {
        const updatePerson = await PersonService.update(personId, personObject);
        notificationMessage(`Updated ${updatePerson.name}!`, 'success');
        const updatedPerson = persons.map((person) =>
          person.id !== personId ? person : updatePerson
        );
        updatePersons(updatedPerson);
        clearNewPerson();
      } catch (err) {
        console.log('Failure! ', err.response);
        notificationMessage(err.response.data.error, 'error');
      }
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

  const handlePersonRemove = (id, name) => async (e) => {
    if (window.confirm(`Delete ${name}?`)) {
      try {
        await PersonService.remove(id);
        console.log(`Removed ${name}`);
        notificationMessage(`Removed ${name}`, 'success');
        updatePersons(persons.filter((n) => n.id !== id));
        clearNewPerson();
      } catch (err) {
        console.log('Failure! ', err);
      }
    }
  };

  const notificationMessage = (message, className) => {
    const timer = setTimeout(() => {
      setMessageClass(null);
      setMessage(null);
    }, 8000);
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
