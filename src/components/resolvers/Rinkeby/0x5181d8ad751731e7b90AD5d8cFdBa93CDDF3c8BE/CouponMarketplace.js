
import React, { useState } from 'react';
import { Typography, Input, Button } from '@material-ui/core';
import ItemList from './ItemList';
import enums from './enums';

export default function CouponMarketplace({ ein }) {

  var itemListings = [
    {
      uuid: 7329140802,
      quantity: 1,
      itemType: enums.ItemType.DIGITAL,
      status: enums.ItemStatus.INACTIVE,
      condition: enums.ItemCondition.GOOD,
      title: "Test Item",
      description: "An item you should probably buy",
      price: 80,
      delivery: [1,2],
      tags: [],
      returnPolicy: 0
    },
    {
      uuid: 7329140802,
      quantity: 10,
      itemType: enums.ItemType.DIGITAL,
      status: enums.ItemStatus.ACTIVE,
      condition: enums.ItemCondition.NEW,
      title: "Test IMPROVED Item",
      description: "An item you should ***DEFINITELY*** buy",
      price: 100,
      delivery: [],
      tags: [],
      returnPolicy: 1
    }
  ];

  const [ currentItems, setCurrentItems ] = useState(itemListings);



  return (
    <ItemList
      items={currentItems}
    />
  );
  
  
  
}


function calculateNewMeme(num) {
  return num * 2 * calcRandom(10);
}

function calcRandom(x) {
  return Math.floor(Math.random() * x);
}
 
