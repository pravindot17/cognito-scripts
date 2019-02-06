let AWS = require('aws-sdk')
global.fetch = require('node-fetch')

let AmazonCognitoIdentity = require('amazon-cognito-identity-js')
let authenticationData = {
  Username: 'suku',
  Password: '123123123'
}

let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData)
let userPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId: 'ap-southeast-1_jPVfhm4UF', // Your user pool id here
  ClientId: '65n8tu9ia9f8m5rpouv76gpv2d' // Your client id here
})
let userData = {
  Username: authenticationData.Username,
  Pool: userPool
}

let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
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
        IdentityPoolId: 'ap-southeast-1:978369af-f210-4db6-bae4-2944804634ee', // your identity pool id here
        Logins: {
          // Change the key below according to the specific region your user pool is in.
          'cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_jPVfhm4UF': result.getIdToken().getJwtToken()
        }
      })

      AWS.config.credentials.get((error) => {
        if (error) {
          // console.log('error', error)
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
