var AWS = require('aws-sdk')

let AmazonCognitoIdentity = require('amazon-cognito-identity-js')
var authenticationData = {
  Username: 'publisher', // cognito user
  Password: '123123123' // cognito password
}

var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData)
var userPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId: 'ap-southeast-1_ldcraHuIX', // Your user pool id here
  ClientId: '1plpqtqfiqdmoaat8i5dqu2bmm' // Your client id here
})
var userData = {
  Username: authenticationData.Username,
  Pool: userPool
}

var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
generateTokens()

function generateTokens () {
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: async function (result) {
      console.log('Authenticated to Cognito User and Identity Pools!')
      // let token = result.getIdToken().getJwtToken()
      // console.log('id token', token)

      // POTENTIAL: Region needs to be set if not already set previously elsewhere.
      AWS.config.region = 'ap-southeast-1'

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-southeast-1:c099ef25-d89e-488f-9ddf-e6cc6905242e', // your identity pool id here
        Logins: {
          // Change the key below according to the specific region your user pool is in.
          'cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_ldcraHuIX': result.getIdToken().getJwtToken()
        }
      })

      AWS.config.credentials.get((error) => {
        if (error) {
          console.log('error', error)
          console.error('You are not authorized to perform this action')
        } else {
          console.log(`Successfully logged with ${authenticationData.Username}!`)
          console.log('AKI:' + AWS.config.credentials.accessKeyId)
          console.log('AKS:' + AWS.config.credentials.secretAccessKey)
          console.log('token:' + AWS.config.credentials.sessionToken)
        }
      })
    },

    onFailure: function (err) {
      console.log('Fat gaaya', err.message || JSON.stringify(err))
    },

    newPasswordRequired: function (userAttributes, requiredAttributes) {
      console.log('userAttributes', userAttributes)
      console.log('requiredAttributes', requiredAttributes)
      // User was signed up by an admin and must provide new
      // password and required attributes, if any, to complete
      // authentication.

      // the api doesn't accept this field back
      delete userAttributes.email_verified

      // Get these details and call
      cognitoUser.completeNewPasswordChallenge('123123123', userAttributes, this)
    }
  })
}
