/**
 * @NScriptType Restlet
 * @NApiVersion 2.0
 */

define(function () {
  return {
      get: function(params) {
          var couponCode = params.custparam_couponcode; 

          if (couponCode !== 'ABC12') {
              return 'invalid'; 
          } 
          
          return 'valid'; 
          
      }
  };
});
