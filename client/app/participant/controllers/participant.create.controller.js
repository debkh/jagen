'use strict';
(function(){

class participantCreateController {
    //start-non-standard
    participant = {};
    //end-non-standard

    constructor($state, Participant, $mdDialog, vessel) {
        this.Participant = Participant;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.vessel = vessel;
    }

    createParticipant(form) {
        if (form.$valid) {
            this.participant._vessel = this.vessel._id;
            this.Participant.save(this.participant).$promise.then(()=> {
                this.$mdDialog.hide();
        });
        }
    }


    /**
     * Cancel dialog window
     */
    cancel() {
        this.$mdDialog.cancel();
    };
}

angular.module('jagenApp')
    .controller('participantCreateController', participantCreateController);

})();
