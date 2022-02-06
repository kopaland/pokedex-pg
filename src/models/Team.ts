import { IPokemon } from "./Pokemon";
import { Trainer } from "./Trainer";

export interface Team {
  id: number | null
  trainer_id: number
  pokemon_ids: number[]
}

export interface ITeam {
  id: number | null
  trainer: Trainer
  pokemons: IPokemon[]
}

export interface ITeamQueryResult {
  team_id: number
  trainer_id: number
  trainer_pseudo: string
  pokemon_ids: number[]
}

export interface ITeamRequest {
  id: number
  trainer: Trainer
  pokemonIds: number[]
}