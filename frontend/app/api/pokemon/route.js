export async function GET() {
  try {
    const listResponse = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=30",
      {
        cache: "no-store",
      }
    );

    if (!listResponse.ok) {
      console.error("Failed to fetch Pokémon list:", listResponse.status);
      return Response.json([]);
    }

    const listData = await listResponse.json();

    const detailedPokemon = await Promise.allSettled(
      listData.results.map(async (pokemon) => {
        const response = await fetch(pokemon.url, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch ${pokemon.name}`);
        }

        const data = await response.json();

        const types = data.types.map((item) => item.type.name);

        const bst = data.stats.reduce((sum, item) => {
          return sum + item.base_stat;
        }, 0);

        return {
          id: data.id,
          name: data.name,
          image:
            data.sprites.other["official-artwork"].front_default ||
            data.sprites.front_default,
          types,
          bst,
        };
      })
    );

    const successfulPokemon = detailedPokemon
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    return Response.json(successfulPokemon);
  } catch (error) {
    console.error("Failed to fetch Pokémon data:", error);

    return Response.json([]);
  }
}
