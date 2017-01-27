// JavaScript Document
 
function load_ajax(script_url, container_id, additional_vars, form_id, return_mode, sync_type)
{
    /*************************************************
    This function perfoms all ajax calls through the system using the arguments provided.
    *************************************************/
   
    var url_vars="";
    var form_data = {ajax_process: true};
    var submitted_form = "";
 
    //DEFAULT OUR ARGUMENT VALUES
    if(return_mode == undefined)
    {
            return_mode = "replace";
    }//END IF RETURN_MODE == UNDEFINED 
   
    if(sync_type == undefined)
    {
            sync_type = true; //DEFAULT TO ASYNCRONYOUS TRANSFER
    }//END IF RETURN_MODE == UNDEFINED 
 
   
    //For each element in the form, append the name and it's value to the call string var.
    if(form_id != '')
    {
        //GET THE FORM
        submitted_form = document.getElementById(form_id); 
       
        //LOOP THROUGH EACH ELEMENT ADDING IT TO THE POST.
        for(i=0; i< submitted_form.elements.length; i++)
        {                      
            form_data[submitted_form.elements[i].id] = submitted_form.elements[i].value;
           
            //alert('Element: '+submitted_form.elements[i].id+' '+submitted_form.elements[i].value); //USED FOR DEBUGGING
        }//END FOR I < DOCUMENT.(FORMNAME).ELEMENTS.LENGTH
   
    }//END IF FORM_ID != UNDEFINED
       
    //ADD ADDITIONAL VARS IF WE HAVE ANY
    if( additional_vars )
    {
        script_url = script_url + "?add_vars=Y" + additional_vars;
    }//END IF !ADDITIONAL_VARS
   
    //JQUERY AJAX PROCESS
       
    //MAKE THE ACTUAL AJAX CALL
    $.ajax({
        url: script_url,
        cache: false,
        async: sync_type,
        type: "POST",
        data: form_data,
        dataType: "html",
        beforeSend: function(jqXHR, settings)
        {
            //BUILD LOADING HTML
            loading_html = '<div class="ajax-loading">&nbsp;</div>';
           
            //SHOW LOADING
            if(return_mode == 'append')
            {
                    $('#'+container_id).addClass('ajax-loading');
            } else {
                    $('#'+container_id).html(loading_html);
            }//END IF RETURN_MODE == append
       
        },//END FUNCTION BEFORESEND
        success: function(html_returned, success_code, jqXHR_object)
        {
            if(return_mode == 'append')
            {
               
               
                //APPEND HTML RESPONSE
                $('#'+container_id).append(html_returned);
            } else {
                //REPLACE CONTAINER CONTENTS WITH HTML RESPONSE
                $('#'+container_id).html(html_returned);
            }//END IF RETURN_MODE == append
           
           
        },//END FUNCTION SUCCESS
        error: function(jqXHR, exception)
        {
               
            //SHOW ERRORS
            if (jqXHR.status === 0)
            {
                //alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404)
            {
                //alert('Requested page not found. [404]');
            } else if (jqXHR.status == 500)
            {
                //alert('Internal Server Error [500].');
            } else if (exception === 'parsererror')
            {
                //alert('Requested JSON parse failed.');
            } else if (exception === 'timeout')
            {
                //alert('Time out error.');
            } else if (exception === 'abort')
            {
                //alert('Ajax request aborted.');
            } else {
                //alert('Uncaught Error.\n' + jqXHR.responseText);
            }//END IF JQXHR.STATUS === 0
        },//END FUNCTION ERROR
        complete: function(jqXHR, textStatus)
        {
            //REMOVE LOADING CLASS
            $('#'+container_id).removeClass('ajax-loading');
           
        }
    });    
}//END FUNCTION LOAD_AJAX
