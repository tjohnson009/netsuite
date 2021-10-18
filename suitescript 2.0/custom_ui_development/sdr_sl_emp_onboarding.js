/**
 * @NScriptType Suitelet
 * @NApiVersion 2.0
 */

define(["N/record", "N/email", "N/redirect", "N/ui/serverWidget"], function (record, email, redirect, serverWidget) {
  return {
    onRequest: function(context) {
        var request = context.request;
        var response = context.response;
        var form = serverWidget.createForm({
            title: 'Employee Onboarding'
        }); 
        
        var empInfo = form.addFieldGroup({
            id: 'custpage_sdr_group_emp_info', 
            label: 'Employee Information'
        }); 
        var meetSupervisor = form.addFieldGroup({
            id: 'custpage_sdr_group_meet_supervisor', 
            label: 'Meeting With Supervisor'
        }); 
        var welcomeEmail = form.addFieldGroup({
            id: 'custpage_sdr_group_welcome_email', 
            label: 'Welcome Email'
        }); 
        
        // fields
        var firstNameField = form.addField({
          id: "custpage_sdr_group_emp_info_first",
          type: serverWidget.FieldType.TEXT,
          label: "First Name",
          container: 'custpage_sdr_group_emp_info',
        });
        
        var lastNameField = form.addField({
          id: "custpage_sdr_group_emp_info_last",
          type: serverWidget.FieldType.TEXT,
          label: "Last Name",
          container: 'custpage_sdr_group_emp_info',
        });
    
        var middleNameField = form.addField({
          id: "custpage_sdr_group_emp_info_middle",
          type: serverWidget.FieldType.TEXT,
          label: "Middle Name",
          container: 'custpage_sdr_group_emp_info',
        });
    
        var email = form.addField({
          id: "custpage_sdr_group_emp_info_email",
          type: serverWidget.FieldType.EMAIL,
          label: "Email",
          container: 'custpage_sdr_group_emp_info',
        });

        var supervisor = form.addField({
          id: "custpage_sdr_group_emp_info_supervisor",
          type: serverWidget.FieldType.SELECT,
          label: "Supervisor",
          container: "custpage_sdr_group_emp_info",
        });

        var subsidiary = form.addField({
          id: "custpage_sdr_group_emp_info_subsidiary",
          type: serverWidget.FieldType.SELECT,
          label: "Subsidiary",
          container: "custpage_sdr_group_emp_info",
        });

                   var evntTitleFld = form.addField({
                     id: "custpage_event_title",
                     type: serverWidget.FieldType.TEXT,
                     label: "Title",
                     container: "custpage_sdr_group_meet_supervisor",
                   });
           
           var evntMsgFld = form.addField({
             id: "custpage_event_message",
             type: serverWidget.FieldType.TEXTAREA,
             label: "Message",
             container: "custpage_sdr_group_meet_supervisor",
           });
           
           
           // Welcome Email Fields
           var emSubjectFld = form.addField({
             id: "custpage_em_subject",
             type: serverWidget.FieldType.TEXT,
             label: "Subject",
             container: "custpage_sdr_group_welcome_email",
           });
           
           var emMsgFld = form.addField({
             id: "custpage_em_message",
             type: serverWidget.FieldType.TEXTAREA,
             label: "Message",
             container: "custpage_sdr_group_welcome_email",
           });

           var submitButton = form.addSubmitButton({
               label: 'Finish'
           })
    
        response.writePage(form); 
    }
  };
});
