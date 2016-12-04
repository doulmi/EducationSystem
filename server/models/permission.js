import mongoose from "mongoose"

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const permissionSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, index: true, required: true }
}, {
  timestamps: true
});

const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;