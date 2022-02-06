interface PokemonStats {
  name: string
  base: number
}

export interface IPokemon {
  id: number | null
  name: string
  evolveOrder: string
  imageSrc: string | null
  types: string[]
  stats: PokemonStats[]
}
