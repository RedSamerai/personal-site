// 构建插件：剥离 @fontsource CSS 里的 .woff 回退（只保留 woff2），
// 并在 closeBundle 删除 dist 里残留的 .woff 文件。
// 背景：@fontsource 的字体 CSS 同时写 url(woff2) 和 url(woff)，现代浏览器只用 woff2，
//       把 woff 从 CSS 里去掉后 Vite 不再把 300+ 个 .woff（~9MB）打进 dist。
import fs from 'node:fs';
import path from 'node:path';

export function stripWoffFallback() {
  return {
    name: 'strip-woff-fallback',
    enforce: 'pre',
    transform(code, id) {
      if (/fontsource/.test(id) && /\.woff(?![0-9a-z])/i.test(code)) {
        // 去掉 `, url(xxx.woff) format('woff')` 回退段，保留 woff2 src
        const re = /,\s*url\(([^)]*\.woff)\)\s*format\(['"]woff['"]\)/g;
        if (re.test(code)) {
          return code.replace(re, '');
        }
      }
      return null;
    },
    closeBundle() {
      const outDir = path.resolve(process.cwd(), 'dist');
      (function walk(d) {
        if (!fs.existsSync(d)) return;
        for (const f of fs.readdirSync(d)) {
          const p = path.join(d, f);
          if (fs.statSync(p).isDirectory()) walk(p);
          else if (/\.woff$/.test(f)) fs.unlinkSync(p);
        }
      })(outDir);
    },
  };
}
