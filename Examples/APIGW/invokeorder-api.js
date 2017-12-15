var AWS = require("aws-sdk");
require("aws-sdk-stepfunctions");

var stepfunctions = new AWS.StepFunctions();
exports.handler = (event, context, callback) => {
    var params = {
      stateMachineArn: 'STATE_MACHINE_ARN',
      input: '{"pid":'+event.params.querystring.pid+',"quantity":'+event.params.querystring.quantity+'}',
      name: 'Execution_Lambda_'+event.params.querystring.pid
    };
    stepfunctions.startExecution(params, function(err, data) {
      if (err) {
          console.log(err, err.stack);
          callback(null, err);
      }
      else{
          console.log(data);
          callback(null, data);
      }     
    });
};