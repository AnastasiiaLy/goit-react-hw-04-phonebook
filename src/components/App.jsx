import React, { useEffect, useState } from 'react';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchBar from './SearchBar/SearchBar';
import css from 'App.module.css';

const App = () => {
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : initialContacts;
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('Запиши в локал стредж');
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = newContact => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleFilterChange = value => {
    setFilter(value);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1 className={css.header}>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />

      <h2 className={css.header}>Contacts</h2>
      <SearchBar value={filter} onChange={handleFilterChange} />

      {filteredContacts.length > 0 ? (
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      ) : (
        <p>No contacts available</p>
      )}
    </div>
  );
};

export default App;
