exports.handler = (event, context, callback) => {

    callback(null, {"notifyProcurement":true,"pid":event.pid});
};