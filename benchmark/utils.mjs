/* eslint-disable no-console */
import { readFileSync } from 'node:fs'
import os from 'node:os'
import { createRouter } from 'radix-rapid'

// eslint-disable-next-line max-statements-per-line
export function logSection(title) { console.log(`\n--- ${title} ---\n`) }

const pkgVersion = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).version

export function printEnv() {
   logSection('Test environment')
   console.log('Node.js version:', process.versions.node)
   console.log('radix-rapid version:', pkgVersion)
   console.log('OS:', os.platform())
   console.log('CPU count:', os.cpus().length)
   console.log('Current load:', os.loadavg())
   console.log('')
}

export function printStats(stats) {
   console.log(`Stats:\n${Object.entries(stats).map(([path, hits]) => ` - ${path}: ${hits}`).join('\n')}`)
}

export const router = createRouter({
   routes: Object.fromEntries([
      '/hello',
      '/cool',
      '/hi',
      '/helium',
      '/coooool',
      '/chrome',
      '/choot',
      '/choot/:choo',
      '/ui/**',
      '/ui/components/**',
   ].map(path => [path, { path }])),
})

export const benchSets = [
   {
      title: 'static route',
      requests: [
         { path: '/choot' },
      ],
   },
   {
      title: 'dynamic route',
      requests: [
         { path: '/choot/123' },
      ],
   },
]
