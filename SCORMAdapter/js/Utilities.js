/*
 * Created and Modified with open sources from ADL, IMSGlobal, Claude Ostyn, Pipwerks, SCORM.com, StackOverflow, and Cybercussion Interactive LLC.
 * Creative Commons Attribution-ShareAlike 4.0 International License.
 * January 1st, 2018
 */

//todo: this should refactor as general utilities object.
var SCOUtil = function () {
    "use strict";
    var version = "1.0.0",
        self = this,
        isReady = false,
        toString = Object.prototype.toString,
        h = 'HTMLEvents',
        k = 'KeyboardEvent',
        m = 'MouseEvents',
        eventTypes = {
            load: h,
            unload: h,
            abort: h,
            error: h,
            select: h,
            change: h,
            submit: h,
            reset: h,
            focus: h,
            blur: h,
            resize: h,
            scroll: h,
            input: h,

            keyup: k,
            keydown: k,

            click: m,
            dblclick: m,
            mousedown: m,
            mouseup: m,
            mouseover: m,
            mousemove: m,
            mouseout: m,
            contextmenu: m
        },
        defaults = {
            clientX: 0,
            clientY: 0,
            button: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            bubbles: true,
            cancelable: true,
            view: document.defaultView,
            key: '',
            location: 0,
            modifiers: '',
            repeat: 0,
            locale: ''
        },

        initializers = {
            // no KeyboardEvent, MouseEvents need in Crewpad development.
            HTMLEvents: function (el, name, event, o) {
                return event.initEvent(name, o.bubbles, o.cancelable);
            },

            CustomEvent: function (el, name, event, o) {
                return event.initCustomEvent(name, o.bubbles, o.cancelable, o.detail);
            }
        },

        eventSplitter = /\s+/,
        types = ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object"],
        class_types = [],
        len = types.length,

        checkLoaded = function (_handler) {
            if (isReady) {
                return;
            }
            try {
                // If IE is used, use the trick here http://javascript.nwbox.com/IEContentLoaded/
                document.documentElement.doScroll("left");
            } catch (e) {
                setTimeout(function () {
                    checkLoaded(_handler);
                }, 0);
                return;
            }
            // and execute any waiting functions
            _handler();
        },
        /**
         * type
         * Private way to check the type null or undefined
         * @param {object} o -
         * @returns {String} - 
         */
        type = function (o) {
            return o == null ? String(o) : class_types[toString.call(o)] || "object";
        },


        /**
         * Add Event
         *  only works on DOM Objects.
         * @param target
         * @param event
         * @param handler
         */
        addEvent = function (target, event, handler) {
            if (event.indexOf(' ') >= 0) {
                // Multi-event - if listening to 'setvalue getvalue'
                var events = event.split(' '),
                    elen = events.length;
                while (elen--) {
                    // Add events.
                    addEvent(target, events[elen], handler);
                }
            } else {
                if (target === window || Util.isElement(target)) {
                    // DOM Object
                    if (target.addEventListener) {
                        // Standard
                        if (event === "loaded") {
                            event = "DOMContentLoaded";
                        }
                        target.addEventListener(event, handler, false);
                    } else {
                        // IE 6/7/8
                        if (event === "loaded") {
                            event = "onreadystatechange";
                            document.attachEvent(event, function () {
                                if (document.readyState === "complete") {
                                    document.detachEvent("onreadystatechange", target);
                                    isReady = true;
                                    handler();
                                }
                            });
                            // If IE and not an iframe
                            if (document.documentElement.doScroll && window === window.top) {
                                checkLoaded(handler);
                            }
                            // We want to ensure we catch IE unload events (still testing)
                        } else {
                            target.attachEvent('on' + event, handler);
                        }
                    }
                } else {
                    // JavaScript Object
                    $.extend(true, target, Events); // add capability
                    target.on(event, handler); // add listener
                }
            }
        },


        /**
         * Trigger Event
         * @param target
         * @param name
         * @param options
         */
        triggerEvent = function (target, name, options) {
            var doc = document,
                event,
                etype,
                attr;
            options = options || {};
            for (attr in defaults) {
                if (defaults.hasOwnProperty(attr)) {
                    if (!options.hasOwnProperty(attr)) {
                        options[attr] = defaults[attr];
                    }
                }
            }
            // Check DOM Element
            if (Util.isWindow(target) || Util.isElement(target)) {
                if (doc.createEvent) {
                    // Standard
                    etype = eventTypes[name] || 'CustomEvent';
                    event = doc.createEvent(etype);
                    initializers[etype](target, name, event, options);
                    try {
                        target.dispatchEvent(event);
                    } catch (ignore) {
                        // doesn't exist
                    }
                } else {
                    // IE
                    event = doc.createEventObject();
                    target.fireEvent('on' + etype, event);
                }
            } else {
                try {
                    target.trigger(name, options);
                } catch (ignore) {
                    // nothing listening
                }
            }
        },

        triggerEvents = function (events, args) {
            var ev,
                i = -1,
                l = events.length,
                a1 = args[0],
                a2 = args[1],
                a3 = args[2],
                al = args.length;
            switch (al) {
                case 0:
                    while (++i < l) {
                        ev = events[i];
                        ev.callback.call(ev.ctx);
                    }
                    return;
                case 1:
                    while (++i < l) {
                        ev = events[i];
                        ev.callback.call(ev.ctx, a1);
                    }
                    return;
                case 2:
                    while (++i < l) {
                        ev = events[i];
                        ev.callback.call(ev.ctx, a1, a2);
                    }
                    return;
                case 3:
                    while (++i < l) {
                        ev = events[i];
                        ev.callback.call(ev.ctx, a1, a2, a3);
                    }
                    return;
                default:
                    while (++i < l) {
                        ev = events[i];
                        ev.callback.apply(ev.ctx, args);
                    }
                    return;
            }
        },
        eventsApi = function (obj, action, name, rest) {
            var key,
                i,
                l;
            if (!name) {
                return true;
            }
            // Handle event maps.
            if (typeof name === 'object') {
                for (key in name) {
                    if (name.hasOwnProperty(key)) {
                        obj[action].apply(obj, [key, name[key]].concat(rest));
                    }
                }
                return false;
            }
            // Handle space separated event names.
            if (eventSplitter.test(name)) {
                var names = name.split(eventSplitter);
                for (i = 0, l = names.length; i < l; i++) {
                    obj[action].apply(obj, [names[i]].concat(rest));
                }
                return false;
            }
            return true;
        },

        Events = {
            on: function (name, callback, context) {
                if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
                this._events || (this._events = {});
                var events = this._events[name] || (this._events[name] = []);
                events.push({ callback: callback, context: context, ctx: context || this });
                return this;
            },
            once: function (name, callback, context) {
                if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
                var self = this;
                var once = _.once(function () {
                    self.off(name, once);
                    callback.apply(this, arguments);
                });
                once._callback = callback;
                return this.on(name, once, context);
            },
            off: function (name, callback, context) {
                var retain, ev, events, names, i, l, j, k;
                if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
                if (!name && !callback && !context) {
                    this._events = void 0;
                    return this;
                }
                names = name ? [name] : _.keys(this._events);
                for (i = 0, l = names.length; i < l; i++) {
                    name = names[i];
                    if (events = this._events[name]) {
                        this._events[name] = retain = [];
                        if (callback || context) {
                            for (j = 0, k = events.length; j < k; j++) {
                                ev = events[j];
                                if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                                    (context && context !== ev.context)) {
                                    retain.push(ev);
                                }
                            }
                        }
                        if (!retain.length) delete this._events[name];
                    }
                }
                return this;
            },

            trigger: function (name, options) {
                var args = [options],
                    events,
                    allEvents;
                if (!this._events) {
                    return this;
                }
                if (!eventsApi(this, 'trigger', name, args)) {
                    return this;
                }
                events = this._events[name];
                allEvents = this._events.all;
                if (events) {
                    triggerEvents(events, args);
                }
                if (allEvents) {
                    triggerEvents(allEvents, args);
                }
                return this;
            },

            stopListening: function (obj, name, callback) {
                var listeningTo = this._listeningTo;
                if (!listeningTo) return this;
                var remove = !name && !callback;
                if (!callback && typeof name === 'object') callback = this;
                if (obj) (listeningTo = {})[obj._listenId] = obj;
                for (var id in listeningTo) {
                    obj = listeningTo[id];
                    obj.off(name, callback, this);
                    if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
                }
                return this;
            }
        };

    // Build class types
    while (len--) {
        var t = types[len];
        class_types["[object " + t + "]"] = t.toLowerCase();
    }

    // ==========================
    //       Public Object
    // ==========================

    return {
        type: type,
        addEvent: addEvent,
        triggerEvent: triggerEvent,
        Events: Events
    };

}();

