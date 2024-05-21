// floor: string;
//     lane: string;
//     slot: string;
//     wing: string;

import { Schema, PaginateModel, model } from "mongoose";
import { IParkLot,} from "../types";
import paginate from "mongoose-paginate-v2";

const parkLotSchema = new Schema<IParkLot>(
  {
    floor:{ type: String, required: true },
    lane: { type: String, required: true },
    slot:{ type: String, required: true },
    wing: { type: String, required: true },
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

parkLotSchema.plugin(paginate);
const ParkLot = model<IParkLot, PaginateModel<IParkLot>>("ParkLot", parkLotSchema);

export default ParkLot;
