/* eslint-env node */

'use strict';

var fs = require('fs');
var path = require('path');
var resizeObserverPolyfillOutput = path.resolve('polyfills/ResizeObserver/polyfill.js');

var polyfill = fs.readFileSync(resizeObserverPolyfillOutput, 'utf-8');
polyfill += ';self.ResizeObserverEntry = ResizeObserver.ResizeObserverEntry;self.ResizeObserver=ResizeObserver.ResizeObserver;'
fs.writeFileSync(resizeObserverPolyfillOutput, polyfill, 'utf-8');
