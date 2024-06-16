import { makeInquirer, getLatestVersion } from "@koi-efficient/utils";

const ADD_TYPE_PROJECT = "project";
const ADD_TYPE_PAGE = "page";

/**
 * Templates provided
 *
 * TODO: Read files automatically instead.
 * */
const ADD_TEMPLATES = [
    {
        name: "纯净的react模板",
        value: "template-react-pure",
        npmName: "template-react-pure",
        description:
            "@koi-efficient react template, a pure react project vite+react+TypeScript+ESLint",
    },
];

const ADD_TYPES = [
    { name: "create new project", value: ADD_TYPE_PROJECT },
    { name: "create new page", value: ADD_TYPE_PAGE },
];

function getAddType(type) {
    const addTypeList = ADD_TYPES.map((item) => item.value);
    const isNeed = !addTypeList.includes(type);
    const isInvalid = type && !addTypeList.includes(type);
    return makeInquirer({
        name: "addType",
        type: "list",
        when: isNeed,
        choices: ADD_TYPES,
        defaultValue: type,
        message: isInvalid
            ? `${type} isn't a valid type. Please choose from below: `
            : "Please select an initialization type",
    });
}

function getAddName(projectName) {
    const isValidProjectName = (projectName) => {
        if (!projectName) return false;

        const regex =
            /^(?:(?:@(?:[a-z0-9\-*\~][a-z0-9\-*\._\~]*)?\/[a-z0-9\-._\~])|[a-z0-9\-~])[a-z0-9\-._\~]*$/;
        return regex.test(projectName);
    };

    const isInvalid = !isValidProjectName(projectName);

    return makeInquirer({
        name: "name",
        type: "input",
        when: isInvalid,
        defaultValue: projectName,
        require: true,
        message: "Please enter a valid project name",
        validate(val) {
            return isValidProjectName(val)
                ? true
                : `${val} is invalid,please enter a valid project name?`;
        },
    });
}

function getAddTemplate(template) {
    const addTemplateList = ADD_TEMPLATES.map((item) => item.value);
    const isNeed = !addTemplateList.includes(template);
    const inInvalid = template && !addTemplateList.includes(template);
    return makeInquirer({
        name: "template",
        type: "list",
        when: isNeed,
        defaultValue: template,
        choices: ADD_TEMPLATES,
        message: inInvalid
            ? `${template} isn't a valid template. Please choose from below: `
            : "Please select project template",
    });
}

export default async function createTemplate(projectName, opts) {
    const { type, template } = opts;
    const addType = await getAddType(type);

    if (addType === ADD_TYPE_PROJECT) {
        const addName = await getAddName(projectName);

        const addTemplate = await getAddTemplate(template);

        const selectedTemplate = ADD_TEMPLATES.find(
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
