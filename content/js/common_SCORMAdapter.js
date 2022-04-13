//Common shared js file for the SCORM Adapter.

///////////////////////////////////////////////////////////////////////////////
//Mousetrap script

var newScript = document.createElement('script');
newScript.setAttribute('src', "../content/js/mousetrap.min.js"); // Relative to the SCORMAdapter folder
document.head.appendChild(newScript);

///////////////////////////////////////////////////////////////////////////////

/**
 * PlayerAPI controller class. Manages communication between the content and the player.
 * @class 
 */
function PlayerAPIController() {
    var that = this;
    this._parent = parent;
    this._prepDone = false;

    this._isDeveloperMode;
    this._version;
    this._pageData;
    this._orgData;
    this._cbtData;
    this._config;

    // Represents the initial width/height of the canvas as declared in the page HTML file before any scaling or resize is applied
    // Values are reset when a new PlayerAPIController is created on page load
    this.initialCanvasWidth;
    this.initialCanvasHeight;

    this.uuidv4 = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    this.pcbid = this.uuidv4();

    //Create a global reference to the parent page controller
    window["pageControllerAPI"] = null;

    /**
     * Message post.
     * @param {string} command
     * @param {object} data
     */
    this.PostMessage = function (command, data) {
        if (this._parent) {
            //in order to avoid data clone error
            var option = JSON.stringify({
                command: command,
                data: data,
                _from: "common",
                pcbid: that.pcbid
            });
            this._parent.postMessage(JSON.parse(option), "*");
        }
    };

    /**
     * Init data elements.
     */
    this.GetDataFromPlayer = function () {
        this.PostMessage("getCBTData");
        this.PostMessage("getOrganizationData");
        this.PostMessage("getPageData");
        this.PostMessage("getVersion");
        this.PostMessage("getIsDeveloperMode");
        this.PostMessage("getConfig");

        //check to see if data is loaded
        var intervalData = setInterval(function () {
            if (that._isDeveloperMode && that._version && that._pageData && that._orgData && that._cbtData && that._config) {
                clearInterval(intervalData);
                that._prepDone = true;
            }
        }, 200);
    };

    this.CanvasResize = function (frameWidth, frameHeight) {
        var frameRatio = frameWidth / frameHeight;
        $canvas = $("#canvas");
        var $canvasOuterContainer = $("#canvasOuterContainer");
        var canvasWidth = $canvas.width();
        var canvasHeight = $canvas.height();
        var canvasRatio = canvasWidth / canvasHeight;

        var scale = frameRatio > canvasRatio ? frameHeight / canvasHeight : frameWidth / canvasWidth;
        if (scale) {
            $canvas.width(scale * canvasWidth);
            $canvas.height(scale * canvasHeight);
            //calc margin to for the canvas
            var top = (frameHeight - scale * canvasHeight) / 2;
            if (top <= 0) {
                top = 0;
            }

            $canvasOuterContainer.css({
                'padding-top': top + "px",
                '-webkit-box-sizing': 'border-box',
                '-moz-box-sizing': 'border-box',
                'box-sizing': 'border-box'
            });
        }
    };

    this.CanvasQuality = function (quality, isMobile) {
        $canvas = $("#canvas");
        var stage = window.stage || {};

        if (quality === "auto") {
            if (isMobile) {
                quality = "med";
            } else {
                quality = "hi";
            }
        }

        switch (quality) {
            case "low":
                stage.scaleX = 0.64;
                stage.scaleY = 0.64;
                break;
            case "med":
                stage.scaleX = 1;
                stage.scaleY = 1;
                break;
            case "hi":
                stage.scaleX = 1.92;
                stage.scaleY = 1.92;
                break;
        }

        that.initialCanvasWidth = that.initialCanvasWidth || $canvas.width() || 1000;
        that.initialCanvasHeight = that.initialCanvasHeight || $canvas.height() || 550;

        $canvas.attr("width", that.initialCanvasWidth * stage.scaleX);
        $canvas.attr("height", that.initialCanvasHeight * stage.scaleY);
    };

    /**
     * Init message handling
     */
    this.InitMessageHandlers = function () {
        //message handlers from parent
        window.addEventListener("message", function (ev) {
            //don't listen to events from this window
            if (ev.source === window)
                return;


            var $canvas;
            var command = ev.data.command;
            var pcbid = ev.data.pcbid;

            //don't listen to pcbids if don't match
            if (pcbid !== that.pcbid) {
                //console.log("common: Wrong pcbid! " + command);
                return;
            }

            //console.log("Common: received from player: " + command);

            switch (command) {
                case "config":
                    that._config = JSON.parse(ev.data.data);
                    break;
                case "getCBTData":
                    that._cbtData = JSON.parse(ev.data.data);
                    break;
                case "getOrganizationData":
                    that._orgData = JSON.parse(ev.data.data);
                    break;
                case "getPageData":
                    that._pageData = JSON.parse(ev.data.data);
                    break;
                case "isDeveloperMode":
                    that._isDeveloperMode = ev.data;
                    break;
                case "canvasPageData":
                    that._pageData = JSON.parse(ev.data.data);
                    break;
                case "canvasResize":
                    that.CanvasResize(ev.data.data.frameWidth, ev.data.data.frameHeight);
                    break;
                case "initCanvasLayout":
                    that.CanvasQuality(ev.data.data.val, ev.data.data.isMobile);
                    that.CanvasResize(ev.data.data.frameWidth, ev.data.data.frameHeight);
                    that.PostMessage("canvasLayoutInitialized");
                    break;
                case "canvasStyle":
                    //restyle the canvas html
                    var $body = $("body, html");
                    $canvas = $("#canvas");

                    $body.css({
                        textAlign: "center",
                        margin: "0",
                        padding: "0",
                        "background-color": "transparent"
                    });
                    //hack: modify the iframe canvas style to blend it with the player.
                    //hack: Clicking the empty body will cause a grey flicker. To prevent, wrap the canvas with a div that covers the body.        
                    $canvas.css({
                        "background-color": "transparent",
                        "-webkit-tap-highlight-color": "transparent", //prevents grey flicker when tapping the canvas
                        "display": "block",
                        "margin-left": "auto",
                        "margin-right": "auto",
                        "padding": "0"
                    }).wrap('<div id="canvasOuterContainer" style="height: 100vh;"></div>');
                    break;
                case "canvasQuality":
                    that.CanvasQuality(ev.data.data.val, ev.data.data.isMobile);
                    break;
                case "canvasStart":
                    window['exportRoot'] && exportRoot.start();
                    break;
                case "canvasPlay":
                    that.SetAcrobatPDFReaderVisibility(true);
                    window['exportRoot'] && exportRoot.play();
                    break;
                case "canvasGotoAndPlay":
                    window['exportRoot'] && exportRoot.gotoAndPlay(ev.data.data);
                    break;
                case "canvasSpeed":
                    if (window["lib"]) {
                        var speed = ev.data.data;
                        //set dynamic ticker rate
                        if (speed !== 1 && window["lib"]) {
                            lib.properties.fps *= speed;
                        }
                    }
                    break;
                case "canvasStop":
                    that.SetAcrobatPDFReaderVisibility(false);
                    window['exportRoot'] && exportRoot.stop();
                    break;
                case "canvasShowProtection":
                    var protectionLayer = exportRoot && exportRoot.prot;
                    protectionLayer && (protectionLayer.visible = ev.data.data);
                    break;
                case "canvasOnBeforeUnload":
                    createjs && createjs.Ticker && createjs.Ticker.removeAllEventListeners && createjs.Ticker.removeAllEventListeners();
                    break;
                case "canvasUnload":
                    createjs.Ticker.removeAllEventListeners();
                    try {
                        $("body").cleanData();
                    } catch (e) {
                        //do nothing
                    }
                    break;
                case "keyboard":
                    //where is this?
                    break;
                case "keyboardf5":
                    Mousetrap.bind('f5', function () {
                        that.PostMessage("keyboardf5", true);
                    });
                    break;
                case "keyboardUnbindf5":
                    window['Mousetrap'] && Mousetrap.unbind('f5');
                    break;
                case "mouseMoveOn":
                    $(window).on("mousemove", that.ActivityHandler);
                    break;
                case "mouseMoveOff":
                    $(window).off("mousemove", that.ActivityHandler);
                    break;
                case "version":
                    that._version = ev.data.data;
                    break;
                default:
                    console.log("Common: Unknown message received from player: " + command);
                    break;
            }
        }, false);
    };

    this.SetAcrobatPDFReaderVisibility = function (isVisible) {
        var browserUserAgent = window.navigator.userAgent;
        var isIE = /MSIE|Trident/.test(browserUserAgent);
        if (isIE) {
            $("#contentFrame").contents().find("#OLEMediaPreview").css({
                "visibility": isVisible ? "visible" : "hidden"
            });
        }
    };

    /**
     * User activity handler, mouse movement.
     */
    this.ActivityHandler = function () {
        that.PostMessage("mouseMove");
    };

    this.IndexInParent = function (itemModel) {
        if (itemModel) {
            var parentId = itemModel.parentId;
            var parent = this._orgData.fullItemsDict[parentId];
            if (parent) {
                var index = parent.items.indexOf(itemModel);
                return index;
            }
        }
        return null;
    };

    this.IsItemEnabled = function (itemModel) {
        if (!itemModel)
            return false;
        //check fast advance
        if (that._config.fastAdvance)
            return true;

        //start item is always enabled
        if (itemModel.id === that._config.startPageId)
            return true;

        //check item completed
        if (itemModel.completed)
            return true;

        var index;
        var prev;
        var parentId = itemModel.parentId;

        if (parentId) {
            var parent = that._orgData.fullItemsDict[parentId];
            index = that.IndexInParent(itemModel);
            if (parent && index !== null) {
                //check if first child of enabled item
                if (index === 0 && that.IsItemEnabled(parent)) {
                    return true;
                }
                //check if the "prev" item is enabled
                prev = parent.items()[index - 1];
                if (prev && prev.completed) {
                    return true;
                }
            }
        } else {
            //this is root level. The parent is currentOrg().items
            index = that._orgData.items.indexOf(itemModel);
            for (var i = 0; i < that._orgData.items.length; i++) {
                if (that._orgData.items[i].id === itemModel.id) {
                    index = i;
                }
            }
            //first and second items always enabled
            if (index === 0 || index === 1) {
                return true;
            }
            prev = that._orgData.items[index - 1];
            if (prev && prev.completed) {
                return true;
            }
        }

        return false;
    };
    /**
     * Init the API interface for content to communicate up to the player.
     */
    this.InitAPIInterfaceForContent = function () {
        //create a new parent! We'll need to hijack any calls made by the content to parent.pageControllerAPI.
        parent = {};

        parent.pageControllerAPI = {
            //base apis below
            exit: function () {
                that.PostMessage("exit");
            },
            getCBTData: function () {
                return that._cbtData;
            },
            getOrganizationData: function () {
                return that._orgData;
            },
            getNewCompletionObject: function () {
                //No longer supported, return null.
                return null;
            },
            getPageData: function () {
                return that._pageData;
            },
            getVersion: function () {
                return that._version;
            },
            isItemEnabled: function (id) {
                var model = that._orgData.itemsDict[id];

                return that.IsItemEnabled(model);
            },
            isDeveloperMode: function () {
                return that._isDeveloperMode;
            },
            loadPageById: function (id) {
                that.PostMessage("loadPageById", id);
            },
            onBeforeInit: function () {
                that.PostMessage("onBeforeInit");

                //hook up to canvas iframeloaded event
                if (window["createjs"]) {
                    createjs.Ticker.addEventListener("iframeloaded", function () {
                        pageControllerAPI._OnBeforePageLoaded();
                    });
                }
            },
            pageLoaded: function () {
                that.PostMessage("pageLoaded");
            },
            setPageCompletion: function (flag) {
                that.PostMessage("setPageCompletion", flag);
            },
            showErrorMessage: function (options) {
                that.PostMessage("showErrorMessage", options);
            },
            showVideo: function (options) {
                that.PostMessage("showVideo", options);
            },
            showToast: function (options) {
                that.PostMessage("showToast", options);
            },
            showGlossary: function (options) {
                that.PostMessage("showGlossary", options);
            },
            //canvas apis below
            completeVision: function () {
                that.PostMessage("completeVision");
            },
            disableSectionSkip: function () {
                that.PostMessage("disableSectionSkip");
            },
            enableSectionSkip: function () {
                that.PostMessage("enableSectionSkip");
            },
            _OnBeforePageLoaded: function () {
                that.PostMessage("_OnBeforePageLoaded");
            },
            pauseAudio: function () {
                that.PostMessage("pauseAudio");
            },
            playAudioById: function (id, options) {
                if (options && options.onComplete) {
                    options.onComplete = String(options.onComplete);
                }

                that.PostMessage("playAudioById", {
                    id: id,
                    options: options
                });
            },
            playExternalAudio: function (id, options) {
                if (options && options.onComplete) {
                    options.onComplete = String(options.onComplete);
                }

                that.PostMessage("playExternalAudio", {
                    id: id,
                    options: options
                });
            },
            playSectionById: function (id) {
                that.PostMessage("playSectionById", id);
            },
            resumeAudio: function () {
                that.PostMessage("resumeAudio");
            },
            setPrivateData: function () {
                that.PostMessage("setPrivateData");
            },
            stopAudioById: function (id) {
                that.PostMessage("stopAudioById", id);
            },
            templateReady: function () {
                that.PostMessage("templateReady");
            },
            setContentContainerBackgroundColor: function (color) {
                that.PostMessage("setContentContainerBackgroundColor", color);
            }
        };

        pageControllerAPI = parent.pageControllerAPI;
    };

    /**
     * Initialize the controller.
     */
    this.Initialize = function () {
        this.GetDataFromPlayer();
        this.InitAPIInterfaceForContent();
        this.InitMessageHandlers();
    };
}

