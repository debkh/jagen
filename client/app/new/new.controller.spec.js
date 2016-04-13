'use strict';

describe('Component: NewComponent', function () {

  // load the controller's module
  beforeEach(module('jagenApp'));

  var NewComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    NewComponent = $componentController('NewComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
