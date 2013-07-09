$(document).ready(function(){


  var client = new Usergrid.Client({
    //Initialize your client
    orgName:"binhnguyen",
    appName:"new_app"
  });

  var  onclick2 = function(id){
    console.log("shfjks" + id);
  }


  //insert
  $('#btnAdd').click(function () {
    $('#msg').text("");

    var options = {
        type:$('#cboPath').val(),
        name:$('#name').val(),
        title:$('#title').val(),
        author:$('#author').val()
        //qs:{ql:'order by title desc'}
    };

    client.createEntity(options, function(error, obj){
        if(error)
          alert("Error!!!");
        else{
          $('#msg').append("<p>Successful!</p>");
          $('#inserted').append("<p>"+obj.get("name")+" / "+obj.get("title")+" / "+obj.get("author")+"</p> ");

          $('#json').append(JSON.stringify(obj.get()));
        }
    });
      // $.getJSON("https://api.usergrid.com/kim4789/sandbox/users", function(data) {
      //   console.log("data =" + data.entities[0].type);
      //   console.log(data);
      // Now use this data to update your view models,
      // and Knockout will update your UI automatically
  });


  //get all item
  $('#btnSearch').click(function(){
    $("#lstItem").empty();
    var options={
      type:$('#cboPath').val(),
      qs:{ql:$('#txtSearch').val()!=""?"where " + $('#cboField').val() + " = '" + $('#txtSearch').val() + "'":""}
    };
    client.createCollection(options, function(error, obj){
      obj.fetch(function(){

        //Reset the pointer
        obj.resetEntityPointer();

        while(obj.hasNextEntity()) {

          var item = obj.getNextEntity();

          var name =item.get("name");
          var title =item.get("title");
          var author =item.get("author");
          var uuid = item.get("uuid");
          console.log("uuid" + uuid);
          $("#lstItem").append("<li>"+name+"   /   "+title+"    /   "+author+"</li> <a id='lnkdelete' href='"+ uuid+"'>Delete</a>");

        }
      });
    });
  });


  //destroyEntity
  $('#btnDelete').click(function(){

//    abc= client.getEntityByUUID('c806479a-e779-11e2-b0e6-cb9284c8cb6c',data);

    var endpoint = "user";//$('#cboPath').val();

    var options = {
      method:'GET',
      //qs:{ql:"where name='hoang map'"},
      endpoint:endpoint,
    };
    client.request(options, function (err, data) {
      //data will contain raw results from API call
      if (err) {
        var output = JSON.stringify(data, null, 2);

        $("#msg").html('<pre>ERROR: '+output+'</pre>');
      } else {
         var output = JSON.stringify(data);

        var convertToJs = JSON.parse(output);
        $("#msg").html('<pre>'+convertToJs.entities[0].type+'</pre>');
      }
    });
  });

  $('#lnkdelete').click(function(){
    var endpoint = $('#cboPath').val();
    var options={
      method: 'DELETE',
      endpoint:endpoint
    }
    client.request(options, function(err, data){
      if(err){
        var output = JSON.stringify(data, null, 2);

        $("#msg").html('<pre>ERROR: '+output+'</pre>');
      } else {
         var output = JSON.stringify(data);

        var convertToJs = JSON.parse(output);
        $("#msg").html('<pre>'+convertToJs.entities[0].type+'</pre>');
      }
    })

  });

  //Login
  function _login() {
    var username = $("#username").val();
    var password = $("#password").val();

    client.login(username, password, function (err, data) {
      //client.token = null; //delete the user's token by setting it to null
      if (err) {
        var output = JSON.stringify(data, null, 2);
        $("#response").html('<pre>ERROR: '+output+'</pre>');
      } else {
        var output = JSON.stringify(data, null, 2);
        $("#response").html('<pre>'+output+'</pre>');
        //var js
        alert("Login successful!!!"+ client.token);
      }
    });
  }

  $('#btnLogin').click(function(){
    _login();
  });
});


