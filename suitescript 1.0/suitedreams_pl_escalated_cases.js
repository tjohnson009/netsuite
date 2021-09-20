function listEscalatedCases(portlet, column) {
    portlet.setTitle('Escalated Support Cases'); 
    
    var searches = nlapiSearchRecord(
      "supportcase",
      "customsearch_sdr_escalated_support_cases"
    );
    
    portlet.addColumn('title', 'text', 'Subject'); 
    portlet.addColumn('startdate', 'date', 'Incident Date'); 
    portlet.addColumn('assigned_display', 'text', 'Assigned To'); 
    portlet.addColumn('department_employee_display', 'text', 'Department'); 
    portlet.addColumn('title_employee', 'text', 'Job Title');
    
    for (var i in searches) {
        var result = searches[i]; 
        portlet.addRow(result); 
    }
}