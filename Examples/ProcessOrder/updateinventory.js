exports.handler = (event, context, callback) => {
    callback(null, {"updateInventory":true,"pid":event.pid});
};