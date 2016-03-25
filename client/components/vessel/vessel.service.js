'use strict';

(function() {

function VesselService($location, $http, $cookies, $q, appConfig, Util, User) {
  var safeCb = Util.safeCb;

  var Vessel = {


    /**
     * Create a new vessel
     *
     * @param  {Object}   vessel     - vessel info
     * @param  {Function} callback - optional, function(error, user)
     * @return {Promise}
     */
    createVessels(vessel, callback) {
        $http.post('/api/vessels', vessel)
        .then(vessel => {
            return vessel;
        });
    },

    getVessels() {
        $http.get('/api/vessels')
        .then(function(data) {
            return data;
            //console.log($scope.games);
        })
        .catch(function(err) {
            alert('Error! Something went wrong');
        }).$promise;
    }

  };

  return Vessel;
}

angular.module('jagenApp.vessel')
  .factory('Vessel', VesselService);

})();
