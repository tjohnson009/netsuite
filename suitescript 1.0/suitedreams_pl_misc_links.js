function miscLinks(portlet, column, entityid) {
    portlet.setTitle('Misc Links'); 
    portlet.addLine('EXTERNAL LINKS'); 
    portlet.addLine('Google Maps', 'https://maps.google.com'); 

    var POURL = nlapiResolveURL('record', 'purchaseorder'); 
    portlet.addLine('INTERNAL LINKS'); 
    portlet.addLine('New Purchase Order', POURL); 
}