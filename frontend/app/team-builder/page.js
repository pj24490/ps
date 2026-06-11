// 这里先写一个示例队伍
// 后面你可以改成用户自己添加 Pokémon
const sampleTeam = [
  {
    name: "Garchomp",
    item: "Rocky Helmet",
    ability: "Rough Skin",
    evs: "252 HP / 4 Atk / 252 Spe",
    nature: "Jolly",
    moves: ["Earthquake", "Stealth Rock", "Dragon Tail", "Fire Blast"],
  },
  {
    name: "Rotom-Wash",
    item: "Leftovers",
    ability: "Levitate",
    evs: "252 HP / 252 Def / 4 SpA",
    nature: "Bold",
    moves: ["Hydro Pump", "Volt Switch", "Will-O-Wisp", "Protect"],
  },
];

// 把一个 Pokémon 对象转换成 Pokémon Showdown 格式文本
function formatShowdownSet(pokemon) {
  return `${pokemon.name} @ ${pokemon.item}
Ability: ${pokemon.ability}
EVs: ${pokemon.evs}
${pokemon.nature} Nature
${pokemon.moves.map((move) => `- ${move}`).join("\n")}`;
}

// 队伍构建页面
export default function TeamBuilderPage() {
  // 计算还有几个空位
  // Pokémon Showdown 一个队伍最多 6 只
  const emptySlots = 6 - sampleTeam.length;

  // 把整个队伍转换成 Showdown Export 文本
  const showdownExport = sampleTeam.map(formatShowdownSet).join("\n\n");

  return (
    <section>
      <h1 className="pageTitle">Team Builder</h1>

      <p>
        Build a team of up to six Pokémon and export it in Pokémon Showdown
        format.
      </p>

      {/* 队伍格子区域 */}
      <div className="teamGrid">
        {/* 已有 Pokémon 格子 */}
        {sampleTeam.map((pokemon) => (
          <div className="teamSlot" key={pokemon.name}>
            <h2>{pokemon.name}</h2>

            <p>
              <strong>Item:</strong> {pokemon.item}
            </p>

            <p>
              <strong>Ability:</strong> {pokemon.ability}
            </p>

            <p>
              <strong>Nature:</strong> {pokemon.nature}
            </p>

            {/* 技能列表 */}
            <ul>
              {pokemon.moves.map((move) => (
                <li key={move}>{move}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* 空队伍格子 */}
        {Array.from({ length: emptySlots }).map((_, index) => (
          <div className="teamSlot" key={index}>
            <h2>Empty Slot</h2>
            <p>Add a Pokémon</p>
          </div>
        ))}
      </div>

      {/* Showdown 导出文本 */}
      <h2>Showdown Export</h2>

      <div className="exportBox">{showdownExport}</div>
    </section>
  );
}
