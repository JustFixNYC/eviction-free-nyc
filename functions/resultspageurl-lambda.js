// tinker time !! :~)
'use strict'

const axios = require('axios');

import logic from '../src/utils/logic';


exports.handler = (event, context, callback) => {

  const parsedBody = JSON.parse(event.body);


  const intl = {
      locale: parsedBody.locale,
  };

  var user = {
    zip: parsedBody.zip,
    boro: parsedBody.boro,
    nycha: parsedBody.nycha,
    areaEligible: JSON.parse(parsedBody.areaEligible),
    incomeEligible: JSON.parse(parsedBody.incomeEligible),
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
}