var playerAPIController = new PlayerAPIController();

if (!window["test"]) {
    playerAPIController.Initialize();
}

var _intervalPrep = setInterval(function () {
    if (playerAPIController._prepDone && window['$']) {
        clearInterval(_intervalPrep);
        $.holdReady(false);
    }
}, 200);

///////////////////////////////////////////////////////////////////////////////
//Common functions
var common = {};

///////////////////////////////////////////////////////////////////////////////
//Common drag utilities

common.Drag = {};

/**
 * Create a vertical drag object.
 * @param {object} options  - Options object.
 */
common.Drag.setVerticalDrag = function (options) {
    createjs.Touch.enable(stage);

    var target = options.target || stage;
    var yMax = options.yMax || options.target.y;
    var yMin = options.yMin || 0;

    var boxYPosition = yMax;
    var gap = 0;

    target.on("pressmove", function (evt) {
        evt.currentTarget.y = evt.stageY + gap;
        if (evt.currentTarget.y < yMin) {
            evt.currentTarget.y = yMin;
        }
        if (evt.currentTarget.y > yMax) {
            evt.currentTarget.y = yMax;
        }
    });

    target.on("pressup", function (evt) {
        boxYPosition = evt.currentTarget.y;
    });

    target.on("mousedown", function (evt) {
        gap = boxYPosition - evt.stageY;
    });
};