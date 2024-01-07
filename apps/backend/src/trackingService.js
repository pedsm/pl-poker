"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixpanelTrackingService = exports.TrackingEvents = void 0;
var mixpanel_1 = __importDefault(require("mixpanel"));
var logger_1 = __importDefault(require("./logger"));
var TrackingEvents;
(function (TrackingEvents) {
    TrackingEvents["ROOM_CREATED"] = "room_created";
    TrackingEvents["ROOM_JOINED"] = "room_joined";
    TrackingEvents["ROOM_LEFT"] = "room_left";
    TrackingEvents["CLEAR_TABLE"] = "clear_table";
    TrackingEvents["CHANGE_NAME"] = "change_name";
    TrackingEvents["FLIP_ALL"] = "flip_all";
    TrackingEvents["CHANGE_DECK"] = "change_deck";
})(TrackingEvents = exports.TrackingEvents || (exports.TrackingEvents = {}));
var MixpanelTrackingService = /** @class */ (function () {
    function MixpanelTrackingService() {
        var _a;
        var token = process.env.MIXPANEL_TOKEN;
        if (token == null) {
            logger_1.default.warn('MIXPANEL_TOKEN is not available, tracking disabled');
            return;
        }
        logger_1.default.info("Started MIXPANEL tracking service");
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.mixpanel = mixpanel_1.default.init(process.env.MIXPANEL_TOKEN);
        this.cloudProvider = (_a = process.env.CLOUD_PROVIDER) !== null && _a !== void 0 ? _a : 'oops';
    }
    MixpanelTrackingService.prototype.trackEvent = function (event, properties) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                logger_1.default.debug(__assign(__assign({}, properties), { event: event, msg: "Sending event ".concat(event), cloudProvider: this.cloudProvider }));
                (_a = this.mixpanel) === null || _a === void 0 ? void 0 : _a.track(event, __assign(__assign({}, properties), { cloudProvider: this.cloudProvider }));
                return [2 /*return*/];
            });
        });
    };
    MixpanelTrackingService.prototype.setNameForUser = function (id, name) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                logger_1.default.debug({
                    msg: "Setting name",
                    id: id,
                    name: name,
                });
                (_a = this.mixpanel) === null || _a === void 0 ? void 0 : _a.people.set(id, {
                    '$first_name': name,
                    'last_visited': (new Date()).toISOString()
                });
                return [2 /*return*/];
            });
        });
    };
    MixpanelTrackingService.prototype.trackRoom = function (name, props) {
        var _a;
        if (props === void 0) { props = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                (_a = this.mixpanel) === null || _a === void 0 ? void 0 : _a.groups.set('Room', name, __assign({ $name: name, last_visited: (new Date()).toISOString() }, props));
                return [2 /*return*/];
            });
        });
    };
    return MixpanelTrackingService;
}());
exports.MixpanelTrackingService = MixpanelTrackingService;
