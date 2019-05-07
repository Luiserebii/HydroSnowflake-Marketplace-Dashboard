import React, { useState } from 'react';
import Item from './Item';
import { Typography, Input, Button } from '@material-ui/core';

export default function ItemList(props) {

  return (
    <div>
      { generateItems(props.items) }
    </div>
  );

}

function generateItems(items) {
  let itemsRes = items.map(item => {

    return (
      <Item
        uuid = {item.uuid}
        quantity = {item.quantity}
        itemType = {item.itemType}
        status = {item.status}
        condition = {item.condition}
        title = {item.title}
        description = {item.description}
        price = {item.price}
        delivery = {item.delivery}
        tags = {item.tags}
        returnPolicy = {item.returnPolicy}
      />

    );
  });

  return itemsRes;
}

