exports.handler = (event, context, callback) => {

    callback(null, {"chargeCustomer":true,"pid":event.pid});
};