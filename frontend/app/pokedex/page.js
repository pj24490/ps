"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const TYPES = [
  "all",
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export default function PokedexPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadPokemon() {
      try {
        const res = await fetch("/api/pokemon");
        const data = await res.json();

        console.log("API data:", data);

        if (!res.ok) {
          setPokemonList([]);
          setErrorMessage("Failed to load Pokémon data.");
          return;
        }

        if (Array.isArray(data)) {
          setPokemonList(data);
          setErrorMessage("");
        } else if (Array.isArray(data.results)) {
          setPokemonList(data.results);
          setErrorMessage("");
        } else if (Array.isArray(data.pokemon)) {
          setPokemonList(data.pokemon);
          setErrorMessage("");
        } else if (Array.isArray(data.data)) {
          setPokemonList(data.data);
          setErrorMessage("");
        } else {
          console.error("API returned wrong format:", data);
          setPokemonList([]);
          setErrorMessage("Pokémon data format is wrong.");
        }
      } catch (error) {
        console.error("Failed to load Pokémon:", error);
        setPokemonList([]);
        setErrorMessage("Failed to load Pokémon data.");
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, []);

  const filteredPokemon = Array.isArray(pokemonList)
    ? pokemonList.filter((pokemon) => {
        const name = pokemon.name || "";
        const id = pokemon.id || "";
        const types = Array.isArray(pokemon.types) ? pokemon.types : [];

        const matchesSearch =
          name.toLowerCase().includes(search.toLowerCase()) ||
          String(id).includes(search);

        const matchesType =
          selectedType === "all" || types.includes(selectedType);

        return matchesSearch && matchesType;
      })
    : [];

  if (loading) {
    return <p>Loading Pokémon...</p>;
  }

  return (
    <section>
      <h1 className="pageTitle">Pokédex</h1>

      {errorMessage && <p>{errorMessage}</p>}

      <input
        className="searchBar"
        type="text"
        placeholder="Search by name or Pokédex number..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="filterRow">
        <select
          className="select"
          value={selectedType}
          onChange={(event) => setSelectedType(event.target.value)}
        >
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {type === "all" ? "All Types" : type}
            </option>
          ))}
        </select>
      </div>

      {filteredPokemon.length === 0 ? (
        <p>No Pokémon found.</p>
      ) : (
        <div className="grid">
          {filteredPokemon.map((pokemon) => {
            const types = Array.isArray(pokemon.types) ? pokemon.types : [];

            return (
              <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                <div className="card">
                  <img src={pokemon.image} alt={pokemon.name} />

                  <h2>
                    #{pokemon.id} {pokemon.name}
                  </h2>

                  <div className="typeRow">
                    {types.map((type) => (
                      <span key={type} className={`typeBadge type-${type}`}>
                        {type}
                      </span>
                    ))}
                  </div>

                  <p>BST: {pokemon.bst}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
