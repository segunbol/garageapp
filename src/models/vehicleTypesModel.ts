import { Schema, PaginateModel, model } from "mongoose";
import { IVehicleTypes } from "../types";
import paginate from "mongoose-paginate-v2";

const vehicleTypesSchema = new Schema<IVehicleTypes>(
  {
    name: { type: String, required: true, unique: true },
    numberOfWheels: { type: Number, required: true },
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

vehicleTypesSchema.plugin(paginate);
const VehicleTypes = model<IVehicleTypes, PaginateModel<IVehicleTypes>>("VehicleTypes", vehicleTypesSchema);

export default VehicleTypes;
