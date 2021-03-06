var sinon = require('sinon'),
    ajax =      require('basic-ajax'),
    endpoints = require('../../src/js/api-endpoints'),
    adminurls = require('../../src/js/admin-urls'),
    browser =   require('../../src/js/browser'),
    cookies =   require('../../src/js/cookies'),
    getUrlParameter = require('../../src/js/get-url-parameter')

describe('Add Opening Time', function () {
  var Model = require('../../src/js/models/Service'),
      model

  beforeEach (function () {
    model = new Model(getData())

    model.edit()
    model.newOpeningTime()
  })

  it ('should add a new openingTimes', function () {
    expect(model.openingTimes().length).toEqual(3)
  })

  describe('Then cancel', function () {

    beforeEach (function () {
      model.cancelEdit()
    })

    it('should reset openingTimes', function () {
      expect(model.openingTimes().length).toEqual(2)
    })
  })
})

function getData() {
  return {
    'key': '569d2b468705432268b65c75',
    'name': 'Meals',
    'info': 'Breakfast',
    'openingTimes': [{
      'startTime': '09:00',
      'endTime': '10:00',
      'day': 'Monday'
    }, {
      'startTime': '09:00',
      'endTime': '10:00',
      'day': 'Tuesday'
    }],
    'address': {
      'key': '7a6ff0f3-5b04-4bd9-b088-954e473358f5',
      'street': 'Booth Centre',
      'street1': null,
      'street2': 'Edward Holt House',
      'street3': 'Pimblett Street',
      'city': 'Manchester',
      'postcode': 'M3 1FU',
      'openingTimes': null
    },
    'tags': ['some tags']
  }
}
