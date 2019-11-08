let AmazonCognitoIdentity = require('amazon-cognito-identity-js')

var authUser = function (params, callback) {
  if (!params || !params.Email || !params._password) {
    callback(new Error('Invalid parameters.'))
    return false
  }

  var poolData = {
    UserPoolId: 'ap-south-1_eggpvlisv',
    ClientId: '7hbu7opkgev1o9i77v2urrg346'
  }

  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
  var authData = {
    Username: params.Email,
    Password: params._password
  }

  var authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authData)
  var userData = {
    Username: params.Email,
    Pool: userPool
  }

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

  cognitoUser.authenticateUser(authDetails, {
    onSuccess: function (result) {
      console.log('got the result', result.getIdToken().getJwtToken())
      callback(null, {success: true, data: result})
    },
    onFailure: function (err) {
      console.log('authUser error: ', err)
      callback(err)
    }
  })
}

authUser({Email: 'TestCom_sameer@test.com', _password: '123123123'}, function () {})
