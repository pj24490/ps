// 引入全局 CSS 文件，这个 CSS 会影响整个网站
import "./globals.css";

// Next.js 自带的 Link 组件，用来做页面跳转
// 比普通 <a> 标签更适合 Next.js 路由
import Link from "next/link";

// metadata 是 Next.js 的页面元信息
// 会影响网页标题、SEO 描述等
export const metadata = {
  title: "Pokémon Showdown Pokédex",
  description: "A Pokémon Showdown-style Pokédex and team builder",
};

// RootLayout 是整个网站的根布局
// 所有页面都会被这个 layout 包起来
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* 顶部导航栏，所有页面都会显示 */}
        <nav className="navbar">
          {/* 网站 Logo，点击后回到首页 */}
          <Link href="/" className="logo">
            PS Pokédex
          </Link>

          {/* 右侧导航链接 */}
          <div className="navLinks">
            <Link href="/pokedex">Pokédex</Link>
            <Link href="/moves">Moves</Link>
            <Link href="/team-builder">Team Builder</Link>
          </div>
        </nav>

        {/* children 表示当前页面的具体内容 */}
        {/* 比如 /pokedex 页面内容会被放到这里 */}
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
