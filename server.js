// require("babel-register")({
//   presets: ["es2015"]
// });

const Hapi = require("hapi");


const server = new Hapi.server({
  host: "localhost",
  port: process.env.PORT || 4000
});

const init = async () => {
  await server.register([require("inert"), require("vision")]);

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "public",
        index: ["index.html"]
      }
    }
  });


  await server.start();
  console.log(`server is running at ${server.info.uri}`);
};

init();

module.exports = server; //for testing
