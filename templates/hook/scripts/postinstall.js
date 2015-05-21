/**
 * <%= createdAt %>
 */
var fs = require('fs-extra');

var appDir = process.env.PWD;

var mergeDirs = function (f1, f2, overwriteExistingFiles) {

  var file, files, stats, _i, _len;
  debugger;
  files = fs.readdirSync(f1);

  for (_i = 0, _len = files.length; _i < _len; _i++) {
    file = files[_i];
    stats = fs.lstatSync("" + f1 + "/" + file);
    console.log(stats + " " + f1 + "/" + file + "\n" + f2 + "/" + file);
    if (stats.isDirectory()) {
      mergeDirs("" + f1 + "/" + file, "" + f2 + "/" + file)
    }
    else {
      if (!fs.existsSync("" + f2 + "/" + file) || overwriteExistingFiles) {
        var path = ("" + f2 + "/" + file).split("/").slice(0, -1).join("/");
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path, 0x1ed, true);
        }
        fs.writeFileSync("" + f2 + "/" + file, fs.readFileSync("" + f1 + "/" + file));
      }
    }
  }
};

mergeDirs(__dirname + "/..views", __dirname + "/../../../views");
mergeDirs(__dirname + "/..assets", __dirname + "/../../../assets");
