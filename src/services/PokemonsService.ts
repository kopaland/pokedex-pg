import { Pokemon, PokemonClient } from 'pokenode-ts'
import { IPokemon } from '../models/Pokemon'

const api = new PokemonClient()

export class PokemonsService {
  public async getPokemons(ids: number[]) {
    const pokemons = await Promise.all(ids.map((id) => api.getPokemonById(id)))
    return pokemons.map((pokemon) => convertPokemon(pokemon))
  }
}

function convertPokemon(pokemon: Pokemon) {
  return {
    id: pokemon.id,
    name: pokemon.name,
    evolveOrder: `#${pokemon.order}`,
    imageSrc: pokemon.sprites.other['official-artwork'].front_default,
    types: pokemon.types.map((item) => item.type.name),
    stats: pokemon.stats.map((item) => ({
      name: item.stat.name,
      base: item.base_stat,
    })),
  } as IPokemon
}
