export const isDeepEqual = (object1: number[], object2: number[]) => {
  const objKeys1 = Object.keys(object1)
  const objKeys2 = Object.keys(object2)

  if (objKeys1.length !== objKeys2.length) return false

  for (var key of objKeys1) {
    const value1 = object1[key as unknown as number]
    const value2 = object2[key as unknown as number]

    if (value1 !== value2) return false
  }
  return true
}
