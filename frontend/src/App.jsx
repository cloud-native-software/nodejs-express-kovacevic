import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Home } from './components/Home';
import { AddUser } from './components/AddUser';
import { Delete } from './components/Delete';


function App() {
  return (
    <>
      <Home />
      <AddUser />
      <Delete/>
      
      
    </>

  )
}


export default App;
