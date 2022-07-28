import { useState, useMemo } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchField, setSearchField] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingName = persons.find((person) => person.name === newName);
    if (existingName) {
      alert(`${newName} is already added to phonebook`);
      return;
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
    }

    setNewName('');
    setNewNumber('');
  };

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };
  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const filtredPersons = useMemo(() => {
    if (!searchField) {
      return persons;
    }
    return persons.filter((person) => {
      return person.name.toLowerCase().includes(searchField.toLowerCase());
    });
  }, [persons, searchField]);
  console.log('🚀 ~ filtredPersons', filtredPersons);

  const handleSearch = (e) => {
    setSearchField(e.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchField={searchField} handleSearch={handleSearch} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={filtredPersons} />
    </div>
  );
};

export default App;
