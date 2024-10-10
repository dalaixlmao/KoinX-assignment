import cron from 'node-cron';
import CryptoRepository from '../repositories/cryptoRepository';
import CoinGeckoService from '../services/coinGeckoService';

class BackgroundJob {
  private cryptoRepository: CryptoRepository;
  private coinGeckoService: CoinGeckoService;
  private job: cron.ScheduledTask | null = null;

  constructor() {
    this.cryptoRepository = new CryptoRepository();
    this.coinGeckoService = new CoinGeckoService();
  }

  public start(): void {
    if (this.job) {
      console.log('Background job is already running');
      return;
    }
    this.fetchAndStoreData();

    // schedule it to run every 2 hours
    this.job = cron.schedule('0 */2 * * *', () => {
      this.fetchAndStoreData();
    });

    console.log('Background job scheduled to run every 2 hours');
  }

  public stop(): void {
    if (this.job) {
      this.job.stop();
      this.job = null;
      console.log('Background job stopped');
    } else {
      console.log('No background job is running');
    }
  }

  private async fetchAndStoreData(): Promise<void> {
    try {
      const coins = ['bitcoin', 'matic-network', 'ethereum'];
      const data = await this.coinGeckoService.fetchCryptoData(coins);
      
      for (const coinData of data) {
        await this.cryptoRepository.save({
          coin: coinData.id,
          price: coinData.current_price,
          marketCap: coinData.market_cap,
          change24h: coinData.price_change_percentage_24h
        });
      }
      
      console.log('Cryptocurrency data updated successfully');
    } catch (error) {
      console.error('Error updating cryptocurrency data:', error);
    }
  }
}

export default BackgroundJob;