/**
 * @NScriptType ClientScript
 * @NApiVersion 2.0
 */

define(["N/https", 'N/url', 'N/ui/dialog'], function (https, url, dialog) {
  return {
    pageInit: function(context) {
        if (context.mode === 'edit') {
            var eReport = context.currentRecord; 
            var transID = eReport.getValue('tranid'); 

            dialog.alert({
                title: 'Edit Log Notification', 
                message: 'Please note that the user information is logged when editing an expense report.'
            }); 

            var suiteletURL = url.resolveScript({
                deploymentId: 'customdeploy_sdr_sl_log_user', 
                scriptId: 'customscript_sdr_sl_log_user', 
                returnExternalUrl: false
            }); 

            https.post({
                url: suiteletURL, 
                body: {
                    tranId: transID
                }
            })
        }
    }
  };
});
