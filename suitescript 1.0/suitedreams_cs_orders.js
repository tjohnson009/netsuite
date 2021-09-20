function postSourcing(type, name) {
    var salesRep = nlapiGetFieldText('salesrep')
    if (name === 'entity') {
        alert(' Please remember to email ' + salesRep + ' about this!'); 
    }
}