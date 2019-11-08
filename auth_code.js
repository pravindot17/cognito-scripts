let fetch = require('request')
let getTokenbyCode = code => {
  const details = {
    grant_type: 'authorization_code',
    code,
    client_id: '757lu0jqjjulpmntrkl9n5sh9u',
    redirect_uri: 'http://localhost:3000'
  }
  const formBody = Object.keys(details)
    .map(
      key => `${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`
    )
    .join('&')

  fetch({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    uri: 'https://kunaldemo.auth.ap-south-1.amazoncognito.com/oauth2/token',
    body: formBody,
    method: 'POST'
  }, function (err, res, body) {
    // it works!
    console.log('got the fucking error', err)
    console.log('got the fucking body', body)
  })
}

getTokenbyCode('6d5c6e9c-ff45-4d7b-a9a8-1a7e76706d95')
