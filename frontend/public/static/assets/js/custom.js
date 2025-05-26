
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
                 
                 GetAttachments(uuid,$("#Table").val());
                 
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
           // GetAttachments();
            GetAttachments(UploadID,$("#Table").val());
          }else{
            $("#Uploaddanger").html(Msg);
            $("#Uploaddanger").show();
            $("#Uploadsuccess").hide();
            $("#Uploadwarning").hide();

          }
        }
    });
    
    };

function   UploadClick(Arg,Tab){
    //alert(Tab);
  document.getElementById("UploadID").value=Arg.id; 
  document.getElementById("Table").value=Tab;        

  GetAttachments(Arg.id,Tab);
    


  

}
function GetAttachments(uuid,Tab){
  UploadID = $("#UploadID").val();
 // alert(Tab);
 // Table = $("#Table").val();
  Key = $("#Key").val();

  $.post("js-functions.php",
 {
    Command           : "Attachment-List",
    Parm 	 	          : "",
    Table             : Tab,
    Key               : Key,
    UploadID          : UploadID,
    uuid              :uuid
 
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

function   HistoryClick(Arg,Tab){
   // document.getElementById("UploadID").value=Arg.id;         
    //alert(Arg.id);
  //  alert("Hi");
    GetHistoryMaster(Arg.id,Tab);
      
  
  
    
  
  }

  function GetHistoryMaster(uuid,Tab){
    
    $.post("js-functions.php",
   {
      Command           : "History-List",
      Parm 	 	          : "",
      Table             : Tab,
      uuid               : uuid
      
   
   },
   function(data, status){
   $("#Message").html("Got Response");
   //$("#GetEmpLstCon").html(data);
     if(status=="success"){
     //  $("#Message").html(data);
      // $("#AttachmentContent").html(data);
      $("#History_Record_Master_Div").html("Please Wait");
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
  
          $("#History_Record_Master_Div").html(obj.DATA);
          
                        
         }else{
          $("#History_Record_Master_Div").html("Error");
         }
         
     }
   });
  
  }

  function   GetHistory_Rec(Arg,Table){
    // document.getElementById("UploadID").value=Arg.id;         
   
     GetHistoryDetails(Arg.id,Table);
       
   
   
     
   
   }
   
   function GetHistoryDetails(id,Table){
     
     $.post("js-functions.php",
    {
       Command           : "History-Record",
       Parm 	 	          : "",
       Table             : Table,
       id               : id
       
    
    },
    function(data, status){
    $("#Message").html("Got Response");   
    //$("#GetEmpLstCon").html(data);
      if(status=="success"){
      //  $("#Message").html(data);
       
        $("#History_Record_Detail_Div").html("Please Wait");
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
   
           $("#History_Record_Detail_Div").html(obj.DATA);
           
                         
          }else{
           $("#History_Record_Detail_Div").html("Error");
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
        $('#modal12').modal('hide');
        
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



function hijri_gregorian(SID,DID){
 //   alert(SID);
    HDate = $('#'+SID).val(); 
    if(HDate=="") {
      $('#'+SID).css("background-color","red"); return;
    }else{
      $('#'+SID).css("background-color","green"); 
    } 
    
    $.post("js-functions.php",
           {
              Command           : "hijri-gregorian",
              Parm 	 	          : "",
              HDate             :HDate
              
           
           },
           function(data, status){
         
           //$("#GetEmpLstCon").html(data);
             if(status=="success"){
         
             
              var obj = {};
              try{
               obj = jQuery.parseJSON(data);
              }
              catch (err) {
               obj={};
               
               alert("Error data="+data);
                return;
              }

              $('#'+DID).val(obj.DATA);
                 
                 
             }
           });
  }

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
    
    //$('#modal12').modal('toggle');
  }

 


  