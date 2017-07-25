'use static'
let  printReceipt =inputs =>{
   let cartItem = buildItem(inputs);
   let itemSubTotle = itemPrice(cartItem);
};
//统计商品信息
let buildItem = inputs =>{
    let cartItems = [];
    let allItems = loadAllItems();
    for(let i of inputs){
        splitInput = i.split("-");
        let barcode = splitInput[0];
        let count = parseFloat(splitInput[1] ||1)
        let cartItem = cartItems.find((cartItem)=>cartItem.item.barcode === barcode);
        if(cartItem){
            cartItem.count += count;
        }
        else {
            let item = allItems.find((item)=> item.barcode === barcode);
            cartItems.push({item: item, count: count});
        }
    }
    return cartItems;
}

//统计商品总价

let itemPrice = cartItem=>{
    return cartItem.map(cartItem=>{
        let promotionType = getPromotionType(cartItem);
        let {saved,subtotal} = discount(promotionType,cartItem);
        return {cartItem,saved,subtotal};
    })
}

let  getPromotionType=(cartItem)=>{
    let promotions = loadPromotions();
    let promotion = promotions.find((promotion)=>promotion.barcodes.includes(cartItem.item.barcode));
    return promotion?promotion.type0:' ';
}

let discount = (promotionType,cartItem)=>{

}