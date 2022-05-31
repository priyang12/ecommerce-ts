const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;
const server = require("./server");

// server();

console.log(`Number of CPUs: ${numCPUs}`);

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  server();
}

cluster.on("exit", function (worker) {
  console.log(`Worker ${worker.id} died'`);
  console.log(`Staring a new one...`);
  cluster.fork();
});
