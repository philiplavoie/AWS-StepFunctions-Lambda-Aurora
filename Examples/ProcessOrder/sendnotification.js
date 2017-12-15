exports.handler = (event, context, callback) => {

    callback(null, {"sendNotification":true,"pid":event.pid});
};