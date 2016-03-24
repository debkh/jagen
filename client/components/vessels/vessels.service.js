'use strict';

(function() {

function VesselsService($location, $http, $cookies, $q, appConfig, Util, User) {
  var safeCb = Util.safeCb;

  var Vessel = {


    /**
     * Create a new user
     *
     * @param  {Object}   user     - user info
     * @param  {Function} callback - optional, function(error, user)
     * @return {Promise}
     */
    createVessel(vessel, callback) {
        $http.post('/api/vessels', vessel)
        .then(vessel => {
            return vessel;
        });
    }

  };

  return Vessel;
}

angular.module('jagenApp')
  .factory('Vessel', VesselsService);

})();
