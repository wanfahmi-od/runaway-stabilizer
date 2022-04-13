/*!
 * SCORM Adapter v1.0.7268.25341
 * 2018 Copyright - Pelesys Learning Systems Inc. - All Rights Reserved 
 */

/**
 * Runtime controller for web-based training content communication with CrewPad Manager.
 * @class
 * @param {object} options - config options.
 */
function RuntimeController(options) {
    var that = this;
    this._className = "RuntimeController";

    //default options
    var opts = {
        src: "", //content src
        crewpad: null,
        learningSessionData: "",
        onCommit: function () { },
        onTerminated: function () { }
    };

    $.extend(true, opts, options);

    //map options to properties
    this.src = opts.src;
    this.crewpad = opts.crewpad;
    this.learningSessionData = new LearningSessionModel(opts.learningSessionData);
    this.onCommit = opts.onCommit;
    this.onTerminated = opts.onTerminated;

    //-------------------------------------------------------------------------       
    //#region API

    //api runtime object
    this.apiRuntime = null;

    /**
     * Initialize the global api runtime that content will try to connect to.
     */
    this.InitAPIRuntime = function () {
        var standard = (that.learningSessionData.standard || "").toLowerCase();
        //Note - LMS available types are: None, AICC, File-Based, File-Based/AICC, SCORM, SCORM2004
        //not all are handled

        var apiRuntimeClass = RuntimeController._apiRuntimeControllers[standard];
        if (!apiRuntimeClass) {
            this.ShowErrorMessage("error: module type '" + type + "' is not recognized.");
        } else {

            this.apiRuntime = new apiRuntimeClass({
                learningSessionData: that.learningSessionData,
                onCommit: that.onCommit,
                onTerminated: that.onTerminated,
                debug: this._cpd_debug
            });
            this.apiRuntime.Init();
        }
    };

    //#endregion
    //-------------------------------------------------------------------------       
    //#region Content

    /**
     * Initialize the content frame.
     */
    this.InitContent = function () {
        var $iframe = $("#contentFrame");

        $iframe.on("load", function () {
            //content patches
            that.PatchStoryline($iframe);
        });

        $iframe.attr("src", this.src);
    };

    /**
     * Patch storyline content
     * @param {jquery} $iframe - content frame
     */
    this.PatchStoryline = function ($iframe) {
        //Fix for resume buttons touch on UWP/Edge
        if (window.navigator.userAgent.indexOf("Edge") > -1) {
            $iframe.contents().find("head").append($("<style type='text/css'>.is-desktop .slide-object-button-text { pointer-events: none !important;</style >"));
        }
    };

    //#endregion
    //-------------------------------------------------------------------------       
    //#region UI

    /**
     * Initialize the UI.
     */
    this.InitUI = function () {
        this.EnableDebug(this._cpd_debug);
    };

    /**
     * Hide the content container.
     */
    this.HideContentUI = function () {
        $("#contentContainer").hide();
    };

    /**
     * Show the toolbar.
     */
    this.ShowToolbar = function () {
        $("#overlayBtn").hide();
        $("#toolbar").show();
        $("#contentoverlay").show();
    };

    /**
     * Hide the toolbar.
     */
    this.HideToolbar = function () {
        $("#overlayBtn").show();
        $("#toolbar").hide();
        $("#contentoverlay").hide();
    };

    /**
     * Show the saving overlay.
     */
    this.ShowSavingOverlay = function () {
        $("#savingoverlay").show();
    };

    /**
     * Show the saving message.
     */
    this.ShowSavingMessage = function () {
        $("#savingMessage").show();
    };

    /**
     * We can pass additional settings to the adapter through launch data.
     * @param {string} launchData - same as core vendor.
     */
    this.ProcessOptionsFromLaunchData = function (launchData) {
        var obj = {};

        if (launchData) {
            var newline = String.fromCharCode(13) + String.fromCharCode(10);
            var launchData_arr = launchData.split(newline);

            var s, s1, s2;
            var arr;

            for (var i = 0; i < launchData_arr.length; i++) {
                s = launchData_arr[i].trim();
                arr = s.split("=");
                if (arr[0]) {
                    s1 = arr[0].toLowerCase().trim();
                    s2 = (arr[1] || "").trim();
                    obj[s1] = s2;
                }
            }
        }

        this._cpd_debug = obj.cpd_debug === "true" ? true : false;
    };

    /**
     * Resize.
     */
    this.Resize = function () {
        //nothing todo
    };

    //#endregion
    //-------------------------------------------------------------------------       
    //#region Initialization

    /**
     * Init the controller.
     */
    this.Init = function () {
        this.ProcessOptionsFromLaunchData(this.learningSessionData.launchData);
        this.InitAPIRuntime();
        this.InitUI();
        this.InitContent();
        this.InitEventHandlers();
        this.InitGlobalVariables();
    };

    /**
     * Init event handlers.
     */
    this.InitEventHandlers = function () {
        $(window).on("unload", function () {
            that.UnloadContent();
        });

        $(window).on('resize', function () {
            that.Resize();
        });

        //$(window).on('orientationchange', function() {
        //that.Resize();
        //});

        $("#contentoverlay").on("click", function () {
            that.HideToolbar();
        });

        $("#overlayBtn").on("click", function () {
            that.ShowToolbar();
        });

        $("#hideToolbarBtn").on("click", function () {
            that.HideToolbar();
        });

        $("#forceQuitBtn").on("click", function () {
            that.ConfirmForceQuit();
        });

        $("#toolbarlogo").on("click", function () {
            that.GClick();
        });
    };

    /**
     * Init global variables.
     */
    this.InitGlobalVariables = function () {
        window["crewpad"] = this.crewpad;
    };

    //#endregion
    //-------------------------------------------------------------------------       
    //#region Debug

    this._cpd_debug = false;

    this._gClicks = 0;
    this._gTimeout = null;

    /**
     * Hidden feauture to show debug view when clicking on the logo logo 11 times.
     */
    this.GClick = function () {
        if (that._gClicks === 0) {
            that._gTimeout = setTimeout(function () {
                that._gTimeout = null;
                that._gClicks = 0;
            }, 8000);
        }
        if (that._gClicks >= 15) {
            that._gClicks = 0;
            //Toggle debug                
            that.EnableDebug(!that._cpd_debug);
        } else {
            that._gClicks++;
        }
    };

    /**
     * Enable debug.
     * @param {boolean} flag - if debug is on or off.
     */
    this.EnableDebug = function (flag) {
        that._cpd_debug = flag;
        if (flag) {
            $("body").addClass("debug");
        } else {
            $("body").removeClass("debug");
        }
        this.apiRuntime && this.apiRuntime.EnableDebug(flag);
    };

    //#endregion
    //-------------------------------------------------------------------------       
    //#region Exit

    /**
     * Confirm force quitting of the content.
     */
    this.ConfirmForceQuit = function () {
        bootbox.confirm({
            message: "'Force quit' will attempt to save your progress and return you back to CrewPad. Use this if your course doesn't have an exit action or if your course becomes unresponsive. Do you wish to force quit the course?",
            buttons: {
                confirm: {
                    label: "OK"
                },
                cancel: {
                    label: "Cancel"
                }
            },
            callback: function (result) {
                if (result) {
                    that.ForceQuit();
                }
            }
        });
    };

    /**
     * Force quit the content.
     */
    this.ForceQuit = function () {
        that.UnloadContent();
        that.ShowSavingOverlay();
        //show the saving message if things take a bit longer.
        setTimeout(function () {
            if (!that.apiRuntime._isTerminated) {
                that.ShowSavingMessage();
            }
        }, 800);
        //timecheck to see if the content called terminate when it unloaded.
        setTimeout(function () {
            if (!that.apiRuntime._isTerminated) {
                //Manually call terminate.
                that.apiRuntime.Terminate();
            }
        }, 3000);
    };

    /**
     * Unload the content.
     */
    this.UnloadContent = function () {
        //navigate to a blank iframe page to try and trigger the content to unload.
        $("#contentFrame").attr("src", "about:blank");
    };

    //#endregion
}

