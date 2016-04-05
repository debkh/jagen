'use strict';
(function(){

class participantEditController {
    //start-non-standard
    participants = [];
    participant = {};
    //end-non-standard

    constructor($http, $state, $location, Participant, Auth, $mdDialog, participant) {
        this.Participant = Participant;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.participant = participant;
    }


    getParticipant(participant) {
        this.participant = this.Participant.get({id: participant._id});
    }


    /**
     * Update participant
     * @param form
     */
    updateParticipant(form) {
        if (form.$valid) {
            this.Participant.update({id : this.participant._id}, this.participant).$promise.then(()=> {
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
    .controller('participantEditController', participantEditController);

})();
