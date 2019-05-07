
import React, { useState } from 'react';
import { Typography, Input, Button } from '@material-ui/core';
import { useGenericContract } from '../../../../common/hooks'
import ItemList from './ItemList';
import allEnums from './enums';
import { ABI } from './index';
import config from './config';

const enums = allEnums.CouponMarketPlaceResolverInterface.e;
const enumToStr = allEnums.CouponMarketPlaceResolverInterface.toString;


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
  const [ selectedItem, setSelectedItem ] = useState({});

  const couponMarketplaceContract = useGenericContract(config.CouponMarketplaceResolver.address, ABI)
  const [ itemFeatureAddress, setItemFeatureAddress ] = useState('');
  couponMarketplaceContract.methods['ItemFeatureAddress']().call().then(value => setItemFeatureAddress(value));
  const [ output, setOutput ] = useState()
  //const itemFeatureContract = useGenericContract(output, config.ItemFeature.ABI)


  return (
    <div>
      <h1>Snowflake Coupon Marketplace</h1>
      <h2>Vendor: {ein}</h2>
      <h3>ItemFeature Address: {itemFeatureAddress ? itemFeatureAddress : null}</h3>
      <ItemList
        items={currentItems}
        setSelectedItem={setSelectedItem}
      />
      <Typography component="h3">
        { selectedItem.uuid ? "Selected item for purchase: " + "UUID: " + selectedItem.uuid + " | " + selectedItem.title + " | " + selectedItem.price : ''}
      </Typography>
    </div>
  );
  
  
  
}


async function getAllItemListings(){
/*
  let itemListings = [];
  nextID = await instances.ItemFeature.nextItemListingsID.call();
  for(int i = 0; i < nextID; i++) {
    itemListings.push(await instances.ItemFeature.itemListings.call(i));
  }
  return itemListings;
*/
}

function calculateNewMeme(num) {
  return num * 2 * calcRandom(10);
}

function calcRandom(x) {
  return Math.floor(Math.random() * x);
} 
