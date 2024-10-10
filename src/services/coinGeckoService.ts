import axios, { AxiosInstance } from 'axios';
import { CoinGeckoResponse } from '../types/coinGeckoTypes';

class CoinGeckoService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://api.coingecko.com/api/v3',
    });
  }

  public async fetchCryptoData(coins: string[]): Promise<CoinGeckoResponse[]> {
    try {
      const response = await this.apiClient.get<CoinGeckoResponse[]>('/coins/markets', {
        params: {
          vs_currency: 'usd',
          ids: coins.join(','),
          order: 'market_cap_desc',
          per_page: coins.length,
          page: 1,
          sparkline: false,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data from CoinGecko:', error);
      throw error;
    }
  }
}

export default CoinGeckoService;