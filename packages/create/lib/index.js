const Command = require("@koi-efficient/command");

class CreateCommand extends Command {
  get command() {
    return "create <projectName>";
  }

  get description() {
    return "create a new project";
  }

  get options() {
    return [["-f, --force", "overwrite target directory if it exists", false]];
  }

  action([projectName, options]) {
    console.log("create:", projectName, options);
  }
}

const Create = (instance) => {
  return new CreateCommand(instance);
};

module.exports = Create;
