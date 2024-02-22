import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UpdateModal } from './UpdateModal';

export const Delete = () => {
  const [data, setData] = useState([]);
  const [modal, setModal]= useState(false)
  const [item, setItem] = useState({
    id:"",
    firstname:"",
    lastname:"",
    location:""
  })

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
        setData(data.filter(item => item.id !== id));
      } else {
        console.error('Greška pri brisanju podataka:', response.data.message);
      }
    } catch (error) {
      console.error('Greška pri brisanju podataka:', error);
    }
  };
  const handleUpdateClick = (e) => {
    setModal(!modal);
    setItem({
      id: e.id,
     firstname: e.firstname,
     lastname: e.lastname,
     location: e.location
    }) 
  };

  
  return (
      <div>
      <h1>Podaci sa bekenda:</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
          {item.firstname} {item.lastname} ({item.location})
            <button onClick={() => handleDelete(item.id)}>Obriši</button>
            <button onClick={() => handleUpdateClick(item)} >Apdejt</button>
          </li>
        ))}
      </ul>
      {modal && <UpdateModal drvo={item}/>}
    </div>
    
  );
};


