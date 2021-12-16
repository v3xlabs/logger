![lvksh logger](./assets/banner.png)

[![MINIFIED SIZE](https://img.shields.io/bundlephobia/min/@lvksh/logger.svg)]()
[![COVERAGE](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)]()
[![LANGUAGES](https://img.shields.io/github/languages/top/lvkdotsh/logger)]()
[![DEPENDENCIRES](https://img.shields.io/badge/dependencies-0-brightgreen.svg)]()
[![NPM](https://img.shields.io/npm/dt/@lvksh/logger)]()

<center>
    Zero dependency, light-weight, blazing fast customizable logging library
</center>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [example](#usage) (To get you going)
  - [LoggerConfig](#loggerconfig) (Customization for the entire logger)
  - [MethodConfig](#methodconfig) (Customization on a per-method basis)

## Installation

Using `npm`:

```sh
npm install @lvksh/logger
```

or if you prefer to use the `yarn` package manager:

```sh
yarn add @lvksh/logger
```

## Usage

Get started by creating your logger

```ts
import { createLogger } from '@lvksh/logger';
import chalk from 'chalk';

const log = createLogger(
    {
        ok: {label: chalk.greenBright`[OK]`,newLine: '| ', newLineEnd: '\\-'},
        debug: chalk.magentaBright`[DEBUG]`,
        info: {
            label: chalk.cyan`[INFO]`,
            newLine: chalk.cyan`⮡`,
            newLineEnd: chalk.cyan`⮡`,
        },
        veryBigNetworkError: chalk.bgRed.white.bold`[NETWORK]`,
    },
    { padding: "PREPEND"},
    console.log
);
```

And now log to your hearts content

```ts
log.ok("This is the best logging", "library", "you");
log.info("will probably");
log.debug("ever use");
log.veryBigNetworkError`Never Gonna Give You Up!`;
log.debug("in", "your", "life", "you're", "welcome");
log.info("item 1", "item 2", "item 3", "item 4", "item 5");
```

Which produces the following result

<center>
    <img src="./assets/example.png" />
</center>

Other Themes:

<center>
    <a href="https://github.com/lvkdotsh/logger/blob/master/examples/DeepDark.ts"><img src="./assets/deepdarklogexample.png"></a>
</center>


<center>
    <a href="https://github.com/lvkdotsh/logger/blob/master/examples/Sunfire.ts"><img src="./assets/sunfireexamplelog.png"></a>
</center>

### LoggerConfig

This section is still work in progress.

### MethodConfig

This section is still work in progress.

## Contributors
[![](https://contrib.rocks/image?repo=lvkdotsh/logger)](https://github.com/lvkdotsh/logger/graphs/contributors)

## LICENSE

This package is licensed under the MIT license.

Regex matching within this package is sourced from [ansi-regex](https://github.com/chalk/ansi-regex), which is licensed under [MIT](https://github.com/chalk/ansi-regex/blob/main/license)
