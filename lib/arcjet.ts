import arcjet, { protectSignup } from "@arcjet/next";
console.log(process.env.ARCJET_KEY)
const aj = arcjet({
    key: process.env.ARCJET_KEY || '',
    rules: [
        protectSignup({
            email: {
                mode: 'LIVE',
                block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
            },
            bots: {
                mode: "LIVE",
                // configured with a list of bots to allow from
                // https://arcjet.com/bot-list
                allow: [], // "allow none" will block all detected bots
              },
              // It would be unusual for a form to be submitted more than 5 times in 10
              // minutes from the same IP address
              rateLimit: {
                // uses a sliding window rate limit
                mode: "LIVE",
                interval: "10m", // counts requests over a 10 minute sliding window
                max: 100, // allows 5 submissions within the window
              },
        })
    ],
});

export const loginRules = arcjet({
    key: process.env.ARCJET_KEY || '',
    characteristics: ['ip.src'],
    rules: [
       
    ],
})

export default aj;
