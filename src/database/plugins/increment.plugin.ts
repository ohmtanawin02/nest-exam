export const incrementPlugin = (schema, options) => {
  schema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const doc = this
    const { Counter: counterModel } = doc.db.models
    try {
      if (doc[options.inc_field] === 0) {
        const result = await counterModel.findByIdAndUpdate(
          { _id: options.id },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        )
        doc[options.inc_field] = options.custom
          ? options.custom(result.seq)
          : result.seq.toString()
      }
      next()
    } catch (e) {
      next(e)
    }
  })
}
