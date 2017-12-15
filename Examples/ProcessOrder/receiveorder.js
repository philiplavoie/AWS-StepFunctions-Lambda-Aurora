exports.handler = (event, context, callback) => {
    // TODO implement
    console.log('Order Received:'+"Product:"+event.pid+" ,Quantity:"+event.quantity);
    if(event.quantity < 5){
        callback(null, {"inventoryExists":true,"pid":event.pid});
    }else{
        callback(null, {"inventoryExists":false,"pid":event.pid});
    }
    
};