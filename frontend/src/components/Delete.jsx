import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Delete = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setData(response.data);
      } catch (error) {
        console.error('Greška pri dohvatanju podataka:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/users/${id}`);
      if (response.status === 200) {
        console.log('Podatak uspešno obrisan.');
        // Opcionalno: Ažurirajte stanje komponente nakon brisanja
        setData(data.filter(item => item.id !== id));
      } else {
        console.error('Greška pri brisanju podataka:', response.data.message);
      }
    } catch (error) {
      console.error('Greška pri brisanju podataka:', error);
    }
  };

  return (
    <div>
      <h1>Podaci sa bekenda:</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.firstname} {item.lastname} ({item.location})
            <button onClick={() => handleDelete(item.id)}>Obriši</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


