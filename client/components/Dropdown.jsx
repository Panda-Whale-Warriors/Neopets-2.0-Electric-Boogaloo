import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'

function Dropdown() {

  const navigate = useNavigate(); //redirect to pet page if selecting an already made pet

  const [dropdownData, setDropdownData] = useState([]);

  //get pets from DB for dropdown menu
  useEffect(() => {
    fetch('http://localhost:3000/create/pets', {
      method: 'GET',
    })
      .then((allPetsObjects) => allPetsObjects.json())
      .then((parsedPets) => {
        console.log('parsedPets----> ', parsedPets);
        setDropdownData(parsedPets);
      })
  }, []);

  function goToPetPage() {
    let petNames = document.getElementById("pet-names");
    let id = petNames.options[petNames.selectedIndex].id;
    console.log('id', id);

    // console.log('current target', /currentTarget)
    navigate(`/petpage/${id}`);
  }
  return (
    <div id='dropdown'>
      <label htmlFor='dog-names'>Select another pet</label>
      <select onChange={goToPetPage} name='pet-names' id='pet-names'>
        {dropdownData.map((pet) => <option id={pet._id}>{pet.name}</option>)}
      </select>
    </div>
  );
}

export default Dropdown;
