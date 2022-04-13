$(document).ready(function () {
    pageControllerAPI.onBeforeInit();

    //get data from the api
    var orgData = pageControllerAPI.getOrganizationData();
    var pageData = pageControllerAPI.getPageData();
    var pageModel = orgData.itemsDict[pageData.id];
    var org = new CBTOrganizationModel(orgData);

    //Only get the main level topics
    var topics = org.items().filter(function (item) {
        return item.type === "topic";
    });

    //todo: this could be improved and not need the function as the object.
    org._completion = pageControllerAPI.getNewCompletionObject();
    var completed = org.completionStatus();

    //Notify scroll observable of any changes to the scroll value
    $(window).on('resize', UpdateScroll);
    $('.scroll').on('scroll', UpdateScroll);

    //ko binding
    ko.applyBindings({
        org: org, 
        topics: topics,
        LoadTopic: function (topic) {
            if (pageControllerAPI.isItemEnabled(topic.id)) {
                pageControllerAPI.loadPageById(topic.id);
            }
        },
        GetTopicCssClass: function (topic) {
            var temp = topic.isVisible();
            return {
                'disabled': !pageControllerAPI.isItemEnabled(topic.id)
            };
        },
        GetStatusCssClass: function (topic) {
            var x = orgData;
            var temp = topic.isVisible();
            if (topic.visited() && !topic.completed())
                return "incomplete";
            if (topic.completed())
                return "passed";
        }
    });

    setTimeout(function () {
        //tell the player that page has finished loading.
        pageControllerAPI.pageLoaded();
        //tell the player that page completed it's objective.
        pageControllerAPI.setPageCompletion(true);
        //ensure first topic is enabled
        topics[0] && topics[0].isVisible.valueHasMutated();
    }, 500);
});

var scroll = ko.observable(0);

/**
 * Update the scroll observable var with the scroll value of the scroll div
 */
function UpdateScroll() {
    scroll($('.scroll').scrollTop());
    scroll.valueHasMutated();
}

/**
 * Scroll up button click event handler
 */
function ScrollUpBtnClick() {
    $('.scroll').scrollTop(0);
}

/**
 * Scroll down button click event handler
 */
function ScrollDownBtnClick() {
    var $scroll = $('.scroll');
    var scrollDiv = $scroll[0];
    $scroll.scrollTop(scrollDiv.scrollHeight - scrollDiv.clientHeight);
}

/**
 * Returns true if the scroll up button should be visible, false otherwise
 * @returns {bool}  - is scroll up button visible.
 */
IsScrollUpBtnVisible = ko.pureComputed(function () {
    return scroll() > 0;
}, this);

/**
 * Returns true if the scroll down button should be visible, false otherwise
 * @returns {bool}  - is scroll down button visible.
 */
IsScrollDownBtnVisible = ko.pureComputed(function () {
    var scrollDiv = $('.scroll')[0];
    return scroll() < (scrollDiv.scrollHeight - scrollDiv.clientHeight);
}, this);