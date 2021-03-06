'use strict';

/* Controllers */

function PhoneListCtrl($scope, $http) {
  $http.get('phones/phones.json').success(function(data) {
    $scope.phones = data;
  });

  $scope.orderProp = 'age';
}

function PhoneDetailCtrl($scope, $routeParams, $http) {
  $http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
    $scope.phone = data;
    $scope.mainImageUrl = data.images[0];
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
}

var client = new Usergrid.Client({
    orgName:"binhnguyen",
    appName:"magrabbit"
});



 // Login controller
function LoginController($scope) {
 
  $scope._login = function(user) {
    console.log("login = "+ user.username);
    
    var username = user.username;
    var password = user.password;

    client.login(username, password, function (err, data) {
      if (err) {
        var output = JSON.stringify(data, null, 2);
        $("#response").html('<pre>ERROR: '+output+'</pre>');
      } else {
        var output = JSON.stringify(data, null, 2);
        $("#response").html('<pre>'+output+'</pre>');
        client.setToken(client.token);
        //redriect view
        location.href ="http://localhost:8000/#/books";
      }
    });
  };  
   
} // end login controller

// User controller
function BookController($scope) {
  $scope.books =[];
  $scope.uuid = "";
  $scope.bookName ="";
  $scope.author ="";
  $scope.bookObject={};

  $scope.getBooks = function() {
    var options={
      type:"book",//$('#cboPath').val(),
     // qs:{ql:""}
    };
    client.createCollection(options, function(error, data){
       
      data.fetch();
      console.log( data._list); 
       $scope.books = data._list;
       $scope.$apply($scope.books);    
         var output = JSON.stringify($scope.books, null, 2);
      $("#response").html('<pre>'+output+'</pre>');
    });
  };  

  $scope.addBook = function(bookName, author) {          
    console.log("bookName = " + bookName);
    console.log("author = " + author);
    var options = {
        type:"book",
        //qs:{ql:'order by title desc'}
    };

    client.createEntity(options, function(error, obj){
        if(error)
          alert("Error!!!");
        else{
         
          obj.set("name", bookName);
          obj.set("author", author);
          obj.save();
          //  $('#msg').append("<p>Successful!</p>");
          // $('#inserted').append("<p>"+obj.get("name")+" / "+obj.get("author")+"</p> ");

          // $('#json').append(JSON.stringify(obj.get()));
        }
    });
  };

  $scope.deleteBook = function(book) {          
    console.log(book._data.uuid);
    var options={
      method: 'DELETE',
      endpoint:"books/" + book._data.uuid
    }
    client.request(options, function(err, data){
      console.log(data);
      if(err){ 
        $("#msg").html('<pre>ERROR: '+data+'</pre>');
      } else {   
         $("#msg").html('<pre>'+ book._data.name +' has deleted</pre>');
      }
    });
  }

  $scope.selectedBook = function(book) {          
    console.log(book._data.uuid);
    $scope.bookName =book._data.name;
    $scope.author =book._data.author;
    $scope.bookObject = book;    
  }

  $scope.updateBook = function(bookName, author) {          
    console.log(bookName, author);
    var obj = $scope.bookObject;
    // obj.set("name":bookName, "author":author);
    // obj.save(function (err) {
    //     if (err) {
    //       window.location = "#login";
    //     } else {
    //       $('#msg').html('<strong>Your account was updated</strong>');
    //     }
    //   });    
  }
   
} // end Book controller


function TestController($scope) {
    $scope.isDisabled = false;  
    $scope.names = ['igor', 'misko', 'vojta'];
    $scope.template = "partials/template1.html";
    $scope.template2 = "partials/template2.html";

    $scope.list = [];
    $scope.text = 'hello';
  $scope.submit = function() {
      if (this.text) {
          this.list.push(this.text);
          this.text = '';
      }
  }

  $scope.numbers = [1,2,3,4,5,6,7,8,9];   
  $scope.limit = 3;


} // end Test controller

//test for service
function HelloCtrl($scope, testService, testFactory)
{
    $scope.name = "Binh Nguyen";
    $scope.fromService = testService.sayHello($scope.name);
    $scope.fromFactory = testFactory.sayHello("World");
    $scope.fromService1 = testService.sayGoodbye($scope.name);
    $scope.fromFactory1 = testFactory.sayGoodbye("World");
}
