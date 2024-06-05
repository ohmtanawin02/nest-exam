/* eslint-disable @typescript-eslint/no-this-alias */
function stampAuthor(requestUser: any) {
  const result = {
    id: requestUser?.sub || '0',
    username: requestUser?.username || 'system',
    email: requestUser?.email || 'system'
  }

  return result
}

export const authorStampCreatePlugin = (schema) => {
  schema.pre('save', function (next) {
    const doc = this
    const requestUser = doc._requestUser
    this.updatedBy = stampAuthor(requestUser)
    if (this.isNew) {
      this.createdBy = stampAuthor(requestUser)
    }
    next()
  })

  schema.pre('findOneAndUpdate', function (next) {
    const doc = this
    const requestUser = doc._requestUser
    this.updatedBy = stampAuthor(requestUser)
    next()
  })

  schema.pre('update', function (next) {
    const doc = this
    const requestUser = doc._requestUser
    this.updatedBy = stampAuthor(requestUser)
    next()
  })

  schema.pre('updateOne', function (next) {
    const doc = this
    const requestUser = doc._requestUser
    this.updatedBy = stampAuthor(requestUser)
    next()
  })
}
