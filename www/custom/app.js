var friends=[];

$(document).ready(function(){
        
    let status=localStorage.getItem('logstatus');
    let name=localStorage.getItem('user');
    
     $.get("http://139.59.9.236:8898/rest-api/get-users/"+name, function(data, status){
          alert('working');
           let code="";
            for(let i=0;i<data.length;i++)
                code+="<option>"+data[i]+"</option>";
          
          $('#gmembers').html(code);
    
      });
    
    if(status==null);
    else
        window.location="#home";
    //This works when we click the log button
    
    $('#log').click(function(){
        let name=$('#name').val();
        let pass=$('#password').val();
        let obj={userid:name,name:pass}
        $.ajax({
          url: "http://139.59.9.236:8898/rest-api/check",
          type: "POST",
          data: JSON.stringify(obj),
          contentType: "application/json; charset=utf-8",
          dataType: "json",

          success: function(data) {
 	        if(data.result=="Success"){
                localStorage.setItem("logstatus","success");
                localStorage.setItem("user",name);
                window.location="#home";
                }
              else{
                  alert('please enter the right password');
              }
          },
          error: function(result){
              console.log(result);
              
          }
              
});      
    });
    
    //This functionality works when we click members menu
    
       $('#members').click(function(){
           let name=localStorage.getItem('user');
     $.get("http://139.59.9.236:8898/rest-api/get-users/"+name, function(data, status){
         friends=data;
         let code="";
        $('#main-content').html("<h3>Group Members India</h3>");
        $('#main-content').append("<div id='group-items' data-role='listview'></div>")
         
         for(x=0;x<data.length;x++)
             {
                 code+="<li><a href='#mem-msg' class='member' id='"+data[x]+"'>"+data[x]+"</a></li>";            
             }
         
       $('#main-content').trigger("create");    
       $('#group-items').append(code);
       $('#group-items').listview("refresh");
     
       
    });
       
       
       
       });
    
    /* get users event */
    
    $('body').on('click','.member',function(){
       
        $(this).children('span').remove();
         let from=$(this).text();
        let to=localStorage.getItem('user');
        let data=localStorage.getItem(from);
        if(data==null)
            data=[];
        else
            data=JSON.parse(data);
            let code="";
            for(let x=data.length-1;x>0;x--)
                {
                    code+="<div class='mbox'>"+data[x].message+"</div>";
                }
             $('#messages').html(code);
        
        
       
        
    })
    
    /* Registering */
    
    $('#reg').click(function(){
        let name=   $('#rname').val();
        let pass=   $('#cpassword').val();
        let pass2=  $('#rpassword').val();
        
        if(name==undefined || name.length<4)
            alert("please fill in the name length>3");
        if(pass==undefined || pass2==undefined || pass.length<4 || pass2.length<4)
            alert("please fill in pass fields length>4")
        
        if(pass===pass2){
            
            let obj={userid:name,name:pass};
             $.ajax({
          url: "http://139.59.9.236:8898/rest-api/add-users",
          type: "POST",
          data: JSON.stringify(obj),
          contentType: "application/json; charset=utf-8",
          dataType: "json",

          success: function(data) {
 	        console.log("User successfully added");
          },
          error: function(result){
            console.log(result);
              
          }
              
});     
            
        }
        else
            {
                alert('passwords must be same');
            }
    })
    
    /* Posting the message*/
    
    $('#postbtn').click(function(){
        
         let to=$('#gmembers').val();
         let from=localStorage.getItem('user');
         let message=$('#gmsg').val();
          let obj={fromuser:from,touser:to,message:message};
           $.ajax({
          url: "http://139.59.9.236:8898/rest-api/post-message",
          type: "POST",
          data: JSON.stringify(obj),
          contentType: "application/json; charset=utf-8",
          dataType: "json",

          success: function(data) {
 	        alert("message posted");
              $('#gmsg').val('');
          },
          error: function(result){
            alert("error in sending the message")
              
          }
        
    });
    
     
     
});
    
});