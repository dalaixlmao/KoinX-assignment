import mongoose, { Document, Schema } from 'mongoose';
import { ICrypto } from '../types/cryptoModelTypes';


const cryptoSchema: Schema = new Schema({
  timestamp: { type: Date, default: Date.now },
  coin: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true }
});

export default mongoose.model<ICrypto>('Crypto', cryptoSchema);