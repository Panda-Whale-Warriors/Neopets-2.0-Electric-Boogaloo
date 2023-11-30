import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from './StatusBar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal.jsx';
import { PET_MOVE, CHANGE_DIRECTION } from '../reducers/petReducer.js';

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
};

const HomePage = () => {
  const petIndexList = useSelector((store) => store.pet.petIndexList);
  const petDirectionList = useSelector((store) => store.pet.petDirectionList);
  const petColorList = useSelector((store) => store.pet.petColorList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async () => {
    const response = await fetch('/users', {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return navigate('/');
  };

  React.useEffect(() => {
    const movementTimer = setTimeout(() => {
      for (let i = 0; i < petIndexList.length; i++) {
        if (
          petIndexList[i][0] > 1000 ||
          petIndexList[i][0] < 150 ||
          petIndexList[i][1] > 650 ||
          petIndexList[i][1] < 150
        ) {
          dispatch(CHANGE_DIRECTION(i));
        }
      }
      dispatch(PET_MOVE());
    }, 200);
    return () => clearTimeout(movementTimer);
  });
  function mapPets() {
    const array = [];
    for (let j = 0; j < petIndexList.length; j++) {
      array.push(
        <img
          className='sprite'
          key={j}
          src={jellyfish[petColorList[j]]}
          style={{
            left: `${petIndexList[j][0]}px`,
            top: `${petIndexList[j][1]}px`,
          }}
        ></img>
      );
    }
    return array;
  }
  const petRenderings = mapPets();
  const statusStyle = {
    left: `${petIndex[0]}px`,
    top: `${petIndex[1] - 60}px`,
  };

  return (
    <div className='main-container'>
      <div>{petRenderings}</div>
      <div
        class='status'
        style={statusStyle}
      >
        <StatusBar />
      </div>
      <div className='logout'>
        <img
          className='ship'
          src='https://cdn.pixabay.com/photo/2014/12/21/23/43/shipwreck-575907_960_720.png'
          onClick={logOut}
        ></img>
        <p className='logtext'>LOG OUT</p>
      </div>
      <Modal></Modal>
      <button
        id='add-more-button'
        onClick={() => {
          document.getElementById('pick-your-pet').classList.add('active');
          document.getElementById('name-your-pet').classList.add('active');
          document.getElementById('overlay').classList.add('active');
        }}
      >
        <img src='https://www.svgrepo.com/show/170952/add-button.svg'></img>
      </button>
    </div>
  );
};

export default HomePage;
