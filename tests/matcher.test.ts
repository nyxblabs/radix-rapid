import { describe, expect, it } from 'vitest'
import { createRouter, toRouteMatcher } from '../src'

export function createRoutes(paths) {
   return Object.fromEntries(paths.map(path => [path, { pattern: path }]))
}

describe('Route matcher', () => {
   it('readme example works', () => {
      const router = createRouter({
         routes: {
            '/foo': { m: 'foo' },
            '/foo/**': { m: 'foo/**', order: '2' },
            '/foo/bar': { m: 'foo/bar' },
            '/foo/bar/baz': { m: 'foo/bar/baz', order: '4' },
            '/foo/*/baz': { m: 'foo/*/baz', order: '3' },
            '/**': { order: '1' },
         },
      })

      const matcher = toRouteMatcher(router)
      const matches = matcher.matchAll('/foo/bar/baz')

      expect(matches).to.toMatchInlineSnapshot(`
      [
        {
          "order": "1",
        },
        {
          "m": "foo/**",
          "order": "2",
        },
        {
          "m": "foo/*/baz",
          "order": "3",
        },
        {
          "m": "foo/bar/baz",
          "order": "4",
        },
      ]
    `)
   })

   const routes = createRoutes([
      '/',
      '/foo',
      '/foo/*',
      '/foo/**',
      '/foo/bar',
      '/foo/baz',
      '/foo/baz/**',
      '/foo/*/sub',
   ])

   const router = createRouter({ routes })
   const matcher = toRouteMatcher(router)

   const _match = path => matcher.matchAll(path).map(r => r.pattern)

   it('can create route table', () => {
      expect(matcher.ctx.table).to.toMatchInlineSnapshot(`
      {
        "dynamic": Map {
          "/foo" => {
            "dynamic": Map {},
            "static": Map {
              "/sub" => {
                "pattern": "/foo/*/sub",
              },
              "/" => {
                "pattern": "/foo/*",
              },
            },
            "wildcard": Map {},
          },
        },
        "static": Map {
          "/" => {
            "pattern": "/",
          },
          "/foo" => {
            "pattern": "/foo",
          },
          "/foo/bar" => {
            "pattern": "/foo/bar",
          },
          "/foo/baz" => {
            "pattern": "/foo/baz",
          },
        },
        "wildcard": Map {
          "/foo" => {
            "pattern": "/foo/**",
          },
          "/foo/baz" => {
            "pattern": "/foo/baz/**",
          },
        },
      }
    `)
   })

   it('can match routes', () => {
      expect(_match('/')).to.toMatchInlineSnapshot(`
      [
        "/",
      ]
    `)
      expect(_match('/foo')).to.toMatchInlineSnapshot(`
      [
        "/foo/**",
        "/foo",
      ]
    `)
      expect(_match('/foo/bar')).to.toMatchInlineSnapshot(`
      [
        "/foo/**",
        "/foo/*",
        "/foo/bar",
      ]
    `)
      expect(_match('/foo/baz')).to.toMatchInlineSnapshot(`
      [
        "/foo/**",
        "/foo/baz/**",
        "/foo/*",
        "/foo/baz",
      ]
    `)
      expect(_match('/foo/123/sub')).to.toMatchInlineSnapshot(`
      [
        "/foo/**",
        "/foo/*/sub",
      ]
    `)
      expect(_match('/foo/123')).to.toMatchInlineSnapshot(`
      [
        "/foo/**",
        "/foo/*",
      ]
    `)
   })
})
