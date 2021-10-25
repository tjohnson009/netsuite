/**
 * @NScriptType Suitelet
 * @NApiVersion 2.0
 * @NModuleScope SameAccount
 */

define(["N/file", "N/render", "N/record", "N/ui/serverWidget"], function(file, render, record, serverWidget) {
  return {
    onRequest: function(context) {
      var request = context.request;
      var response = context.response;
      
      var template = file.load({
          id: 'SuiteScripts/template/contact.html'
      });

      var htmlString = template.getContents(); 
      var pageRenderer = render.create(); 
      pageRenderer.templateContent = htmlString; 
      
        var styleCss = file.load({ id: "SuiteScripts/template/css/style.css" });
         var bootstrapCss   = file.load({id : 'SuiteScripts/template/css/bootstrap.min.css'});
         var responsiveCss  = file.load({id : 'SuiteScripts/template/css/responsive.css'});
         var fontAwesomeCss = file.load({id : 'SuiteScripts/template/css/font-awesome.min.css'});
         var componentCss   = file.load({id : 'SuiteScripts/template/css/effects/component.css'});
         var normalizeCss   = file.load({id : 'SuiteScripts/template/css/effects/normalize.css'});
         var set2Css        = file.load({id : 'SuiteScripts/template/css/effects/set2.css'});
         
         var jqueryJs = file.load({ id: "SuiteScripts/template/js/jquery.min.js" });
         var navJs = file.load({ id: "SuiteScripts/template/js/nav.js" });
         var customJs = file.load({ id: "SuiteScripts/template/js/custom.js" });
         var bootstrapJs = file.load({ id: "SuiteScripts/template/js/bootstrap.min.js" });
         var html5ShivJs = file.load({ id: "SuiteScripts/template/js/html5shiv.js" });
         var masonryJs = file.load({ id: "SuiteScripts/template/js/effects/masonry.pkgd.min.js" });
         var imagesJs = file.load({ id: "SuiteScripts/template/js/effects/imagesloaded.js" });
         var classieJs = file.load({ id: "SuiteScripts/template/js/effects/classie.js" });
         var animOnScrollJs = file.load({id : 'SuiteScripts/template/js/effects/AnimOnScroll.js'});
         var modernizrJs    = file.load({id : 'SuiteScripts/template/js/effects/modernizr.custom.js'});
               
         
         var dependencies = {
            styleCss       : styleCss.url,
            bootstrapCss   : bootstrapCss.url,
            responsiveCss  : responsiveCss.url,
            fontAwesomeCss : fontAwesomeCss.url,
            componentCss   : componentCss.url,
            normalizeCss   : normalizeCss.url,
            set2Css        : set2Css.url,
            jqueryJs       : jqueryJs.url,
            navJs          : navJs.url,
            customJs       : customJs.url,
            bootstrapJs    : bootstrapJs.url,
            masonryJs      : masonryJs.url,
            imagesJs       : imagesJs.url,
            classieJs      : classieJs.url,
            animOnScrollJs : animOnScrollJs.url,
            modernizrJs    : modernizrJs.url,
            html5ShivJs    : html5ShivJs.url
         };

         pageRenderer.addCustomDataSource({
            format: render.DataSource.OBJECT, 
            alias: 'dep', 
            data: dependencies
         });
        
        var renderedPage = pageRenderer.renderAsString();
         
         response.write(renderedPage); 

         if (request.method === 'POST') {
         
            var name = request.parameters.custpage_name; 
            var email = request.parameters.custpage_email; 
            var comments = request.parameters.custpage_comments; 
         
            var prospect = record.create({
                type: record.Type.PROSPECT
            }); 

            prospect.setValue({
                fieldId: 'companyname', 
                value: name
            }); 
            
            prospect.setValue({
                fieldId: 'email', 
                value: email
            }); 
            
            prospect.setValue({
                fieldId: 'comments', 
                value: comments
            }); 
         
            prospect.setValue({
                fieldId: 'subsidiary', 
                value: 17
            }); 
         
            prospect.save(); 
         }
  }
}
});  
