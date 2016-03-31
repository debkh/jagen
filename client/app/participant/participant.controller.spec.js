'use strict';

describe('Component: ParticipantComponent', function () {

  // load the controller's module
  beforeEach(module('jagenApp'));

  var ParticipantComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ParticipantComponent = $componentController('ParticipantComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
