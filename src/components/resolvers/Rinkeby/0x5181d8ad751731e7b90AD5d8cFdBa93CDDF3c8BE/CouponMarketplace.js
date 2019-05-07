
import React, { useState } from 'react';
import { Typography, Input, Button } from '@material-ui/core';

export default function testComponent({ ein }) {

  let [ meme, setMeme ] = useState(calculateNewMeme(ein));
  let [ upperBound, setUpperBound ] = useState(1);  
  let [ result, setResult ] = useState('');

  //Generate a new Meme ID number on each reload
  //setMeme(calculateNewMeme(ein));

  

  return (
    <div>
      <Typography component="h1">
        "Random Number Generator"
      </Typography>
      <Input 
        id="numberMax"
        placeholder={"For example, type \"5\" to generate a number from 1-5"}
        required={true}
        onChange={e => setUpperBound(e.target.value)}
      />
      <Button
        onClick={
          /*Placed inside a function, otherwise we get this error below:
          Too many re-renders. React limits the number of renders to prevent an infinite loop.*/
          () => setResult(calcRandom(upperBound))
        }
      >
        "Generate!"
      </Button>
      <Typography id="result" component="h3">
        {result !== ''? "Your random number is: " + result : ''}
      </Typography>
      {/*<a href="serebii.io">{"Your EIN, uguu: " + ein}</a>
      <span>{"And your glorious MemeID number: " + meme}</span>*/}
      
      
      
    </div>
  );
  
  
  
 
  
  
}


function calculateNewMeme(num) {
  return num * 2 * calcRandom(10);
}

function calcRandom(x) {
  return Math.floor(Math.random() * x);
}
 
