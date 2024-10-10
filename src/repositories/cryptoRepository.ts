import CryptoModel from '../models/cryptoModel';
import { ICrypto } from '../types/cryptoModelTypes';

class CryptoRepository {
  public async findLatest(coin: string): Promise<ICrypto | null> {
    return CryptoModel.findOne({ coin }).sort({ timestamp: -1 });
  }

  public async findLast100(coin: string): Promise<ICrypto[]> {
    return CryptoModel.find({ coin }).sort({ timestamp: -1 }).limit(100);
  }

  public async save(data: Omit<ICrypto, 'timestamp'>): Promise<void> {
    const crypto = new CryptoModel(data);
    await crypto.save();
  }
}

export default CryptoRepository;