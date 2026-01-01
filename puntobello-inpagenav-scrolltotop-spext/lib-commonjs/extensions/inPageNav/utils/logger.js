"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var tslib_1 = require("tslib");
var LogLevel;
(function (LogLevel) {
    LogLevel["Info"] = "info";
    LogLevel["Warn"] = "warn";
    LogLevel["Error"] = "error";
})(LogLevel || (LogLevel = {}));
var Logger = /** @class */ (function () {
    function Logger() {
        this.figletOutpout = false;
        this.welcomeFiglet = "\u001B[31m \u001B[33m \u001B[33m_\u001B[32m_\u001B[34m_\u001B[35m_\u001B[36m \u001B[31m \u001B[33m \u001B[33m \u001B[32m \u001B[34m \u001B[35m \u001B[36m \u001B[31m \u001B[33m \u001B[33m \u001B[32m \u001B[34m \u001B[35m \u001B[36m_\u001B[31m \u001B[33m \u001B[33m \u001B[32m \u001B[34m \u001B[35m \u001B[36m \u001B[31m \u001B[33m_\u001B[33m_\u001B[32m_\u001B[34m_\u001B[35m \u001B[36m \u001B[31m \u001B[33m \u001B[33m \u001B[32m \u001B[34m \u001B[35m_\u001B[36m \u001B[31m_\u001B[33m \u001B[33m \u001B[32m \u001B[34m \u001B[35m \u001B[36m \u001B[31m \u001B[0m\n\u001B[33m \u001B[33m|\u001B[32m \u001B[34m \u001B[35m_\u001B[36m \u001B[31m\\\u001B[33m \u001B[33m_\u001B[32m \u001B[34m \u001B[35m \u001B[36m_\u001B[31m \u001B[33m_\u001B[33m \u001B[32m_\u001B[34m_\u001B[35m \u001B[36m|\u001B[31m \u001B[33m|\u001B[33m_\u001B[32m \u001B[34m_\u001B[35m_\u001B[36m_\u001B[31m \u001B[33m|\u001B[33m \u001B[32m_\u001B[34m_\u001B[35m \u001B[36m)\u001B[31m \u001B[33m \u001B[33m_\u001B[32m_\u001B[34m_\u001B[35m|\u001B[36m \u001B[31m|\u001B[33m \u001B[33m|\u001B[32m \u001B[34m_\u001B[35m_\u001B[36m_\u001B[31m \u001B[33m \u001B[0m\n\u001B[33m \u001B[32m|\u001B[34m \u001B[35m|\u001B[36m_\u001B[31m)\u001B[33m \u001B[33m|\u001B[32m \u001B[34m|\u001B[35m \u001B[36m|\u001B[31m \u001B[33m|\u001B[33m \u001B[32m'\u001B[34m_\u001B[35m \u001B[36m\\\u001B[31m|\u001B[33m \u001B[33m_\u001B[32m_\u001B[34m/\u001B[35m \u001B[36m_\u001B[31m \u001B[33m\\\u001B[33m|\u001B[32m \u001B[34m \u001B[35m_\u001B[36m \u001B[31m\\\u001B[33m \u001B[33m/\u001B[32m \u001B[34m_\u001B[35m \u001B[36m\\\u001B[31m \u001B[33m|\u001B[33m \u001B[32m|\u001B[34m/\u001B[35m \u001B[36m_\u001B[31m \u001B[33m\\\u001B[33m \u001B[0m\n\u001B[32m \u001B[34m|\u001B[35m \u001B[36m \u001B[31m_\u001B[33m_\u001B[33m/\u001B[32m|\u001B[34m \u001B[35m|\u001B[36m_\u001B[31m|\u001B[33m \u001B[33m|\u001B[32m \u001B[34m|\u001B[35m \u001B[36m|\u001B[31m \u001B[33m|\u001B[33m \u001B[32m|\u001B[34m|\u001B[35m \u001B[36m(\u001B[31m_\u001B[33m)\u001B[33m \u001B[32m|\u001B[34m \u001B[35m|\u001B[36m_\u001B[31m)\u001B[33m \u001B[33m|\u001B[32m \u001B[34m \u001B[35m_\u001B[36m_\u001B[31m/\u001B[33m \u001B[33m|\u001B[32m \u001B[34m|\u001B[35m \u001B[36m(\u001B[31m_\u001B[33m)\u001B[33m \u001B[32m|\u001B[0m\n\u001B[34m \u001B[35m|\u001B[36m_\u001B[31m|\u001B[33m \u001B[33m \u001B[32m \u001B[34m \u001B[35m\\\u001B[36m_\u001B[31m_\u001B[33m,\u001B[33m_\u001B[32m|\u001B[34m_\u001B[35m|\u001B[36m \u001B[31m|\u001B[33m_\u001B[33m|\u001B[32m\\\u001B[34m_\u001B[35m_\u001B[36m\\\u001B[31m_\u001B[33m_\u001B[33m_\u001B[32m/\u001B[34m|\u001B[35m_\u001B[36m_\u001B[31m_\u001B[33m_\u001B[33m/\u001B[32m \u001B[34m\\\u001B[35m_\u001B[36m_\u001B[31m_\u001B[33m|\u001B[33m_\u001B[32m|\u001B[34m_\u001B[35m|\u001B[36m\\\u001B[31m_\u001B[33m_\u001B[33m_\u001B[32m/\u001B[34m \u001B[0m\n\u001B[35m \u001B[36m \u001B[31m \u001B[33m \u001B[33m \u001B[32m \u001B[34m \u001B[35m \u001B[36m \u001B[31m \u001B[33m \u001B[33m \u001B[32m \u001B[34m \u001B[35m \u001B[36m \u001B[31m \u001B[33m \u001B[33m \u001B[32m \u001B[34m \u001B[35m \u001B[36m \u001B[31m \u001B[33m \u001B[33m \u001B[32m \u001B[34m \u001B[35m \u001B[36m \u001B[31m \u001B[33m \u001B[33m \u001B[32m \u001B[34m \u001B[35m \u001B[36m \u001B[31m \u001B[33m \u001B[33m \u001B[32m \u001B[34m \u001B[35m \u001B[36m \u001B[31m \u001B[33m \u001B[33m \u001B[32m \u001B[34m \u001B[35m \u001B[0m\n";
        var url = new URL(window.location.href);
        var urlParams = new URLSearchParams(url.search);
        this.isVerbose = urlParams.get('debug') === 'true' || urlParams.get('loadSPFX') === 'true' || window.location.href.indexOf('workbench.aspx') !== -1;
    }
    Logger.getInstance = function () {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    };
    Logger.prototype.setContextInfo = function (info) {
        this.contextInfo = info;
    };
    Logger.prototype.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (this.isVerbose) {
            this.customLog.apply(this, tslib_1.__spreadArray([LogLevel.Info, message], optionalParams, false));
        }
    };
    Logger.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.customLog.apply(this, tslib_1.__spreadArray([LogLevel.Warn, message], optionalParams, false));
    };
    Logger.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.customLog.apply(this, tslib_1.__spreadArray([LogLevel.Error, message], optionalParams, false));
        console.trace('Stack Trace:');
    };
    Logger.prototype.customLog = function (level, message) {
        var optionalParams = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            optionalParams[_i - 2] = arguments[_i];
        }
        this.writeWelcomeFiglet();
        var icon = level === LogLevel.Error ? '🐞' :
            level === LogLevel.Warn ? '🔔' :
                level === LogLevel.Info ? 'ℹ️' : '';
        var color = level === LogLevel.Error ? 'color: red;' :
            level === LogLevel.Warn ? 'color: orange;' :
                level === LogLevel.Info ? 'color: blue;' : '';
        var prefix = "%c".concat(icon, " [").concat(level.toUpperCase(), "]:");
        var style = "".concat(color, " font-weight: bold;");
        var logFunction = console[level] || console.log;
        var params = this.contextInfo ? tslib_1.__spreadArray(["".concat(prefix), style, this.contextInfo, message], optionalParams, true) : tslib_1.__spreadArray(["".concat(prefix), style, message], optionalParams, true);
        logFunction.apply(void 0, params);
    };
    Logger.prototype.writeWelcomeFiglet = function () {
        if (!this.figletOutpout) {
            console.log(this.welcomeFiglet);
            this.figletOutpout = true;
        }
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map