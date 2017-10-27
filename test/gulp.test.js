const gulp = require("gulp");
const Server = require("karma").Server;

gulp.task("test.js", done => {
  new Server(
    {
      configFile: __dirname + "/karma.conf.js",
      singleRun: true
    },
    done
  ).start();
});
