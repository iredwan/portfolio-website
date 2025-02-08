import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String },
}, 
{ 
    timestamps: true, 
    versionKey: false 
});
const TeamModel = mongoose.model("Team", TeamSchema);
export default TeamModel;