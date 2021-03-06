var sinon = require('sinon'),
    ajax =      require('basic-ajax'),
    endpoints = require('../../src/js/api-endpoints'),
    adminurls = require('../../src/js/admin-urls'),
    browser =   require('../../src/js/browser'),
    cookies =   require('../../src/js/cookies'),
    getUrlParameter = require('../../src/js/get-url-parameter')

describe ('Service Provider Addresses', function () {
  var Model = require('../../src/js/models/ServiceProviderAddresses'),
  model,
  stubbedApi,
  stubbedCookies,
  stubbedUrlParams

  beforeEach (function () {
    function fakeResolved (value) {
      return {
        then: function (success, error) {
          success({
            'status': 200,
            'json': addresses()
          })
        }
      }
    }

    stubbedApi = sinon.stub(ajax, 'get').returns(fakeResolved ())
    stubbedCookies = sinon.stub(cookies, 'get').returns('stored-session-token')
    stubbedUrlParams = sinon.stub(getUrlParameter, 'parameter').returns('coffee4craig')

    model = new Model()
  })

  afterEach (function () {
    ajax.get.restore()
    cookies.get.restore()
    getUrlParameter.parameter.restore()
  })

  it ('should retrieve service provider from api with session token', function () {
    var endpoint = endpoints.getServiceProviders + '/coffee4craig/addresses'
    var headers = {
      'content-type': 'application/json',
      'session-token': 'stored-session-token'
    }
    var payload = {}
    var apiCalledWithExpectedArgs = stubbedApi.withArgs(endpoint, headers, payload).calledOnce
    expect(apiCalledWithExpectedArgs).toBeTruthy()
  })

  describe('Add new Address', function() {
    beforeEach(function () {
      model.serviceProvider().addAddress()
    })

    it('should add an empty address to the view model', function () {
      expect(model.serviceProvider().addresses().length).toEqual(3)
    })

    it('should set the new address in edit mode', function () {
      expect(model.serviceProvider().addresses()[2].isEditing()).toBeTruthy()
    })
  })

  describe('Add two new Addresses then cancel first', function() {
    beforeEach(function () {
      model.serviceProvider().addAddress()
      model.serviceProvider().addAddress()
      model.serviceProvider().addresses()[2].cancel()
    })

    it('should remove it from the collection', function () {
      expect(model.serviceProvider().addresses().length).toEqual(3)
    })
  })

  describe('Delete Address', function() {
    beforeEach(function () {

      function fakeResolved(value) {
        return {
          then: function (success, error) {
            success({
              'status': 200
            })
          }
        }
      }

      stubbedDeleteApi = sinon.stub(ajax, 'delete').returns(fakeResolved ())

      model.serviceProvider().addresses()[0].deleteAddress()
    })

    afterEach(function () {
      ajax.delete.restore()
    })

    it('should remove the address from the collection', function () {
      expect(model.serviceProvider().addresses().length).toEqual(1)
      expect(model.serviceProvider().addresses()[0].key()).toEqual(2)
    })
  })
})

function addresses () {
  return {
    'key': 'coffee4craig',
    'name': 'Coffee 4 Craig',
    'addresses': [{
      'key': 1,
      'street': '5 Oak Street',
      'street1': null,
      'street2': null,
      'street3': null,
      'city': 'Manchester',
      'postcode': 'M4 5JD',
      'openingTimes': [{
        'startTime': '10:00',
        'endTime': '16:30',
        'day': 'Monday'
      }, {
        'startTime': '10:00',
        'endTime': '16:30',
        'day': 'Tuesday'
      }, {
        'startTime': '10:00',
        'endTime': '16:30',
        'day': 'Wednesday'
      }, {
        'startTime': '10:00',
        'endTime': '16:30',
        'day': 'Thursday'
      }, {
        'startTime': '10:00',
        'endTime': '16:30',
        'day': 'Friday'
      }]
    },
    {
      'key': 2,
      'street': '5 Oak Street',
      'street1': null,
      'street2': null,
      'street3': null,
      'city': 'Manchester',
      'postcode': 'M4 5JD',
      'openingTimes': [{
        'startTime': '10:00',
        'endTime': '16:30',
        'day': 'Monday'
      }, {
        'startTime': '10:00',
        'endTime': '16:30',
        'day': 'Tuesday'
      }, {
        'startTime': '10:00',
        'endTime': '16:30',
        'day': 'Wednesday'
      }, {
        'startTime': '10:00',
        'endTime': '16:30',
        'day': 'Thursday'
      }, {
        'startTime': '10:00',
        'endTime': '16:30',
        'day': 'Friday'
      }]
    }]
  }
}
