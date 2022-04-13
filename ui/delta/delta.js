/**
 * Delta UI Extension
 * @class
 */
function DeltaUIExt() {
    var that = this;

    this._skinName = "delta";

    //#region Course menu

    this.menu = null;

    /**
     * Show the course menu.
     */
    this.ShowMenu = function () {
        that.Pause();
        that.isCourseMenuItemsVisible(true);
        that.UpdateMenuCollapsedStates(that.currentPage());
        that.menu.open();
    };

    /**
     * Menu opened event handler.
     */
    this._OnMenuOpened = function () {
        //keyboard
        $("#search").focus();
        that.EnableKeyboards([that._courseMenuKeyboard]);
    };

    /**
     * Close the menu.
     */
    this.CloseMenu = function () {
        that.menu.close();
    };

    /**
     * Menu closed event handler.
     */
    this._OnMenuClosed = function () {
        that.ClearSelectedCourseItem();
        that.ClearCourseItemFilter();
        $("#search").blur();
        //keyboard
        that.EnableKeyboards([that._defaultKeyboard, that._frameKeyboard]);
        that.Play();
    };

    //#endregion
    //-------------------------------------------------------------------------
    //#region Course menu items

    /**
     * Update the menu collapsed states.
     * @param {CBTItemModel} itemModel - Item model.
     * @return {bool|null} - returns false if itemModel is null.
     */
    this.UpdateMenuCollapsedStates = function (itemModel) {
        if (!itemModel)
            return false;

        ko.utils.arrayForEach(that.currentOrg().topicsList(), function (topic) {
            topic.isItemsVisible(false);
        });

        //expand parents
        function expand(id) {
            if (id) {
                var topic = that.currentOrg().itemsDict()[id];
                if (topic) {
                    topic.isItemsVisible(true);
                    var parentId = topic.parentId;
                    if (parentId) {
                        expand(parentId);
                    }
                }
            }
        }
        expand(itemModel.parentId);

        //scroll to current
        var $elem = $("#menu .cmenu-item.isCurrent");
        if ($elem.length) {
            $elem.get(0).scrollIntoView(true);
        }
    };

    /**
     * Menu item click handler.
     * @param {type} item
     * @param {type} event
     */
    this.HandleMenuItemClick = function (item, event) {
        if (item.type === 'topic') {
            that.SelectCourseItem(item);
            that.CollapseItemGroup(item, event);
        } else {
            that.LoadPageFromNav(item, event);
        }
    };

    /**
     * Collapse given navigation element  
     * Should be passed the index from a knockout observable item
     * @param {CBTItemModel} topic - Topic model.
     * @param {event} event - click event.
     */
    this.CollapseItemGroup = function (topic, event) {
        topic.isItemsVisible(!topic.isItemsVisible());
    };

    /**
     * Get the inline item container style.
     * @param {CBTItemModel} item - Item model.
     * @returns {object} - object for style binding.
     */
    this.GetInlineMenuItemStyle = function (item) {
        //calc the depth
        var depth = 0;
        function Increment(item) {
            if (item && item.parentId) {
                depth += 1;
                var parent = that.currentOrg().itemsDict()[item.parentId];
                Increment(parent);
            }
        }
        Increment(item);

        return {
            "padding-left": (18 + depth * 15) + "px"
        };
    };

    /**
     * Get an items css class for the menu.
     * @param {CBTItemModel} item - Item model.
     * @returns {object} - object for style binding.
     */
    this.GetMenuItemCssClass = function (item) {
        var currentParent = that.currentTopic();
        var current = that.currentPage();
        var css = {
            'disabled': !that.IsItemEnabled(item),
            'isCurrent': (current && current.id === item.id) || (currentParent && currentParent.id === item.id),
            'cmenu-group': item.type === 'topic',
            'selected': item.selected()
        };
        return css;
    };

    /**
     * Get the item status css class.
     * @param {CBTItemModel} item - Item model.
     * @returns {string} - css class name.
     */
    this.GetItemStatusCssClass = function (item) {
        if (!item) {
            return;
        }
        if (item.visited() && !item.completed())
            return "incomplete";
        if (item.completed())
            return "passed";
        return "notstarted";
    };

    //#endregion
    //-------------------------------------------------------------------------
    //#region Options menu

    this.optionsMenu = null;

    /**
     * Show the options menu.
     */
    this.ShowOptionsMenu = function () {
        that.Pause();
        that.optionsMenu.open();
    };

    /**
     * Menu opened event handler.
     */
    this._OnOptionsMenuOpened = function () {
        $("#optionsClose").focus();
        //keyboard
        that.EnableKeyboards([that._optionsMenuKeyboard]);
    };

    /**
     * Close the options menu.
     */
    this.CloseOptionsMenu = function () {
        that.optionsMenu.close();
    };

    this.isOptionsMenuVisible = function () {
        return that.config.buttons.reference() || that.config.buttons.language() || that.config.buttons.comments();
    };

    /**
    * Menu closed event handler.
    */
    this._OnOptionsMenuClosed = function () {
        //keyboard
        that.EnableKeyboards([that._defaultKeyboard, that._frameKeyboard]);
        that.Play();
    };

    //#endregion
    //-------------------------------------------------------------------------
    //#region Progress

    this.isProgressMarkerVisible = ko.observable();

    this.fullItems = ko.pureComputed(function () {
        var list = that.currentOrg().itemsList();
        var temp = that.currentOrg().items();

        var pages = list.filter(function (item) {
            //can't be topic or mergedpages
            if (item.type === "topic" || item.type === "mergedpages")
                return false;
            return true;
        });
        return pages;
    });

    /**
     * Calculate the progress width for a single page.
     * @returns {type} 
     */
    this._GetProgressPageSegmentWidth = function () {
        //total width of the progress container
        var containerWidth = $("#progressContainer").width();
        //width of a topic status icon
        var topicWidth = 12;
        //calc width of a single page
        //total level 1 topic pages.
        var topTopics = that.currentOrg().items().filter(function (item) {
            return item.type === "topic";
        });
        //hack - exclude the menu page
        var pageWidth = (containerWidth - topicWidth * topTopics.length) / (that.fullItems().length - 1);
        return pageWidth;
    };

    /**
     * 
     * @param {type} item
     * @returns {type} 
     */
    this.GetProgressSegmentWidth = function (item) {
        //width of segment
        var segmentWidth = Math.floor(that._GetProgressPageSegmentWidth() * item.descendantPages().length);
        return segmentWidth;
    };

    /**
     * 
     * @param {type} item
     * @returns {type} 
     */
    this.GetProgressSegmentCompletedWidth = function (item) {
        //completed pages
        var completedPages = item.descendantPages().filter(function (item) {
            return item.completed();
        });
        //width of segment
        var segmentWidth = Math.floor(that._GetProgressPageSegmentWidth() * completedPages.length);

        return segmentWidth;
    };

    /**
     * Calc segment width of incomplete items.
     * @param {type} item
     */
    this.GetProgressSegmentIncompletedWidth = function (item) {
        var incompletePages = item.descendantPages().filter(function (item) {
            return (!item.completed() && item.visited());
        });
        //width of segment
        var segmentWidth = Math.floor(that._GetProgressPageSegmentWidth() * incompletePages.length);

        return segmentWidth;
    };

    /**
     * Get the progress marker position.
     * @param {type} item
     * @returns {type} 
     */
    this.GetProgressMarkerPosition = function (item) {
        var left = 0;
        if (!item)
            return;

        var parent;

        function processTopTopic(pid) {
            if (pid) {
                var topic = that.currentOrg().itemsDict()[pid];
                if (!topic.parentId) {
                    parent = topic;
                } else {
                    processTopTopic(topic.parentId);
                }
            }
        }

        //need to find the topmost parent topic
        processTopTopic(item.parentId);

        if (!parent) {
            that.isProgressMarkerVisible(false);
            return;
        } else {
            that.isProgressMarkerVisible(true);
        }

        var $elem = $("#progressContainer .progressSegment[pele-id='" + parent.id + "']");
        var pw = this._GetProgressPageSegmentWidth();
        if ($elem.length) {
            left = Math.floor($elem.position().left - 3 + (that.DescendantIndexInParent(item, parent) * pw) + pw);
        }

        return left + "px";
    };

    //#endregion
    //-------------------------------------------------------------------------
    //#region Resize

    /**
     * Resize the UI.
     */
    this.Resize = function () {
        if (that.isProgressActive()) {
            that.isProgressActive(false);
            that.isProgressActive(true);
        }

        //resize content inside the iframe
        that.pageController() && that.pageController().Resize();

        var left = $("#btnVolume").offset().left;
        $("#volumeControl").css("left", left);
    };

    /**
     * Return the height of the content container.
     * @returns {number} 
     */
    this.GetContentHeight = function () {
        var $container = $("#contentContainer");
        var frameHeight = that.audioTextEnabled() && that.pageController() && that.pageController().audioText() ? $container.height() - 100 : $container.height();
        return frameHeight;
    };

    //#endregion
    //-------------------------------------------------------------------------
    //#region Initialization

    /**
     * Init player UI.
     */
    this._InitUI = function () {
        var ls = document.createElement("link");
        ls.rel = "stylesheet";
        ls.href = "ui/delta/delta.css";
        document.getElementsByTagName("head")[0].appendChild(ls);

        that.InitElements();
        that.InitComponents();
        that.InitUIEventHandlers();
        that._uiInitialized = true;
    };

    /**
     * Init DOM elements.
     */
    this.InitElements = function () {
        $("#search").on("click", function (event) {
            that.ClearSelectedCourseItem();
            event.stopPropagation();
        });
    };

    /**
     * Init components.
     */
    this.InitComponents = function () {
        //Course menu
        that.menu = new Menu({
            id: 'menu',
            wrapper: '#outerContainer',
            type: 'slide-left',
            maskId: '#c-mask',
            onOpen: that._OnMenuOpened,
            onClose: that._OnMenuClosed
        });

        //Options menu
        that.optionsMenu = new Menu({
            id: 'optionsMenu',
            wrapper: '#outerContainer',
            type: 'slide-right',
            maskId: '#c-mask',
            onOpen: that._OnOptionsMenuOpened,
            onClose: that._OnOptionsMenuClosed
        });

        that.isProgressActive(that.config.buttons.progress());

        if (!that.isMobile()) {
            //volume slider            
            $("#volumeSlider").slider({
                reversed: true,
                tooltip: "hide",
                min: 0,
                max: 1,
                step: .01
            });

            $("#volumeSlider").slider() && $("#volumeSlider").slider().on("change", function (event) {
                var val = event.value;
                if (val.newValue !== 0) {
                    that.isMuted(false);
                }
                that.nonMutedVolumeLevel(val.newValue);
                that.volumeLevel(val.newValue);
            });
        }
    };

    /**
     * Init ui event handlers.
     */
    this.InitUIEventHandlers = function () {
        $(window).on('blur', function (e) {
            $("#btnVolume, #volumeControl").removeClass("active");
            $('.dropdown.open .dropdown-toggle').dropdown('toggle');
        });

        $(document).on('mousedown', function (event) {
            //hide the volume control
            if (!$(event.target).closest('#btnVolume, #volumeControl').length) {
                $("#btnVolume, #volumeControl").removeClass("active");
                $("#content-mask").hide();
            }
        });

        //prevent sticky active states on the buttons
        $(".navBtn").mouseup(function () {
            $(this).blur();
        });

        $("#btnVolume, #volumeControl").on("mouseenter", function () {
            $("#btnVolume, #volumeControl").addClass("show");
        });

        $("#btnVolume, #volumeControl").on("mouseleave", function () {
            $("#btnVolume, #volumeControl").removeClass("show");
        });

        //whenever the audio is toggled, keep the volume control visible
        $("#btnVolume, #volumeControl").on("mousedown", function () {
            $("#btnVolume, #volumeControl").addClass("active");
            $("#content-mask").show();
        });

        $("#optionsMenu .cmenu-item").on("click", function () {
            that.optionsMenu.close();
        });
    };
    //#endregion
    //-------------------------------------------------------------------------
}

///////////////////////////////////////////////////////////////////////////////
//register ui component

if (!ko.components.isRegistered('delta')) {
    ko.components.register('delta', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var player = params.model;
                player._InitUI();
                return player;
            }
        },
        template: { require: 'text!ui/delta/delta.html' }
    });
}

CBTPlayer.RegisterUserInterface('delta', DeltaUIExt);