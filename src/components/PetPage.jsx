import React from 'react';
import StatusBar from './StatusBar';
import Dropdown from './Dropdown';
import { useState, useEffect } from 'react';
import shark from '../assets/goblin_shark_puppy_by_tsaoshin_df0germ-pre.jpeg';
import redlip from '../assets/red-lipped.jpeg';
import crab from '../assets/yeti-crab-prints Medium.jpeg';

function PetPage() {
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = window.location.href;
    console.log('URL------>', url);
    let id = url.substring(url.lastIndexOf('/') + 1);
    console.log('id------>', id);

    fetch(`http://localhost:3000/create/pets/${id}`, {
      method: 'GET',
      mode: 'cors',
    })
      .then((pet) => pet.json())
      .then((parsedPet) => {
        setSource(getPetImages(parsedPet.picture));
      })
      .catch((error) => {
        console.log('Error fetching', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function getPetImages(petPictures) {
    switch (petPictures) {
      case 'shark':
        return shark;
      case 'crab':
        return crab;
      case 'batfish':
        return redlip;
      default:
        return ''; // You might want to provide a default image or handle this case differently
    }
  }

  return (
    <div id='pet-page'>
      <Dropdown />
      <StatusBar />
      <picture>
        <img
          src={source}
          alt='shark'
          style={{ width: '100px', height: '100px' }}
        />
      </picture>
    </div>
  );
}

export default PetPage;
