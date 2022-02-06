import { Team, ITeamQueryResult, ITeam, ITeamRequest } from '../models/Team'
import { TeamsRepository } from '../repositories/TeamsRepository'
import { TrainersService } from '../services/TrainersService'
import { PokemonsService } from '../services/PokemonsService'

const { findAll, findById, save, update } = new TeamsRepository()
const { create } = new TrainersService()
const { getPokemons } = new PokemonsService()

export class TeamsService {
  public async getAll() {
    return await findAll().then((results) =>
      Promise.all(results.map((result) => convertTeamQueryResult(result)))
    )
  }

  public async getById(id: number) {
    return await findById(id).then((result) => convertTeamQueryResult(result))
  }

  public async create(request: ITeamRequest) {
    const team = {
      id: request.id,
      trainer_id: request.trainer.id,
      pokemon_ids: request.pokemonIds,
    }
    if (!request.trainer.id) {
      const trainer = await create(request.trainer)
      team.trainer_id = trainer.id
    }
    return await save(team)
  }

  public async update(request: ITeamRequest) {
    if (!request.trainer.id) throw 'the trainer is not found'
    return await update({
      id: request.id,
      trainer_id: request.trainer.id,
      pokemon_ids: request.pokemonIds,
    })
  }

  public async delete(id: number) {
    return await new TeamsRepository().delete(id)
  }
}

async function convertTeamQueryResult(result: ITeamQueryResult) {
  const pokemons = await getPokemons(result.pokemon_ids)
  return {
    id: Number(result.team_id),
    trainer: {
      id: Number(result.trainer_id),
      pseudo: result.trainer_pseudo,
    },
    pokemons,
  } as ITeam
}
