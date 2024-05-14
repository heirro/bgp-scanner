# BGP Scanner Web Server with Node.js

## Prerequisites
- Node.js


## Install and run
```
npm install
npm run dev
```

## Open in browser
```
open http://localhost:5500
```

## Description
- This is a simple web server that can be used to scan BGP routes and firewall rules for a given AS number. The server will return the BGP routes and firewall rules for the given AS number. The server will also return the BGP routes for a given AS number and gateway IP address. The server will return the BGP routes and firewall rules in text/plain or JSON format.

- Source IP address prefixes from https://bgp.he.net/ and provide Prefixes v4 and Prefixes v6 for the given AS number.

---

## Run scanner mode Firewall (default)
```
open http://localhost:5500/bgp_scanner?as=AS55095
```
- example output:
```
/ip firewall address-list
add list="Netflix Inc" address="69.53.247.0/24" comment="Netflix Inc"
add list="Netflix Inc" address="69.53.248.0/24" comment="Netflix Inc"
add list="Netlfix (C08284973)" address="69.53.249.0/24" comment="Netlfix (C08284973)"
...
```
---

## Run scanner mode BGP Route
```
open http://localhost:5500/bgp_scanner?as=AS55095&mode=bgp&gw=192.168.1.1
```
- example output:
```
/ip route
add dst-address="69.53.247.0/24" gateway="" comment="Netflix Inc"
add dst-address="69.53.248.0/24" gateway="" comment="Netflix Inc"
add dst-address="69.53.249.0/24" gateway="" comment="Netlfix (C08284973)"
...
```
---
## If you need output as JSON, add type=json (default is text/plain)
```
open http://localhost:5500/bgp_scanner?as=AS55095&type=json
```

## Live URL
- [https://mikrotik.heirro.dev/bgp_scanner?as=AS55095](https://mikrotik.heirro.dev/bgp_scanner?as=AS55095)