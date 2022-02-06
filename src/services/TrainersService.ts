import { Trainer } from '../models/Trainer'
import { TrainersRepository } from '../repositories/TrainersRepository'

const { findAll, findById, save, update } = new TrainersRepository()

export class TrainersService {
  public async getAll() {
    return await findAll()
  }

  public async getById(id: number) {
    return await findById(id)
  }

  public async create(trainer: Trainer) {
    return await save(trainer)
  }

  public async update(trainer: Trainer) {
    return await update(trainer)
  }

  public async delete(id: number) {
    return await new TrainersRepository().delete(id)
  }
}
