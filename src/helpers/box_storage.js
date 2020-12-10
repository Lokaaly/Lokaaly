const BoxSDK = require('box-node-sdk');

// Initialize the SDK with your app credentials
const boxSdk = new BoxSDK({
  clientID: 'wae30kowbadwm9zqarpj1uhsspsm5d61',
  clientSecret: 'ssWbcHqLY3zBTanGv5uVC1I61rJeAlxF'
});

const basicBoxClient = boxSdk.getBasicClient('MV8obQ4VJ7iPn2tL9xcSW33sGOszJAVm');
module.exports = { basicBoxClient };
// Create a basic API client, which does not automatically refresh the access token
// const client = boxSdk.getBasicClient('DEVELOPER_TOKEN');

// // Get your own user object from the Box API
// // All client methods return a promise that resolves to the results of the API call,
// // or rejects when an error occurs
// client.users.get(client.CURRENT_USER_ID)
// 	.then(user => console.log('Hello', user.name, '!'))
// 	.catch(err => console.log('Got an error!', err));