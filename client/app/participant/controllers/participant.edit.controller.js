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
        console.log(form);
        if (form.$valid) {
            this.Participant.update({id : this.participant._id}, this.participant).$promise.then(()=> {
                this.$mdDialog.hide();
            });
        }
    }

    hide() {
        this.$mdDialog.hide();
    };
    cancel() {
        this.$mdDialog.cancel();
    };
    answer(answer) {
        this.$mdDialog.hide(answer);
    };
}

angular.module('jagenApp')
    .controller('participantEditController', participantEditController);

})();
