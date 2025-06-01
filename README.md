# Getting Started

## Build

```sh
npm run build
```

- The Express server get build to index.js
- The ReactJs get build to public/

## Local static page

To test static page, run local http-server

```sh
npm install -g http-server
cd dist/
http-server

```

## Deploy to CDN

Zip the dist/public folder to prepare for CDN deployment

### AWS Cloudfront

It could be a great option in the futrue

### Cloudflare Page

As the current DNS is being managed by Cloudflare, having the Cloudflare as the hosted one would be seemsless

cd to the dist/public folder to zip it and upload it to the Cloudflare Compute/pages.