/**
 * Round Value
 * Rounds to 2 decimal places
 * @param {Number} v -
 * @returns {Number} -
 */
SCOUtil.roundVal = function (v) {
    var dec = 2;
    return Math.round(v * Math.pow(10, dec)) / Math.pow(10, dec);
}
var Util = {};

/**
 * Is Array
 * @param {object} o - Object to test.
 * @returns {Boolean} -
 */
Util.isArray = function (o) {
    return (o instanceof Array) || (toString.apply(o) === '[object Array]');
};

/**
 * Is Function
 * @param {object} o - Object to test.
 * @returns {boolean}
 */
Util.isFunction = function (o) {
    return type(o) === "function";
};

Util.isElement = function (o) {
    return (typeof HTMLElement === "object" ? o instanceof HTMLElement : o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string");
};

/**
 * Is Window
 * @param {Object} o - Object to test.
 * @returns {Boolean}
 */
Util.isWindow = function (o) {
    return o != null && o === o.window;
};

/**
 * Make Boolean
 * Turns 'yes', 'no', 'true', 'false', '0', '1' into true/false
 * @param {String} str - value to turn to boolean
 * @returns {Boolean}
 */
Util.makeBoolean = function (str) {
    if (str === undefined) {
        debug(settings.prefix + " : makeBoolean was given empty string, converting to false", 2);
        return false;
    }
    if (str === true || str === false) {
        return Boolean(str);
    }
    switch (str.toLowerCase()) {
        case "true":
        case "yes":
        case "1":
            return true;
        case "false":
        case "no":
        case "0":
        case null:
            return false;
        default:
            return Boolean(str);
    }
};

/**
 * Is Plain Object
 * @param {Object} o - Object to test.
 * @returns {Boolean}
 */
Util.isPlainObject = function (o) {
    if (!o)
        return false;
    if (typeof (o) !== "object" || o.nodeType || Util.isWindow(o)) {
        return false;
    }
    return !(o.constructor && !Object.hasOwnProperty.call(o.constructor.prototype, "isPrototypeOf"));
};

/**
 * Centiseconds To ISO Duration
 * Borrowed from Claude Ostyn, but touched up for JSLint/JavaScript and evil "with" statement.  Tested on
 * JSPerf for speed.
 * @param {Number} n - Total Seconds
 * @param {Boolean} bPrecise - Only Set true if were dealing with months, years (highly unlikely)
 * @returns {String} SCORM 2004 Time PT0H0M0S Format
 */
Util.CentisecsToISODuration = function (n, bPrecise) {
    /* Note: SCORM and IEEE 1484.11.1 require centisec precision
     Parameters:
     n = number of centiseconds
     bPrecise = optional parameter; if true, duration will
     be expressed without using year and/or month fields.
     If bPrecise is not true, and the duration is long,
     months are calculated by approximation based on average number
     of days over 4 years (365*4+1), not counting the extra days
     for leap years. If a reference date was available,
     the calculation could be more precise, but becomes complex,
     since the exact result depends on where the reference date
     falls within the period (e.g. beginning, end or ???)
     1 year ~ (365*4+1)/4*60*60*24*100 = 3155760000 centiseconds
     1 month ~ (365*4+1)/48*60*60*24*100 = 262980000 centiseconds
     1 day = 8640000 centiseconds
     1 hour = 360000 centiseconds
     1 minute = 6000 centiseconds */
    var str = "P",
        nCs = Math.max(n, 0),
        nY = 0,
        nM = 0,
        nD = 0,
        nH,
        nMin;
    // Next set of operations uses whole seconds
    //with (Math) { //argumentatively considered harmful
    nCs = Math.round(nCs);
    if (bPrecise === true) {
        nD = Math.floor(nCs / 8640000);
    } else {
        nY = Math.floor(nCs / 3155760000);
        nCs -= nY * 3155760000;
        nM = Math.floor(nCs / 262980000);
        nCs -= nM * 262980000;
        nD = Math.floor(nCs / 8640000);
    }
    nCs -= nD * 8640000;
    nH = Math.floor(nCs / 360000);
    nCs -= nH * 360000;
    nMin = Math.floor(nCs / 6000);
    nCs -= nMin * 6000;
    //}
    // Now we can construct string
    if (nY > 0) {
        str += nY + "Y";
    }
    if (nM > 0) {
        str += nM + "M";
    }
    if (nD > 0) {
        str += nD + "D";
    }
    if ((nH > 0) || (nMin > 0) || (nCs > 0)) {
        str += "T";
        if (nH > 0) {
            str += nH + "H";
        }
        if (nMin > 0) {
            str += nMin + "M";
        }
        if (nCs > 0) {
            str += (nCs / 100) + "S";
        }
    }
    if (str === "P") {
        str = "PT0H0M0S";
    }

    return str;
};

/**
 * Centiseconds to SCORM 1.2 Duration
 * @param n
 * @returns {string}
 */
Util.centisecsToSCORM12Duration = function (n) {
    // Format is [HH]HH:MM:SS[.SS]
    var nH = Math.floor(n / 360000),
        nCs = n - nH * 360000,
        nM = Math.floor(nCs / 6000),
        nS,
        str;
    nCs = nCs - nM * 6000;
    nS = Math.floor(nCs / 100);
    nCs = Math.floor(nCs - nS * 100);
    if (nH > 9999) {
        nH = 9999;
    }
    str = "0000" + nH + ":";
    str = str.substr(str.length - 5, 5);
    if (nM < 10) {
        str += "0";
    }
    str += nM + ":";
    if (nS < 10) {
        str += "0";
    }
    str += nS;
    if (nCs > 0) {
        str += ".";
        if (nCs < 10) {
            str += "0";
        }
        str += nCs;
    }
    return str;
}

/**
 * Centiseconds to our LMS Duration
 * @param n
 * @returns {string}
 */
Util.centisecsToLMSDuration = function (n) {
    // Format is [HH]HH:MM:SS[.SS]
    var nH = Math.floor(n / 360000),
        nCs = n - nH * 360000,
        nM = Math.floor(nCs / 6000),
        nS,
        str;
    nCs = nCs - nM * 6000;
    nS = Math.floor(nCs / 100);
    nCs = Math.floor(nCs - nS * 100);
    if (nH > 99) {
        nH = 99;
    }
    str = "00" + nH + ":";
    str = str.substr(str.length - 3, 3);
    if (nM < 10) {
        str += "0";
    }
    str += nM + ":";
    if (nS < 10) {
        str += "0";
    }
    str += nS;
    if (nCs > 0) {
        str += ".";
        if (nCs < 10) {
            str += "0";
        }
        str += nCs;
    }
    return str;
}

/**
 * ISO Duration to Centisecond
 * @param str
 * @return {Number}
 */
Util.ISODurationToCentisec = function (str) {
    // Only gross syntax check is performed here
    // Months calculated by approximation based on average number
    // of days over 4 years (365*4+1), not counting the extra days
    // in leap years. If a reference date was available,
    // the calculation could be more precise, but becomes complex,
    // since the exact result depends on where the reference date
    // falls within the period (e.g. beginning, end or ???)
    // 1 year ~ (365*4+1)/4*60*60*24*100 = 3155760000 centiseconds
    // 1 month ~ (365*4+1)/48*60*60*24*100 = 262980000 centiseconds
    // 1 day = 8640000 centiseconds
    // 1 hour = 360000 centiseconds
    // 1 minute = 6000 centiseconds
    var aV = [0, 0, 0, 0, 0, 0],
        bErr = (str.indexOf("P") !== 0),
        bTFound = false,
        aT = ["Y", "M", "D", "H", "M", "S"],
        p = 0,
        i = 0,
        len;
    if (!bErr) {
        str = str.substr(1); //get past the P
        len = aT.length;
        i = 0;
        //for (i = 0; i < len; i += 1) {
        while (i < len) {
            if (str.indexOf("T") === 0) {
                str = str.substr(1);
                i = Math.max(i, 3);
                bTFound = true;
            }
            p = str.indexOf(aT[i]);
            if (p > -1) {
                /*jslint continue: true */
                if ((i === 1) && (str.indexOf("T") > -1) && (str.indexOf("T") < p)) {
                    continue;
                }
                /*jslint continue: false */
                if (aT[i] === "S") {
                    aV[i] = parseFloat(str.substr(0, p));
                } else {
                    aV[i] = parseInt(str.substr(0, p), 10);
                }
                if (isNaN(aV[i])) {
                    bErr = true;
                    break;
                }
                if ((i > 2) && (!bTFound)) {
                    bErr = true;
                    break;
                }
                str = str.substr(p + 1);
            }
            i += 1;
        }
        bErr = !((!bErr) && (len !== 0)); // Fix 2/2016
    }
    if (bErr) {
        return 0;
    }
    return aV[0] * 3155760000 + aV[1] * 262980000
        + aV[2] * 8640000 + aV[3] * 360000 + aV[4] * 6000
        + Math.round(aV[5] * 100);
};

/**
 * Pad Time
 * Pads time with proper formatting (double digits)
 */
Util.PadTime = function (n) {
    return n < 10 ? '0' + n : n;
};

/**
 * SCORM 1.2 Time to Milliseconds
 * @param n HHHH:MM:SS.SS
 * @returns {number} total milliseconds
 */
Util.scorm12toMS = function (n) {
    var t_arr = n.split(":");
    return Math.round(t_arr[0] * 3600000) + (t_arr[1] * 60000) + (t_arr[2] * 1000);
};

/**
 * Date To SCORM 1.2 Time
 * @param date
 * @returns {string}
 */
Util.dateToscorm12Time = function (date) {
    var h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();

    return Util.PadTime(h) + ":" + Util.PadTime(m) + ":" + Util.PadTime(s);
};


/**
 * ISO 8601 Date String UTC
 * Converts date object into ISO 8601 standard
 * returns {String} ISO 8601 + UTC
 */
Util.isoDateToStringUTC = function (d) {
    return d.getUTCFullYear() + '-' + Util.PadTime(d.getUTCMonth() + 1) + '-' + Util.PadTime(d.getUTCDate()) + 'T' + Util.PadTime(d.getUTCHours()) + ':' + Util.PadTime(d.getUTCMinutes()) + ':' + Util.PadTime(d.getUTCSeconds()) + "." + Math.round((d.getUTCMilliseconds() / 1000) % 1000) + 'Z';
};


/**
 * ISO 8601 Date String
 * Concerts date into ISO 8601 Standard
 * @returns {String} ISO 8601
 */
Util.isoDateToString = function (d) {
    var offset = d.getTimezoneOffset() > 0 ? '-' : '+';
    return d.getFullYear() + '-' + Util.PadTime(d.getMonth() + 1) + '-' + Util.PadTime(d.getDate()) + 'T' + Util.PadTime(d.getHours()) + ':' + Util.PadTime(d.getMinutes()) + ':' + Util.PadTime(d.getSeconds()) + "." + Math.round((d.getMilliseconds() / 1000) % 1000) + offset + Util.PadTime(d.getTimezoneOffset() / 60) + ':00';
};

/**
 * ISO 8601 String to Date
 * Not extremely clear yet if this is needed at a SCO level.  If not I'll remove it later.
 * @param str {String} ISO8601
 * @return {Object} Date Object or false
 */
Util.isoStringToDate = function (str) {
    var MM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        d,
        uoffset,
        offset = 0,
        mil = 0,
        dd,
        timebits,
        m,
        resultDate,
        utcdate,
        offsetMinutes;
    /*jslint unparam: true*/
    switch (settings.time_type) {
        case "UTC":
            timebits = /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(?:([+\-])([0-9]{2})([0-9]{2}))?/;
            m = timebits.exec(str);
            if (m) {
                utcdate = Date.UTC(
                    parseInt(m[1], 10),
                    parseInt(m[2], 10) - 1, // months are zero-offset (!)
                    parseInt(m[3], 10),
                    parseInt(m[4], 10),
                    parseInt(m[5], 10), // hh:mm
                    ((m[6] && parseInt(m[6], 10)) || 0),  // optional seconds
                    ((m[7] && parseFloat(m[7]) * 1000)) || 0
                ); // optional fraction
                // utcdate is milliseconds since the epoch
                if (m[9] && m[10]) {
                    offsetMinutes = parseInt(m[9], 10) * 60 + parseInt(m[10], 10);
                    utcdate += (m[8] === '+' ? -1 : +1) * offsetMinutes * 60000;
                }
                resultDate = new Date(utcdate);
            } else {
                resultDate = null;
            }
            return resultDate;
        case "GMT":
            d = str.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))([\+|\-]\d+:\d+)/, function ($0, $Year, $Month, $Day, $Hour, $Min, $Sec, $Ms, $Offset) {
                offset = parseInt($Offset.substring(1, $Offset.length), 10) * 60;
                mil = $Ms;
                return MM[$Month - 1] + " " + $Day + ", " + $Year + " " + $Hour + ":" + $Min + ":" + $Sec;
            });
            // At this point we have to convert the users offset to the recorded offset to set the date properly.
            dd = new Date(d);
            uoffset = dd.getTimezoneOffset();
            if (uoffset !== offset) {
                dd = new Date(dd.getTime() + (offset - uoffset) * 60000);
                dd.setMilliseconds(mil);
            }
            return dd;
        default:
            d = str.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/, function ($0, $Year, $Month, $Day, $Hour, $Min, $Sec) {
                return MM[$Month - 1] + " " + $Day + ", " + $Year + " " + $Hour + ":" + $Min + ":" + $Sec;
            });
            dd = new Date(d);
            return dd;
    }
};


/**
 * Convert cmi timespan to SCORM2004 ISODuration.
 * @param {type} timespan
 * @returns {Number} - duration
 */
Util.CMITimespanToISODuration = function (timespan) {
    var duration = moment.duration(timespan);
    var centisecs = Math.floor(duration.asMilliseconds() / 10);
    var isoDuration = Util.CentisecsToISODuration(centisecs);
    return isoDuration;
};

///////////////////////////////////////////////////////////////////////////////

var ds = {};
ds.utils = {};

/**
 * Allows us to extend and chain class methods, without overwriting base method functionality.
 * When called, the original base method is called first, then new code is executed. 
 * If a function returns a value, only the last chained method is respected.
 * @param {function} method Original method. 
 * @param {function} newMethod New method.
 * @returns {function} Newly composed function.
 */
ds.utils.ExtendMethod = function (method, newMethod) {
    if (!method) {
        return newMethod;
    }
    return function () {
        var retVal;
        if (method)
            retVal = method.apply(this, arguments);
        [].push.call(arguments, retVal);
        return newMethod && newMethod.apply(this, arguments);
    };
};
