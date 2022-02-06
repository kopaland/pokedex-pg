import { Trainer } from '../models/Trainer'
import pool from '../configs/postgresConnector'

export class TrainersRepository {
  public async findAll() {
    const client = await pool.connect()
    try {
      const query = 'SELECT * FROM trainers'
      const { rows } = await client.query(query)
      return rows as Trainer[]
    } catch (error) {
      console.error(error)
      return []
    } finally {
      client.release()
    }
  }

  public async findById(id: number) {
    const client = await pool.connect()
    try {
      const query = `SELECT * FROM trainers t WHERE t.id = ${id}`
      const { rows } = await client.query(query)
      return rows[0] as Trainer
    } catch (error) {
      console.error(error)
      return null
    } finally {
      client.release()
    }
  }

  public async save(trainer: Trainer) {
    const client = await pool.connect()
    const query = 'INSERT INTO trainers(pseudo) VALUES($1) RETURNING *'
    const values = [trainer.pseudo]
    try {
      const { rows } = await client.query(query, values)
      return rows[0] as Trainer
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      client.release()
    }
  }

  public async update(trainer: Trainer) {
    const client = await pool.connect()
    const query = `UPDATE trainers t SET pseudo = ${trainer.pseudo} WHERE t.id = ${trainer.id} RETURNING *`
    try {
      const { rows } = await client.query(query)
      return rows[0] as Trainer
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      client.release()
    }
  }

  public async delete(id: number) {
    const client = await pool.connect()
    const query = `DELETE trainers t WHERE t.id = ${id}`
    try {
      await client.query(query)
      return
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      client.release()
    }
  }
}
