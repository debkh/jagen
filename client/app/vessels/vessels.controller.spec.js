'use strict';

describe('Component: VesselsComponent', function () {

  // load the controller's module
  beforeEach(module('jagenApp'));

  var VesselsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    VesselsComponent = $componentController('VesselsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
