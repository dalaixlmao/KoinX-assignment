import CryptoRepository from '../repositories/cryptoRepository';
import { CryptoStats } from '../types/cryptoTypes';

class CryptoService {
  private cryptoRepository: CryptoRepository;

  constructor() {
    this.cryptoRepository = new CryptoRepository();
  }

  public async getLatestStats(coin: string): Promise<CryptoStats> {
    const latestData = await this.cryptoRepository.findLatest(coin);
    if (!latestData) {
      throw new Error('No data found for the specified coin');
    }
    return {
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h
    };
  }

  public async calculateDeviation(coin: string): Promise<number> {
    const last100Records = await this.cryptoRepository.findLast100(coin);
    if (last100Records.length === 0) {
      throw new Error('No data found for the specified coin');
    }
    const prices = last100Records.map(record => record.price);
    return this.standardDeviation(prices);
  }

  private standardDeviation(values: number[]): number {
    const n = values.length;
    const mean = values.reduce((sum, value) => sum + value, 0) / n;
    const squaredDifferences = values.map(value => Math.pow(value - mean, 2));
    const variance = squaredDifferences.reduce((sum, squaredDiff) => sum + squaredDiff, 0) / n;
    return Math.sqrt(variance);
  }
}

export default CryptoService;