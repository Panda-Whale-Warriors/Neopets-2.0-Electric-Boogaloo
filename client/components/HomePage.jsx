import React from "react";
import { useNavigate } from "react-router-dom";
import jellyfish from "../assets/giphy.gif";
import { useDispatch, useSelector } from "react-redux";
import { PET_MOVE, CHANGE_DIRECTION } from "../reducers/petReducer.js";

const HomePage = () => {
  const petIndex = useSelector((store) => store.pet.petIndex);
  const petDirection = useSelector((store) => store.pet.petDirection);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const movementTimer = setTimeout(() => {
      if (
        petIndex[0] > 1000 ||
        petIndex[0] < 150 ||
        petIndex[1] > 650 ||
        petIndex[1] < 150
      ) {
        dispatch(CHANGE_DIRECTION());
      }
      dispatch(PET_MOVE());
    }, 200);
    return () => clearTimeout(movementTimer);
  });
  const style = {
    left: `${petIndex[0]}px`,
    top: `${petIndex[1]}px`,
  };

  return (
    <div className="main-container">
      <img
        id="pet"
        src={
          "https://i.pinimg.com/originals/d9/cb/5c/d9cb5cd1f0183ffc8fd0b957803fa231.gif"
        }
        style={style}
      ></img>
    </div>
  );
};

export default HomePage;
