import { GeoSearchBoroughGid } from "@justfixnyc/geosearch-requester";
import { getNychaInfo } from "./nycha";
import { ZIPCODES } from "../data/zipcodes";

const EFNYC_HOST = process.env.EFNYC_HOST || 'www.evictionfreenyc.org';

const ZIPCODES_SET = new Set(ZIPCODES);

export function isRtcZipcode(zip: string): boolean {
  return ZIPCODES_SET.has(parseInt(zip));
}

// These have meaning to the EFNYC site, please don't change them.
export type EvictionType = 'nonpay'|'holdover'|'general';

export type RtcInfo = {
  boroughGid: GeoSearchBoroughGid,
  zip: string,
  bbl: string,
  isIncomeEligible: boolean,
  evictionType: EvictionType,
};

function getEfnycBoroughId(boroughGid: GeoSearchBoroughGid): string {
  switch (boroughGid) {
    case GeoSearchBoroughGid.Manhattan: return 'manhattan';
    case GeoSearchBoroughGid.Queens: return 'queens';
    case GeoSearchBoroughGid.Brooklyn: return 'brooklyn';
    case GeoSearchBoroughGid.Bronx: return 'bronx';
    case GeoSearchBoroughGid.StatenIsland: return 'staten';
  }

  throw new Error(`Invalid borough gid: ${boroughGid}`);
}

export function ensureRtcInfo(info: Partial<RtcInfo>): RtcInfo {
  const { boroughGid, zip, bbl, isIncomeEligible, evictionType } = info;

  if (boroughGid === undefined || zip === undefined || isIncomeEligible === undefined || evictionType === undefined || bbl === undefined) {
    throw new Error('RtcInfo is not complete!');
  }

  return { boroughGid, zip, bbl, isIncomeEligible, evictionType };
}

// This is a feeble attempt to encapsulate the logic contained in other parts of this codebase.
export function getRtcHelp({ zip, boroughGid, evictionType, isIncomeEligible, bbl }: RtcInfo): {title: string, url: string} {
  const borough = getEfnycBoroughId(boroughGid);
  const locale = 'en-US';
  const isNYCHA = !!getNychaInfo(bbl);
  const isRtcZip = isRtcZipcode(zip);
  const isEligible = isRtcZip && isIncomeEligible;
  const rtc = evictionType !== 'general' && isEligible ? 'rtc' : '';

  if (isNYCHA && evictionType === 'general') {
    return {
      title: 'If the head of household in your apartment is 62 years or older, and you have an administrative hearing at NYCHA, you have the right to an attorney. Otherwise, you still have options to get assistance.',
      url: `https://${EFNYC_HOST}/${locale}/admin-hearings`
    };
  }

  return {
    title: rtc ? 'Great news! You likely have the right to a free attorney.' : 'You may not yet have the right to a free attorney, but you still have options to get assistance!',
    url: `https://${EFNYC_HOST}/${locale}/guide/${borough}/${evictionType}${rtc}?zip=${zip}`
  };
}
