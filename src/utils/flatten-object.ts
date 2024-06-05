export function flattenObject(obj, parentKey = '', result = {}) {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      flattenObject(obj[key], `${parentKey}${key}.`, result)
    } else {
      result[`${parentKey}${key}`] = obj[key]
    }
  }
  return result
}

export function unFlattenObject(flatObject) {
  const result = {}

  for (const [compositeKey, value] of Object.entries(flatObject)) {
    const keyParts = compositeKey.split('.')
    let currentLevel = result

    for (let i = 0; i < keyParts.length - 1; i++) {
      const part = keyParts[i]

      if (!currentLevel[part]) currentLevel[part] = {}

      currentLevel = currentLevel[part]
    }

    currentLevel[keyParts[keyParts.length - 1]] = value
  }

  return result
}
