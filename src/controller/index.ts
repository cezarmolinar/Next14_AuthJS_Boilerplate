import UserSave from './user/userSave'
import UserGetByEmail from './user/userGetByEmail'
import UserGetById from './user/userGetById'
import UserGetFirst from './user/userGetFirst'
import UserUpdatePassword from './user/userUpdatePassword'

import passwordTokenGenerate from './passwordToken/tokenGenerate'
import passwordTokenGetByEmail from './passwordToken/tokenGetByEmail'
import passwordTokenGetByToken from './passwordToken/tokenGetByToken'
import passwordTokenDelete from './passwordToken/tokenDelete'

import emailVerificationGetByEmail from './emailVerification/emailVerificationByEmail'
import emailVerificationGetByToken from './emailVerification/emailVerificationByToken'
import emailVerificationDelete from './emailVerification/emailVerificationDelete'
import emailVerificationCreateToken from './emailVerification/emailVerificationCreateToken'

export default class ControllerDB {
  static readonly user = {
    getFirst: UserGetFirst,
    getByEmail: UserGetByEmail,
    getById: UserGetById,
    save: UserSave,
    updatePassword: UserUpdatePassword
  }

  static readonly tokenPassword = {
    getByEmail: passwordTokenGetByEmail,
    getByToken: passwordTokenGetByToken,
    generateToken: passwordTokenGenerate,
    delete: passwordTokenDelete
  }

  static readonly emailValidation = {
    getByEmail: emailVerificationGetByEmail,
    getByToken: emailVerificationGetByToken,
    generateToken: emailVerificationCreateToken,
    delete: emailVerificationDelete
  }
}
