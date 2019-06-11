import React, { Component, lazy, useState } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useGenericContract } from '../../../../common/hooks'
import ItemList from './ItemList';
import { ABI } from './index';
import config from './config';
const util = require('util')

const getAllItemListings = (ItemFeature) => ItemFeature.methods['nextItemListingsID']().call().then(async (nextID) => {
  let items = []
  for(let i = 1; i < nextID; i++) {
    items.push(await ItemFeature.methods['itemListings'](i).call());
    items[i - 1].id = i;
  }
  return items;
});

const itemToString = (item) => item && `Selected item for purchase: ID: ${item.id} | UUID: ${item.uuid} | ${item.title} | ${item.price}`

const MarketplaceComponent = (props) => {
  const { ein, featureAddress, itemListings, onLoadItems, onSelectItem, selectedItem, vendorEIN, couponContract } = props;

  const [couponID, setCouponID] = useState('');

  console.log(itemListings);

  const handlePurchase = () => {
    console.log("PURCHASE CLICK");
    if(couponContract && selectedItem) {
      purchaseItem(window.ethereum.selectedAddress, couponID, couponContract, selectedItem);
    }
  }

  const purchaseItem = (_buyerAddress, _couponID, _couponContract, _selectedItem) => {
    const couponField = _couponID && _couponID !== '' ? _couponID : 0;
    _couponContract.methods.purchaseItem(_selectedItem.id, _buyerAddress, couponField).send({from: _buyerAddress});
  }

  return (
    <div>
      <h1>Snowflake Coupon Marketplace</h1>
      <h2>Vendor: {vendorEIN || 'Loading...'}</h2>
      <h3>ItemFeature Address: {featureAddress}</h3>

        <ItemList items={itemListings || []} setSelectedItem={onSelectItem} />
      
      <Typography component="h3">
        { itemToString(selectedItem) || '' }
      </Typography>
      <Button color='primary' onClick={onLoadItems}>
        Look Up
      </Button> <br/>
      <TextField
        id="coupon-field"
        label="Coupon code (if applicable)"
        onChange={(e) => setCouponID(e.target.value)}
        style={{"marginBottom": "50px"}}
      /> <br/>
      <Button variant='contained' color='primary' onClick={handlePurchase}>
        Purchase      
      </Button>      

    </div>
  )
}

export class MarketplaceContainer extends Component {
  state = {
    selectedItem: null,
  }

  handleLoadItems = async () => {
    console.log("MEM1")
    if(this.props.featureContract){ //BAND-AID 2: if(this.props.featureContract) to prevent undefined
      console.log("MEM2")
      const itemListings = await getAllItemListings(this.props.featureContract);
      console.log(itemListings);
      this.setState({ itemListings })
    }
  }

  handleSelectItem = selectedItem => this.setState({ selectedItem })

  render () {
    const { selectedItem } = this.state;
    const { ein, featureAddress, itemListings, couponContract, vendorEIN } = this.props;
    return (
      <MarketplaceComponent
        onSelectItem={this.handleSelectItem}
        onLoadItems={this.handleLoadItems}
        featureAddress={featureAddress}
        itemListings={itemListings}
        selectedItem={selectedItem}
        ein={ein}
        couponContract={couponContract}
        vendorEIN={vendorEIN}
      />
    )
  }
}
function MarketplaceCont2({featureAddress, couponContract, ein}) {

  const [itemListings, setItemListings] = useState(null);
  const [vendorEIN, setVendorEIN] = useState('');
  const featureContract = useGenericContract(featureAddress, config.ItemFeature.abi);

  if (featureContract && !itemListings) { 
    let itemPromise = getAllItemListings(featureContract);
    if(itemPromise) itemPromise.then(listings => {console.log("nnn", listings); console.log(typeof listings); setItemListings(listings); console.log(itemListings)}); //BAND-AID 1: if(promiseAllThing) to prevent undefined
  }
  if (couponContract && (!vendorEIN || vendorEIN === '')) {
    couponContract.methods.ownerEIN().call().then(vendEIN => { setVendorEIN(vendEIN)});
  }

  return <MarketplaceContainer 
    ein={ein}
    couponContract={couponContract}
    featureAddress={featureAddress}
    itemListings={itemListings}
    featureContract={featureContract}
    vendorEIN={vendorEIN}
  />
}

function MarketplaceCont({ ein }) {
  const couponContract = useGenericContract(config.CouponMarketplaceResolver.address, ABI);
  const [featureAddress, setFeatureAddress] = useState(null);
  if (couponContract && !featureAddress) couponContract.methods['ItemFeatureAddress']()
    .call().then(address => setFeatureAddress(address))
  if (!featureAddress || featureAddress == '') return <div>Loading ItemFeature address...</div>
  return <MarketplaceCont2 ein={ein} featureAddress={featureAddress} couponContract={couponContract} />
  
}

export default MarketplaceCont
