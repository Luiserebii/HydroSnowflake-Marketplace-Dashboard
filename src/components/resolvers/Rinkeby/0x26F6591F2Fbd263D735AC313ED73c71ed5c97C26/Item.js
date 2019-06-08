
import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import allEnums from './enums';
const enums = allEnums.CouponMarketPlaceResolverInterface.e;
const enumToStr = allEnums.CouponMarketPlaceResolverInterface.toString;

export default function Item(props) {

  const defaultColor = '#217ff6';
  const [ color, setColor ] = useState(defaultColor);
  const hoverColor = '#529bf8';

  console.log("THIS IS ITEM: ");
  console.log(props);

  const ulStyle = { listStyleType: "none" };

  return (
    <div
      style = {{
        'backgroundColor': color,
        'width': '100%',
        'height': '100%',
        'borderRadius': '15px',
        'marginBottom': '25px',
        'padding': '10px',
        'cursor': 'pointer'
      }}
      onMouseOver={() => setColor(hoverColor)}
      onMouseLeave={() => setColor(defaultColor)}
      onClick={() => props.setSelectedItem({uuid: props.uuid, title: props.title, price: props.price})}
    >
      <Typography variant="h5" component="h5">
        {props.title}
      </Typography>
      <ul style={ ulStyle }>
        <li><b>Description:</b> {props.description}</li>
        <li><b>Price:</b> {props.price}</li>
        <li><b>Delivery Methods:</b> {props.delivery}</li>
        <li><b>Return Policy:</b> {props.returnPolicy}</li>

      </ul>

      <ul style={ ulStyle }>
        <li><b>ID:</b> {props.id}</li>
        <li><b>UUID:</b> {props.uuid}</li>
        <li><b>QTY:</b> {props.quantity}</li>
        <li><b>Item Type:</b> {enumToStr("ItemType", props.itemType)}</li>
        <li><b>Item Status:</b> {enumToStr("ItemStatus", props.status)}</li>
        <li><b>Item Condition:</b> {enumToStr("ItemCondition", props.condition)}</li>
      </ul>
    </div>
  );



}


