
import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

export default function Item({ ein }) {

  //const [ item, setItem ] = useState({});  
  
  
  return (
    <div>
      <Typography component="h1">
        {this.props.item.title}
      </Typography>
      <ul>
        <li>{this.props.item.description}</li>
        <li>{this.props.item.price}</li>
        <li>{this.props.item.delivery}</li>
        { if(this.props.item.returnPolicy){ <li>this.props.item.returnPolicy</li> } }
      </ul>

      <ul>
        <li>UUID: {this.props.item.uuid}</li>
        <li>QTY: {this.props.item.quantity}</li>
        <li>Item Type: {this.props.item.itemType}</li>
        <li>Item Status: {this.props.item.itemStatus}</li>
        <li>Item Condition: {this.props.item.itemCondition}</li>
      </ul>
    </div>
  );

);






}


