'use strict';
(function(){

class NewsController {
    news = [];

    constructor(New) {
        this.message = 'Hello';
        this.New = New;
        this.listNews();
    }


    /**
     * Get list vessels
     */
    listNews() {
        this.New.query((response) => {
            this.news = response;
        });
    }
}

    angular.module('jagenApp')
        .controller('NewsController', NewsController);

})();
