/*

General file to define enums within contracts; utility for working with values passed/returned by web3 that utilize enums. There could be a way to automate this, should this be one solution to go with; there are likely better ones, but I will utilize this for the moment.

*/

const cmprI = {};

cmprI.ItemType = { DIGITAL: 0, PHYSICAL: 1 }
cmprI.ItemStatus = { ACTIVE: 0, INACTIVE: 1 }
cmprI.ItemCondition = { NEW: 0, LIKE_NEW: 1, VERY_GOOD: 2, GOOD: 3, ACCEPTABLE: 4 }
cmprI.CouponType = { AMOUNT_OFF: 0, PERCENTAGE_OFF: 1, BUY_X_QTY_GET_Y_FREE: 2, BUY_X_QTY_FOR_Y_AMNT: 3 }


function cmprIToStr(type, enumVal) {
  if(type == 'ItemType'){

    let e = cmprI.ItemType;
    if(enumVal == e.DIGITAL) 
      { return 'Digital' } 
    else if(enumVal == e.PHYSICAL)
      { return 'Physical' }
    
  } else if(type == "ItemStatus"){

    let e = cmprI.ItemStatus;
    if(enumVal == e.ACTIVE)
      { return 'Active' }
    else if(enumVal == e.INACTIVE)
      { return 'Inactive' }

  } else if(type == "ItemCondition"){

    let e = cmprI.ItemCondition;
    if(enumVal == e.NEW)
      { return 'New' }
    else if(enumVal == e.LIKE_NEW) 
      { return 'Like New' }
    else if(enumVal == e.VERY_GOOD)
      { return 'Very Good' }
    else if(enumVal == e.GOOD)
      { return 'Good' }
    else if(enumVal == e.ACCEPTABLE)
      { return 'Acceptable' }

  } else if(type == "CouponType"){

    let e = cmprI.CouponType;
    if(enumVal == e.AMOUNT_OFF)
      { return 'Amount off' }
    else if(enumVal == e.PERCENTAGE_OFF)
      { return 'Percentage off' }
    else if(enumVal == e.BUY_X_QTY_GET_Y_FREE)
      { return 'Buy X QTY, Get Y FREE' }
    else if(enumVal == e.BUY_X_QTY_FOR_Y_AMNT)
      { return 'Buy X QTY for Y AMOUNT' }
    
  }

}

const enums = {

  CouponMarketPlaceResolverInterface: { "e": cmprI, "toString": cmprIToStr }

}

console.log(enums.CouponMarketPlaceResolverInterface.e)

module.exports = enums;
