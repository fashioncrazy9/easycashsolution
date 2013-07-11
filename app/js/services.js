'use strict';
 
app.factory('testFactory', function(){
    return {
        sayHello: function(text){
            return "Factory says Hello " + text ;
        },
        sayGoodbye: function(text){
            return "Factory says Goodbye " + text ;
        }  
    }               
});

app.service('testService', function(){
    this.sayHello= function(text){
        return "Service says Hello " + text ;
    };        
    this.sayGoodbye = function(text){
        return "Service says Goodbye " + text ;
    };   
});