const path = require("path");

module.exports = {
  getProjectRoots() {
    var shared = path.join(__dirname, "../shared");
    console.log("shared", shared);
    return [
      // Keep your project directory.
      __dirname,
      shared, // path to the external module
    ];
  },
};
