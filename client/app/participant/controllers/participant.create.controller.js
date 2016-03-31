'use strict';
(function(){

class participantCreateController {
    //start-non-standard
    participant = {};
    //end-non-standard

    constructor($state, Participant, $mdDialog, vessel_id) {
        this.Participant = Participant;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.vessel_id = vessel_id;
        console.log(vessel_id);
    }

    createParticipant(form) {
        if (form.$valid) {
            this.participant._vessel = this.vessel_id;
            console.log(this.participant)
            this.Participant.save(this.participant).$promise.then(()=> {
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
    .controller('participantCreateController', participantCreateController);

})();
