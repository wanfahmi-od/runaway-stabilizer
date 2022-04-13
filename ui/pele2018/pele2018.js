/**
 * Pele2018 UI Extension
 * @class
 */
function Pele2018UIExt() {
    var that = this;

    this._skinName = "pele2018";

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
        ls.href = "ui/pele2018/pele2018.css";
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

if (!ko.components.isRegistered('pele2018')) {
    ko.components.register('pele2018', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var player = params.model;
                player._InitUI();
                return player;
            }
        },
        template: "<div id=\"outerContainer\">\r\n    <div id=\"wrapper\" class=\"cmenu-o-wrapper\">\r\n        <div id=\"controlbarTop\" class=\"container-fluid\" data-bind=\"css: { \'hasProgress\': currentOrg() && isProgressActive() }\">\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-11 no-horizontal-space-left\" style=\"height: 50px;\">\r\n                    <button class=\"navBtn glyphicon glyphicon-menu-hamburger\" id=\"btnCourseNav\" data-bind=\"click: ShowMenu, attr: { \'title\': lang().dict.menu }\"><\/button>\r\n                    <div id=\"menu\" class=\"cmenu cmenu-slide-left\">\r\n                        <div class=\"cmenu-close\" id=\"menuClose\" data-bind=\"click: CloseMenu\">\r\n                            <span class=\"glyphicon glyphicon-chevron-left pull-right\"><\/span>\r\n                            <span data-bind=\"text: lang().dict.menu\"><\/span>\r\n                            <input type=\"text\" class=\"form-control input-sm\" name=\"search\" id=\"search\" data-bind=\"textInput: currentOrg().itemsFilter, event: { keyup: OnSearchKeyup}, visible: enableDevControls\" placeholder=\"search\">\r\n                        <\/div>\r\n                        <div class=\"cmenu-items\" data-bind=\"if: isCourseMenuItemsVisible\">\r\n                            <!-- ko if: !currentOrg().itemsFilter() -->\r\n                                <!-- ko template: { name: \'recursiveNavTemplate\', data: currentOrg } --><!-- \/ko -->\r\n                            <!-- \/ko -->\r\n                            <!-- ko if: currentOrg().itemsFilter() -->\r\n                            <div data-bind=\"foreach: currentOrg().filteredItemsList()\">\r\n                                <div class=\"cmenu-item\" data-bind=\"attr: {\'data-id\': id }, click: $root.HandleMenuItemClick, style: $root.GetInlineMenuItemStyle($data), css: $root.GetMenuItemCssClass($data), setFocus: $data\">\r\n                                    <!-- ko template: { name: \'filteredItemTemplate\' } --><!-- \/ko -->\r\n                                <\/div>\r\n                            <\/div>\r\n                            <!-- \/ko -->\r\n                        <\/div>\r\n                        <script type=\"text\/html\" id=\"recursiveNavTemplate\">\r\n                            <div data-bind=\"foreach: items\">\r\n                                <div class=\"cmenu-item\" data-bind=\"attr: {\'data-id\': id }, click: $root.HandleMenuItemClick, style: $root.GetInlineMenuItemStyle($data), css: $root.GetMenuItemCssClass($data), setFocus: $data\">\r\n                                    <!-- ko if: type === \'topic\' -->\r\n                                    <span class=\"collapse-icon glyphicon\" data-bind=\"css: { \'glyphicon-menu-right\': !isItemsVisible(), \'glyphicon-menu-down\': isItemsVisible }\"><\/span>\r\n                                    <!-- \/ko -->\r\n                                    <!-- ko template: { name: \'itemTemplate\' } --><!-- \/ko -->\r\n                                <\/div>\r\n                                <div class=\"cmenu-collapse-cnt in\" data-bind=\"if: type === \'topic\' && items().length > 0 && isItemsVisible()\">\r\n                                    <!-- ko template: { name: \'recursiveNavTemplate\' } --><!-- \/ko -->\r\n                                <\/div>\r\n                            <\/div>\r\n                        <\/script>\r\n                        <script type=\"text\/html\" id=\"itemTemplate\">\r\n                            <span class=\"icon-status bordered\" data-bind=\"attr: { \'title\': $root.GetItemStatusTooltip($data) }, css: $root.GetItemStatusCssClass($data), click: $root._DevCycleStatus\"><\/span>\r\n                            <span class=\"item-text\">\r\n                                <span class=\"text-dev\" data-bind=\"if: $root.enableDevControls\">\r\n                                    <span data-bind=\"text: $index() + 1\"><\/span> -\r\n                                    <span data-bind=\"text: id\"><\/span> -\r\n                                <\/span>\r\n                                <span class=\"title\" data-bind=\"text: title\"><\/span>\r\n                            <\/span>\r\n                        <\/script>\r\n                        <script type=\"text\/html\" id=\"filteredItemTemplate\">\r\n                            <span class=\"icon-status bordered\" data-bind=\"attr: { \'title\': $root.GetItemStatusTooltip($data) }, css: $root.GetItemStatusCssClass($data), click: $root._DevCycleStatus\"><\/span>\r\n                            <span class=\"item-text\">\r\n                                <span class=\"text-dev\" data-bind=\"if: $root.enableDevControls\">\r\n                                    <span data-bind=\"text: id\"><\/span> -\r\n                                <\/span>\r\n                                <span class=\"title\" data-bind=\"text: title\"><\/span>\r\n                            <\/span>\r\n                        <\/script>\r\n                    <\/div>\r\n                    <button class=\"navBtn glyphicon peleicon icon-progress\" id=\"btnProgress\" data-bind=\"visible: config.buttons.progress, click: ToggleProgress, attr: { \'title\': \'Toggle progress\' }, css: { \'on\': isProgressActive}\"><\/button>\r\n                    <!--ko if: currentOrg() && isProgressActive()-->\r\n                    <div id=\"progressContainer\">\r\n                        <!--ko foreach: currentOrg().topicsList--><div class=\"progressSegment\" data-bind=\"style: { width: $root.GetProgressSegmentWidth($data) + \'px\' }, attr: { \'pele-id\' : id }\"><div class=\"progressSegmentInner\"><div class=\"progressSegmentCompleted\" data-bind=\"style: { width: $root.GetProgressSegmentCompletedWidth($data) + \'px\'}\"><\/div><div class=\"progressSegmentIncomplete\" data-bind=\"style: { width: $root.GetProgressSegmentIncompletedWidth($data) + \'px\'}\"><\/div><\/div><\/div><div class=\"progressTopic\">\r\n                            <span class=\"icon-status\" data-bind=\"attr: { \'title\': title }, css: $root.GetItemStatusCssClass($data)\"><\/span>\r\n                        <\/div><!-- \/ko -->\r\n                        <!--ko if: $root.GetCurrentPage() -->\r\n                        <div id=\"progressMarker\" data-bind=\"attr: { \'title\': GetCurrentPage().title }, style: { left: $root.GetProgressMarkerPosition(GetCurrentPage()) }\"><\/div>\r\n                        <!-- \/ko -->\r\n                    <\/div>\r\n                    <!-- \/ko -->\r\n                    <!--ko if: currentPageIndex() && !isProgressActive()-->\r\n                    <span id=\"pageIndex\" class=\"navText\">\r\n                        <span data-bind=\"text: currentPageIndex\"><\/span>\/<span data-bind=\"text: numParentItemPages\"><\/span>\r\n                    <\/span>\r\n                    <!-- \/ko -->\r\n                    <span id=\"currentPageInfo\" data-bind=\"if: GetCurrentPage\">\r\n                        <span class=\"icon-status\" data-bind=\"attr: { \'title\': GetItemStatusTooltip(GetCurrentPage()) }, css: GetItemStatusCssClass(GetCurrentPage())\"><\/span>\r\n                        <span class=\"navText pageTitle\">\r\n                            <span class=\"text-dev\" data-bind=\"visible: enableDevControls, text: GetCurrentPage().id + \' - \'\"><\/span>\r\n                            <span data-bind=\"attr: { \'title\': GetCurrentPage().title }, text: GetCurrentPage().title\"><\/span>\r\n                        <\/span>\r\n                    <\/span>\r\n                <\/div>\r\n                <div class=\"col-xs-1 text-right no-horizontal-space\">\r\n                    <button id=\"btnExit\" class=\"navBtn\" data-bind=\"attr: { \'title\': lang().dict.exit }, click: ClosePlayer\"><span class=\"icon-close\">&times;<\/span><\/button>\r\n                <\/div>\r\n            <\/div>\r\n        <\/div>\r\n        <div id=\"contentContainer\" data-bind=\"css: { hasAudioText: audioTextEnabled() && audioText() }\">\r\n            <!-- iframe gets dynamically injected here. -->\r\n            <div id=\"audioTextContainer\" class=\"container\">\r\n                <div class=\"row\" style=\"height: 100%;\">\r\n                    <div class=\"col-md-12\" style=\"height: 100%; padding: 5px;\">\r\n                        <div class=\"well text-center no-vertical-space\">\r\n                            <div class=\"pull-right\">\r\n                                <span id=\"transcriptBtn\" class=\"fas fa-file-alt\" data-bind=\"attr: { \'title\': lang().dict.transcript }, click: ShowTranscript\"><\/span>\r\n                            <\/div>\r\n                            <span data-bind=\"html: audioText\"><\/span>\r\n                        <\/div>\r\n                    <\/div>\r\n                <\/div>\r\n            <\/div>\r\n            <div id=\"contentLoader\" style=\"display: none;\" data-bind=\"visible: isLoadingPage\">\r\n                <div id=\"contentLoaderInner\">\r\n                    <div class=\"spinner\"><\/div>\r\n                <\/div>\r\n            <\/div>\r\n            <div id=\"toasts\"><\/div>\r\n            <div id=\"devToolbar\"><\/div>\r\n            <span id=\"devIcon\" class=\"fas fa-cogs\" style=\"display: none;\" data-bind=\"visible: config.developerMode, click: ToggleDevControls\"><\/span>\r\n            <div id=\"content-mask\" style=\"display:none;\"><\/div>\r\n        <\/div>\r\n        <div id=\"controlbarBtm\" class=\"container-fluid no-select\">\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-3 no-horizontal-space\">\r\n                    <!--ko if: config.logoPath-->\r\n                    <img class=\"customLogo\" data-bind=\"attr: {\'src\': config.logoPath, \'title\': lang().dict.returnToHomePage }, click: LoadDefaultPage\" \/>\r\n                    <!--\/ko-->\r\n                <\/div>\r\n                <div class=\"col-xs-6 text-center no-horizontal-space\">\r\n                    <button class=\"navBtn glyphicon glyphicon-chevron-left\" data-bind=\"attr: { \'title\': PreviousPageTooltip() }, enable: canPlayPreviousPage, click: PlayPreviousPage\"><\/button><button class=\"navBtn glyphicon glyphicon-backward\" data-bind=\"visible: config.buttons.sections, enable: canPlayPreviousSection, click: LoadPreviousSection\"><\/button>\r\n                    <!--ko if: isPlaybackVisible-->\r\n                    <button class=\"navBtn glyphicon glyphicon-play\" style=\"display: none\" data-bind=\"attr: { \'title\': lang().dict.play }, enable: canPlay, visible: !isPlaying(), click: Play\"><\/button>\r\n                    <button class=\"navBtn glyphicon glyphicon-pause\" data-bind=\"attr: { \'title\': lang().dict.pause }, enable: canPause, visible: isPlaying, click: Pause\"><\/button>\r\n                    <!--\/ko-->\r\n                    <!--ko if: !isPlaybackVisible()-->\r\n                    <button class=\"navBtn glyphicon glyphicon-pause\" style=\"visibility: hidden;\"><\/button>\r\n                    <!--\/ko-->\r\n                    <button class=\"navBtn glyphicon glyphicon-forward\" data-bind=\"visible: config.buttons.sections, enable: canPlayNextSection, click: LoadNextSection\"><\/button><button class=\"navBtn glyphicon glyphicon-chevron-right\" data-bind=\"attr: { \'title\': NextPageTooltip() }, enable: canPlayNextPage, css: { \'nextCompleted\': isNextVisualIndicator}, click: PlayNextPage\"><\/button>\r\n                <\/div>\r\n                <div class=\"col-xs-3 text-right no-horizontal-space\">\r\n                    <button class=\"navBtn glyphicon glyphicon-repeat\" data-bind=\"attr: { \'title\': lang().dict.reload }, enable: canReload, click: Reload\"><\/button><button id=\"btnVolume\" class=\"navBtn glyphicon glyphicon-volume-up\" data-bind=\"visible: canAdjustVolume, css: GetVolumeCss(), click: ToggleMute\"><\/button><button id=\"btnOptions\" class=\"navBtn glyphicon glyphicon-option-vertical\" data-bind=\"click: ShowOptionsMenu, attr: { \'title\': lang().dict.options }\"><\/button>\r\n                <\/div>\r\n            <\/div>\r\n        <\/div>\r\n    <\/div>\r\n<\/div>\r\n<div id=\"volumeControl\" data-bind=\"css: { \'muted\': isMuted }\">\r\n    <input type=\"text\" id=\"volumeSlider\" class=\"slider form-control\" value=\"\" data-slider-orientation=\"vertical\" \/>\r\n<\/div>\r\n<div id=\"c-mask\" class=\"cmenu-mask\"><\/div>\r\n<nav id=\"optionsMenu\" class=\"cmenu cmenu-slide-right\">\r\n    <div class=\"cmenu-close\" id=\"optionsClose\" data-bind=\"click: CloseOptionsMenu\">\r\n        <span class=\"glyphicon glyphicon-chevron-right pull-right\"><\/span>\r\n        <span data-bind=\"text: lang().dict.options\"><\/span>\r\n    <\/div>\r\n    <div class=\"cmenu-items\">\r\n        <div class=\"cmenu-item\" data-bind=\"visible: config.buttons.audioText, click: ToggleAudioText\"><span data-bind=\"text: lang().dict.audioText\"><\/span><span class=\"glyphicon glyphicon-ok pull-right\" data-bind=\"visible: audioTextEnabled\"><\/span><\/div>\r\n        <div class=\"cmenu-item\" data-bind=\"visible: config.buttons.language, click: ShowLanguage\"><span data-bind=\"text: lang().dict.organizationOption\"><\/span><\/div>\r\n        <div class=\"cmenu-item\" data-bind=\"visible: config.buttons.glossary, click: ShowGlossary\"><span data-bind=\"text: lang().dict.glossary\"><\/span><\/div>\r\n        <div class=\"cmenu-item\" data-bind=\"visible: config.buttons.reference, click: ShowReferences\"><span data-bind=\"text: lang().dict.references\"><\/span><\/div>\r\n        <div class=\"cmenu-item\" data-bind=\"visible: canComment, click: ShowComments\"><span data-bind=\"text: lang().dict.comments\"><\/span><\/div>\r\n        <div class=\"cmenu-item\" data-bind=\"visible: canDesignLaunchOptions, click: ShowLaunchOptionsDesigner\"><span data-bind=\"\">Launch Options Designer<\/span><\/div>\r\n        <div class=\"cmenu-item\" data-bind=\"click: ShowHelp\"><span data-bind=\"text: lang().dict.help\"><\/span><\/div>\r\n        <div class=\"cmenu-item\" data-toggle=\"modal\" data-target=\"#about-modal\">\r\n            <span data-bind=\"text: lang().dict.about\"><\/span>\r\n        <\/div>\r\n    <\/div>\r\n<\/nav><!-- \/cmenu slide-right -->\r\n\r\n<div class=\"modal modal-wide fade\" id=\"help-modal\" tabindex=\"-1\" role=\"dialog\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\r\n                    <span aria-hidden=\"true\">&times;<\/span>\r\n                <\/button>\r\n                <h4 class=\"modal-title\" data-bind=\"text: lang().dict.help\"><\/h4>\r\n            <\/div>\r\n            <div class=\"modal-body\" style=\"text-align: center;\">\r\n                <img style=\"max-width: calc(100vw - 80px); max-height: calc(100vh - 150px);\" src=\"images\/PlayerHelpOverlay.png\" \/>\r\n            <\/div>            \r\n        <\/div>\r\n    <\/div>\r\n<\/div>\r\n\r\n<div id=\"appLoader\">\r\n    <div id=\"pelesysLogo\" class=\"text-center\">\r\n        <img src=\"images\/pclogowhite.png\" \/>\r\n    <\/div>\r\n    <div id=\"appLoadingProgress\">\r\n        <div class=\"spinner\"><\/div>\r\n    <\/div>\r\n<\/div>\r\n\r\n<div class=\"modal fade\" id=\"about-modal\" tabindex=\"-1\" role=\"dialog\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content about-modal-pf\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\r\n                    <span aria-hidden=\"true\">&times;<\/span>\r\n                <\/button>\r\n            <\/div>\r\n            <div class=\"modal-body\">\r\n                <h3 class=\"text-uppercase\"><strong data-bind=\"click: DevClick\">Galaxy<\/strong> CBT Player<\/h3>\r\n                <div class=\"product-versions-pf\">\r\n                    <ul class=\"list-unstyled\">\r\n                        <li><strong data-bind=\"text: lang().dict.version\"><\/strong> <span data-bind=\"text: GetVersion()\" \/><\/li>\r\n                    <\/ul>\r\n                <\/div>\r\n                <div class=\"trademark-pf\">\r\n                    <span data-bind=\"text: lang().dict.trademark\"><\/span>\r\n                <\/div>\r\n            <\/div>\r\n            <div class=\"modal-footer\">\r\n                <img src=\"images\/pclogowhite.png\" style=\"width: 240px;\" data-bind=\"click: GClick\" \/>\r\n            <\/div>\r\n        <\/div>\r\n    <\/div>\r\n<\/div>"
    });
}

CBTPlayer.RegisterUserInterface('pele2018', Pele2018UIExt);