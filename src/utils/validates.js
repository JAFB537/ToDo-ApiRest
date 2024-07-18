// ------> Validates

export const isValidDate = (input) => {
  const date = new Date(input)
  return !isNaN(date)
}

export function isValidUUID (input) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(input)
}

export function isValidIntegerNumber (input) {
  const regex = /^-?\d+$/
  return regex.test(input)
}

export function isValidPositiveInteger (input) {
  const regex = /^(0|[1-9]\d{0,8})$/
  return regex.test(input)
}

// ------> Formats
