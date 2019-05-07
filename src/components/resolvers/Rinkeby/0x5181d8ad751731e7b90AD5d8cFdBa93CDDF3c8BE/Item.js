
import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

export default function Item(props) {

  return (
    <div>
      <Typography component="h1">
        {props.title}
      </Typography>
      <ul>
        <li>{props.description}</li>
        <li>{props.price}</li>
        <li>{props.delivery}</li>
        <li>{props.returnPolicy}</li>

      </ul>

      <ul>
        <li>UUID: {props.uuid}</li>
        <li>QTY: {props.quantity}</li>
        <li>Item Type: {props.itemType}</li>
        <li>Item Status: {props.status}</li>
        <li>Item Condition: {props.condition}</li>
      </ul>
    </div>
  );



}


