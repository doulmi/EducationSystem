import mongoose from "mongoose"

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: String,
  role: { type: ObjectId, ref: 'Role' }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema);

export default User;