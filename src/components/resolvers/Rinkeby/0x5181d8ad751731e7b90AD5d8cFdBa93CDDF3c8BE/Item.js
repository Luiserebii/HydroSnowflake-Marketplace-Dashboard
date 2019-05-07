
import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

export default function Item({ ein }) {

  return (
    <div>
      <Typography component="h1">
        {this.props.title}
      </Typography>
      <ul>
        <li>{this.props.description}</li>
        <li>{this.props.price}</li>
        <li>{this.props.delivery}</li>
        { if(this.props.returnPolicy){ <li>this.props.returnPolicy</li> } }
      </ul>

      <ul>
        <li>UUID: {this.props.uuid}</li>
        <li>QTY: {this.props.quantity}</li>
        <li>Item Type: {this.props.itemType}</li>
        <li>Item Status: {this.props.status}</li>
        <li>Item Condition: {this.props.condition}</li>
      </ul>
    </div>
  );

);






}


