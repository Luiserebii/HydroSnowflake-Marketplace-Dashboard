import React, { useState } from 'react';
import Item from './Item';
import { Typography, Input, Button } from '@material-ui/core';

export default function ItemList({ ein }) {

  return (
    {generateItems(this.props.items)}
  );

);

}

function generateItems(itemsRaw) {
  let itemsOut = itemsRaw.map((
    <Item
      title={itemsRaw.title}
      description={itemsRaw.}  
      price=
      delivery=
      returnPolicy=
      uuid=
      quantity=
      itemType=
      itemStatus=
      itemCondition=
    />
  ));
  

  return itemsOut;
}