///////////////////////////////////////////////////////////////////////////////
//Debug

/**
 * No Console
 * Lack of support in older browsers forced this
 * @param {String} msg - Debug Message
 * @param {*} lvl - 1=Error, 2=Warning, 3=Log, 4=Info
 * @event debug fired when no console is available.  You could listen to this to put it in an alternative log.
 */
RuntimeController.noconsole = function (msg, lvl) {
    // ignore (IE 8 and prior or other browser that doesn't support it).  Routing event out so it can be handled.    
    SCOUtil.triggerEvent(that, debug, { msg: msg, lvl: lvl });
};

/**
 * Debug to the debugcontainer.
 * @param {String} msg - Debug Message
 * @param {Number} lvl - 1=Error, 2=Warning, 3=Log, 4=Info
 * @returns {boolean} - if successful.
 */
RuntimeController.debug = function (msg, lvl) {
    var $cnt = $("#debugContainer");

    if (!window.console) {
        // IE 7 probably 6 was throwing a error if 'console undefined'
        window.console = {};
        window.console.info = RuntimeController.noconsole;
        window.console.log = RuntimeController.noconsole;
        window.console.warn = RuntimeController.noconsole;
        window.console.error = RuntimeController.noconsole;
        window.console.trace = RuntimeController.noconsole;
    }
    switch (lvl) {
        case 1:
            //console.error(msg);
            $('<div class="sco error">' + msg + '</div>').appendTo($cnt);
            break;
        case 2:
            //console.warn(msg);
            $('<div class="sco warn">' + msg + '</div>').appendTo($cnt);
            break;
        case 4:
            //console.info(msg);
            $('<div class="sco info">' + msg + '</div>').appendTo($cnt);
            break;
        case 3:
            //console.log(msg);
            $('<div class="sco">' + msg + '</div>').appendTo($cnt);
            break;
        default:
            //console.log(msg);
            $('<div class="sco">' + msg + '</div>').appendTo($cnt);
            return false;
    }
    return true;
};

RuntimeController.error = {
    0: "No Error",
    404: "Not Found",
    405: "Prevented on a read only resource"
};

/**
 * Trigger Warning (internal to this API)
 * Throws a console log when a SCORM API Error occurs
 * @param {number} n - error index code.
 * @returns {Boolean} - 
 */
RuntimeController.triggerWarning = function (n) {
    RuntimeController.debug(RuntimeController.error[n], 2);
    return true;
};

/**
 * Trigger Exception
 * @param {string} msg - exception message.
 */
RuntimeController.triggerException = function (msg) {
    //$(that).triggerHandler({
    SCOUtil.triggerEvent(that, 'exception', {
        //'type':  'exception',
        'error': msg
    });
};


///////////////////////////////////////////////////////////////////////////////
//#region Module Registration

RuntimeController._apiRuntimeControllers = {};

/**
 * Register.
 * @param {string} name - Name of class.
 * @param {APIRuntimeBase} controllerClass - Controller class that extends {APIRuntimeBase}.
 */
RuntimeController.RegisterAPIRuntimeController = function (name, controllerClass) {
    if (!RuntimeController._apiRuntimeControllers[name]) {
        RuntimeController._apiRuntimeControllers[name] = controllerClass;
    }
};

//#endregion