import mongoose from "mongoose"

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const roleSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, index: true, required: true },
  permissions: [{ type: ObjectId, ref: 'Permission' }]
}, {
  timestamps: true
});

const Role = mongoose.model('Role', roleSchema);

export default Role;