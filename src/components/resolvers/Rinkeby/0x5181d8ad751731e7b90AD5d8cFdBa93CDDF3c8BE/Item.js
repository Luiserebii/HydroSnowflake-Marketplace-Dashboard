
import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import allEnums from './enums';
const enums = allEnums.CouponMarketPlaceResolverInterface.e;
const enumToStr = allEnums.CouponMarketPlaceResolverInterface.toString;

export default function Item(props) {

  const defaultColor = '#217ff6';
  const [ color, setColor ] = useState(defaultColor);
  const hoverColor = '#529bf8';

  return (
    <div
      style = {{
        'background-color': color,
        'width': '100%',
        'height': '100%',
        'border-radius': '15px',
        'margin-bottom': '25px',
        'padding': '10px'
      }}
      onMouseOver={() => setColor(hoverColor)}
      onMouseLeave={() => setColor(defaultColor)}
    >
      <Typography component="h1">
        {props.title}
      </Typography>
      <ul>
        <li>{props.description}</li>
        <li>Price: {props.price}</li>
        <li>Delivery Methods: {props.delivery}</li>
        <li>Return Policy: {props.returnPolicy}</li>

      </ul>

      <ul>
        <li>UUID: {props.uuid}</li>
        <li>QTY: {props.quantity}</li>
        <li>Item Type: {enumToStr("ItemType", props.itemType)}</li>
        <li>Item Status: {enumToStr("ItemStatus", props.status)}</li>
        <li>Item Condition: {enumToStr("ItemCondition", props.condition)}</li>
      </ul>
    </div>
  );



}


