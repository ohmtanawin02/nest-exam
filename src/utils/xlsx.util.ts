import * as XLSX from 'xlsx'

export function changeBufferFile(file) {
  if (typeof file.buffer === 'object') {
    const bufferArray = Object.values(file.buffer).map((value) => {
      if (typeof value === 'number') {
        return value
      }
      throw new Error('Invalid byte value')
    })
    return bufferArray
  }
  return file.buffer
}

export async function writeFileBuffer(excelSheet) {
  const worksheet = await XLSX.utils.json_to_sheet(excelSheet)
  const wb: XLSX.WorkBook = {
    Sheets: {
      Sheet1: worksheet
    },
    SheetNames: ['Sheet1']
  }
  const wopts: XLSX.WritingOptions = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'buffer'
  }

  return XLSX.write(wb, wopts)
}

export async function readXLXStoJson(file) {
  const bufferArray = changeBufferFile(file)

  const buffer = Buffer.from(bufferArray)

  const workbook = XLSX.read(buffer, { type: 'buffer' })

  const workbookToJson = XLSX.utils.sheet_to_json(
    workbook.Sheets[workbook.SheetNames[0]]
  )

  return workbookToJson
}
