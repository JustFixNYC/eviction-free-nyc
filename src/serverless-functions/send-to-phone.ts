import "source-map-support/register";

import { EFNYC_HOST, serverlessRollbarHandler } from "../utils/serverless-util";
import { Twilio } from "twilio";

const validatePhoneNumber = (phone: string) => {
  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length === 11) {
    return "+" + phoneDigits;
  } else return false;
};

const validatePath = (path: string) => (path.slice(0, 1) === "/" ? path : null);

export const handler = serverlessRollbarHandler(async (event) => {
  const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER,
  } = process.env;

  if (!(TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE_NUMBER)) {
    throw new Error("Twilio credentials are not in environment!");
  }

  const userPhone = event.body && JSON.parse(event.body).userPhone;

  if (!userPhone) {
    return {
      statusCode: 400,
      body: "No receiving phone number given!",
    };
  }

  const validPhone = validatePhoneNumber(userPhone);

  if (!validPhone) {
    return {
      statusCode: 400,
      body: "Receiving phone number was invalid!",
    };
  }

  const resultsPagePath = event.body && JSON.parse(event.body).resultsPagePath;

  if (resultsPagePath && !validatePath(resultsPagePath)) {
    return {
      statusCode: 400,
      body: "Results page path was invalid!",
    };
  }

  const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  await client.messages.create({
    body: `Eviction Free NYC! Follow this link for assistance in your eviction case: https://${EFNYC_HOST}${
      resultsPagePath || ""
    }`,
    to: validPhone, // Text this number
    from: TWILIO_PHONE_NUMBER, // From a valid Twilio number
  });

  return {
    statusCode: 200,
    body: "Text message sent!",
  };
});
