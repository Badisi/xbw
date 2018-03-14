# xbw

NodeJS module utility which provides helpful functions to read and/or verify xbox 360 backup iso file


## Installation

`xbw` is pre-built for node 8.5.0

```js
npm install @badisi/xbw --save
```

## Usage

```js
const xbw = require('@badisi/xbw');
```


## Methods

* [getIsoInfo](#getIsoInfo)
* [verifiedWithAbgx360](#verifiedWithAbgx360)

---------------------------------------

<a name="getIsoInfo" />
### getIsoInfo(file)

Extract information from a backup iso file

__Arguments__

* `file` - Absolute path to the file.

__Return__

The `object` returned by this function has the following properties:

* `file` - A string representing the path to the backup.
* `titleId` - A string representing the title id.
* `mediaId` - A string representing the media id.
* `discCount` - An integer representing the number of disc.
* `discNumber` - An integer representing the disc number.
* `regions` - An array representing the regions.

__Example__

```js
const xbw = require('xbw');

let isoInfo = xbw.getIsoInfo('/Users/User/backups/Game.iso');

console.log(isoInfo);
// => {
//        file: '/Users/User/backups/Game.iso',
//        titleId: '12345678',
//        mediaId: 'A1B2C3D4',
//        discCount: 2,
//        discNumber: 1,
//        regions: [
//           'PAL'
//           'NTSC_U'
//        ]
//    }
```

---------------------------------------

<a name="verifiedWithAbgx360" />
### verifiedWithAbgx360(options, success, [progress])

Verify a backup iso file integrity against abgx360

__Arguments__

* `options` - An array of abgx360 options.
* `success(results)` - A callback which is called when the process is finished. The `results` object is an array representing a result for each given file. Possible values are {0,-1,-2,-3} respectively for SUCCESS, ERROR, DATA_ERROR and STEALTH_ERROR.
* `progress(data)` - *(Optional)* A callback which is called for every process output.

__Example__

```js
const xbw = require('xbw');

let abgxOptions = '--c --af3 --splitvid --patchitanyway --patchgarbage --html'.split(' ');
let files = [
    '/Users/User/backups/Game.iso'
];

xbw.verifiedWithAbgx360(
    abgxOptions.concat(files),
    results => console.log(results), // => [0]
    data => console.log(data)
);
```


Credit
------

- [Seacrest](http://abgx360.xecuter.com/)


License
-------

Copyright © 2013-2018 [Badisi](https://github.com/Badisi)

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
