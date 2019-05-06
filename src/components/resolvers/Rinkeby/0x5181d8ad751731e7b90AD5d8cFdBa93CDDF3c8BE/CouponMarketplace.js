
import React, { useState } from 'react';


export default function testComponent({ ein }) {

  let [ meme, setMeme ] = useState(calculateNewMeme(ein));
  
  //Generate a new Meme ID number on each reload
  //setMeme(calculateNewMeme(ein));

  

  return (
    <div>
      <a href="serebii.io">{"Your EIN, uguu: " + ein}</a>
      <span>{"And your glorious MemeID number: " + meme}</span>
    </div>
  );
  
  
  
 
  
  
}


function calculateNewMeme(num) {
  return num * 2 * Math.floor(Math.random() * 10);
};
 
