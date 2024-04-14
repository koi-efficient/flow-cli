import { makeInquirer, getLatestVersion } from "@koi-efficient/utils";

const ADD_TYPE_PROJECT = "project";
const ADD_TYPE_PAGE = "page";

/**
 * Templates provided
 *
 * TODO: Read files automatically instead.
 * */
const ADD_TEMPLATE = [
    {
        name: "纯净的react模板",
        value: "template-react-pure",
        npmName: "template-react-pure",
        description:
            "@koi-efficient react template, a pure react project vite+react+TypeScript+ESLint",
    },
];

const ADD_TYPE = [
    { name: "create new project", value: ADD_TYPE_PROJECT },
    { name: "create new page", value: ADD_TYPE_PAGE },
];

function getAddType() {
    return makeInquirer({
        name: "addType",
        type: "list",
        choices: ADD_TYPE,
        defaultValue: ADD_TYPE_PROJECT,
        message: "Please select an initialization type",
    });
}

function getAddName() {
    return makeInquirer({
        name: "name",
        type: "input",
        defaultValue: "",
        require: true,
        message: "Please enter a project name",
        validate(val) {
            const regex =
                /^(?:(?:@(?:[a-z0-9\-*\~][a-z0-9\-*\._\~]*)?\/[a-z0-9\-._\~])|[a-z0-9\-~])[a-z0-9\-._\~]*$/;
            return regex.test(val) ? true : "please enter a valid project name";
        },
    });
}

function getAddTemplate() {
    return makeInquirer({
        name: "template",
        type: "list",
        choices: ADD_TEMPLATE,
        message: "Please select project template",
    });
}

export default async function createTemplate(name, opts) {
    // getAddType
    const addType = await getAddType();

    if (addType === ADD_TYPE_PROJECT) {
        const addName = await getAddName();
        const addTemplate = await getAddTemplate();
        const selectedTemplate = ADD_TEMPLATE.find(
            (_) => _.value === addTemplate
        );
        // 获取最新版本号
        const latestVersion = await getLatestVersion(selectedTemplate.npmName);
        selectedTemplate.version = latestVersion;
        return {
            type: addType,
            name: addName,
            template: selectedTemplate,
        };
    }
    console.error("Not supported yet");
}
