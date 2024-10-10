import { Request, Response, NextFunction } from 'express';
import CryptoService from '../services/cryptoService';

class CryptoController {
  private cryptoService: CryptoService;

  constructor() {
    this.cryptoService = new CryptoService();
  }

  public getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { coin } = req.query;
      if (typeof coin !== 'string') {
        res.status(400).json({ error: 'Coin parameter is required and must be a string' });
        return;
      }
      const stats = await this.cryptoService.getLatestStats(coin);
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }

  public getDeviation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { coin } = req.query;
      if (typeof coin !== 'string') {
        res.status(400).json({ error: 'Coin parameter is required and must be a string' });
        return;
      }
      const deviation = await this.cryptoService.calculateDeviation(coin);
      res.json({ deviation });
    } catch (error) {
      next(error);
    }
  }
}

export default CryptoController;