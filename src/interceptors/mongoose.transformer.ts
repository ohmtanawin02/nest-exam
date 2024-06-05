/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common'
import * as humps from 'humps'

@Injectable()
export class MongooseTransformers {
  paginationTransformer(data: any): object {
    data.docs.forEach((doc, index) => {
      data.docs[index] = JSON.parse(
        JSON.stringify(doc.toObject ? doc.toObject() : doc)
      )
    })
    const response = {
      message: 'done',
      data: {
        ...data,
        results: data.docs
      }
    }
    delete response.data.docs

    return humps.decamelizeKeys(response)
  }

  documentTransformer(data: any): object {
    const response = {
      message: 'done',
      data: humps.decamelizeKeys(JSON.parse(JSON.stringify(data.toObject())))
    }

    return response
  }

  arrayTransformer(data: any): object {
    data.forEach((doc, index) => {
      if (typeof doc.toObject == 'undefined') {
        const stringDoc = JSON.stringify(doc).replace(/_id/g, 'id')
        data[index] = JSON.parse(stringDoc)
      } else {
        data[index] = JSON.parse(JSON.stringify(doc.toObject()))
      }
    })
    const response = {
      message: 'done',
      data: humps.decamelizeKeys(data)
    }

    return response
  }

  arrayAggregateTransformer(data: any): object {
    if (typeof data.results.toObject == 'undefined') {
      const stringDoc = JSON.stringify(data).replace(/_id/g, 'id')
      data = JSON.parse(stringDoc)
    }
    const response = {
      message: 'done',
      data: humps.decamelizeKeys(data)
    }

    return response
  }

  objectArrayTransformer(data: any): object {
    const objectKey = data ? Object.keys(data) : []
    for (const key of objectKey) {
      if (Array.isArray(data[key])) {
        data[key].forEach((doc, index) => {
          if (typeof doc.toObject == 'undefined') {
            const stringDoc = JSON.stringify(doc).replace(/_id/g, 'id')
            data[key][index] = JSON.parse(stringDoc)
          } else {
            data[key][index] = doc._id ? doc.toObject() : doc
          }
        })
      }
    }
    const response = {
      message: 'done',
      data: humps.decamelizeKeys(data)
    }

    return response
  }

  tokenTransformer(data: any): object {
    const { expiresIn, accessToken, ...information } = JSON.parse(
      JSON.stringify(data)
    )
    const response = {
      message: 'done',
      data: information,
      expiresIn,
      accessToken
    }

    return humps.decamelizeKeys(response)
  }

  defaultTransformer(data: any): object {
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach((doc, index) => {
          if (typeof doc.toObject == 'undefined') {
            const stringDoc = JSON.stringify(doc).replace(/_id/g, 'id')
            data[key][index] = JSON.parse(stringDoc)
          } else {
            data[key][index] = doc._id ? doc.toObject() : doc
          }
        })
      } else if (!data[key]) {
        data[key] = data[key]
      } else if (data[key]._id) {
        if (typeof data[key].toObject == 'undefined') {
          const stringDoc = JSON.stringify(data[key]).replace(/_id/g, 'id')
          data[key] = JSON.parse(stringDoc)
        } else {
          data[key] = data[key]._id ? data[key].toObject() : data[key]
        }
      }
    }
    const response = {
      message: 'done',
      data: humps.decamelizeKeys(data)
    }

    return response
  }
}
