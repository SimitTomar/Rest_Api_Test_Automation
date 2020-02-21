'use strict';

module.exports = function(Customerdetailsfinder) {
  Customerdetailsfinder.getCustomerDetails = function(AccountNumber,SortCode,ProductType,next) {
    Customerdetailsfinder.retrieveCustomerDetails(AccountNumber,SortCode,ProductType,function(err, data) {
      if(err) {
        console.log(err);
      }
      next(err, data);
    })
  };

  Customerdetailsfinder.afterRemote('getCustomerDetails',function(context,response, next){
    var data = {};
    data['Party Details'] = {};
    data['Party Details']['Account Number'] = context.args.AccountNumber;
    data['Party Details']['Sort Code'] = context.args.SortCode;
    data['Party Details']['Name'] = response['CustomerDetails']['First Name'] +' '+ response['CustomerDetails']['Last Name'];
    data['Party Details']['Available Balance'] = (response['CustomerDetails'].Balance + response['CustomerDetails'].Overdraft).toFixed(2);

    console.log('API RESPONSE: ',data);
    context.result = data;
    next();
  });

  Customerdetailsfinder.remoteMethod('getCustomerDetails', {
    http : {
      path : '/customerDetails',
      verb : 'get'
    },

    accepts : [
      {
        arg : 'AccountNumber',
        type : 'number',
        description: 'Account Number',
        required: true,
        http : {
          source : 'query'
        }
      },

      {
        arg : 'SortCode',
        type : 'number',
        description: 'Sort Code',
        required: true,
        http : {
          source : 'query'
        }
      },

      {
        arg : 'ProductType',
        type : 'string',
        description: 'Product Type',
        required: true,
        http : {
          source : 'header'
        }
      }
    ],
    returns : {
      arg : 'CustomerDetails',
      type : 'object'
    }
  });
};
