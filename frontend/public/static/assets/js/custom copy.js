
function Delete_Attachment(id,name){
    if(confirm("Are you sure you want to delete'"+name+"' file?")){
      DeleteAttachment(id);
    }else{
      alert("Cancelled");
    }
    event.preventDefault();
  }
  
  function DeleteAttachment(uuid){        
    
    
          
    $.post("js-functions.php",
           {
              Command           : "Attachment-Delete",
              Parm 	 	          : "",
              uuid              :uuid
           
           },
           function(data, status){
          //  $("#Uploadsuccess").show();
          //  $("#Uploadsuccess").html("Data="+data,"status="+status); return;
             if(status=="success"){
             
             //  $("#AttachmentContent").html(data);            
                 var obj = {};
                 try{
                  obj = jQuery.parseJSON(data);
                 }
                 catch (err) {
                  obj={};
                  
                   $("#Uploaddanger").html(err + "<br>" + "JSON String: <pre>" +data)+ "</pre>";
                   $("#Uploaddanger").show();
                   $("#Uploadsuccess").hide();
                   $("#Uploadwarning").hide();
                   return;
                 }
  
                
              
                 Msg = obj.ResCode+ "-" + obj.ActCode+ " " + obj.Desc;
                
                 if(obj.ResCode=="000"){  
  
                   $("#Uploadsuccess").html(Msg);
                   $("#Uploaddanger").hide();
                   $("#Uploadsuccess").show();
                   $("#Uploadwarning").hide();
                  
                                
                 }else{
                 // $("#AttachmentContent").html("Error");
                  $("#Uploaddanger").html(Msg);
                   $("#Uploaddanger").show();
                   $("#Uploadsuccess").hide();
                   $("#Uploadwarning").hide();
                 }
                 GetAttachments();
                 
             }
           });
  
  }
  
  
  
function ChangePassword(){
    $("#successChangePassword").html("To be created");
    $("#successChangePassword").show();           
    $("#dangerChangePassword").hide();
    $("#warningChangePassword").hide();
    if(confirm("Are you sure?")){
    $('#modal2').modal('toggle');
    }else{

    }

  }
  document.getElementById("UploadAttachment").onsubmit = function(e) {
    e.preventDefault();
    var form_data = new FormData(this);  
    var file_data = $('#Attachment').prop('files')[0];  
    //alert(file_data);
    //alert("Uploaded");
    UploadID = document.getElementById("UploadID").value;
   // alert(UploadID);

    $.ajax({
        url: 'js-functions.php', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        enctype: 'multipart/form-data',
        data: form_data,                        
        type: 'post',
        success: function(php_script_response){
          // alert(php_script_response); // display response from the PHP script, if any
           // $("#Resp").html(php_script_response);

            var obj = {};
       try{
        obj = jQuery.parseJSON(php_script_response);
       }
       catch (err) {
        obj={};
        
         $("#Uploaddanger").html(err + "<br>" + "JSON String: <pre>" +php_script_response)+ "</pre>";
         $("#Uploaddanger").show();
         $("#Uploadsuccess").hide();
         $("#Uploadwarning").hide();
         return;
       }

           Msg = obj.ResCode+ "-" + obj.ActCode+ " " + obj.Desc;      
          //alert(obj.Res_Code);
          if(obj.ResCode=="000"){   
                        
          
            $("#Uploadsuccess").html(Msg);                 
            $("#Uploadsuccess").show();
            $("#Uploaddanger").hide();
            $("#Uploadwarning").hide();
            GetAttachments();
          }else{
            $("#Uploaddanger").html(Msg);
            $("#Uploaddanger").show();
            $("#Uploadsuccess").hide();
            $("#Uploadwarning").hide();

          }
        }
    });
    
    };

