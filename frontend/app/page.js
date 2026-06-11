// Next.js 的 Link 组件，用于页面跳转
import Link from "next/link";

// 首页组件
export default function HomePage() {
  return (
    <section className="hero">
      {/* 网站主标题 */}
      <h1>Pokémon Showdown Pokédex</h1>

      {/* 网站介绍 */}
      <p>
        Search Pokémon, view stats, check moves, and build a competitive team in
        a Pokémon Showdown-style format.
      </p>

      {/* 首页按钮区域 */}
      <div className="buttonGroup">
        {/* 跳转到图鉴页面 */}
        <Link href="/pokedex" className="button">
          Open Pokédex
        </Link>

        {/* 跳转到队伍构建页面 */}
        <Link href="/team-builder" className="button secondary">
          Team Builder
        </Link>
      </div>
    </section>
  );
}
