const prefix = 'website'
const users = 'users'
const auth = 'auth'
const question = 'question'
const submit = 'submit'

export const routesV1 = {
  version: 'v1',
  user: {
    settingRoot: `${prefix}/${users}`,
    settingTag: `${users} [${prefix}]`
  },
  auth: {
    settingRoot: `${prefix}/${auth}`,
    settingTag: `${auth} [${prefix}]`
  },
  question: {
    settingRoot: `${prefix}/${question}`,
    settingTag: `${question} [${prefix}]`
  },
  submit: {
    settingRoot: `${prefix}/${submit}`,
    settingTag: `${submit} [${prefix}]`
  }
}
