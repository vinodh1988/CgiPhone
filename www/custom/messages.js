console.log(friends);
setInterval(function(){
    
    for(var i=0;i<friends.length;i++){
       let x= localStorage.getItem(friends[i]);
       let to=localStorage.getItem('user');

       var last=0;
       var msgs=[];
        if(x===null){
            last=0;
        }
        else{
            msgs=JSON.parse(x);
            last=msgs[msgs.length-1].sno;
        }
        
        $.get("http://139.59.9.236:8898/rest-api/app-messages/"+friends[i]+"/"+
             to+"/"+last,function(data){
            let temp;
            let current=[];
            let n=0;
            if(data[0]!=undefined){
               temp= localStorage.getItem(data[0].fromuser);
                if(temp==null)
                    temp="[]";
               current=JSON.parse(temp);
               
               for(let p=data.length-1;p>=0;p--){
                   current.push(data[p]);
               }  
                if($('#'+data[0].fromuser).children("span:first"))
                n=Number($('#'+data[0].fromuser).children("span:first").text())
        
            $('#'+data[0].fromuser).html(data[0].fromuser+"<span>"+
                (n+data.length)+"</span>")   ;
            
            localStorage.setItem(data[0].fromuser,JSON.stringify(current));
            }
            
            
        });
        
    }
    
},2000);