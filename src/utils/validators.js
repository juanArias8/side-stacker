export const required = (value) => value && value.length
export const maxLength = (len) => (value) => !(value) || (value.length <= len)
export const minLength = (len) => (value) => value && (value.length >= len)
export const isNumber = (value) => !isNaN(Number(value))


