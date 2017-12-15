exports.handler = (event, context, callback) => {
    // TODO implement
    console.log("Decline Order:inventoryExists:"+event.inventoryExists);
    callback(null, {"declineOrder":true,"pid":event.pid});
};