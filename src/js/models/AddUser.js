var ko = require('knockout')
var ajax = require('basic-ajax')
var cookies = require('../cookies')
var getUrlParameter = require('../get-url-parameter')
var browser = require('../browser')
var BaseViewModel = require('./BaseViewModel')
var adminurls = require('../admin-urls')

function AddUser () {
  var self = this
  self.email = ko.observable()
  self.userCreated = ko.observable(false)

  self.save = function () {
    var endpoint = self.endpointBuilder.unverifiedUsers().build()
    var payload = {
      'Email': self.email(),
      'ProviderId': getUrlParameter.parameter('key')
    }
    ajax
      .post(endpoint, self.headers(cookies.get('session-token')), JSON.stringify(payload))
      .then(function (result) {
        self.message('User created.')
        self.userCreated(true)
        self.clearErrors()
        browser.redirect(adminurls.dashboard)
      }, function (error) {
        self.handleError(error)
      })
  }
  self.dataLoaded()
}

AddUser.prototype = new BaseViewModel()

module.exports = AddUser
