/**
 * Base class SCORM APIs.
 * Todo: There's a lot common between SCO_API and SCO_API_1484_11. Some refactoring of those classes to make them less private (var usage) is needed. Will let us move a good chunk of the repeated code up to here.
 * Will be worth it in the end, as they'll be more testable and easier to maintain.
 * Alternatively, we can keep some of the private properties, but they'll need to be passed over to here during construction.
 * @param {object} options - config options.
 * @class
 * @abstract
 */
function SCO_APIBase(options) {
    var that = this;

    var opts = {        
    };

    $.extend(true, opts, options);

    //-------------------------------------------------------------------------
    //#region Public 
        

    //#endregion
    //-------------------------------------------------------------------------
    //#region Private


    //#endregion
}