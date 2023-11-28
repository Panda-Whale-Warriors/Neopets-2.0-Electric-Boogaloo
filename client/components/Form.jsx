import React from 'react'
// import {withRouter} from 'react-router-dom'
import { useNavigate } from 'react-router'
import shark from '../assets/goblin_shark_puppy_by_tsaoshin_df0germ-pre.jpeg'
import redlip from '../assets/red-lipped.jpeg'
import crab from '../assets/yeti-crab-prints Medium.jpeg'

//    event.preventDefault();
function Form() {
    const navigate = useNavigate();
    function handleContinue (e) {
        //get input from name input
        e.preventDefault();
        const inputName = document.getElementById('name').value;
        console.log('inputName: ', inputName);
        let petPicture;
        //get input from whichever picture is chosen
        petPicture = document.querySelector('input[name="petName"]:checked').value;
        console.log('petPicture: ', petPicture);
        //send this data on POST request body
        fetch('http://localhost:3000/create', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({name: inputName, picture: petPicture})

        })
        //THEN invoke react router for PetPage
        .then((response) => response.json())
        .then((data) => {
          navigate(`/petpage/${data._id}`)
        })
            // .then(() => {
            //     fetch('http://localhost:8080/create/pets', {
            //         method: 'GET',
            //         mode: 'cors'
            //     })
            // })
            .catch((error) => console.log('this is not working', error))
    }

    return(
   <form id="create pet">

        <label htmlFor="name">Pet's name</label>
        <input type="text" id="name"/>

      <fieldset>
        <picture>
            {/* <source srcSet="https://cdn3.vectorstock.com/i/1000x1000/08/17/goblin-shark-vector-9340817.jpg" /> */}
            <img src={shark} alt="shark" style={{width: '48px', height: '48px'}}/>
        </picture>
        <label htmlFor="pet1">Pet 1</label>
        <input type="radio" id="shark" name="petName" value="shark"/>

        <div id='pet-box'>
          <picture>
            {/* <source srcSet='https://cdn3.vectorstock.com/i/1000x1000/08/17/goblin-shark-vector-9340817.jpg' /> */}
            <img
              src={redlip}
              alt="red-lip"
              style={{ width: '48px', height: '48px' }}
            />
          </picture>
          <label htmlFor='pet2'>Pet 2</label>
          <input type='radio' id='batfish' name='petName' value='batfish' />
        </div>

        <div id='pet-box'>
          <picture>
            {/* <source srcSet='https://cdn3.vectorstock.com/i/1000x1000/08/17/goblin-shark-vector-9340817.jpg' /> */}
            <img
              src={crab}
              alt='shark'
              style={{ width: '48px', height: '48px' }}
            />
          </picture>
          <label htmlFor='pet3'>Pet 3</label>
          <input type='radio' id='crab' name='petName' value='crab' />
        </div>
      </fieldset>

      <button onClick={handleContinue}>Continue</button>
    </form>
  );
}

export default Form;
