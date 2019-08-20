// tinker time !! :~)
'use strict'

const axios = require('axios');

import logic from '../src/utils/logic';


exports.handler = (event, context, callback) => {

  const parsedBody = JSON.parse(event.body);


  const intl = {
      locale: parsedBody.locale,
  };


  var RTC_areaEligible = logic.isLocationEligible(parsedBody.zip);

  var user = {
    zip: parsedBody.zip,
    boro: parsedBody.boro,
    nycha: parsedBody.nycha,
    areaEligible: RTC_areaEligible,
    incomeEligible: parsedBody.incomeEligible,
    caseType: parsedBody.caseType
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

  // let resultsURL = logic.determineResultPage(user, intl);

  // axios({
  //   method: 'post',
  //   url: 'https://enhzjnt8yq1mm.x.pipedream.net',
  //   data: { 
  //           URL: resultsURL
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
