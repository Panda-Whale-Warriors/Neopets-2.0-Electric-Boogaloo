import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CHOOSE_NEW_PET } from '../reducers/petReducer.js';
const jellyfish = {
  yellow:
    'https://cdn.discordapp.com/attachments/317784599612882945/1179561067509186620/d9cb5cd1f0183ffc8fd0b957803fa231_4.gif?ex=657a3ad9&is=6567c5d9&hm=3bf76d0c1d790986ea9d3be460862cd4472e5f9014f5b5d53e21bd93d567c514&',
  green:
    'https://cdn.discordapp.com/attachments/317784599612882945/1179563440575107072/d9cb5cd1f0183ffc8fd0b957803fa231_6.gif?ex=657a3d0f&is=6567c80f&hm=b02e0ce1788e188f6c74540483c744e92f73812b2db0f4147f1cd8ed9a7529da&',
  haunted:
    'https://cdn.discordapp.com/attachments/317784599612882945/1179564957298339950/d9cb5cd1f0183ffc8fd0b957803fa231_8.gif?ex=657a3e79&is=6567c979&hm=1edbf86bfd02f2999647a07d841539e5a708a0662e416c5f6a55f63f7a6e0b47&',
  white:
    'https://cdn.discordapp.com/attachments/317784599612882945/1179572144812871771/d9cb5cd1f0183ffc8fd0b957803fa231_10.gif?ex=657a452a&is=6567d02a&hm=1098258aeaa76cabc81415d1aa6cba422246a1a454c1005f60050f3436ff1713&',
  blue: 'https://cdn.discordapp.com/attachments/317784599612882945/1179559036430065765/d9cb5cd1f0183ffc8fd0b957803fa231_3.gif?ex=657a38f5&is=6567c3f5&hm=b497a665b61756f9eff562a09774d8aa6340857dbffb54c959f18b8507947b2d&',
  purple:
    'https://i.pinimg.com/originals/d9/cb/5c/d9cb5cd1f0183ffc8fd0b957803fa231.gif',
  rainbow:
    'https://media.discordapp.net/attachments/317784599612882945/1179589281329721475/d9cb5cd1f0183ffc8fd0b957803fa231_12.gif?ex=657a5520&is=6567e020&hm=173b8cf9d7154bb73df319a63511192d28d8a41328878e989009810c7d55cf70&=',
  orange:
    'https://media.discordapp.net/attachments/317784599612882945/1179583647121158196/d9cb5cd1f0183ffc8fd0b957803fa231_11.gif?ex=657a4fe1&is=6567dae1&hm=83d562d26c54af0cf23e072f4add471c87efad64fa0b0232b319a2559089f3c0&=',
  transparent:
    'https://media.discordapp.net/attachments/317784599612882945/1179838180644634745/d9cb5cd1f0183ffc8fd0b957803fa231_11_1.gif?ex=657b3cee&is=6568c7ee&hm=6a24732252487f6931b87f802fa077be64723ee71ec6a6a0909a00604990d030&=',
};

let picture = '';

const Modal = () => {
  const dispatch = useDispatch();

  function mapJellyfishButtons() {
    const array = [];
    for (let color in jellyfish) {
      array.push(
        <button
          key={color}
          className='jellyfish-buttons'
          onClick={(e) => {
            document.getElementById('pick-your-pet').classList.remove('active');
            // console.log(e);
            picture = color;
            console.log(picture);
            // dispatch(CHOOSE_NEW_PET(color));
          }}
        >
          <img src={jellyfish[color]}></img>
        </button>
      );
    }
    return array;
  }
  const jellyfishButtons = mapJellyfishButtons();
  return (
    <div>
      <div
        className='overlay active'
        id='overlay'
      ></div>
      <div
        className='modal active'
        id='name-your-pet'
      >
        <h4>Name your pet:</h4>
        <img
          id='chosen-pet'
          src=''
        ></img>
        <input
          type='text'
          id='petname'
        ></input>
        <button
          className='button'
          id='close-modal-button'
          onClick={() => {
            console.log('picture---', picture);
            document.getElementById('name-your-pet').classList.remove('active');
            document.getElementById('overlay').classList.remove('active');
            dispatch(CHOOSE_NEW_PET(picture));
            return fetch('/create/pets', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: document.getElementById('petname').value,
                picture: picture,
              }),
            });
          }}
        >
          CLOSE
        </button>
      </div>
      <div
        className='modal active'
        id='pick-your-pet'
      >
        <p>
          <strong>Pick your pet:</strong>
        </p>
        <div id='jellyfish-buttons-container'>{jellyfishButtons}</div>
      </div>
    </div>
  );
};

export default Modal;
