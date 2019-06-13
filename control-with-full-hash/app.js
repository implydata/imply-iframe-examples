const axios = require('axios');
const express = require('express');
const LZString = require('lz-string')
const app = express();
const port = 3000;

// Update API token here
const IMPLY_API_TOKEN = "b2c9b5cd-84c6-4219-9556-8eef5e52a5fb";

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
  console.log(`control-with-full-hash example listening on port ${port}!`);
});
