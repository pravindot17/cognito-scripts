global.fetch = require('node-fetch')
let AmazonCognitoIdentity = require('amazon-cognito-identity-js')
var authenticationData = {
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

      let UserAttributes = [
        {
          Name: 'name', /* required */
          Value: 'Miss letma'
        }, {
          Name: 'gender', /* required */
          Value: 'Female'
        }, {
          Name: 'custom:oemname', /* required */
          Value: 'tenor'
        }
      ]
      cognitoUser.updateAttributes(UserAttributes, function (err, sData) {
        if (err) {
          console.log('got error while updating', err)
          throw err
        }
        console.log('Updated succesfully', sData)
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
