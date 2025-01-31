import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  doorCount: { type: Number, required: true },
  isConvertible: { type: Boolean, required: true },
  engineSize: { type: String, required: false },
});

export default mongoose.models.Car || mongoose.model('Car', carSchema);
