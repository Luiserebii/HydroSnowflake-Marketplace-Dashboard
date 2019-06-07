import React, { Component, lazy, useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import { useGenericContract } from '../../../../common/hooks'
import ItemList from './ItemList';
import { ABI } from './index';
import config from './config';
const util = require('util')

/*const getAllItemListings = (ItemFeature) => {
  console.log("ZOOT");
  console.log(util.inspect(ItemFeature.methods.nextItemListingsID)); 
  ItemFeature.methods['nextItemListingsID']().call().then(nextID => {
    console.log("FLAG1")
    let promiseArr = []
    console.log("FLAG2")
    for(let i = 0; i < nextID; i++) {
      console.log("THIS IS THE NEXTID: " + nextID + "\nI: " + i);
      console.log("PROMISEARR BEFORE PUSH")
      console.log(promiseArr)
      promiseArr.push(ItemFeature.methods['itemListings'](i).call());
    }
    console.log("FFFFFFFFLLLLFFFFF");
    console.log(/*util.inspect(promiseArr)promiseArr)
    return Promise.all(promiseArr) 
  });
}*/

const getAllItemListings = ItemFeature => ItemFeature.methods['nextItemListingsID'].call().then(nextID => {
  let promiseArr = []
  for(let i = 0; i < nextID; i++) promiseArr.push(ItemFeature.methods['itemListings']().call(i));
  return Promise.all(promiseArr) 
});

const itemToString = (item) => item && `Selected item for purchase: UUID: ${item.uuid} | ${item.title} | ${item.price}`

const MarketplaceComponent = (props) => {
  const { ein, featureAddress, itemListings, onLoadItems, onSelectItem, selectedItem } = props;
  return (
    <div>
      <h1>Snowflake Coupon Marketplace</h1>
      <h2>Vendor: {ein}</h2>
      <h3>ItemFeature Address: {featureAddress}</h3>

        <ItemList items={itemListings || []} setSelectedItem={onSelectItem} />
      
      <Typography component="h3">
        { itemToString(selectedItem) || '' }
      </Typography>
      <Button variant='contained' color='primary' onClick={onLoadItems}>
        Look Up
      </Button>
    </div>
  )
}

export class MarketplaceContainer extends Component {
  state = {
    selectedItem: null,
  }

  handleLoadItems = async () => {
    if(this.state.featureContract){ //BAND-AID 2: if(this.state.featureContract) to prevent undefined
      const itemListings = await getAllItemListings(this.state.featureContract);
      this.setState({ itemListings })
    }
  }

  handleSelectItem = selectedItem => this.setState({ selectedItem })

  render () {
    const { selectedItem } = this.state;
    const { ein, featureAddress, itemListings } = this.props;
    return (
      <MarketplaceComponent
        onSelectItem={this.handleSelectItem}
        onLoadItems={this.handleLoadItems}
        featureAddress={featureAddress}
        itemListing={itemListings}
        selectedItem={selectedItem}
        ein={ein}
      />
    )
  }
}
function MarketplaceCont2({featureAddress, couponContract, ein}) {
  //console.log(featureAddress)
  const [itemListings, setItemListings] = useState(null);
  const featureContract = useGenericContract(featureAddress, config.ItemFeature.abi);
  //console.log(featureContract)
  if (featureContract && !itemListings) { 
    let promiseAllThing = getAllItemListings(featureContract);
    //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaaa")
    //console.log(promiseAllThing)
    if(promiseAllThing) promiseAllThing.then(listings => setItemListings(listings)); //BAND-AID 1: if(promiseAllThing) to prevent undefined
  }
  return <MarketplaceContainer 
    ein={ein}
    couponContract={couponContract}
    featureAddress={featureAddress}
    itemListings={itemListings}
    featureContract={featureContract}
  />
}

function MarketplaceCont({ ein }) {
  const couponContract = useGenericContract(config.CouponMarketplaceResolver.address, ABI);
  const [featureAddress, setFeatureAddress] = useState(null);
  if (couponContract && !featureAddress) couponContract.methods['ItemFeatureAddress']()
    .call().then(address => setFeatureAddress(address))
  if (!featureAddress || featureAddress == '') return <div>henlo fren</div>
  return <MarketplaceCont2 ein={ein} featureAddress={featureAddress} couponContract={couponContract} />
  
}

export default MarketplaceCont
