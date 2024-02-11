import React, { useState } from 'react';
import axios from 'axios';

export const AddUser = () => {
  const [id, setId] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [location, setLocation] = useState('');

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/users', {
        id: id,
        firstname: firstname,
        lastname: lastname,
        location: location,
      });
      console.log('Podaci uspešno poslati na bekend.');
    } catch (error) {
      console.error('Greška pri slanju podataka na bekend:', error);
    }
  };

  return (
    <div>
      <label>ID:</label>
      <input type="text" value={id} onChange={handleIdChange} />
      <br />
      <label>Ime:</label>
      <input type="text" value={firstname} onChange={handleFirstnameChange} />
      <br />
      <label>Prezime:</label>
      <input type="text" value={lastname} onChange={handleLastnameChange} />
      <br />
      <label>Lokacija:</label>
      <input type="text" value={location} onChange={handleLocationChange} />
      <br />
      <button onClick={handleSubmit}>Pošalji podatke</button>
    </div>
  );
};


