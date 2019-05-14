const express = require('express');
const helmet = require('helmet');

const zoosRouter = require("./router/zoos");

const server = express();

server.use(express.json());
server.use(helmet());
server.use("/api/zoos", zoosRouter)

// endpoints here

const port = process.env.PORT;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
