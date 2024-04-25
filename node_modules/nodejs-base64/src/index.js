"use strict";
/**
 * @fileoverview The ultimate shortcut to the base64 encode/decode methods.
 * @author Anton Ivanov <anton@ivanov.hk>
 *
 */
exports.__esModule = true;
exports.base64decode = exports.base64encode = void 0;
/**
 * Encodes the string using base64.
 * @param {string|number} str - The string to encode.
 * @returns {string} The base64-encoded string.
 */
function base64encode(str) {
    if (typeof str !== 'string') {
        if (typeof str === 'number') {
            str = str.toString();
        }
        else {
            throw new Error('Text to encode must be a string or a number.');
        }
    }
    return Buffer.from(str, 'utf8').toString('base64');
}
exports.base64encode = base64encode;
/**
 * Decodes the string from base64 to UTF-8.
 * @param {string} str - The base64-encoded string.
 */
function base64decode(str) {
    if (typeof str !== 'string') {
        throw new Error('Input value must be a string.');
    }
    return Buffer.from(str, 'base64').toString('utf8');
}
exports.base64decode = base64decode;
exports["default"] = { base64encode: base64encode, base64decode: base64decode };
