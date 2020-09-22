import "source-map-support/register";

import { serverlessRollbarHandler } from "../utils/serverless-util";
import { Twilio } from "twilio";

export const handler = serverlessRollbarHandler(async (event) => {
  const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER,
  } = process.env;
  if (!(TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE_NUMBER)) {
    throw new Error("Twilio credentials are not in environment!");
  }

  const userPhone =
    event.queryStringParameters && event.queryStringParameters.userPhone;

  if (!userPhone) {
    return {
      statusCode: 400,
      body: "No receiving phone number given!",
    };
  }

  var client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  await client.messages.create({
    body:
      "Hi Mr. Atul...",
    to: userPhone, // Text this number
    from: TWILIO_PHONE_NUMBER, // From a valid Twilio number
  });

  return {
    statusCode: 200,
    body: "Text message sent!",
  };
});
