var express = require('express')
var router = express.Router()
var request = require('request')

/* GET home page. */
router.get('/*', function (req, res, next) {
  var url = 'https://kunaldemo.auth.ap-south-1.amazoncognito.com/login?response_type=token&client_id=757lu0jqjjulpmntrkl9n5sh9u&redirect_uri=http://localhost:3000'
  request({ url: url, followRedirect: true }, function (err, response, body) {
    if (err) res.statusCode(500).send(err.message)
    console.log('response.headers', response.headers)
    // res.send(response.headers.location)
  })
})

module.exports = router
