[![cover][cover-src]][cover-href]
[![npm version][npm-version-src]][npm-version-href] 
[![npm downloads][npm-downloads-src]][npm-downloads-href] 
[![bundle][bundle-src]][bundle-href] [![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

# 🌳 radix-rapid

> ✨ Lightweight and fast router for JavaScript based on [Radix Tree](https://en.wikipedia.org/wiki/Radix_tree)🌱.

## 📝 Usage

**Install:**

```sh
# nyxi
nyxi radix-rapid

# pnpm
pnpm i radix-rapid

# npm
npm i radix-rapid

# yarn
yarn add radix-rapid
```

**Import:**

```js
// ESM
import { createRouter } from 'radix-rapid'

// CJS
const { createRouter } = require('radix-rapid')
```

**Create a router instance and insert routes:**

```js
const router = createRouter(/* options */)

router.insert('/path', { payload: 'this path' })
router.insert('/path/:name', { payload: 'named route' })
router.insert('/path/foo/**', { payload: 'wildcard route' })
router.insert('/path/foo/**:name', { payload: 'named wildcard route' })
```

**Match route to access matched data:**

```js
router.lookup('/path')
// { payload: 'this path' }

router.lookup('/path/fooval')
// { payload: 'named route', params: { name: 'fooval' } }

router.lookup('/path/foo/bar/baz')
// { payload: 'wildcard route' }

router.lookup('/')
// null (no route matched for/)
```

## ⚡️ Methods

### ➕ `router.insert(path, data)`

`path` can be static or using `:placeholder` or `**` for wildcard paths.

The `data` object will be returned on matching params. It should be an object like `{ handler }` and not containing reserved keyword `params`.

### 🔍 `router.lookup(path)`

Returns matched data for `path` with optional `params` key if mached route using placeholders.

### ❌ `router.remove(path)`

Remove route matching `path`.

## ⚙️ Options

You can initialize router instance with options:

```ts
const router = createRouter({
   strictTrailingSlash: true,
   routes: {
      '/foo': {}
   }
})
```

- 🛣️ `routes`: An object specifying initial routes to add
- 🚦 `strictTrailingSlash`: By default, the router ignores trailing slashes for matching and adding routes. When set to `true`, matching with trailing slashes is handled differently.

### 🔎 Route Matcher

Creates a multi matcher from router tree that can match **all routes** matching path:

```ts
import { createRouter, toRouteMatcher } from 'radix-rapid'

const router = createRouter({
   routes: {
      '/foo': { m: 'foo' }, // Matches /foo only
      '/foo/**': { m: 'foo/**' }, // Matches /foo/<any>
      '/foo/bar': { m: 'foo/bar' }, // Matches /foo/bar only
      '/foo/bar/baz': { m: 'foo/bar/baz' }, // Matches /foo/bar/baz only
      '/foo/*/baz': { m: 'foo/*/baz' } // Matches /foo/<any>/baz
   }
})

const matcher = toRouteMatcher(router)

const matches = matcher.matchAll('/foo/bar/baz')

// [
//   {
//     "m": "foo/**",
//   },
//   {
//     "m": "foo/*/baz",
//   },
//   {
//     "m": "foo/bar/baz",
//   },
// ]
```

## ⚡️ Performance

See [benchmark](./benchmark).


## 📜 License

[MIT](./LICENSE) - Made with 💞

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/radix-rapid?style=flat&colorA=18181B&colorB=14F195
[npm-version-href]: https://npmjs.com/package/radix-rapid
[npm-downloads-src]: https://img.shields.io/npm/dm/radix-rapid?style=flat&colorA=18181B&colorB=14F195
[npm-downloads-href]: https://npmjs.com/package/radix-rapid
[bundle-src]: https://img.shields.io/bundlephobia/minzip/radix-rapid?style=flat&colorA=18181B&colorB=14F195
[bundle-href]: https://bundlephobia.com/result?p=radix-rapid
[jsdocs-src]: https://img.shields.io/badge/jsDocs.io-reference-18181B?style=flat&colorA=18181B&colorB=14F195
[jsdocs-href]: https://www.jsdocs.io/package/radix-rapid
[license-src]: https://img.shields.io/github/license/nyxblabs/radix-rapid.svg?style=flat&colorA=18181B&colorB=14F195
[license-href]: https://github.com/nyxblabs/radix-rapid/blob/main/LICENSE

<!-- Cover -->
[cover-src]: https://raw.githubusercontent.com/nyxblabs/radix-rapid/main/.github/assets/cover-github-radix-rapid.png
[cover-href]: https://💻nyxb.ws
