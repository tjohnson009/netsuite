/**
 * @NScriptType Suitelet
 * @NApiVersion 2.0
 * @ModuleScope SameAccount
 */

define(["N/record", "N/email", "N/redirect", "N/ui/serverWidget"], function(record, email, redirect, serverWidget) {
  return {
    onRequest: function(context) {
        var request = context.request;
        var response = context.response;
        
        if (request.method === 'POST') {
        // process data
        var firstName = request.parameters.custpage_firstName;
        var lastName = request.parameters.custpage_lastName;
        var middleName = request.parameters.custpage__middleName;
        var empEmail = request.parameters.custpage_email; 
        var employeeSupervisor = request.parameters.custpage_supervisor; 
        var employeeSubsidiary= request.parameters.custpage_subsidiary; 
        
        var employee = record.create({
            type: record.Type.EMPLOYEE
        }); 
            employee.setValue({
                fieldId: 'firstname', 
                value: firstName
            }); 
            employee.setValue({
              fieldId: "lastname",
              value: lastName,
            }); 
            employee.setValue({
              fieldId: "middlename",
              value: middleName,
            }); 
            employee.setValue({
              fieldId: "email",
              value: empEmail,
            }); 
            employee.setValue({
              fieldId: "supervisor",
              value: employeeSupervisor,
            }); 
            employee.setValue({
                fieldId: "subsidiary",
                value: employeeSubsidiary
            }); 
            
            var employeeIdentifier = employee.save(); 

            
            // _______________________________

            var eventtitle = request.parameters.custpage_event_title;
            var eventMsg   = request.parameters.custpage_event_message;
            
            var event = record.create({
                type: record.Type.CALENDAR_EVENT, 
                isDynamic: true
            }); 
            event.setValue('title', 'Welcome meeting with your supervisor!'); 
            
            event.selectNewLine({ sublistId: 'attendee' }); 
            event.setCurrentSublistValue({
                sublistId: 'attendee', 
                fieldId: 'attendee', 
                value: employeeIdentifier
            }); 
            event.commitLine({
                sublistId: 'attendee'
            }); 

            event.selectNewLine({ sublistId: 'attendee' }); 
            event.setCurrentSublistValue({
                sublistId: 'attendee', 
                fieldId: 'attendee', 
                value: empSupervisor
            }); 
            event.commitLine({
                sublistId: 'attendee'
            }); 

            event.save(); 

        }
            var form = serverWidget.createForm({
                title: 'Employee Onboarding'
            }); 

        // field groups    
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
          id: "custpage_firstname",
          type: serverWidget.FieldType.TEXT,
          label: "First Name",
          container: 'custpage_sdr_group_emp_info',
        });

        var middleNameField = form.addField({
            id: "custpage_middlename",
            type: serverWidget.FieldType.TEXT,
            label: "Middle Name",
            container: 'custpage_sdr_group_emp_info',
        });
        
        var lastNameField = form.addField({
            id: "custpage_lastname",
            type: serverWidget.FieldType.TEXT,
            label: "Last Name",
            container: "custpage_sdr_group_emp_info",         
        }); 
        
        var email = form.addField({
            id: "custpage_email",
            type: serverWidget.FieldType.EMAIL,
            label: "Email",
            container: 'custpage_sdr_group_emp_info',
        });
        
        var supervisor = form.addField({
            id: "custpage_supervisor",
            type: serverWidget.FieldType.SELECT,
            label: "Supervisor",
            source: 'employee', 
            container: "custpage_sdr_group_emp_info",        
        });
        
        var subsidiary = form.addField({
            id: "custpage_subsidiary",
            type: serverWidget.FieldType.SELECT,
            label: "Subsidiary",
            source: 'subsidiary', 
            container: "custpage_sdr_group_emp_info",
        });
        
        firstNameField.isMandatory = true; 
        lastNameField.isMandatory = true; 
        supervisor.isMandatory = true; 
        subsidiary.isMandatory = true; 
        
        email.updateBreakType({
            breakType: serverWidget.FieldBreakType.STARTCOL
        }); 
        
        middleNameField.updateDisplaySize({
            height: 0, 
            width: 5
        }); 
        
        //Meeting With Supervisor
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
        
        evntTitleFld.isMandatory = true; 
        evntMsgFld.isMandatory = true; 
        
        evntMsgFld.updateDisplaySize({
            height: 12, 
            width: 60
        });
        
        evntTitleFld.defaultValue = 'Welcome meeting with your supervisor'; 
        evntMsgFld.defaultValue = 'Meet and greet with your supervisor and the team.'; 
        
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
        
        emSubjectFld.isMandatory = true; 
        emMsgFld.isMandatory = true; 
        
        emSubjectFld.defaultValue = 'Welcome to SuiteDreams!'; 
        emMsgFld.defaultValue = 'Hi there, ' + '\n' + 'We would like to welcome you to SuiteDreams. Please feel free to reach out if you have questions. Best regards, SuiteDreams HR'; 
        
        emMsgFld.updateDisplaySize({
            height: 12, 
            width: 60
        }); 
        
        var submitButton = form.addSubmitButton({
            label: 'Finish'
        }); 
        
        response.writePage(form); 
    
    }
  };
});


