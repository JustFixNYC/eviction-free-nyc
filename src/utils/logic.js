import { ZIPCODES } from '../data/zipcodes';
import { navigateTo } from 'gatsby-link';
import { array } from 'lodash';

export default {

  isLocationEligible(zipString) {
    const zip = parseInt(zipString, 10);
    return ZIPCODES.indexOf(zip) !== -1;
  },

  isNychaEligible(zipArray) {
    const overlap = _.intersection(zipArray, ZIPCODES);
    return overlap.length > 0;
  },

  determineResultPage(user, intl)  {

    if( user.boro === null ||
        user.caseType === null ||
        user.areaEligible === null ||
        user.incomeEligible === null) {
      throw new Error("Missing a step!");
    }

    const isEligible = user.areaEligible && user.incomeEligible;

    let boro = user.boro.toLowerCase();

    // seems like google changed the autocomplete response for Bronx addrs
    if(boro === 'the bronx') boro = 'bronx';

    if(boro === 'STATEN ISLAND' || boro === 'staten island') boro = 'staten';

    let caseType = user.caseType;
    // if(user.nycha && isEligible && user.caseType === 'nonpay') {
    //   caseType = 'nycha';
    // }

    let resultUrl = `/${intl.locale}/guide/${boro}/${caseType}`;

    //  short circuit admin hearing page
    if(user.nycha && user.caseType === 'other') {

      resultUrl = `/${intl.locale}/admin-hearings`;

    // all other pages
    } else {

      if(user.caseType !== 'general' && isEligible) {
        resultUrl += 'rtc';
      }

    }

    if(user.zip) {
      resultUrl += `?zip=${user.zip}`
    }

    if(typeof window !== 'undefined') {
      if(Rollbar !== undefined) {
        Rollbar.info("Screener completed", user);
      }

      // tracking
      if(window && window.gtag) {
        window.gtag('event', 'scr-completed');
        if(isEligible) {
          window.gtag('event', 'scr-completed-eligible');
        }
        if(user.nycha) {
          window.gtag('event', 'scr-completed-nycha');
        }
      }
    }


    return resultUrl;
  }
}
