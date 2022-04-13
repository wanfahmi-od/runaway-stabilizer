/**
 * SCORM 2004 API
 * Created and Modified with open sources from ADL, IMSGlobal, Claude Ostyn, Pipwerks, SCORM.com, StackOverflow, and Cybercussion Interactive LLC.
 * Creative Commons Attribution-ShareAlike 4.0 International License.
 * @class
 * @param {object} options - config options.
 */
function SCO_API_1484_11(options) {
    var that = this;
    this._className = "SCO_API_1484_11";

    var defaults = {
        version: "1.0.0",
        createdate: "01/01/2018 12:00AM",
        moddate: "01/01/2018 12:00AM",
        prefix: "SCO_API_1484_11",
        errorCode: 0,
        diagnostic: '',
        initialized: 0,
        terminated: 0,
        cmi: null,
        adl: null,
        // CMI is the Computer Managed Instruction object
        CMI: {
            _version: "Local SCORM2004 3rd Ed",
            comments_from_learner: {
                _children: "comment,location,timestamp",
                _count: "0"
            },
            comments_from_lms: {
                _children: "comment,location,timestamp",
                _count: "0"
            },
            completion_status: "unknown",
            completion_threshold: "0.7",
            credit: "no-credit",
            entry: "",
            exit: "",
            interactions: {
                _children: "id,type,objectives,timestamp,correct_responses,weighting,learner_response,result,latency,description",
                _count: "0"
            },
            launch_data: "", // default 
            learner_id: "",
            learner_name: "",
            learner_preference: {
                _children: "audio_level,language,delivery_speed,audio_captioning",
                audio_level: "1",
                language: "",
                delivery_speed: "1",
                audio_captioning: "0"
            },
            location: "",
            max_time_allowed: "", // PT26.4S for 26.4 Seconds
            mode: "normal",
            objectives: {
                _children: "id,score,success_status,completion_status,description",
                _count: "0"
            },
            progress_measure: "",
            scaled_passing_score: "0.7",
            score: {
                _children: "scaled,raw,min,max",
                scaled: "",
                raw: "",
                min: "",
                max: ""
            },
            session_time: "PT0H0M0S",
            success_status: "",
            suspend_data: "",
            time_limit_action: "", // exit, no message or continue, message etc ...
            total_time: "PT0H0M0S"
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

        completion_status = "|completed|incomplete|not attempted|unknown|",
        read_only = "|_version|completion_threshold|credit|entry|launch_data|learner_id|learner_name|_children|_count|mode|maximum_time_allowed|scaled_passing_score|time_limit_action|total_time|comment|",
        write_only = "|exit|session_time|",

        exit = "|time-out|suspend|logout|normal||",
        nav_states = "|_none_|continue|previous|choice|exit|exitAll|abandon|abandonAll|suspendAll";

    var errors = {
        0: "No error",
        101: "General exception",
        102: "General Initialization Failure",
        103: "Already Initialized",
        104: "Content Instance Terminated",
        111: "General Termination Failure",
        112: "Termination Before Initialization",
        113: "Termination After Termination",
        122: "Retrieve Data Before Initialization",
        123: "Retrieve Data After Termination",
        132: "Store Data Before Initialization",
        133: "Store Data After Termination",
        142: "Commit Before Initialization",
        143: "Commit After Termination",
        201: "General Argument Error",
        301: "General Get Failure",
        351: "General Set Failure",
        391: "General Commit Failure",
        401: "Undefined Data Model",
        402: "Unimplemented Data Model Element",
        403: "Data Model Element Value Not Initialized",
        404: "Data Model Element Is Read Only",
        405: "Data Model Element Is Write Only",
        406: "Data Model Element Type Mismatch",
        407: "Data Model Element Value Out Of Range",
        408: "Data Model Dependency Not Established"
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
    this.Initialize = function () {
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
    this.GetValue = function (key) {
        settings.errorCode = 0;
        var r = "false",
            k = key.toString(), // ensure string
            tiers = [];
        if (this.isRunning()) {
            if (isWriteOnly(k)) {
                settings.errorCode = 405;
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
        settings.errorCode = 123;
        return r;
    };

    /**
     * Set value (SCORM)
     * @param {String} key - key
     * @param {String} value - value
     * @returns {String} "true" or "" depending on if its been initialized prior
     */
    this.SetValue = function (key, value) {
        settings.errorCode = 0;
        var tiers = [],
            k = key.toString(), // ensure string
            v = value.toString(), // ensure string
            z = 0,
            count = 0,
            arr = [];
        if (this.isRunning()) {
            if (isReadOnly(k)) {
                settings.errorCode = 404;
                settings.diagnostic = "This namespace is read-only.";
                return "false";
            }
            tiers = k.split(".");
            switch (tiers[0]) {
                case "cmi":
                    switch (key) {
                        case "cmi.location":
                            break;
                        case "cmi.completion_status":
                            if (completion_status.indexOf('|' + v + '|') === -1) {
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
                                    settings.errorCode = "404";
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
                                                timestamp: "",
                                                weighting: "",
                                                learner_response: "",
                                                result: "",
                                                latency: "",
                                                description: ""
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
                                                    settings.errorCode = "351";
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
                                                settings.errorCode = "351";
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
                                            settings.errorCode = "408";
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
                    if (key.indexOf('adl.nav.request_valid.choice') >= 0) {
                        settings.errorCode = "404";
                        settings.diagnostic = "The requested namespace is read-only.";
                        return 'false';
                    }
                    switch (key) {
                        case "adl.nav.request":
                            if (nav_states.indexOf('|' + v + '|') === -1) {
                                settings.errorCode = "406";
                                settings.diagnostic = "The requested namespace value did not match any allowed states.";
                                return 'false';
                            }
                            break;
                        case "adl.nav.request_valid.continue":
                        case "adl.nav.request_valid.previous":
                            settings.errorCode = "404";
                            settings.diagnostic = "The requested namespace is read-only.";
                            return 'false';
                        default:
                            if (tiers[1] !== "nav") {
                                settings.errorCode = "351";
                                settings.diagnostic = "The requested namespace does not exist.";
                                return 'false';
                            }
                            break;
                    }
                    setData(k.substr(4, k.length), v, adl);
                    break;
            }
            return "true";
        }
        // Determine Error Code
        if (settings.terminated) {
            settings.errorCode = 133;
        } else {
            settings.errorCode = 132;
        }
        return "false";
    };

    /**
     * Commit (SCORM)
     * Typically empty, I'm unaware of anyone ever passing anything.
     * @returns {String} "true" or "false"
     */
    this.Commit = function () {
        SCOUtil.triggerEvent(that, 'StoreData', {
            name: 'StoreData',
            runtimedata: cmi,
            sequence: adl
        });
        return 'true';
    };

    /**
     * Terminate (SCORM)
     * @returns {String} -
     */
    this.Terminate = function () {
        settings.terminated = 1;
        settings.initialized = 0;
        return 'true';
    };


    /**
     * GetErrorString (SCORM) - Returns the error string from the associated Number
     * @param {string} param - error code
     * @returns {string} - error string
     */
    this.GetErrorString = function (param) {
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
    this.GetLastError = function () {
        return settings.errorCode;
    };

    /**
     * Get Diagnostic
     * This would return further information from the lms about a error
     * @returns {String} description of error in more detail
     */
    this.GetDiagnostic = function () {
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
        settings.errorCode = 406;
        return 'false';
    }

    /**
     * Throw Unimplemented Error
     * 402 data model doesn't exist yet.
     * @param {String} key - key
     * @returns {String} 'false'
     */
    function throwUnimplemented(key) {
        settings.errorCode = 402;
        settings.diagnostic = 'The value for key ' + key + ' has not been created yet.';
        return 'false';
    }


    function throwArgumentError(key) {
        settings.errorCode = 201;
        settings.diagnostic = 'The value for key ' + key + ' must be a proper element.';
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
        settings.errorCode = "351";
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
                throwArgumentError(key);
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
                    throwArgumentError(key);
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
        switch (key) {
            //Write Only
            case "cmi.exit":
            case "cmi.session_time":
                settings.errorCode = 405;
                settings.diagnostic = "Sorry, this has been specified as a read-only value for " + key;
                break;
            default:
                r = getData(key.substr(4, key.length), cmi);
                // Filter
                if (r === 'undefined') {
                    settings.errorCode = 401;
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
                settings.errorCode = 401;
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
        if (tiers[1] === 'comments_from_learner') { // Condition where comment in this case is allowed.
            return false;
        }
        return read_only.indexOf('|' + v + '|') >= 0;
    }

    /**
     * Is Write Only?
     * @param {String} key -
     * @returns {Boolean} true or false
     */
    function isWriteOnly(key) {
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