
import React, { Component, lazy } from 'react';
import { Typography, Button } from '@material-ui/core';
import { useGenericContract } from '../../../../common/hooks'
import ItemList from './ItemList';
import { ABI } from './index';
import config from './config';

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
    couponContract: null,
    featureAddress: null,
    featureContract: null,
    itemListings: null,
    selectedItem: null,
  }

  componentDidMount = async () => {
    const couponContract = useGenericContract(config.CouponMarketplaceResolver.address, ABI);
    const featureAddress = await couponContract.methods['ItemFeatureAddress']().call();
    const featureContract = useGenericContract(featureAddress, config.ItemFeature.abi);
    const itemListings = await getAllItemListings(featureContract);
    this.setState({
      couponContract,
      featureAddress,
      featureContract,
      itemListings
    })
  }

  handleLoadItems = async () => {
    const itemListings = await getAllItemListings(this.state.featureContract);
    this.setState({ itemListings })
  }

  handleSelectItem = selectedItem => this.setState({ selectedItem })

  render () {
    const { featureAddress, itemListings, selectedItem } = this.state;
    const { ein } = this.props;
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

export default ({ ein }) => <MarketplaceContainer ein={ein} />
