import { ZIPCODES } from '../data/zipcodes';
import { navigateTo } from 'gatsby-link';

export default {

  isLocationEligible(zipString) {
    const zip = parseInt(zipString, 10);
    return ZIPCODES.indexOf(zip) !== -1;
  },

  determineResultPage(user, intl)  {

    if( user.boro === null ||
        user.caseType === null ||
        user.areaEligible === null ||
        user.incomeEligible === null) {
      throw new Error("Missing a step!");
    }

    const isElegible = user.areaEligible && user.incomeEligible;

    let boro = user.boro.toLowerCase();
    if(boro === 'STATEN ISLAND') boro = 'staten';

    let caseType = user.caseType;
    // if(user.nycha && isElegible && user.caseType === 'nonpay') {
    //   caseType = 'nycha';
    // }

    let resultUrl = `/${intl.locale}/guide/${boro}/${caseType}`;

    //  short circuit admin hearing page
    if(user.nycha && user.caseType === 'other') {

      resultUrl = `/${intl.locale}/admin-hearings`;

    // all other pages
    } else {

      if(user.caseType !== 'general' && !user.nycha && isElegible) {
        resultUrl += 'rtc';
      }
    }

    Rollbar.info("Screener completed", user);

    navigateTo(resultUrl);
  }
}
