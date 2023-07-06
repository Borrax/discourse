/**
* Contains specifications for the cookies that are
* sent to the server and which the cookie parser
* middleware uses
* @property allowedChars - contains regexes that test
* positive for valid cookie names and values
* @property maxHeaderSize - the maximum number of bytes
* that the cookie header of the request can have
*/
export const cookieConfig = Object.freeze({
  allowedChars: {
    // eslint-disable-next-line no-control-regex
    name: /^[^\x00-\x1F\x7F\s?={}()[\]<>,:;\\/"@]+$/,
    // eslint-disable-next-line no-control-regex
    value: /^[^\x00-\x1F\x7F\s=,:;\\/"]+$/
  },
  maxHeaderSize: 4096
})
