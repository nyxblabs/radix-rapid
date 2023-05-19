# 📊 Benchmark Results

Benchmarks are mainly focusing on benchmarking `lookup` method performance.

Below results are based on my personal PC using Windows 11. You can use provided scripts to test in your own env.

## ⚡️ Direct benchmark

Directly benchmarking `lookup` performance using [benchmark](https://www.npmjs.com/package/benchmark)

Scripts:
- 🏋️‍♀️ `nyxr bench`
- 🏋️‍♂️ `nyxr bench:profile` (using [0x](https://www.npmjs.com/package/0x) to generate flamegraph)


```
--- 🧪 Test environment ---

Node.js version: 18.16.0
radix-rapid version: 0.0.1
OS: win32
CPU count: 8
Current load: [ 0, 0, 0 ]


--- 🚧 static route ---

lookup x 18,670,265 ops/sec ±4.69% (76 runs sampled)
Stats:
 - /choot: 96837315

--- 🔧 dynamic route ---

lookup x 403,374 ops/sec ±3.18% (63 runs sampled)
Stats:
 - /choot/123: 2065943
 ```

## ⚡️ HTTP Benchmark


Using [`autocannon`](https://github.com/mcollina/autocannon) and a simple http listener using lookup for realworld performance.

Scripts:
- 🚀 `nyxr bench:http`

```
--- 🧪 Test environment ---

Node.js version: 18.16.0
radix-rapid version: 0.0.1
OS: win32
CPU count: 8
Current load: [ 0, 0, 0 ]


--- 📊 Benchmark: static route ---

Running 10s test @ http://localhost:3000/
10 connections


┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬───────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max   │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼───────┤
│ Latency │ 0 ms │ 0 ms │ 1 ms  │ 2 ms │ 0.13 ms │ 0.65 ms │ 30 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴───────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 9663    │ 9663    │ 17183   │ 21935   │ 15848.8 │ 4391.92 │ 9660    │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 1.35 MB │ 1.35 MB │ 2.41 MB │ 3.07 MB │ 2.22 MB │ 615 kB  │ 1.35 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 10

159k requests in 10.02s, 22.2 MB read
Stats:
 - /choot: 158510

--- 📊 Benchmark: dynamic route ---

Running 10s test @ http://localhost:3000/
10 connections


┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬───────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max   │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼───────┤
│ Latency │ 0 ms │ 0 ms │ 1 ms  │ 2 ms │ 0.14 ms │ 0.56 ms │ 17 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴───────┘
┌───────────┬─────────┬─────────┬─────────┬───────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5% │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼───────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 9663    │ 9663    │ 14935   │ 17631 │ 14243.6 │ 2791.28 │ 9660    │
├───────────┼─────────┼─────────┼─────────┼───────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 1.64 MB │ 1.64 MB │ 2.54 MB │ 3 MB  │ 2.42 MB │ 475 kB  │ 1.64 MB │
└───────────┴─────────┴─────────┴─────────┴───────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 10

142k requests in 10.01s, 24.2 MB read
Stats:
 - /choot/123: 142410
```


