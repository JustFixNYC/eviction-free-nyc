// tinker time !! :~)
'use strict'

const axios = require('axios');
// const logic = require('../src/utils/logic');

import logic from '../src/utils/logic';
// import { isLocationEligible, isNychaEligible, determineResultPage } from '../src/utils/logic';


exports.handler = (event, context, callback) => {

  const parsedBody = JSON.parse(event.body);


  const intl = {
      locale: parsedBody.locale,
  };


  //var RTC_areaEligible = logic.isLocationEligible(parsedBody.zip);

  var RTC_areaEligible = logic.isLocationEligible(parsedBody.zip); //weird

  var user = {
    zip: parsedBody.zip,
    boro: parsedBody.boro,
    nycha: parsedBody.nycha,
    areaEligible: RTC_areaEligible,
    incomeEligible: parsedBody.incomeEligible,
    caseType: parsedBody.caseType,
  };


  try {
    let resultsURL = logic.determineResultPage(user, intl);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        result_url: resultsURL
      })
    });

  } catch(err) {

    callback(err);
  }

  


  // axios({
  //   method: 'post',
  //   url: 'https://enhzjnt8yq1mm.x.pipedream.net',
  //   data: { zip: parsedBody.zip,
  //           boro: parsedBody.boro,
  //           nycha: parsedBody.nycha,
  //           areaEligible: RTC_areaEligible,
  //           incomeEligible: parsedBody.incomeEligible,
  //           caseType: parsedBody.caseType,
  //           URL: result_URL
  //         }
  // })
  // .then(response => {
  //   callback(null, {
  //     statusCode: 200,
  //     body: 'Yay!',
  //   })
  // })
  // .catch(err => {
  //   console.log(err)
  //   callback(new Error('something went wrong'))
  // })
}
