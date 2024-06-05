export function convertObjectKeysToCamelCase(obj: any): any {
  const result = {}

  for (const key in obj) {
    const newKey = camelCase(key)
    const value = obj[key]
    if (value !== null && typeof value === 'object') {
      result[newKey] = convertObjectKeysToCamelCase(value)
    } else {
      result[newKey] = value
    }
  }

  return result
}

function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}
