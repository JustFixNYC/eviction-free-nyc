// The following JSON file is taken from:
// https://github.com/JustFixNYC/who-owns-what/blob/master/client/src/data/nycha_bbls.json
import nychaBBLs from "../data/nycha_bbls.json";

type NychaInfo = {
  bbl: number;
  development: string;
};

const BBL_MAP = new Map<number, NychaInfo>();

nychaBBLs.forEach((info) => {
  BBL_MAP.set(info.bbl, info);
});

export function getNychaInfo(bbl: string): NychaInfo | undefined {
  return BBL_MAP.get(parseInt(bbl));
}
