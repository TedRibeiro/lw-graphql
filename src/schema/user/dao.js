import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import BaseDAO from '~/src/schema/base/dao';

export default class UserDAO extends BaseDAO {
  static _model = mongoose.model('User', new mongoose.Schema({
    id: { type: String, index: true },
    username: { type: String, index: true },
    name: String,
    email: String,
    passwordHash: String,
  }));

  static async authenticate(username, password) {
    const user = await this._model.findOne({ username });
    const match = user && await bcrypt.compare(password, user.passwordHash);
    return match && user;
  }
}
