/**
 * SCORM 1.2 API
 * Created and Modified with open sources from ADL, IMSGlobal, Claude Ostyn, Pipwerks, SCORM.com, StackOverflow, and Cybercussion Interactive LLC.
 * Creative Commons Attribution-ShareAlike 4.0 International License.
 * @class
 * @param {object} options - config options.
 */
function SCO_API(options) {
    var that = this;
    this._className = "SCO_API";

    var defaults = {
        version: "1.0.0",
        createdate: "01/01/2018 12:00AM",
        moddate: "01/01/2018 12:00AM",
        prefix: "SCO_API",
        errorCode: 0,
        diagnostic: '',
        initialized: 0,
        terminated: 0,
        cmi: null,
        adl: null,
        // CMI is the Computer Managed Instruction object
        CMI: {
            _version: "Local SCORM1.2",
            core: {
                _children: "student_id,student_name,lesson_location,credit,lesson_status,entry,score,total_time,exit,session_time",
                student_id: "",
                student_name: "",
                lesson_location: "",
                credit: "no-credit",
                lesson_status: "not attempted",
                entry: "",
                score: {
                    _children: "raw,min,max",
                    raw: "",
                    min: "",
                    max: ""
                },
                total_time: "00:00:00",
                exit: "",
                session_time: "00:00:00",
                lesson_mode: "normal",
            },
            suspend_data: "",
            launch_data: "", // default 
            comments: "",
            comments_from_lms: "",
            student_data: {
                _children: " mastery_score, time_limit_action, max_time_allowed",
                mastery_score: "",
                time_limit_action: "",
                max_time_allowed: ""
            },

            objectives: {
                _children: "id,score,status",
                _count: "0"
            },

            student_preference: {
                _children: "audio,language,speed,text",
                audio: "1",
                language: "",
                speed: "1",
                text: "0"
            },

            interactions: {
                _children: "id,type,objectives,time,correct_responses,weighting,student_response,result,latency",
                _count: "0"
            }
        },
        ADL: {
            // crewpad doesn't need ADL
            nav: {
                request: "_none_",
                request_valid: {
                    choice: {},
                    continue: "false",
                    previous: "false"
                }
            }
        }
    };

    // Settings merged with defaults and extended options */
    var settings = $.extend(true, {}, defaults, options);

    var cmi = {},
        adl = {},
        lesson_status = "|completed|incomplete|not attempted|passed|failed|browsed|",
        read_only = "|_version|credit|entry|launch_data|student_id|student_name|_children|_count|lesson_mode|max_time_allowed|comments_from_lms|time_limit_action|total_time|comment|mastery_score|",
        write_only = "|exit|session_time|",

        exit = "|time-out|suspend|logout|normal||",
        nav_states = "|_none_|continue|previous|choice|exit|exitAll|abandon|abandonAll|suspendAll";

    var errors = {
        0: "No error",
        101: "General exception",
        201: "Invalid argument error",
        202: "Element cannot have children",
        203: "Element not any array. Cannot have count",
        301: "Not initialized",
        401: "Not implemented error",
        402: "Invalid set value, element is a keyword",
        403: "Element is read only",
        404: "Element is write only",
        405: "Incorrect Data Type"
    };

    SCO_APIBase.call(this, settings);

    //-------------------------------------------------------------------------
    //#region Public 

    /**
     * isRunning, Returns true if initialized is 1 and terminated is 0
     * @returns {Boolean} true or false
     */
    this.isRunning = function () {
        return settings.initialized === 1 && settings.terminated === 0;
    };

    /**
     * Initialize Session (SCORM) only once!
     * @returns {String} "true" or "false" depending on if its been initialized prior
     */
    this.LMSInitialize = function () {
        // Computer Managed Instruction
        //if (settings.cmi !== null) {
        //    cmi = settings.cmi;
        //    checkExitType();
        //} else {
        //    cmi = settings.CMI;
        //}

        //let's extend instead
        $.extend(true, cmi, settings.CMI);
        $.extend(true, cmi, settings.cmi);

        // ADL - Sequence and Navigation
        if (settings.adl !== null) {
            adl = settings.adl;
        } else {
            adl = settings.ADL;
        }
        // Clean CMI Object
        settings.initialized = 1;
        settings.terminated = 0;
        return 'true';
    };

    /**
     * GetValue (SCORM)
     * @param {String} key - key
     * @returns {String} "true" or "false" depending on if its been initialized prior
     */
    this.LMSGetValue = function (key) {
        settings.errorCode = 0;
        var r = "false",
            k = key.toString(), // ensure string
            tiers = [];
        if (this.isRunning()) {
            if (isWriteOnly(k)) {
                settings.errorCode = 404;
                return "false";
            }
            tiers = k.toLowerCase().split(".");
            switch (tiers[0]) {
                case "cmi":
                    r = cmiGetValue(k);
                    break;
                case "ssp":
                    break;
                case "adl":
                    r = adlGetValue(k);
                    break;
            }
            return r;
        }
        settings.errorCode = 401;
        return r;
    };

    /**
     * Set value (SCORM)
     * @param {String} key - key
     * @param {String} value - value
     * @returns {String} "true" or "" depending on if its been initialized prior
     */
    this.LMSSetValue = function (key, value) {
        settings.errorCode = 0;
        var tiers = [],
            k = key.toString(), // ensure string
            v = value.toString(), // ensure string
            z = 0,
            count = 0,
            arr = [];
        if (this.isRunning()) {
            if (isReadOnly(k)) {
                settings.errorCode = 403;
                settings.diagnostic = "This namespace is read-only.";
                return "false";
            }
            tiers = k.split(".");
            switch (tiers[0]) {
                case "cmi":
                    switch (key) {
                        case "cmi.location":
                            break;
                        case "cmi.core.lesson_status":
                            if (lesson_status.indexOf('|' + v + '|') === -1) {
                                // Invalid value
                                return throwVocabError(key, v);
                            }
                            break;
                        case "cmi.exit":
                            if (exit.indexOf('|' + v + '|') === -1) {
                                // Invalid value
                                return throwVocabError(key, v);
                            }
                            break;
                        default:
                            // Need to dig into some of these lower level values
                            switch (tiers[1]) {
                                case "comments_from_lms":
                                    settings.errorCode = 403;
                                    settings.diagnostic = "The cmi.comments_from_lms element is entirely read only.";
                                    return 'false';
                                case "comments_from_learner":
                                    // Validate
                                    if (cmi.comments_from_learner._children.indexOf(tiers[3]) === -1) {
                                        return throwVocabError(key, v);
                                    }
                                    setData(k.substr(4, k.length), v, cmi);
                                    cmi.comments_from_learner._count = (getObjLength(cmi.comments_from_learner) - 2).toString(); // Why -1?  _count and _children
                                    return 'true';
                                case "interactions":
                                    // Validate
                                    if (cmi.interactions._children.indexOf(tiers[3]) === -1) {
                                        return throwVocabError(key, v);
                                    }
                                    cmi.interactions._count = (getObjLength(cmi.interactions) - 2).toString(); // Why -2?  _count and _children
                                    // Check interactions.n.objectives._count
                                    // This one is tricky because if a id is added at tier[3] this means the objective count needs to increase for this interaction.
                                    // Interactions array values may not exist yet, which is why its important to build these out ahead of time.
                                    // this should work (Subtract _count, and _children)
                                    if (isNaN(parseInt(tiers[2], 10))) {
                                        return 'false';
                                    }

                                    //Construct interaction object
                                    var strIndex = tiers[2];
                                    // Interactions uses objectives and correct_responses that need to be constructed.
                                    // Legal build of interaction array item
                                    if (!Util.isPlainObject(cmi.interactions[strIndex])) {
                                        if (tiers[3] === "id") {
                                            cmi.interactions[strIndex] = {
                                                id: "",
                                                type: "",
                                                time: "",
                                                weighting: "",
                                                student_response: "",
                                                result: "",
                                                latency: ""
                                            };
                                            setData(k.substr(4, k.length), v, cmi);
                                            cmi.interactions._count = (getObjLength(cmi.interactions) - 2).toString(); // Why -2?  _count and _children
                                            if (!Util.isPlainObject(cmi.interactions[strIndex].objectives)) {
                                                // Setup Objectives for the first time
                                                cmi.interactions[strIndex].objectives = {};
                                                cmi.interactions[strIndex].objectives._count = "0";
                                            }
                                            // Wait, before you go trying set a count on a undefined object, lets make sure it exists...
                                            if (!Util.isPlainObject(cmi.interactions[strIndex].correct_responses)) {
                                                // Setup correct_responses for the first time
                                                cmi.interactions[strIndex].correct_responses = {};
                                                cmi.interactions[strIndex].correct_responses._count = "0";
                                            }
                                            return 'true';
                                        }
                                        return 'false';
                                        // throw error code
                                    }
                                    // Manage Objectives
                                    if (tiers[3] === 'objectives') { // cmi.interactions.n.objectives
                                        // Objectives require a unique ID
                                        if (tiers[5] === "id") {
                                            var o = cmi.interactions[tiers[2]].objectives;
                                            count = parseInt(o._count, 10);
                                            z = count;
                                            while (z < count) {
                                                if (o[z].id === v) {
                                                    settings.errorCode = "402";
                                                    settings.diagnostic = "The objectives.id element must be unique.  The value '" + v + "' has already been set in objective #" + z;
                                                    return throwGeneralSetError(key, v, z);
                                                }
                                                z++;
                                            }
                                        } else {
                                            return throwVocabError(key, v);
                                        }
                                        if (!Util.isPlainObject(o[tiers[4]])) {
                                            count = parseInt(o._count, 10);
                                            o[tiers[4]] = {
                                                id: ""
                                            };
                                            o._count = (getObjLength(o) - 1).toString();
                                        }
                                        setData(k.substr(4, k.length), v, cmi);
                                        //o._count = (getObjLength(o) - 1).toString(); // Why -1?  _count
                                        return 'true';
                                    }
                                    // Manage Correct Responses
                                    if (tiers[3] === 'correct_responses') { // cmi.interactions.n.correct_responses
                                        var cr = cmi.interactions[strIndex].correct_responses;
                                        if (!Util.isPlainObject(cr[tiers[4]])) {
                                            count = parseInt(cr._count, 10);
                                            cr[tiers[4]] = {
                                                pattern: ""
                                            };
                                            cr._count = (getObjLength(cr) - 1).toString();
                                        }
                                    }
                                    setData(k.substr(4, k.length), v, cmi);
                                    cmi.interactions._count = (getObjLength(cmi.interactions) - 2).toString(); // Why -2?  _count and _children
                                    return 'true';
                                //break;
                                case "objectives":
                                    // Objectives require a unique ID, which to me contradicts journaling
                                    if (tiers[3] === "id") {
                                        count = parseInt(cmi.objectives._count, 10);
                                        //for (z = 0; z < count; z += 1) {
                                        while (z < count) {
                                            if (cmi.objectives[z].id === v) {
                                                settings.errorCode = 402;
                                                settings.diagnostic = "The objectives.id element must be unique.  The value '" + v + "' has already been set in objective #" + z;
                                                return 'false';
                                            }
                                            z += 1;
                                        }
                                    }
                                    // End Unique ID Check
                                    // Now Verify the objective in question even has a ID yet, if not throw error.
                                    if (tiers[3] !== "id") {
                                        arr = parseInt(tiers[2], 10);
                                        if (cmi.objectives[arr] === undefined) {
                                            settings.errorCode = 408;
                                            settings.diagnostic = "The objectives.id element must be set before other elements can be set";
                                            return 'false';
                                        }
                                    }
                                    // END ID Check
                                    if (isNaN(parseInt(tiers[2], 10))) {
                                        return 'false';
                                        // throw error code
                                    }
                                    setData(k.substr(4, k.length), v, cmi);
                                    cmi.objectives._count = (getObjLength(cmi.objectives) - 2).toString(); // Why -2?  _count and _children
                                    return 'true';
                            }
                            break;
                    }
                    // Rip off 'cmi.' before we add this to the model
                    setData(k.substr(4, k.length), v, cmi);
                    break;
                // crewpad doesn't need ADL
                case "ssp":
                    break;
                case "adl":
                    break;
            }
            return "true";
        }
        // Determine Error Code
        if (settings.terminated) {
            settings.errorCode = 101;
        } else {
            settings.errorCode = 301;
        }
        return "false";
    };

    /**
     * Commit (SCORM)
     * Typically empty, I'm unaware of anyone ever passing anything.
     * @returns {String} "true" or "false"
     */
    this.LMSCommit = function () {
        SCOUtil.triggerEvent(that, 'StoreData', {
            name: 'StoreData',
            runtimedata: cmi,
            sequence: adl
        });
        return 'true';
    };

    /**
     * LMSFinish (SCORM)
     * @returns {String} -
     */
    this.LMSFinish = function () {

        settings.terminated = 1;
        settings.initialized = 0;
        return 'true';
    };


    /**
     * GetErrorString (SCORM) - Returns the error string from the associated Number
     * @param {string} param - error code
     * @returns {string} - error string
     */
    this.LMSGetErrorString = function (param) {
        if (param !== "") {
            var nparam = parseInt(param, 10);
            if (errors[nparam] !== undefined) {
                return errors[nparam];
            }
        }
        return "";
    };

    /**
     * GetLastError (SCORM) - Returns the error number from the last error
     * @returns {Number} - last error.
     */
    this.LMSGetLastError = function () {
        return settings.errorCode;
    };

    /**
     * Get Diagnostic
     * This would return further information from the lms about a error
     * @returns {String} description of error in more detail
     */
    this.LMSGetDiagnostic = function () {
        return settings.diagnostic;
    };

    /**
     * Returns a CMI object.
     * @returns {Object} - cmi object.
     */
    this.GetCMI = function () {
        if (settings.initialized || settings.terminated) {
            return cmi;
        } else {
            //return a newly created cmi object
            var newCMI = {};
            $.extend(true, newCMI, settings.CMI);
            $.extend(true, newCMI, settings.cmi);
            return newCMI;
        }
    };

    //#endregion
    //-------------------------------------------------------------------------
    //#region Private 

    /**
     * Throw Vocabulary Error
     * This sets the errorCode and Diagnostic for the key and value attempted.
     * @param {String} k key
     * @param {String} v value
     * @returns {String} 'false'
     */
    function throwVocabError(k, v) {
        settings.diganostic = "The " + k + " of " + v + " must be a proper vocabulary element.";
        settings.errorCode = 405;
        return 'false';
    }

    /**
     * Throw Unimplemented Error
     * 201 data model doesn't exist yet.
     * @param {String} key - key
     * @returns {String} 'false'
     */
    function throwUnimplemented(key) {
        settings.errorCode = 201;
        settings.diagnostic = 'The value for key ' + key + ' has not been created yet.';
        return 'false';
    }

    /**
     * Throw General Set Error
     * @param {String} k key
     * @param {String} v value
     * @param {String} o optional
     * @returns {String} 'false'
     */
    function throwGeneralSetError(k, v, o) {
        settings.errorCode = 402;
        settings.diagnostic = "The " + k + " element must be unique.  The value '" + v + "' has already been set in #" + o;
        return 'false';
    }

    /**
     * Set Data (Private)
     * @param {String} key Location of value in object
     * @param {String} val Value of the Key
     * @param {Object} obj Object to search and set
     */
    function setData(key, val, obj) {
        //if (!obj) { obj = data;} //outside (non-recursive) call, use "data" as our base object
        var ka = key.split(/\./);
        //split the key by the dots
        if (ka.length < 2) {
            if (obj[ka[0]] == undefined) {
                throwUnimplemented(key);
            } else {
                obj[ka[0]] = val;
            }
            //only one part (no dots) in key, just set value
        } else {
            if (!obj[ka[0]]) {
                obj[ka[0]] = {};
            }
            //create our "new" base obj if it doesn't exist
            obj = obj[ka.shift()];
            //remove the new "base" obj from string array, and hold actual object for recursive call
            setData(ka.join("."), val, obj);
            //join the remaining parts back up with dots, and recursively set data on our new "base" obj
        }
    }

    /**
     * Get Data (Private)
     * @param {String} key Location of value in object
     * @param {Object} obj Object to search
     * @returns {String}
     */

    function getData(key, obj) {
        //if (!obj) { obj = data;} //outside (non-recursive) call, use "data" as our base object
        var ka = key.split(/\./), v;
        //split the key by the dots
        if (ka.length < 2) {
            try {
                if (obj[ka[0]] == undefined) {
                    throwUnimplemented(key);
                } else {
                    return obj[ka[0]];
                }
            } catch (e) {
                throwUnimplemented(key);
                return 'false';
            }

        } else {
            v = ka.shift();
            if (obj[v]) {
                return String(getData(ka.join("."), obj[v])); // just in case its undefined
            }
            return throwUnimplemented(key);

        }
    }

    /**
     * CMI Get Value (Private)
     * @param {String} key Location of value in object
     * @returns {String} -
     */
    function cmiGetValue(key) {
        var r = "false";
        if (key.indexOf("cmi.interactions") > 0 && (key.indexOf("id") > 0 || key.indexOf("time") > 0 || key.indexOf("type") > 0 || key.indexOf("pattern") > 0 || key.indexOf("weighting") > 0 || key.indexOf("student_response") > 0 || key.indexOf("result") > 0 || key.indexOf("latency") > 0)) {
            //Write Only
            settings.errorCode = 404;
            settings.diagnostic = "Sorry, this has been specified as a read-only value for " + key;
            return r;
        }
        switch (key) {
            //Write Only
            case "cmi.exit":
            case "cmi.session_time":
                settings.errorCode = 404;
                settings.diagnostic = "Sorry, this has been specified as a read-only value for " + key;
                break;
            default:
                r = getData(key.substr(4, key.length), cmi);
                // Filter
                if (r === 'undefined') {
                    settings.errorCode = 405;
                    settings.diagnostic = "Sorry, there was a undefined response from " + key;
                    r = "false";
                }
                break;
        }
        return r;
    }

    /**
     * ADL Get Value (Private CrewPad doesn't need this!!) 
     * This covers the ADL Sequence and Navigation object present in SCORM 2004
     * @param {String} key -
     * @returns {String} -
     */
    function adlGetValue(key) {
        var r = "false";
        // 
        if (key.indexOf('adl.nav.request_valid.choice') >= 0) {
            settings.errorCode = 301;
        } else {
            r = getData(key.substr(4, key.length), adl);
            // Filter
            if (r === 'undefined') {
                settings.errorCode = 405;
                settings.diagnostic = "Sorry, there was a undefined response from " + key;
                r = "false";
            }
        }
        return r;
    }

    /**
     * Is Read Only?
     * @param {String} key like cmi.location
     * @returns {Boolean} true or false
     */
    function isReadOnly(key) {
        // See note above about read-only
        var tiers = key.split('.'),
            v = tiers[tiers.length - 1]; // last value
        if (tiers[2] === "request_valid" || tiers[4] === 'id') {
            return true;
        }
        if (tiers[1] === 'comments_from_lms') {// entirely read only
            return true;
        }

        return read_only.indexOf('|' + v + '|') >= 0;
    }

    /**
     * Is Write Only?
     * @param {String} key -
     * @returns {Boolean} true or false
     */
    function isWriteOnly(key) {
        if (key.indexOf("cmi.interactions") > 0 && (key.indexOf("id") > 0 || key.indexOf("time") > 0 || key.indexOf("type") > 0 || key.indexOf("pattern") > 0 || key.indexOf("weighting") > 0 || key.indexOf("student_response") > 0 || key.indexOf("result") > 0 || key.indexOf("latency") > 0)) {
            //Write Only
            settings.errorCode = 404;
            settings.diagnostic = "Sorry, this has been specified as a read-only value for " + key;
            return true
        }
        var tiers = key.split("."),
            v = tiers[tiers.length - 1]; // last value
        return write_only.indexOf('|' + v + '|') >= 0;
    }

    /**
     * Get Object Length
     * @param {Object} obj -
     * @returns {Number} -
     */
    function getObjLength(obj) {
        var name,
            length = 0;
        for (name in obj) {
            if (obj.hasOwnProperty(name)) {
                length += 1;
            }
        }
        return length;
    }

    function checkExitType() {
        if (cmi.exit === "suspend") {
            cmi.entry = "resume";
        }
    }

    /**
     * Update Suspend Data Usage Statistics
     * Will update settings.suspend_date_usage with current % level
     * @returns {Number} -
     */
    function suspendDataUsageStatistic() {
        return SCOUtil.roundVal((cmi.suspend_data.length / 64000) * 100) + "%";
    }

    //#endregion
}