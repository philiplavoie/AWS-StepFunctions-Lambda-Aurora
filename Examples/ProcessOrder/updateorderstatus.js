exports.handler = (event, context, callback) => {

    callback(null, {"updateOrderStatus":true,"pid":event.pid});
};