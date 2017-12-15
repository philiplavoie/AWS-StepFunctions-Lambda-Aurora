exports.handler = (event, context, callback) => {
    // TODO implement
    console.log("Processing order:inventoryExists:"+event.inventoryExists)
    callback(null, {"processOrder":true,"pid":event.pid});
};