export const cookieConfig = Object.freeze({
  allowedChars: {
    name: /^[^\x00-\0x1F\x7F\s?={}()[\]<>,:;\\/"@]+$/,
    value: /^[^\x00-\0x1F\x7F\s=,:;\\/"]+$/
  }
})
