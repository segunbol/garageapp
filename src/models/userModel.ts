import { Schema, PaginateModel, model } from "mongoose";
import { IUser, GenderEnum } from "../types";
import paginate from "mongoose-paginate-v2";


const userSchema = new Schema<IUser>(
  {
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: {
      type: String,
      enum: Object.values(GenderEnum),
      required: true,
    },
    vehicles: [{ type: Schema.Types.ObjectId, ref: "Vehicles", required: false }],
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: false },
    verified: { type: Boolean, default: false, required: false },
    email: { type: String, required: true, unique: true },
    phoneNo: { type: String, required: true, unique: true },
    address: {type: String, required: false},
    state: { type: String, required: false },
    city: { type: String, required: false },
  },
  {
    timestamps: true,
    toObject: {
      transform(_doc, ret) {
        delete ret.__v;
      },
    },
    toJSON: {
      getters: true,
      virtuals: true,
      transform(_doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userSchema.plugin(paginate);
const Users = model<IUser, PaginateModel<IUser>>("Users", userSchema);

userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

export default Users;
