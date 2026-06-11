// 这里先使用静态技能数据
// 后面你可以改成从 API 获取真实 Moves 数据
const moves = [
  {
    name: "Earthquake",
    type: "Ground",
    category: "Physical",
    power: 100,
    accuracy: 100,
    pp: 10,
  },
  {
    name: "Thunderbolt",
    type: "Electric",
    category: "Special",
    power: 90,
    accuracy: 100,
    pp: 15,
  },
  {
    name: "Flamethrower",
    type: "Fire",
    category: "Special",
    power: 90,
    accuracy: 100,
    pp: 15,
  },
  {
    name: "Swords Dance",
    type: "Normal",
    category: "Status",
    power: "-",
    accuracy: "-",
    pp: 20,
  },
  {
    name: "Stealth Rock",
    type: "Rock",
    category: "Status",
    power: "-",
    accuracy: "-",
    pp: 20,
  },
];

// 技能页面
export default function MovesPage() {
  return (
    <section>
      <h1 className="pageTitle">Moves</h1>

      {/* 技能表格 */}
      <table className="table">
        <thead>
          <tr>
            <th>Move</th>
            <th>Type</th>
            <th>Category</th>
            <th>Power</th>
            <th>Accuracy</th>
            <th>PP</th>
          </tr>
        </thead>

        <tbody>
          {moves.map((move) => (
            <tr key={move.name}>
              <td>{move.name}</td>
              <td>{move.type}</td>
              <td>{move.category}</td>
              <td>{move.power}</td>
              <td>{move.accuracy}</td>
              <td>{move.pp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
