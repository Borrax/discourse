export const cookieConfig = Object.freeze({
  allowedChars: {
    // eslint-disable-next-line no-control-regex
    name: /^[^\x00-\x1F\x7F\s?={}()[\]<>,:;\\/"@]+$/,
    // eslint-disable-next-line no-control-regex
    value: /^[^\x00-\x1F\x7F\s=,:;\\/"]+$/
  }
})
