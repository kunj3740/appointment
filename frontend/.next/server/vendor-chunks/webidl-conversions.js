"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/webidl-conversions";
exports.ids = ["vendor-chunks/webidl-conversions"];
exports.modules = {

/***/ "(rsc)/./node_modules/webidl-conversions/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/webidl-conversions/lib/index.js ***!
  \******************************************************/
/***/ ((module) => {

eval("\nvar conversions = {};\nmodule.exports = conversions;\nfunction sign(x) {\n    return x < 0 ? -1 : 1;\n}\nfunction evenRound(x) {\n    // Round x to the nearest integer, choosing the even integer if it lies halfway between two.\n    if (x % 1 === 0.5 && (x & 1) === 0) {\n        return Math.floor(x);\n    } else {\n        return Math.round(x);\n    }\n}\nfunction createNumberConversion(bitLength, typeOpts) {\n    if (!typeOpts.unsigned) {\n        --bitLength;\n    }\n    const lowerBound = typeOpts.unsigned ? 0 : -Math.pow(2, bitLength);\n    const upperBound = Math.pow(2, bitLength) - 1;\n    const moduloVal = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength) : Math.pow(2, bitLength);\n    const moduloBound = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength - 1) : Math.pow(2, bitLength - 1);\n    return function(V, opts) {\n        if (!opts) opts = {};\n        let x = +V;\n        if (opts.enforceRange) {\n            if (!Number.isFinite(x)) {\n                throw new TypeError(\"Argument is not a finite number\");\n            }\n            x = sign(x) * Math.floor(Math.abs(x));\n            if (x < lowerBound || x > upperBound) {\n                throw new TypeError(\"Argument is not in byte range\");\n            }\n            return x;\n        }\n        if (!isNaN(x) && opts.clamp) {\n            x = evenRound(x);\n            if (x < lowerBound) x = lowerBound;\n            if (x > upperBound) x = upperBound;\n            return x;\n        }\n        if (!Number.isFinite(x) || x === 0) {\n            return 0;\n        }\n        x = sign(x) * Math.floor(Math.abs(x));\n        x = x % moduloVal;\n        if (!typeOpts.unsigned && x >= moduloBound) {\n            return x - moduloVal;\n        } else if (typeOpts.unsigned) {\n            if (x < 0) {\n                x += moduloVal;\n            } else if (x === -0) {\n                return 0;\n            }\n        }\n        return x;\n    };\n}\nconversions[\"void\"] = function() {\n    return undefined;\n};\nconversions[\"boolean\"] = function(val) {\n    return !!val;\n};\nconversions[\"byte\"] = createNumberConversion(8, {\n    unsigned: false\n});\nconversions[\"octet\"] = createNumberConversion(8, {\n    unsigned: true\n});\nconversions[\"short\"] = createNumberConversion(16, {\n    unsigned: false\n});\nconversions[\"unsigned short\"] = createNumberConversion(16, {\n    unsigned: true\n});\nconversions[\"long\"] = createNumberConversion(32, {\n    unsigned: false\n});\nconversions[\"unsigned long\"] = createNumberConversion(32, {\n    unsigned: true\n});\nconversions[\"long long\"] = createNumberConversion(32, {\n    unsigned: false,\n    moduloBitLength: 64\n});\nconversions[\"unsigned long long\"] = createNumberConversion(32, {\n    unsigned: true,\n    moduloBitLength: 64\n});\nconversions[\"double\"] = function(V) {\n    const x = +V;\n    if (!Number.isFinite(x)) {\n        throw new TypeError(\"Argument is not a finite floating-point value\");\n    }\n    return x;\n};\nconversions[\"unrestricted double\"] = function(V) {\n    const x = +V;\n    if (isNaN(x)) {\n        throw new TypeError(\"Argument is NaN\");\n    }\n    return x;\n};\n// not quite valid, but good enough for JS\nconversions[\"float\"] = conversions[\"double\"];\nconversions[\"unrestricted float\"] = conversions[\"unrestricted double\"];\nconversions[\"DOMString\"] = function(V, opts) {\n    if (!opts) opts = {};\n    if (opts.treatNullAsEmptyString && V === null) {\n        return \"\";\n    }\n    return String(V);\n};\nconversions[\"ByteString\"] = function(V, opts) {\n    const x = String(V);\n    let c = undefined;\n    for(let i = 0; (c = x.codePointAt(i)) !== undefined; ++i){\n        if (c > 255) {\n            throw new TypeError(\"Argument is not a valid bytestring\");\n        }\n    }\n    return x;\n};\nconversions[\"USVString\"] = function(V) {\n    const S = String(V);\n    const n = S.length;\n    const U = [];\n    for(let i = 0; i < n; ++i){\n        const c = S.charCodeAt(i);\n        if (c < 0xD800 || c > 0xDFFF) {\n            U.push(String.fromCodePoint(c));\n        } else if (0xDC00 <= c && c <= 0xDFFF) {\n            U.push(String.fromCodePoint(0xFFFD));\n        } else {\n            if (i === n - 1) {\n                U.push(String.fromCodePoint(0xFFFD));\n            } else {\n                const d = S.charCodeAt(i + 1);\n                if (0xDC00 <= d && d <= 0xDFFF) {\n                    const a = c & 0x3FF;\n                    const b = d & 0x3FF;\n                    U.push(String.fromCodePoint((2 << 15) + (2 << 9) * a + b));\n                    ++i;\n                } else {\n                    U.push(String.fromCodePoint(0xFFFD));\n                }\n            }\n        }\n    }\n    return U.join(\"\");\n};\nconversions[\"Date\"] = function(V, opts) {\n    if (!(V instanceof Date)) {\n        throw new TypeError(\"Argument is not a Date object\");\n    }\n    if (isNaN(V)) {\n        return undefined;\n    }\n    return V;\n};\nconversions[\"RegExp\"] = function(V, opts) {\n    if (!(V instanceof RegExp)) {\n        V = new RegExp(V);\n    }\n    return V;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvd2ViaWRsLWNvbnZlcnNpb25zL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUViLElBQUlBLGNBQWMsQ0FBQztBQUNuQkMsT0FBT0MsT0FBTyxHQUFHRjtBQUVqQixTQUFTRyxLQUFLQyxDQUFDO0lBQ1gsT0FBT0EsSUFBSSxJQUFJLENBQUMsSUFBSTtBQUN4QjtBQUVBLFNBQVNDLFVBQVVELENBQUM7SUFDaEIsNEZBQTRGO0lBQzVGLElBQUksSUFBSyxNQUFPLE9BQU8sQ0FBQ0EsSUFBSSxPQUFPLEdBQUc7UUFDbEMsT0FBT0UsS0FBS0MsS0FBSyxDQUFDSDtJQUN0QixPQUFPO1FBQ0gsT0FBT0UsS0FBS0UsS0FBSyxDQUFDSjtJQUN0QjtBQUNKO0FBRUEsU0FBU0ssdUJBQXVCQyxTQUFTLEVBQUVDLFFBQVE7SUFDL0MsSUFBSSxDQUFDQSxTQUFTQyxRQUFRLEVBQUU7UUFDcEIsRUFBRUY7SUFDTjtJQUNBLE1BQU1HLGFBQWFGLFNBQVNDLFFBQVEsR0FBRyxJQUFJLENBQUNOLEtBQUtRLEdBQUcsQ0FBQyxHQUFHSjtJQUN4RCxNQUFNSyxhQUFhVCxLQUFLUSxHQUFHLENBQUMsR0FBR0osYUFBYTtJQUU1QyxNQUFNTSxZQUFZTCxTQUFTTSxlQUFlLEdBQUdYLEtBQUtRLEdBQUcsQ0FBQyxHQUFHSCxTQUFTTSxlQUFlLElBQUlYLEtBQUtRLEdBQUcsQ0FBQyxHQUFHSjtJQUNqRyxNQUFNUSxjQUFjUCxTQUFTTSxlQUFlLEdBQUdYLEtBQUtRLEdBQUcsQ0FBQyxHQUFHSCxTQUFTTSxlQUFlLEdBQUcsS0FBS1gsS0FBS1EsR0FBRyxDQUFDLEdBQUdKLFlBQVk7SUFFbkgsT0FBTyxTQUFTUyxDQUFDLEVBQUVDLElBQUk7UUFDbkIsSUFBSSxDQUFDQSxNQUFNQSxPQUFPLENBQUM7UUFFbkIsSUFBSWhCLElBQUksQ0FBQ2U7UUFFVCxJQUFJQyxLQUFLQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDQyxPQUFPQyxRQUFR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QUlDO29CQUN2RCxFQUFFWDtnQkFDTixPQUFPO29CQUNISyxFQUFFRSxJQUFJLENBQUNULE9BQU9VLGFBQWEsQ0FBQztnQkFDaEM7WUFDSjtRQUNKO0lBQ0o7SUFFQSxPQUFPSCxFQUFFTyxJQUFJLENBQUM7QUFDbEI7QUFFQTdDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsU0FBVW1CLENBQUMsRUFBRUMsSUFBSTtJQUNuQyxJQUFJLENBQUVELENBQUFBLGFBQWEyQixJQUFHLEdBQUk7UUFDdEIsTUFBTSxJQUFJdEIsVUFBVTtJQUN4QjtJQUNBLElBQUlFLE1BQU1QLElBQUk7UUFDVixPQUFPUztJQUNYO0lBRUEsT0FBT1Q7QUFDWDtBQUVBbkIsV0FBVyxDQUFDLFNBQVMsR0FBRyxTQUFVbUIsQ0FBQyxFQUFFQyxJQUFJO0lBQ3JDLElBQUksQ0FBRUQsQ0FBQUEsYUFBYTRCLE1BQUssR0FBSTtRQUN4QjVCLElBQUksSUFBSTRCLE9BQU81QjtJQUNuQjtJQUVBLE9BQU9BO0FBQ1giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMvLi9ub2RlX21vZHVsZXMvd2ViaWRsLWNvbnZlcnNpb25zL2xpYi9pbmRleC5qcz8wZjc2Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgY29udmVyc2lvbnMgPSB7fTtcbm1vZHVsZS5leHBvcnRzID0gY29udmVyc2lvbnM7XG5cbmZ1bmN0aW9uIHNpZ24oeCkge1xuICAgIHJldHVybiB4IDwgMCA/IC0xIDogMTtcbn1cblxuZnVuY3Rpb24gZXZlblJvdW5kKHgpIHtcbiAgICAvLyBSb3VuZCB4IHRvIHRoZSBuZWFyZXN0IGludGVnZXIsIGNob29zaW5nIHRoZSBldmVuIGludGVnZXIgaWYgaXQgbGllcyBoYWxmd2F5IGJldHdlZW4gdHdvLlxuICAgIGlmICgoeCAlIDEpID09PSAwLjUgJiYgKHggJiAxKSA9PT0gMCkgeyAvLyBbZXZlbiBudW1iZXJdLjU7IHJvdW5kIGRvd24gKGkuZS4gZmxvb3IpXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlTnVtYmVyQ29udmVyc2lvbihiaXRMZW5ndGgsIHR5cGVPcHRzKSB7XG4gICAgaWYgKCF0eXBlT3B0cy51bnNpZ25lZCkge1xuICAgICAgICAtLWJpdExlbmd0aDtcbiAgICB9XG4gICAgY29uc3QgbG93ZXJCb3VuZCA9IHR5cGVPcHRzLnVuc2lnbmVkID8gMCA6IC1NYXRoLnBvdygyLCBiaXRMZW5ndGgpO1xuICAgIGNvbnN0IHVwcGVyQm91bmQgPSBNYXRoLnBvdygyLCBiaXRMZW5ndGgpIC0gMTtcblxuICAgIGNvbnN0IG1vZHVsb1ZhbCA9IHR5cGVPcHRzLm1vZHVsb0JpdExlbmd0aCA/IE1hdGgucG93KDIsIHR5cGVPcHRzLm1vZHVsb0JpdExlbmd0aCkgOiBNYXRoLnBvdygyLCBiaXRMZW5ndGgpO1xuICAgIGNvbnN0IG1vZHVsb0JvdW5kID0gdHlwZU9wdHMubW9kdWxvQml0TGVuZ3RoID8gTWF0aC5wb3coMiwgdHlwZU9wdHMubW9kdWxvQml0TGVuZ3RoIC0gMSkgOiBNYXRoLnBvdygyLCBiaXRMZW5ndGggLSAxKTtcblxuICAgIHJldHVybiBmdW5jdGlvbihWLCBvcHRzKSB7XG4gICAgICAgIGlmICghb3B0cykgb3B0cyA9IHt9O1xuXG4gICAgICAgIGxldCB4ID0gK1Y7XG5cbiAgICAgICAgaWYgKG9wdHMuZW5mb3JjZVJhbmdlKSB7XG4gICAgICAgICAgICBpZiAoIU51bWJlci5pc0Zpbml0ZSh4KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudCBpcyBub3QgYSBmaW5pdGUgbnVtYmVyXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB4ID0gc2lnbih4KSAqIE1hdGguZmxvb3IoTWF0aC5hYnMoeCkpO1xuICAgICAgICAgICAgaWYgKHggPCBsb3dlckJvdW5kIHx8IHggPiB1cHBlckJvdW5kKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50IGlzIG5vdCBpbiBieXRlIHJhbmdlXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNOYU4oeCkgJiYgb3B0cy5jbGFtcCkge1xuICAgICAgICAgICAgeCA9IGV2ZW5Sb3VuZCh4KTtcblxuICAgICAgICAgICAgaWYgKHggPCBsb3dlckJvdW5kKSB4ID0gbG93ZXJCb3VuZDtcbiAgICAgICAgICAgIGlmICh4ID4gdXBwZXJCb3VuZCkgeCA9IHVwcGVyQm91bmQ7XG4gICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHgpIHx8IHggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgeCA9IHNpZ24oeCkgKiBNYXRoLmZsb29yKE1hdGguYWJzKHgpKTtcbiAgICAgICAgeCA9IHggJSBtb2R1bG9WYWw7XG5cbiAgICAgICAgaWYgKCF0eXBlT3B0cy51bnNpZ25lZCAmJiB4ID49IG1vZHVsb0JvdW5kKSB7XG4gICAgICAgICAgICByZXR1cm4geCAtIG1vZHVsb1ZhbDtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlT3B0cy51bnNpZ25lZCkge1xuICAgICAgICAgICAgaWYgKHggPCAwKSB7XG4gICAgICAgICAgICAgIHggKz0gbW9kdWxvVmFsO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh4ID09PSAtMCkgeyAvLyBkb24ndCByZXR1cm4gbmVnYXRpdmUgemVyb1xuICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbn1cblxuY29udmVyc2lvbnNbXCJ2b2lkXCJdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5jb252ZXJzaW9uc1tcImJvb2xlYW5cIl0gPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgcmV0dXJuICEhdmFsO1xufTtcblxuY29udmVyc2lvbnNbXCJieXRlXCJdID0gY3JlYXRlTnVtYmVyQ29udmVyc2lvbig4LCB7IHVuc2lnbmVkOiBmYWxzZSB9KTtcbmNvbnZlcnNpb25zW1wib2N0ZXRcIl0gPSBjcmVhdGVOdW1iZXJDb252ZXJzaW9uKDgsIHsgdW5zaWduZWQ6IHRydWUgfSk7XG5cbmNvbnZlcnNpb25zW1wic2hvcnRcIl0gPSBjcmVhdGVOdW1iZXJDb252ZXJzaW9uKDE2LCB7IHVuc2lnbmVkOiBmYWxzZSB9KTtcbmNvbnZlcnNpb25zW1widW5zaWduZWQgc2hvcnRcIl0gPSBjcmVhdGVOdW1iZXJDb252ZXJzaW9uKDE2LCB7IHVuc2lnbmVkOiB0cnVlIH0pO1xuXG5jb252ZXJzaW9uc1tcImxvbmdcIl0gPSBjcmVhdGVOdW1iZXJDb252ZXJzaW9uKDMyLCB7IHVuc2lnbmVkOiBmYWxzZSB9KTtcbmNvbnZlcnNpb25zW1widW5zaWduZWQgbG9uZ1wiXSA9IGNyZWF0ZU51bWJlckNvbnZlcnNpb24oMzIsIHsgdW5zaWduZWQ6IHRydWUgfSk7XG5cbmNvbnZlcnNpb25zW1wibG9uZyBsb25nXCJdID0gY3JlYXRlTnVtYmVyQ29udmVyc2lvbigzMiwgeyB1bnNpZ25lZDogZmFsc2UsIG1vZHVsb0JpdExlbmd0aDogNjQgfSk7XG5jb252ZXJzaW9uc1tcInVuc2lnbmVkIGxvbmcgbG9uZ1wiXSA9IGNyZWF0ZU51bWJlckNvbnZlcnNpb24oMzIsIHsgdW5zaWduZWQ6IHRydWUsIG1vZHVsb0JpdExlbmd0aDogNjQgfSk7XG5cbmNvbnZlcnNpb25zW1wiZG91YmxlXCJdID0gZnVuY3Rpb24gKFYpIHtcbiAgICBjb25zdCB4ID0gK1Y7XG5cbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZSh4KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJndW1lbnQgaXMgbm90IGEgZmluaXRlIGZsb2F0aW5nLXBvaW50IHZhbHVlXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB4O1xufTtcblxuY29udmVyc2lvbnNbXCJ1bnJlc3RyaWN0ZWQgZG91YmxlXCJdID0gZnVuY3Rpb24gKFYpIHtcbiAgICBjb25zdCB4ID0gK1Y7XG5cbiAgICBpZiAoaXNOYU4oeCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50IGlzIE5hTlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4geDtcbn07XG5cbi8vIG5vdCBxdWl0ZSB2YWxpZCwgYnV0IGdvb2QgZW5vdWdoIGZvciBKU1xuY29udmVyc2lvbnNbXCJmbG9hdFwiXSA9IGNvbnZlcnNpb25zW1wiZG91YmxlXCJdO1xuY29udmVyc2lvbnNbXCJ1bnJlc3RyaWN0ZWQgZmxvYXRcIl0gPSBjb252ZXJzaW9uc1tcInVucmVzdHJpY3RlZCBkb3VibGVcIl07XG5cbmNvbnZlcnNpb25zW1wiRE9NU3RyaW5nXCJdID0gZnVuY3Rpb24gKFYsIG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIG9wdHMgPSB7fTtcblxuICAgIGlmIChvcHRzLnRyZWF0TnVsbEFzRW1wdHlTdHJpbmcgJiYgViA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gU3RyaW5nKFYpO1xufTtcblxuY29udmVyc2lvbnNbXCJCeXRlU3RyaW5nXCJdID0gZnVuY3Rpb24gKFYsIG9wdHMpIHtcbiAgICBjb25zdCB4ID0gU3RyaW5nKFYpO1xuICAgIGxldCBjID0gdW5kZWZpbmVkO1xuICAgIGZvciAobGV0IGkgPSAwOyAoYyA9IHguY29kZVBvaW50QXQoaSkpICE9PSB1bmRlZmluZWQ7ICsraSkge1xuICAgICAgICBpZiAoYyA+IDI1NSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50IGlzIG5vdCBhIHZhbGlkIGJ5dGVzdHJpbmdcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geDtcbn07XG5cbmNvbnZlcnNpb25zW1wiVVNWU3RyaW5nXCJdID0gZnVuY3Rpb24gKFYpIHtcbiAgICBjb25zdCBTID0gU3RyaW5nKFYpO1xuICAgIGNvbnN0IG4gPSBTLmxlbmd0aDtcbiAgICBjb25zdCBVID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgY29uc3QgYyA9IFMuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGMgPCAweEQ4MDAgfHwgYyA+IDB4REZGRikge1xuICAgICAgICAgICAgVS5wdXNoKFN0cmluZy5mcm9tQ29kZVBvaW50KGMpKTtcbiAgICAgICAgfSBlbHNlIGlmICgweERDMDAgPD0gYyAmJiBjIDw9IDB4REZGRikge1xuICAgICAgICAgICAgVS5wdXNoKFN0cmluZy5mcm9tQ29kZVBvaW50KDB4RkZGRCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGkgPT09IG4gLSAxKSB7XG4gICAgICAgICAgICAgICAgVS5wdXNoKFN0cmluZy5mcm9tQ29kZVBvaW50KDB4RkZGRCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkID0gUy5jaGFyQ29kZUF0KGkgKyAxKTtcbiAgICAgICAgICAgICAgICBpZiAoMHhEQzAwIDw9IGQgJiYgZCA8PSAweERGRkYpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYSA9IGMgJiAweDNGRjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYiA9IGQgJiAweDNGRjtcbiAgICAgICAgICAgICAgICAgICAgVS5wdXNoKFN0cmluZy5mcm9tQ29kZVBvaW50KCgyIDw8IDE1KSArICgyIDw8IDkpICogYSArIGIpKTtcbiAgICAgICAgICAgICAgICAgICAgKytpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIFUucHVzaChTdHJpbmcuZnJvbUNvZGVQb2ludCgweEZGRkQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gVS5qb2luKCcnKTtcbn07XG5cbmNvbnZlcnNpb25zW1wiRGF0ZVwiXSA9IGZ1bmN0aW9uIChWLCBvcHRzKSB7XG4gICAgaWYgKCEoViBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudCBpcyBub3QgYSBEYXRlIG9iamVjdFwiKTtcbiAgICB9XG4gICAgaWYgKGlzTmFOKFYpKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIFY7XG59O1xuXG5jb252ZXJzaW9uc1tcIlJlZ0V4cFwiXSA9IGZ1bmN0aW9uIChWLCBvcHRzKSB7XG4gICAgaWYgKCEoViBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICAgICAgViA9IG5ldyBSZWdFeHAoVik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFY7XG59O1xuIl0sIm5hbWVzIjpbImNvbnZlcnNpb25zIiwibW9kdWxlIiwiZXhwb3J0cyIsInNpZ24iLCJ4IiwiZXZlblJvdW5kIiwiTWF0aCIsImZsb29yIiwicm91bmQiLCJjcmVhdGVOdW1iZXJDb252ZXJzaW9uIiwiYml0TGVuZ3RoIiwidHlwZU9wdHMiLCJ1bnNpZ25lZCIsImxvd2VyQm91bmQiLCJwb3ciLCJ1cHBlckJvdW5kIiwibW9kdWxvVmFsIiwibW9kdWxvQml0TGVuZ3RoIiwibW9kdWxvQm91bmQiLCJWIiwib3B0cyIsImVuZm9yY2VSYW5nZSIsIk51bWJlciIsImlzRmluaXRlIiwiVHlwZUVycm9yIiwiYWJzIiwiaXNOYU4iLCJjbGFtcCIsInVuZGVmaW5lZCIsInZhbCIsInRyZWF0TnVsbEFzRW1wdHlTdHJpbmciLCJTdHJpbmciLCJjIiwiaSIsImNvZGVQb2ludEF0IiwiUyIsIm4iLCJsZW5ndGgiLCJVIiwiY2hhckNvZGVBdCIsInB1c2giLCJmcm9tQ29kZVBvaW50IiwiZCIsImEiLCJiIiwiam9pbiIsIkRhdGUiLCJSZWdFeHAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/webidl-conversions/lib/index.js\n");

/***/ })

};
;