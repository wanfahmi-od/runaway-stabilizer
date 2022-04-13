/**
 * Base class runtimes.
 * @param {object} options - config options.
 * @class
 * @abstract
 */
function APIRuntimeBase(options) {
    var that = this;
    var opts = {
        learningSessionData: {
            lessonId: 0
        },
        onCommit: function () { },
        onTerminated: function () { },
        debug: false
    };

    $.extend(true, opts, options);

    this.onCommit = opts.onCommit;
    this.onTerminated = opts.onTerminated;

    //flag for checking termination status
    this._isTerminated = false;

    //-------------------------------------------------------------------------       
    //#region Abstract/Override Internal SCORM calls

    /**
     * Initialize (internal SCORM Call)
     * Initializes the SCO
     * @returns {String} 'true' or 'false'
     * @abstract
     */
    this.initialize = function () { };

    /**
     * Get Value (internal SCORM Call)
     * Gets the cmi object value requested
     * @param {string} n - CMI Object Path as String
     * @returns {string} -
     * @event 'getvalue'
     * @abstract
     */
    this.getvalue = function (n) { };

    /**
     * Set Value (internal SCORM Call)
     * Sets the cmi object value by name
     * @param {String} n - CMI Object Path as String
     * @param {String} v - Value
     * @returns {String} -
     * @event 'setvalue'
     * @abstract
     */
    this.setvalue = function (n, v) { };

    /**
     * Commit (internal SCORM Call)
     * Commits the Data to the Server via the LMS API.  SCORM Time done by default.
     * @returns {String} 'true' or 'false'
     * @abstract
     */
    this.commit = function () { };

    /**
     * Terminate (internal SCORM Call)
     * Terminates the SCO
     * @returns {Boolean} -
     * @abstract
     */
    this.terminate = function () { };

    /**
     * Get Last LMS Error Code
     * Error Code should be 0 if its anything else, a error has occurred
     * @returns {Number} -
     * @abstract
     */
    this.getLastErrorCode = function () { };

    /**
     * Get Last LMS Error Message
     * Error Message associated by error code
     * @param {Number} n error code
     * @returns {String} error message
     * @abstract
     */
    this.getLastErrorMessage = function (n) { };

    /**
     *
     * @param {Number} n  error code
     * @returns {String} diagnostic message
     * @abstract
     */
    this.getDiagnostic = function (n) { };

    //#endregion
    //-------------------------------------------------------------------------
    //#region data mapping

    this.learningSessionData = opts.learningSessionData;

    /**
     * Get learning session data
     * @returns {LearningSessionModel} learning data.
     * @abstract
     */
    this.GetLearningSessionData = function () { };

    /**
    * Map learning session model to scorm 1.2 cmi.
    * @param {LearningSessionModel} data - data.
    * @returns {object} CMI learning object.
    * @abstract
    */
    this.MapLearningSessionToCMI = function (data) { };

    /**
     * Get the CMI data object.
     * @returns {type} -
     */
    this.GetCMI = function () {
        return this.API.path.GetCMI();
    };

    //#endregion
    //-------------------------------------------------------------------------
    //#region Debug

    this.debug = opts.debug;
    //link debug
    var debug = RuntimeController.debug;
    var triggerWarning = RuntimeController.triggerWarning;

    /**
     * Enable debug.
     * @param {boolean} flag - if debug is on or off.
     */
    this.EnableDebug = function (flag) {
        this.debug = flag;
    };

    /**
     * Get Last Error (Internal API)
     * Converts error integer to Message String
     * @returns {object}
     * {
     *   code: {number},
     *   msg: {string},
     *   diag: {string}
     * }
     */
    this.getLastError = function () {
        var ec = this.getLastErrorCode();
        return {
            code: ec,
            msg: this.getLastErrorMessage(ec),
            diag: this.getDiagnostic(ec)
        };
    };

    this.getErrorString = function (n) {
        return this.getLastErrorMessage(n);
    };

    //#endregion
    //-------------------------------------------------------------------------
    //#region Initialization

    //flag for checking initialization
    this._isInitialized = false;

    var defaults = {
        version: "1.0",
        isActive: false,
        api: null,
        preferred_API: "findAPI",    // findAPI, findSCORM2004, findSCORM12
        exit_type: "suspend",    // suspend, finish, or "" (undetermined)
        success_status: "unknown",    // passed, failed, unknown
        completion_status: "not attempted", // completed, incomplete, unknown
        time_type: "UTC",        //  GMT (pre 1972) vs UTC (post 1972) Time 
        cmi: null
    };

    this.settings;
    this.API;

    /**
     * Init the runtime.
     * @abstract
     */
    this.Init = function () { };

    /**
     * Initializes the SCORM API, and locates the LMS API
     * @param {object} options - config options for the API.
     * @returns {Boolean} -
     */
    this.init = function (options) {
        // Settings merged with defaults and extended options
        this.settings = $.extend(true, {}, defaults, options);

        // API Object
        this.API = {
            connection: false,
            version: "none", // 2004, 1.2 or none 
            mode: "",
            path: null, // Set Path to LMS API
            data: {
                completion_status: this.settings.completion_status,
                success_status: this.settings.success_status,
                exit_type: this.settings.exit_type
            },
            isActive: this.settings.isActive  // If SCO is initialized already, this was added for a page by page concept where pages unload and load.
        };

        // Internal API Error Boolean, Error Code object
        var isError = 0;
        
        // Set some more 'settings'
        this.settings.startDate = {}; // Set on Success of Initialize aka "the start time"

        // Create Local API
        this.initAPI();

        // Add 'StoreData' listener to rebroadcast
        SCOUtil.addEvent(this.API.path, 'StoreData', function (e) {
            SCOUtil.triggerEvent(that, 'StoreData', e);
        });

        //expose private vars for testing
        this._defaults = defaults;

        return true;
    };

    /**
     * Init the API.
     * @abstract
     */
    this.initAPI = function () { };

    //#endregion
    //-------------------------------------------------------------------------       
    //OLD migration

    /**
     * Set (Internal API)
     * This locally sets values local to this API
     * @param {string} n name
     * @param {string} v value
     * @returns {boolean} -
     */
    this.set = function (n, v) {
        debug("set " + n, 3);
        // May need to maintain read-only perms here, case them out as needed.
        switch (n) {
            case "version":
            case "prefix":
                triggerWarning(405);
                return false;
            //break;
            case "isActive":
                this.API.isActive = v;
                settings[n] = v;
                break;
            case "startDate":
                settings[n] = new Date(v);
                // Need to set Start Date if forcing isActive!
                break;
            default:
                settings[n] = v;
                break;
        }
        return (isError !== 0);
    };

    /**
     * Get (Internal API)
     * This locally gets values local to this API
     * @param {String} n  name
     * @returns {*} value or {Boolean} false
     */
    this.get = function (n) {
        debug("get " + n, 3);
        if (settings[n] === undefined) {
            triggerWarning(404);
            return false;
        }
        return settings[n];
    };    
}