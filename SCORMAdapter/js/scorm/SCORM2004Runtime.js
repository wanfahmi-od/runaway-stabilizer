/**
 * SCORM 2004 Runtime controller.
 * @class
 * @param {object} options - config options.
 */
function SCORM2004Runtime(options) {
    var that = this;
    var LOCAL_STORAGE_KEY = "sessionDataCache_sco2004";
    this._className = "SCORM2004Runtime";
    var debug = RuntimeController.debug;
    var opts = {};

    $.extend(true, opts, options);
    APIRuntimeBase.call(this, opts);

    //-------------------------------------------------------------------------
    //#region API interface

    this.Initialize = function (n) {
        return that.initialize(n);
    };

    this.GetValue = function (n) {
        return that.getvalue(n);
    };

    this.SetValue = function (n, v) {
        return that.setvalue(n, v);
    };

    this.Commit = function () {
        var response = that.commit();
        var currentLearningSession = that.GetLearningSessionData();
        that.onCommit(currentLearningSession);
        localStorage.setItem(currentLearningSession.lessonId, JSON.stringify(currentLearningSession));
        return response;
    };

    this.GetLastError = function () {
        var err = that.getLastError();
        return err.code.toString();
    };

    this.GetErrorString = function (n) {
        return that.getErrorString(n);
    };

    this.GetDiagnostic = function (n) {
        return that.getDiagnostic(n);
    };

    //
    this.Terminate = function (n) {
        var response = that.terminate(n);
        var learningSessionData = that.GetLearningSessionData();
        that.onTerminated(learningSessionData);
        that._isTerminated = true;
        localStorage.removeItem(learningSessionData.lessonId);
        return response;
    };

    //#endregion
    //-------------------------------------------------------------------------       
    //#region Abstract/Override Internal SCORM calls

    /**
     * Initialize (internal SCORM Call)
     * Initializes the SCO
     * @returns {String} 'true' or 'false'
     * @override
     */
    this.initialize = function () {
        debug("Initialize Called.", 3);
        var s = false,
            lms = this.API.path, // shortcut
            ec = 0;

        s = Util.makeBoolean(lms.Initialize(""));
        ec = this.getLastErrorCode();
        debug(s, 4);
        // Check for any errors previously
        if (s && ec === 0) {
            this.API.isActive = true;
            this.API.data.completion_status = that.getvalue('cmi.completion_status');
            this.settings.startDate = new Date(); // Need to set Start Date
            //that.setvalue('cmi.exit', this.settings.exit_type); // Consider setting exit type sooner by default?

            debug("SCO is initialized.", 3);
            switch (this.API.data.completion_status) {
                case "not attempted":
                case "unknown":
                    //not needed
                    //that.setvalue("cmi.completion_status", "incomplete");
                    break;
                default:
                    if (this.API.data.completion_status === '') {
                        triggerException("LMS compatibility issue, Please notify a administrator.  Completion Status is empty.");
                    }
                    break;
            }
            return 'true';
        }
        debug("Error\nError Code: " + ec + "\nError Message: " + this.getLastErrorMessage(ec) + " for Initialize.\nDiagnostic: " + this.getDiagnostic(ec), 1);
        return 'false';
    };

    /**
     * Get Value (internal SCORM Call)
     * Gets the cmi object value requested
     * @param {string} n - CMI Object Path as String
     * @returns {string} -
     * @event 'getvalue'
     * @override
     */
    this.getvalue = function (n) {
        var v = null,       // success
            lms = this.API.path,   // lms shortcut
            ec = 0,          // error code
            m = '',         // error message
            d = '',         // error diagnostic
            nn = null,       // new number
            tiers = [],
            ig = false;      // ignore

        v = lms.GetValue(n);
        ec = this.getLastErrorCode();
        m = this.getLastErrorMessage(ec);
        d = this.getDiagnostic(ec);
        // Clean up Error Codes that are non-critical (like date element not initialized)
        // Custom event Trigger getvalue
        //$(that).triggerHandler({
        SCOUtil.triggerEvent(that, 'getvalue', {
            //'type': "getvalue",
            'n': n,
            'v': v,
            'error': {
                'code': ec,
                'message': m,
                'diagnostic': d
            }
        });

        if (ec === 0 || ec === 403) {
            // Clean up differences in LMS responses
            if (v === 'undefined' || v === null || v === 'null') { // was typeof v
                v = "";
            }
            return String(v);
        }
        debug("Error\nError Code: " + ec + "\nError Message: " + m + "\nDiagnostic: " + d, 1);
        return 'false';
    };

    /**
     * Set Value (internal SCORM Call)
     * Sets the cmi object value by name
     * @param {String} n - CMI Object Path as String
     * @param {String} v - Value
     * @returns {String} -
     * @event 'setvalue'
     * @override
     */
    this.setvalue = function (n, v) {
        var s = 'false', // success
            lms = this.API.path, // lms shortcut
            ec = 0, // error code
            m = '', // error message
            d = '', // error diagnostic
            tiers = [],
            nn = null, // new number
            ig = false; // ignore

        if (this.API.isActive) {
            this.API.mode = this.API.mode === "" ? lms.GetValue('cmi.mode') : this.API.mode;
            switch (n) {
                case "cmi.location":
                    if (v.length > 1000) {
                        debug("Warning, your bookmark may be over the limit!!", 2);
                    }
                    break;
                case "cmi.completion_status":
                    this.API.data.completion_status = v;
                    // set local status
                    break;
                case "cmi.success_status":
                    this.API.data.success_status = v;
                    // set local status
                    break;
                case "cmi.exit":
                    this.API.data.exit_type = v;
                    // set local status
                    break;
                case "cmi.suspend_data":
                    if (v.length > 64000) {
                        debug("Warning, your suspend data may be over the limit!!", 2);
                    }
                    break;
                default:
                    // any other handling?
                    break;
            }
            s = lms.SetValue(n, v); //Util.makeBoolean(lms.SetValue(n, v));
            if (this.API.mode !== "normal") {
                debug("Warning, you are not in normal mode.  The LMS may ignore 'SetValue' requests.", 2);
            }

            ec = this.getLastErrorCode();
            m = this.getLastErrorMessage(ec);
            d = this.getDiagnostic(ec);
            // Custom Event Trigger setvalue
            //$(that).triggerHandler({
            SCOUtil.triggerEvent(that, 'setvalue', {
                //'type': "setvalue",
                'n': n,
                'v': v,
                'error': {
                    'code': ec,
                    'message': m,
                    'diagnostic': d
                }
            });
            // Ensure Error Codes not critical
            if (ec === 0 || ec === 403) {
                debug("SetValue " + n + " = " + v, 4);
                return s;
            }
            debug("Error\nError Code: " + ec + "\nError Message: " + this.getLastErrorMessage(ec) + " for " + n + "\nDiagnostic: " + this.getDiagnostic(ec), 1);
            return s;
        }
        debug(n + " Set Aborted, connection not initialized! Locate where you called it after you Terminated.", 2);
        return 'false';
    };

    /**
     * Commit (internal SCORM Call)
     * Commits the Data to the Server via the LMS API.  SCORM Time done by default.
     * @returns {String} 'true' or 'false'
     * @override
     */
    this.commit = function () {
        var s = 'false',
            lms = this.API.path,
            ec = 0;

        if (this.API.isActive) {
            debug("Committing data", 3);
            s = lms.Commit(""); //Util.makeBoolean(lms.Commit(""));
            ec = this.getLastErrorCode();
            if (ec === 0) {
                return s;
            }
            debug("Error\nError Code: " + ec + "\nError Message: " + this.getLastErrorMessage(ec) + " for Commit.\nDiagnostic: " + this.getDiagnostic(ec), 1);
            return 'false';
        }
        debug("Commit Aborted, connection not initialized!", 2);
        return 'false';
    };

    /**
     * Terminate (internal SCORM Call)
     * Terminates the SCO
     * @returns {Boolean} -
     * @override
     */
    this.terminate = function () {
        var s = false,
            lms = this.API.path,
            ec = 0;

        debug("Terminating " + this.API.isActive + " " + lms, 4);
        if (this.API.isActive) {
            if (lms) {
                // if not completed or passed, suspend the content.
                debug("completion_status = " + this.API.data.completion_status + "|| success_status = " + this.API.data.success_status, 3);
                that.commit(); // Store Data before Terminating (can't trust if LMS will do this)
                s = lms.Terminate("");
                if (Util.makeBoolean(s)) {
                    debug("Terminated.", 3);
                    SCOUtil.triggerEvent(that, 'terminated', {});
                    this.API.isActive = false;
                } else {
                    ec = this.getLastErrorCode();
                    debug("Error\nError Code: " + ec + "\nError Message: " + this.getLastErrorMessage(ec) + " for Commit.\nDiagnostic: " + this.getDiagnostic(ec), 1);
                }
            } else {
                debug("Lost connection to LMS", 2);
            }
        } else {
            debug("Terminate Aborted, connection not initialized!", 2);
        }
        return s;
    };

    /**
     * Get Last LMS Error Code
     * Error Code should be 0 if its anything else, a error has occurred
     * @returns {Number} -
     * @override
     */
    this.getLastErrorCode = function () {
        var lms = this.API.path,
            code = 0;

        code = parseInt(lms.GetLastError(), 10);
        return code;
    };

    /**
     * Get Last LMS Error Message
     * Error Message associated by error code
     * @param {Number} n error code
     * @returns {String} error message
     * @override
     */
    this.getLastErrorMessage = function (n) {
        var lms = this.API.path, // shortcut
            result = 'No LMS Connectivity';

        result = lms.GetErrorString(n.toString());
        return String(result);
    };

    /**
     *
     * @param {Number} n error code
     * @returns {String} diagnostic message
     * @override
     */
    this.getDiagnostic = function (n) {
        var lms = this.API.path, // shortcut
            result = 'No LMS Connectivity';

        result = lms.GetDiagnostic(n.toString());
        return String(result);
    };

    //#endregion
    //-------------------------------------------------------------------------
    //#region data mapping

    /**
     * Get learning session data
     * @returns {LearningSessionModel} learning data.
     * @override
     */
    this.GetLearningSessionData = function () {
        var cmi = this.GetCMI();

        //generate a copy of the learning data
        var learningSession = $.extend(true, {}, this.learningSessionData);
        learningSession.lessonLocation = cmi.location;
        learningSession.rawScore = cmi.score.raw;
        learningSession.suspendData = cmi.suspend_data;
        //convert isoduration to hhhh:mm:ss
        var duration = moment.duration(cmi.session_time);
        var centisecs = Math.floor(duration.asMilliseconds() / 10);
        var ft = Util.centisecsToLMSDuration(centisecs);
        learningSession.totalTime = ft; //todo: should be session time
        // SCORM -> AICC
        var lessonStatus = (cmi.success_status.toLowerCase() === "failed" || cmi.success_status.toLowerCase() === "passed") ? cmi.success_status.toLowerCase() : cmi.completion_status.toLowerCase();
        learningSession.lessonStatus = LessonStatusType[lessonStatus];

        return learningSession;
    };

    /**
    * Map learning session model to scorm 2004 cmi.
    * @param {LearningSessionModel} data - data.
    * @returns {object} CMI learning object.
    * @override 
    */
    this.MapLearningSessionToCMI = function (data) {
        data = data || {};
        var score_min = 0; //default
        var score_max = 100; //default
        var success_status = "unknown";
        var completion_status = "unknown";

        var totalTime = Util.CMITimespanToISODuration(data.totalTime);
        var maxTimeAllowed = Util.CMITimespanToISODuration(data.maxTimeAllowed);

        if (data.lessonStatus) {
            //"completed": "Completed",
            //"incomplete": "Incomplete",
            //"not attempted": "Not Attempted",
            //"unknown": "Unknown",
            //"failed": "Failed",
            //"passed": "Passed"
            switch (data.lessonStatus.toLowerCase()) {
                case "not attempted":
                    completion_status = "not attempted";
                    success_status = "unknown";
                    break;
                case "unknown":
                    completion_status = "unknown";
                    success_status = "unknown";
                    break;
                case "incomplete":
                    completion_status = "incomplete";
                    success_status = "unknown";
                    break;
                case "completed":
                    completion_status = "completed";
                    success_status = "unknown";
                    break;
                case "passed":
                case "failed":
                    completion_status = "completed";
                    success_status = data.lessonStatus.toLowerCase();
                    break;
            }
        }

        var cmi = {
            learner_id: data.learnerId,
            learner_name: data.learnerName,
            credit: data.credit,
            //entry: "ab-initio",
            //completion_threshold: "0.6",

            location: data.lessonLocation,
            max_time_allowed: maxTimeAllowed,
            mode: data.lessonMode,
            progress_measure: parseInt(data.masteryScore) / score_max,
            score: {
                //scaled: "1", //default 1
                raw: data.rawScore, //score  //injected
                min: score_min,
                max: score_max
            },
            // session_time: "PT0H0M0S",
            completion_status: completion_status,
            success_status: success_status,
            suspend_data: data.suspendData,
            launch_data: data.launchData,
            time_limit_action: data.timeLimitAction, // exit, no message or continue, message etc ...   //time_limit_action  //injected
            total_time: totalTime
        };

        return cmi;
    };

    //#endregion
    //-------------------------------------------------------------------------
    //#region SCORM Helpers

    /**
     * Get Objective By ID
     * This is fun, they make you go fish the objectives array integer by the ID.
     * Objectives do not appear to be 'journaled' as object identifiers have to be unique.
     * As this method is seeking information it may trigger SCORM Errors on the LMS that hint that
     * objects haven't been defined yet.  This is perfectly normal.
     * @param {*} id Alpha-Numeric Identification of the Interaction you're looking for
     * @returns {String} 'false' if nothing found or id
     */
    this.getObjectiveByID = function (id) {
        var count = that.getvalue("cmi.objectives._count"), // obtain total objectives
            i,
            tID;
        if (count === '' || count === 'false' || count === '-1') {
            return 'false';
        }
        count = parseInt(count, 10) - 1; // convert from string
        i = count;
        //for (i = count; i >= 0; i -= 1) {
        while (i >= 0) {
            tID = that.getvalue("cmi.objectives." + i + ".id");

            if (id === tID) {
                return i;
            }

            i -= 1;
        }
        return 'false';
    };

    /**
     * Get Interaction By ID
     * This is fun, they make you go fish the interactions array integer by the ID.
     * I included this in the main SCORM API because this functionality should be stock. 
     * You're either going to journal these (history) or treat them like states that you update.  You must decide that.
     * @param {*} id Alpha-Numeric Identification of the Interaction you're looking for
     * @returns {String} 'false' if nothing found or id
     */
    this.getInteractionByID = function (id) {
        var count = that.getvalue("cmi.interactions._count"), // obtain total objectives
            i,
            tID;

        if (count === "" || count === 'false' || count === '-1') {
            return 'false';
        }
        count = parseInt(count, 10) - 1; // convert from string
        i = count;
        //for (i = count; i >= 0; i -= 1) {
        while (i >= 0) {
            tID = this.getvalue("cmi.interactions." + i + ".id");
            if (id === tID) {
                return i;
            }
            i -= 1;
        }
        return 'false';
    };

    /**
     * Get interaction.n.objective By ID
     * You can have multiple objectives assigned to a interaction.
     * @param {Object} n -
     * @param {*} id Alpha-Numeric Identification of the Interaction you're looking for
     * @returns {String} 'false' if nothing found or ???
     */
    this.getInteractionObjectiveByID = function (n, id) {
        var count = that.getvalue("cmi.interactions." + n + ".objectives._count"), // obtain total objectives
            i,
            tID;
        if (count === "" || count === 'false') {
            return '0';
        }
        count = parseInt(count, 10) - 1; // convert from string
        i = count;
        //for (i = count; i >= 0; i -= 1) {
        while (i >= 0) {
            tID = that.getvalue("cmi.interactions." + n + ".objectives." + i + ".id");
            if (id === tID) {
                return i;
            }
            i -= 1;
        }
        return 'false';
    };

    //#endregion
    //-------------------------------------------------------------------------
    //#region Initialization

    /**
     * Init the runtime.
     * @override
     */
    this.Init = function () {
        var learningSessionData = JSON.parse(localStorage.getItem(this.learningSessionData.lessonId)) || this.learningSessionData;
        var cmi = this.MapLearningSessionToCMI(learningSessionData);

        //create the global API
        window["API_1484_11"] = this;

        this.init({
            time_type: 'UTC',
            exit_type: 'suspend',
            preferred_API: "findSCORM2004",
            cmi: cmi
        });

        this._isInitialized = true;
    };

    /**
     * Init the API.
     * @override
     */
    this.initAPI = function () {
        var learningSessionData = JSON.parse(localStorage.getItem(this.learningSessionData.lessonId)) || this.learningSessionData;
        var cmi = this.MapLearningSessionToCMI(learningSessionData);

        this.API.version = "2004";
        this.API.path = new SCO_API_1484_11({
            cmi: cmi
        });
    };

    //#endregion
}

//register
RuntimeController.RegisterAPIRuntimeController("scorm2004", SCORM2004Runtime);