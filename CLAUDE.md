# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Iconifyのアイコンを使って、カスタム背景色・形状付きのアイコン画像（SVG/JPG）を生成・ダウンロードできるWebアプリ。Cloudflare Workers + Hono + TailwindCSSで構築。

## Commands

- `npm run dev` — CSS/JSビルド後、ローカル開発サーバーを起動（Wrangler）
- `npm run dev:css` — TailwindCSSのウォッチモード（別ターミナルで実行）
- `npm run dev:js` — クライアントTSのウォッチモード（別ターミナルで実行）
- `npm run build:css` — TailwindCSSをビルド（`src/styles.css` → `public/styles.css`）
- `npm run build:js` — クライアントTSをビルド（`src/app.ts` → `public/app.js`、esbuild）
- `npm run build` — CSS + JSをまとめてビルド
- `npm run deploy` — ビルド後、Cloudflare Workersにデプロイ
- `npm run typecheck:client` — クライアントTSの型チェック
- `npm run cf-typegen` — Cloudflareバインディングの型を生成

No test runner or linter is currently configured.

## Architecture

- **Runtime**: Cloudflare Workers (edge computing)
- **Framework**: Hono v4 with JSX support configured via `hono/jsx`
- **Entry point**: `src/index.tsx` — Hono JSXでHTMLをレンダリングし、APIエンドポイントを提供
- **Config**: `wrangler.jsonc` defines the worker name, entry point, assets directory, and Cloudflare bindings
- **TypeScript**: Strict mode enabled, ESNext target, bundler module resolution
- **CSS**: TailwindCSS v4（`@tailwindcss/cli`でビルド）
- **Client JS**: `src/app.ts` → `public/app.js`（esbuildでバンドル）

## File Structure

```
src/
  index.tsx       — サーバーサイド（Hono JSX + APIルート）
  app.ts          — クライアントサイドTS（プレビュー・ダウンロード機能）
  styles.css      — TailwindCSS入力ファイル
public/
  app.js          — esbuildビルド出力（自動生成、gitignore推奨）
  styles.css      — TailwindCSSビルド出力（自動生成、gitignore推奨）
```

## Routes

| パス | 説明 |
|------|------|
| `GET /` | メインページ（HTML） |
| `GET /api/icon-svg` | Iconify APIプロキシ（`?name=mdi:home&color=%23FFFFFF`） |

## Key Dependencies

- `hono` — Webフレームワーク
- `@iconify/utils` — SVGユーティリティ（将来的なSVG操作用）
- `tailwindcss` / `@tailwindcss/cli` — CSSビルド
- `esbuild` — クライアントTSバンドル

## Client-Side Features (src/app.ts)

- アイコン名入力（prefix:name形式、例: `mdi:home`）でIconify APIからSVG取得
- 背景色・アイコン色のリアルタイム変更
- 形状切り替え（正方形・円・角丸正方形）
- サイズ選択（256/512/1024）
- 合成SVGをプレビュー表示
- SVG/JPGダウンロード（JPGはCanvas経由で生成）

## Cloudflare Bindings

When adding Cloudflare bindings (KV, R2, D1, AI, etc.), uncomment the relevant section in `wrangler.jsonc`, then run `npm run cf-typegen` to regenerate types. Pass `CloudflareBindings` as a generic to `new Hono<{ Bindings: CloudflareBindings }>()` to get typed access via `c.env`.
