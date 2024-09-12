import UserSave from './user/userSave'
import UserGetByEmail from './user/userGetByEmail'
import UserGetById from './user/userGetById'
import UserGetFirst from './user/userGetFirst'
import UserUpdatePassword from './user/userUpdatePassword'
import passwordTokenGenerate from './passwordToken/tokenGenerate'
import passwordTokenGetByEmail from './passwordToken/tokenGetByEmail'
import passwordTokenGetByToken from './passwordToken/tokenGetByToken'
import passwordTokenDelete from './passwordToken/tokenDelete'

/// eslint-disable-next-line @typescript-eslint/no-extraneous-class
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
}
