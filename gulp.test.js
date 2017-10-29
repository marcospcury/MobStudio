const gulp = require("gulp");
const Server = require("karma").Server;

gulp.task("test.front", done => {
  new Server(
    {
      configFile: __dirname + "/karma.conf.js",
      singleRun: true
    },
    done
  ).start();
});

gulp.task("test.auto", done => {
  new Server(
    {
      configFile: __dirname + "/karma.conf.js",
      singleRun: false
    },
    done
  ).start();
});
