import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const i = {
  BASE_URL: "https://fsa-puppy-bowl.herokuapp.com/api/2303-FTB-ET-WEB-FT",
  P: "/players",
  T: "/teams",
};

const SingleDog = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState({});
  //console.log(params);
  useEffect(() => {
    const fetchPuppy = async () => {
      const { BASE_URL, P } = i;
      const response = await fetch(BASE_URL + P + `/${id}`);
      const {
        data: { player },
      } = await response.json();
      console.log(player);
      setPlayer(player);
    };

    fetchPuppy();
  }, []);

  return (
    <div>
      <img
        style={{
          height: "200px",
          width: "200px",
        }}
        src={player.imageUrl}
      />
      <h4>Name: {player.name}</h4>
      <h4>Breed: {player.breed}</h4>
      <h4>Field Status: {player.status}</h4>
      <h4>ID: {player.id}</h4>
     
      
    </div>
  );
};

export default SingleDog;