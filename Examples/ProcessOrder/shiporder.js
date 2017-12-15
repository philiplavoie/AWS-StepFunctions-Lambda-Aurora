exports.handler = (event, context, callback) => {

    callback(null, {"shipOrder":true,"pid":event.pid});
};