/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema } from 'mongoose'

interface IOptions {
  prefix: string
  field: string
  digits: number
}

const runningNumber = (schema: Schema, options: IOptions) => {
  schema.pre('save', async function runningNumber(next) {
    const doc = this
    try {
      let currentNumber = doc._id
      const currentNumberDigits = currentNumber.toString().length

      if (currentNumberDigits > options.digits) {
        currentNumber = Number(doc._id.toString().slice(-options.digits))
      }

      const formattedNumber = currentNumber
        .toString()
        .padStart(options.digits, '0')
      doc[options.field] = `${options.prefix}-${formattedNumber}`
      next()
    } catch (e) {
      next(e)
    }
  })
}

export default runningNumber
