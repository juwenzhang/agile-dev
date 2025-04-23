# 自定义的 cli 工具流程

## 第一步: 配置 package.json
* 首先需要配置的是我们的 package.json 文件吧
* 主要是为了配置 bin 字段，用于指定我们的命令行工具的入口文件
* 然后在我们的 cli 工具的目录下的话，添加对应的 `#!/usr/bin/env node`
* 然后进行对应的 `npm link` 操作，然后就可以在本地进行连接了自定义的 cli 的命令了
  * 该命令实现的是我们的软连接的操作到本地吧
```json
{
  ...
  "bin": {
    "jwzcli": "./lib/index.js"
  },
  ...
}
```

## 第二步骤: 查看自己 cli 工具的版本号
* `jwzcli --version` | `jwzcli -v` 查看自己 cli 工具的版本号
* 获取我们的版本信息的话主要是从 package.json 中获取的
* 这个时候就可以通过 `process.argv` 来获取我们的参数了
* 或者说使用我们的第三包来实现对应的实现吧: `commander`
  * 首先需要做的是进行对应的安装操作吧: `npm i commander`
  * 然后从 package.json 中进行解析出自己想要的一些信息即可
  * 然后实现对应的是使用 commander 实现解析我们的 `process.argv` 即可
```javascript
function helpOptionsFunc(program) {
  const filePath = '../../package.json'
  const name = require(filePath).name
  const version = require(filePath).version
  const description = require(filePath).description
  const keywords = require(filePath).keywords
  const author = require(filePath).author

  program
    .option("-n, --name", "get our cli information about name")
    .option("-d, --description", "get our cli information about description")
    .option("-k, --keywords", "get our cli information about keywords")
    .option("-a, --author", "get our cli information about author")
    .action((options) => {
      if (options.name) {
        console.log(`name: ${name}`);
      }
      if (options.description) {
        console.log(`description: ${description}`);
      }
      if (options.keywords) {
        console.log(`keywords: ${keywords}`);
      }
      if (options.author) {
        console.log(`author: ${author}`);
      }
    });

  program.version(version, "-v --version", "get our cli information about version");

  program.on("--help", () => {
    console.log(`\nRun ${name} <command> --help for detailed usage of given command.`);
    console.log(`    name: ${name}`);
    console.log(`    description: ${description}`);
    console.log(`    keywords: ${keywords}`);
    console.log(`    author: ${author}`);
  });
}

module.exports = helpOptionsFunc;
```

## 第三步骤: 实现自定义一些命令行命令即可
* 主要是使用的是 `program.command()` 来实现对应的命令行命令即可

## 第四步骤: 实现获取远程仓库模板到本地
* 主要是使用的是我们的 download-git-repo 来实现对应的获取远程仓库模板到本地
* https://www.npmjs.com/package/download-git-repo