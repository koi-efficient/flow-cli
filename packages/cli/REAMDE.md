# @koi-efficient/flow-cli

@koi-efficient/flow-cli is a that improves front-end development efficiency.

## Install

```
npm install @koi-efficient/flow-cli -g
```

## Usage

```
koi-flow ${command}
```

### Commands

#### create

```
koi-flow create
```

You can also directly specify the project name and the template you want to use via additional command line options.

```
koi-flow create ${projectName} -T ${projectType} -TP ${supportTemplate}
```

**For example,** to scaffold a Vite + React + TypeScript project, run:

```
koi-flow create my-react-ts-app -T project -TP template-react-pure
```

**learn more**

```
koi-flow create -h
```
