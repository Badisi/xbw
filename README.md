# @badisi/xbw

🎮 NodeJS module utility which provides helpful functions to read and/or verify xbox360 backup iso files.

[![npm version](https://img.shields.io/npm/v/@badisi/xbw.svg?color=blue&logo=npm)][npm]
[![npm donwloads](https://img.shields.io/npm/dw/@badisi/xbw.svg?color=7986CB&logo=npm)][npm-dl]
[![license](https://img.shields.io/badge/license-custom-ff69b4)][license]

![darwin-x64](https://img.shields.io/badge/darwin-x64-green)
![linux-x64](https://img.shields.io/badge/linux-x64-green)
![win32-x64](https://img.shields.io/badge/win32-x64-green)
![win32-ia32](https://img.shields.io/badge/win32-ia32-green)


## Installation

**xbw** is pre-built for `node >= 12` and `electron` on latest ****macos****, ****linux**** and ****windows****.

```sh
npm install -g @badisi/xbw
```

```sh
yarn global add @badisi/xbw
```

## Usage

```
$ xbw --help

  Usage:
    $ xbw <command> <file|folder...> [--help] [options]

  Global Commands:
    verify .... Verify backup iso files integrity against abgx360
    info ...... Extract information from backup iso files

  Examples:
    $ xbw info .
    $ xbw info backup1.iso backup2.iso path/to/backups/folder/
    $ xbw verify backup.iso --corrupt --af3 --patchgarbage --patchitanyway
    $ xbw verify backup1.iso backup2.iso path/to/backups/folder
    $ xbw verify backup.iso --html > output-file.html
```

## API

This package can also be installed locally and used as an API.

```js
const { getIsosInfo, verifyWithAbgx360 } = require('@badisi/xbw');
```

---------------------------------------

* [getIsosInfo](#getIsosInfo)
* [verifyWithAbgx360](#verifyWithAbgx360)

---------------------------------------

<a name="getIsosInfo"></a>

### getIsosInfo(isoPaths: string[]): IsoInfo[]

Extract information from backup iso files

__Arguments__

* `isoPaths` - An array of absolute paths to iso files.

__Return__

An array of `IsoInfo` objects that have the following properties:

* `file: string` - A string representing the path to the iso backup.
* `titleId: string` - A string representing the title id.
* `mediaId: string` - A string representing the media id.
* `discCount: number` - An integer representing the number of disc.
* `discNumber: number` - An integer representing the disc number.
* `regions: Region[]` - An array representing the regions.
* `isValid: boolean` - A boolean representing whether the file is a valid iso backup or not.

__Example__

```js
const { getIsosInfo } = require('@badisi/xbw');

const isosInfo = getIsosInfo([
    '/Users/User/backups/Game.iso',
    '/test.iso'
]);

console.log(isosInfo);
// => [{
//        file: '/Users/User/backups/Game.iso',
//        titleId: '12345678',
//        mediaId: 'A1B2C3D4',
//        discCount: 2,
//        discNumber: 1,
//        regions: [
//           'PAL'
//           'NTSC_U'
//        ],
//        isValid: true
//    }, {
//        file: '/test.iso',
//        isValid: false
//    }]
```

---------------------------------------

<a name="verifyWithAbgx360"></a>

### verifyWithAbgx360(isoPaths: string[], options?: AbgxOptions, onProgress?: (progress: string) => void): Promise<AbgxFile[]>

Verify backup iso files integrity against abgx360

__Arguments__

* `isoPaths` - An array of absolute paths to iso files.
* `options` - *(Optional)* An object of abgx360 options.
* `onProgress` - *(Optional)* A callback which is called for every processed output.

__Return__

An array of `AbgxFile` objects that have the following properties:

* `file: string` - A string representing the path to the iso backup.
* `status: AbgxStatus` - Possible values are: VERIFIED = 0, ERROR = -1, DATA_ERROR = -2 and STEALTH_ERROR = -3.

__Example__

```js
const { verifyWithAbgx360 } = require('@badisi/xbw');

const files = [
    '/Users/User/backups/Game.iso',
    '/test.iso'
];

const abgxOptions = {
    corrupt: true,
    af3: true,
    patchgarbage: true,
    patchitanyway: true,
    html: true
};

verifiedWithAbgx360(files, options, console.log)
    .then(results => console.log(results))
    .catch(error => console.error(error));
// => [{
//        file: '/Users/User/backups/Game.iso',
//        status: 0
//    }, {
//        file: '/test.iso',
//        status: -1
//    }]
```

Credit
------

* [Seacrest](http://abgx360.xecuter.com/)


License
-------

Copyright © 2013-2022 [Badisi](https://github.com/Badisi)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to use, copy, publish and/or distribute the Software,
but with restriction including the rights to modify, merge, sublicense
and/or sell copies of the Software, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




[npm]: https://www.npmjs.com/package/@badisi/xbw
[npm-dl]: https://npmcharts.com/compare/@badisi/xbw?minimal=true
[license]: https://github.com/Badisi/xbw/blob/master/LICENSE
[david-deps]: https://david-dm.org/badisi/xbw
