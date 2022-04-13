/**
 * Demo Plane UI Extension
 * @class
 */
function NoUIExt() {
    var that = this;

    this._skinName = "no_ui";

    //#region Course menu

    this.menu = null;

    /**
     * Show the course menu.
     */
    this.ShowMenu = function () {        
    };

    /**
     * Close the menu.
     */
    this.CloseMenu = function () {        
    };
    

    //#endregion
    //-------------------------------------------------------------------------
    //#region Course menu items

    /**
     * Get the inline item container style.
     * @param {CBTItemModel} item - Item model.
     * @returns {object} - object for style binding.
     */
    this.GetInlineMenuItemStyle = function (item) {
        //todo: why is this needed?
    };    

    //#endregion
    //-------------------------------------------------------------------------
    //#region Options menu

    this.optionsMenu = null;

    /**
     * Show the options menu.
     */
    this.ShowOptionsMenu = function () {        
    };

    /**
     * Close the options menu.
     */
    this.CloseOptionsMenu = function () {
    };    

    //#endregion
    //-------------------------------------------------------------------------
    //#region Progress

        

    //#endregion
    //-------------------------------------------------------------------------
    //#region Resize

    /**
     * Resize the UI.
     */
    this.Resize = function () {
        //resize content inside the iframe
        that.pageController() && that.pageController().Resize();
    };

    /**
     * Return the height of the content container.
     * @returns {number} 
     */
    this.GetContentHeight = function () {
        var $container = $("#contentContainer");
        var frameHeight = $container.height();
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
        ls.href = "ui/no_ui/no_ui.css";
        document.getElementsByTagName("head")[0].appendChild(ls);

        that.InitElements();
        that.InitComponents();
        that.InitUIEventHandlers();
    };

    /**
     * Init DOM elements.
     */
    this.InitElements = function () {
    };

    /**
     * Init components.
     */
    this.InitComponents = function () {        
    };

    /**
     * Init ui event handlers.
     */
    this.InitUIEventHandlers = function () {        
    };
    //#endregion
    //-------------------------------------------------------------------------
}

///////////////////////////////////////////////////////////////////////////////
//register ui component

if (!ko.components.isRegistered('no_ui')) {
    ko.components.register('no_ui', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var player = params.model;
                player._InitUI();

                return player;
            }
        },
        template: { require: 'text!ui/no_ui/no_ui.html' }
    });
}

CBTPlayer.RegisterUserInterface('no_ui', NoUIExt);