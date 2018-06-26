/* eslint-env node */
'use strict';

module.exports = function(app) {
  const express = require('express');
  let tokenRouter = express.Router();
  const http = require('http');

  tokenRouter.post('/', function(req, res) {
    const body = req.body;

    const payload = {
      'client_id': process.env.BABILI_DEV_CLIENT_ID,
      'client_secret': process.env.BABILI_DEV_CLIENT_SECRET,
      'code': body.authorizationCode,
      'grant_type': 'authorization_code',
      'redirect_uri': 'http://localhost:4200'
    };
    if (body.state) {
      payload.state = body.state;
    }

    const data = JSON.stringify(payload);

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/oauth/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Accept': 'application/json',
        'User-Agent': process.env.BABILI_DEV_USER_AGENT
      }
    };

    const ghReq = http.request(options, (ghRes) => {
      let body = '';
      ghRes.setEncoding('utf8');
      ghRes.on('data', (chunk) => body += chunk);
      ghRes.on('end', () => {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(body));
        res.end();
      });
    });
    ghReq.on('error', (error) => {
      console.error(error);
      res.status(500).end();
    });
    ghReq.write(data);
    ghReq.end();
  });

  app.use('/api/token', require('body-parser').json());
  app.use('/api/token', tokenRouter);
};