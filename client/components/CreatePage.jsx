import React from 'react';
import Form from './Form';
import PetPage from './PetPage';
import Dropdown from './Dropdown';

function CreatePage() {
  return (
    <div id='create-page'>
      {/* <h1>From create page</h1> */}
      <Dropdown />
      <Form />
      {/* <PetPage/> */}
    </div>
  );
}

export default CreatePage;
