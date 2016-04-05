'use strict';

angular.module('jagenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('participant_create', {
          url: 'participant/create',
          parent: 'main',
          views: {
              'content': {
                  templateUrl: 'app/participant/views/create.html',
                  controller: 'ParticipantController',
                  controllerAs: 'vm',
              }
          },
          authenticate: true
      });
  });
