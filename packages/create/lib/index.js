import Command from "@koi-efficient/command";
import createTemplate from "./createTemplate.js";
import downLoadTemplate from "./downLoadTemplate.js";
import installTemplate from "./installTemplate.js";

class CreateCommand extends Command {
    get command() {
        return "create <projectName>";
    }

    get description() {
        return "create a new project";
    }

    get options() {
        return [
            ["-f, --force", "overwrite target directory if it exists", false],
        ];
    }

    async action([projectName, opts]) {
        console.log("create:", projectName, opts);
        // 1. Select the project template to generate the project information.
        const templateInfo = await createTemplate(projectName, opts);
        console.log("====createTemplate templateInfo=====", templateInfo);

        // 2. Download the project template to the cache directory.
        downLoadTemplate(templateInfo.template);

        // 3. Install the project template into the project directory
        installTemplate(templateInfo, opts);
    }
}

const Create = (instance) => {
    return new CreateCommand(instance);
};

export default Create;
