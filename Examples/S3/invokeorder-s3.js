var AWS = require("aws-sdk");
require("aws-sdk-stepfunctions");

var stepfunctions = new AWS.StepFunctions();
var s3 = new AWS.S3();
exports.handler = (event, context, callback) => {

    // Get the object from the event and show its content type
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    console.log("-------------"+bucket+",----------"+key);
   
    const params = {
        Bucket: bucket,
        Key: key,
    };

    s3.getObject(params, (err, data) => {
        if (err) {
            const message = 'Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.';
            console.log(message);
            callback(message);
            
        } else {
                var OrderJson = JSON.parse(data.Body.toString());

                var wf_params = {
                  stateMachineArn: 'STATE_MACHINE_ARN', /* required */
                  input: '{"pid":'+OrderJson.pid+',"quantity":'+OrderJson.quantity+'}',
                  name: 'Execution_Lambda_'+OrderJson.pid
                };
                stepfunctions.startExecution(wf_params, function(err, data) {
                  if (err) {
                      console.log(err, err.stack);
                      callback(null, err);
                  }
                  else{
                      console.log(data);
                      callback(null, data);
                  }     
            });
        }
    });


};