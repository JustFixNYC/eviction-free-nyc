// tinker time !! :~)
'use strict'

const axios = require('axios');

import logic from '../src/utils/logic';


exports.handler = (event, context, callback) => {

  const parsedBody = JSON.parse(event.body);


  const intl = {
      locale: parsedBody.locale,
  };

  if (parsedBody.areaEligible === 'true') {
    areaEligible === true;
  } else {
    areaEligible === false;
  }

  if (parsedBody.incomeEligible === 'true') {
    incomeEligible === true;
  } else {
    incomeEligible === false;
  }

  var user = {
    zip: parsedBody.zip,
    boro: parsedBody.boro,
    nycha: parsedBody.nycha,
    areaEligible: areaEligible,
    incomeEligible: incomeEligible,
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
