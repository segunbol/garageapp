import { Schema, PaginateModel, model } from "mongoose";
import {  IVehicle } from "../utils/types";
import paginate from "mongoose-paginate-v2";

const vehicleSchema = new Schema<IVehicle>(
  {
    userOwner:{ type: Schema.Types.ObjectId, ref: "Users", required: true },
    name: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    productionYear: {
      type: String,
      required: true,
    },
    engineNumber: { type: String, required: true },
    image: { type: String, required: false },
    chasisNumber: { type: String, required: true },
    color:{ type: String, required: true },
    vehicleType: { type: String, required: true }
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

vehicleSchema.plugin(paginate);
const Vehicles = model<IVehicle, PaginateModel<IVehicle>>("Vehicles", vehicleSchema);

export default Vehicles;
