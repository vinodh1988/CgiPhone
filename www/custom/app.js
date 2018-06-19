

$(document).ready(function(){
        
    let status=localStorage.getItem('logstatus');
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
         
         let code="";
         
         for(x=0;x<data.length;x++)
             {
                 code+="<li><a href='#mem-msg' class='member'>"+data[x]+"</a></li>";            
             }
         
         
       $('#group-items').html(code);
       
    });
       
       
       
       });
    
    $('body').on('click','.member',function(){
        let from=$(this).text();
    
        let to=localStorage.getItem('user');
        $.get("http://139.59.9.236:8898/rest-api/app-messages/"+from+"/"+to,function(data){
            let code="";
            for(let x=0;x<data.length;x++)
                {
                    code+="<div class='mbox'>"+data[x].message+"</div>";
                }
             $('#messages').html(code);
        });
        
       
        
    })
    
    
});