function pageInitRecordLevel(type) {
    alert('You are in ' + type + ' mode for this record!'); 
}

function saveRecordRecordLevel() { //logging data 
    var type = nlapiGetRecordType(); 
    nlapiLogExecution('DEBUG', 'Record type of current record', type); 
    return true; 
}