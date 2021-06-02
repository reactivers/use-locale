'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var isBrowser = function () {
    return typeof window !== "undefined";
};
Array(12).fill(0).map(function (_, index) { return ((index) % 12) + 1; });

function createLocale() {
    var LocaleContext = react.createContext({});
    var LocaleProvider = function (_a) {
        var locales = _a.locales, _activeLanguage = _a.activeLanguage, _b = _a.defaultLanguage, defaultLanguage = _b === void 0 ? "en-us" : _b, children = _a.children;
        var fallbacked = react.useRef(false);
        var getValidLanguage = react.useCallback(function (activeLanguage) {
            fallbacked.current = false;
            if (locales[activeLanguage]) {
                return activeLanguage;
            }
            else {
                if (isBrowser()) {
                    var language = (navigator.language || "").toLowerCase();
                    var primLanguage = language.substring(0, 2);
                    if (locales[language])
                        return language;
                    else if (locales[primLanguage]) {
                        return primLanguage;
                    }
                    else {
                        return defaultLanguage;
                    }
                }
                else {
                    fallbacked.current = true;
                    return defaultLanguage;
                }
            }
        }, [locales, defaultLanguage]);
        var _c = react.useState(getValidLanguage(_activeLanguage)), activeLanguage = _c[0], setActiveLanguage = _c[1];
        var locale = react.useMemo(function () { return locales[activeLanguage]; }, [locales, activeLanguage]);
        react.useLayoutEffect(function () {
            if (fallbacked.current) {
                setActiveLanguage(getValidLanguage(_activeLanguage));
            }
        }, [getValidLanguage, _activeLanguage, fallbacked.current]);
        return (jsxRuntime.jsx(LocaleContext.Provider, __assign({ value: {
                locale: locale,
                activeLanguage: activeLanguage,
                setActiveLanguage: setActiveLanguage,
            } }, { children: children }), void 0));
    };
    var useLocale = function () {
        var context = react.useContext(LocaleContext);
        if (context === undefined) {
            throw new Error('useLocalesContext must be used within an LocalesContext.Provider');
        }
        return context;
    };
    return {
        LocaleProvider: LocaleProvider,
        useLocale: useLocale
    };
}

exports.createLocale = createLocale;
