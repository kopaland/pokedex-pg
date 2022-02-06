import { ITeamQueryResult } from './../models/Team'
import { Team } from '../models/Team'
import pool from '../configs/postgresConnector'

export class TeamsRepository {
  public async findAll() {
    const client = await pool.connect()
    try {
      const query =
        'SELECT te.id team_id, tr.id trainer_id, tr.pseudo trainer_pseudo, te.pokemon_ids FROM teams te INNER JOIN trainers tr on tr.id = te.trainer_id'
      const { rows } = await client.query(query)
      return rows as ITeamQueryResult[]
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
      const query = `SELECT te.id team_id, tr.id trainer_id, tr.pseudo trainer_pseudo, te.pokemon_ids FROM teams te INNER JOIN trainers tr on tr.id = te.trainer_id WHERE te.id = ${id}`
      const { rows } = await client.query(query)
      return rows[0] as ITeamQueryResult
    } catch (error) {
      console.error(error)
      return null
    } finally {
      client.release()
    }
  }

  public async save(team: Team) {
    const client = await pool.connect()
    const query =
      'INSERT INTO teams(trainer_id, pokemon_ids) VALUES($1, $2) RETURNING *'
    const values = [team.trainer_id, team.pokemon_ids]
    try {
      const { rows } = await client.query(query, values)
      return rows[0] as Team
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      client.release()
    }
  }

  public async update(team: Team) {
    const client = await pool.connect()
    const query = `UPDATE teams t SET pokemon_ids = ${team.pokemon_ids} WHERE t.id = ${team.id} RETURNING *`
    try {
      const { rows } = await client.query(query)
      return rows[0] as Team
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      client.release()
    }
  }

  public async delete(id: number) {
    const client = await pool.connect()
    const query = `DELETE teams t WHERE t.id = ${id}`
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
