const { program } = require("commander");
const createCommand = require("@koi-efficient/create");

const pkg = require("../package.json");

module.exports = function (args) {
    console.log(`${Object.keys(pkg.bin)[0]}:`, args);
    program
        .name(Object.keys(pkg.bin)[0])
        .usage("<command> [options]")
        .version(pkg.version);

    createCommand(program);

    program.parse(process.argv);
};
