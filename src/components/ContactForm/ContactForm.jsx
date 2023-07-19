import React, { useState } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (name.trim() === '') {
      alert('Please enter a name');
      return;
    }

    const newContact = {
      id: uuidv4(),
      name,
      number,
    };

    onAddContact(newContact);

    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.contact_from}>
      <p className={css.contact_from__text}>Name</p>
      <input
        className={css.contact_from__input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
      />

      <p className={css.contact_from__text}>Number</p>
      <input
        className={css.contact_from__input}
        type="tel"
        name="number"
        pattern="\\+?\\d{1,4}?[-.\\s]?\\(?\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChange}
      />

      <button type="submit" className={css.contact_from__Submit_btn}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