function   UploadClick(Arg){
  document.getElementById("UploadID").value=Arg.id;         

  GetAttachments();
    


  

}
function GetAttachments(){
  UploadID = $("#UploadID").val();
  Table = $("#Table").val();
  Key = $("#Key").val();

  $.post("js-functions.php",
 {
    Command           : "Attachment-List",
    Parm 	 	          : "",
    Table             : Table,
    Key               : Key,
    UploadID          : UploadID
 
 },
 function(data, status){
 $("#Message").html("Got Response");
 //$("#GetEmpLstCon").html(data);
   if(status=="success"){
   //  $("#Message").html(data);
     $("#AttachmentContent").html(data);
      //alert(data); return;
       var obj = {};
       try{
        obj = jQuery.parseJSON(data);
       }
       catch (err) {
        obj={};
        
        $("#Uploaddanger").html(err + "<br>" + "JSON String: <pre>" +data)+ "</pre>";
         $("#Uploaddanger").show();
         $("#Uploadsuccess").hide();
         $("#Uploadwarning").hide();
         return;
       }

      
      //res = "Hi";
    //   alert(typeof res);
       
      // obj = jQuery.parseJSON(data);
      // alert();
       //alert(obj.length);
       
      
       //$("#GetEmpLstCon").html(obj.DATA);
       //$("#MsgTmpCnt"+obj.Res_Code).html(obj.Res_Desc);
       //$("#Message").html(obj.ResCode+ "-" + obj.ActCode+ " " + obj.Desc);
       Msg = obj.ResCode+ "-" + obj.ActCode+ " " + obj.Desc;
       //alert(obj.Res_Code);
       if(obj.ResCode=="000"){  

        $("#AttachmentContent").html(obj.DATA);
        
                      
       }else{
        $("#AttachmentContent").html("Error");
       }
       
   }
 });

}

function   HistoryClick(Arg){
   // document.getElementById("UploadID").value=Arg.id;         
  
    //GetAttachments();
      
  
  
    
  
  }
  function GetHistoryMaster(uuid){
    
  
    $.post("js-functions.php",
   {
      Command           : "History-Master",
      Parm 	 	          : "",
      Table             : "1",
      uuid               : uuid
      
   
   },
   function(data, status){
   $("#Message").html("Got Response");
   //$("#GetEmpLstCon").html(data);
     if(status=="success"){
     //  $("#Message").html(data);
       $("#AttachmentContent").html(data);
        //alert(data); return;
         var obj = {};
         try{
          obj = jQuery.parseJSON(data);
         }
         catch (err) {
          obj={};
          
          $("#Uploaddanger").html(err + "<br>" + "JSON String: <pre>" +data)+ "</pre>";
           $("#Uploaddanger").show();
           $("#Uploadsuccess").hide();
           $("#Uploadwarning").hide();
           return;
         }
  
        
        //res = "Hi";
      //   alert(typeof res);
         
        // obj = jQuery.parseJSON(data);
        // alert();
         //alert(obj.length);
         
        
         //$("#GetEmpLstCon").html(obj.DATA);
         //$("#MsgTmpCnt"+obj.Res_Code).html(obj.Res_Desc);
         //$("#Message").html(obj.ResCode+ "-" + obj.ActCode+ " " + obj.Desc);
         Msg = obj.ResCode+ "-" + obj.ActCode+ " " + obj.Desc;
         //alert(obj.Res_Code);
         if(obj.ResCode=="000"){  
  
          $("#AttachmentContent").html(obj.DATA);
          
                        
         }else{
          $("#AttachmentContent").html("Error");
         }
         
     }
   });
  
  }
var remainingSecs;
var time1;
var coutsecs=60;
var timeout =5*1000*60;
//var timeout =5000;
var Inactive=false;
var inactivityTime = function () {
    var time;
    
    remainingSecs = coutsecs;
    
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

    function poplogout() {
       // alert("You are now logged out.")
        //location.href = 'logout.html'
        

        $('#modal10').modal('toggle');
        session_activity();
        countdown();

    }

    

    function logout() {
        // alert("You are now logged out.")
         //location.href = 'logout.html'
         
 
         $('#modal10').modal('toggle');
        
 
     }

    function resetTimer() {
        clearTimeout(time);
        clearTimeout(time1);
        remainingSecs=coutsecs;
        time = setTimeout(poplogout, timeout);
        $('#modal10').modal('hide');
        
        // 1000 milliseconds = 1 second
    }

    function countdown(){
       
        
        time1 = setTimeout(countdown, 1000);
        remainingSecs--;
        
        $('#RemainingSeconds').html(remainingSecs);
        if(remainingSecs<=0){
            clearTimeout(time1);
            location.href = 'logout.php?inactive=Yes';
        }
    }

    
};



function session_activity(){
    $.post("js-functions.php",
           {
              Command           : "Session-Activity",
              Parm 	 	          : ""
              
           
           },
           function(data, status){
         
           //$("#GetEmpLstCon").html(data);
             if(status=="success"){
         
         
                 
                 
             }
           });
  }


window.onload = function() {
    inactivityTime(); 
  }

  