var sinon = require('sinon'),
  ajax = require('basic-ajax'),
  endpoints = require('../../src/js/api-endpoints'),
  adminurls = require('../../src/js/admin-urls'),
  browser = require('../../src/js/browser'),
  cookies = require('../../src/js/cookies')

describe('Logout', function() {
  var Model = require('../../src/js/models/Auth/Logout')
  var model
  var stubbedCookies
  var stubbedSetCookies

  beforeEach(function() {
    function fakeResolved(value) {
      return {
        then: function(success, error) {
          success({
            'status': 200,
            'json': {}
          })
        }
      }
    }

    stubbedApi = sinon.stub(ajax, 'delete')
    stubbedApi.returns(fakeResolved())

    stubbedCookies = sinon.stub(cookies, 'get').returns('stored-session-token')
    stubbedUnsetCookies = sinon.stub(cookies, 'unset')

    model = new Model()
  })

  afterEach(function() {
    ajax.delete.restore()
    cookies.get.restore()
    cookies.unset.restore()
  })

  it('should send session token to api', function() {
    var endpoint = endpoints.sessions + '/stored-session-token'
    var headers = {
      'content-type': 'application/json',
      'session-token': 'stored-session-token'
    }

    var apiCalledWithExpectedArgs = stubbedApi.withArgs(endpoint,
      headers,
      {}).calledOnce

    expect(apiCalledWithExpectedArgs).toBeTruthy()
  })

  it('should unset session token', function () {
      var cookieSetCalled = stubbedUnsetCookies.withArgs('session-token').calledOnce
      expect(cookieSetCalled).toBeTruthy()
  })

  it('should unset auth claims', function () {
      var cookieSetCalled = stubbedUnsetCookies.withArgs('auth-claims').calledOnce
      expect(cookieSetCalled).toBeTruthy()
  })
})
