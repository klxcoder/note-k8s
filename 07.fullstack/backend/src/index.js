const app = require("./server");
const { port } = require("./config");

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// quit on ctrl-c when running docker in terminal
process.on("SIGINT", () => {
  console.info(
    "Got SIGINT (aka ctrl-c in docker). Graceful shutdown ",
    new Date().toISOString()
  );
  shutdown();
});

// quit properly on docker stop
process.on("SIGTERM", () => {
  console.info(
    "Got SIGTERM (docker container stop). Graceful shutdown ",
    new Date().toISOString()
  );
  shutdown();
});

// shut down server gracefully
const shutdown = () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
};
