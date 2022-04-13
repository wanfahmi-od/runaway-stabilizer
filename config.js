/**
 * Player configuration options.
 */
var playerConfig = {
    "developerMode": false,
	"launchOptionsMode": false,
	"dataSourceType": "json",
    "dataSourcePath": "content/rs/cbtstructure_leap1b_unit_boeingco.json",
	"logoPath": "logos/btm_boeingco_logo.png",
    "startPageId": "home",
    "idleTimeOutMinutes": 5, //Idle timeout in minutes.
    "buttons": {
		"language": false,
        "comments": true,
        "glossary": true,
        "reference": true,
        "audio": true,
        "audioText": true,
		"sections": false,
		"progress": false
    },
    "ui": 'boeing',	
    "uiLangCodes": ['en', 'zh-CN'],    
    "glossaryPath": "content/glossary.js",
    "referencesPath": "content/references.js",
    "fastAdvance": false,
    "lmsType": "scorm2004", //local, aicc, scorm12, scorm2004
    "completionType": "pagescomplete-noscore",
	"pageLoadingTimeoutDuration": 50,
    "topicCompletionMessages": true,
	"lmsContentProtection": true,
    "controlBarTopColor": "#263746", // only affects the 'pele2019' UI set
    "controlBarBottomColor": "#263746", // only affects the 'pele2019' UI set
    "controlBarBottomActiveIconColor": "#B3E5F9", // only affects the 'pele2019' UI set
    "titleBarColor": "#263746",
    "contentContainerBackgroundColor": "#999999", // only affects the 'pele2019' UI set
    "controlBarBottomIconColor": "#FFFFFF", // only affects the 'pele2019' UI set
    "topicColor": "#1D439C", // only affects the 'pele2019' UI set	
    //crazy dev tools
	"_playSpeed": 1, //allow 2X, 4X, 8X, 16X playback speed represented by 2, 4, 8, 16, 1 represents the default speed, others are undefined
    "_autoPlay": false, //allow auto playback, can also be toggled from dev toolbar.
    "_autoPlaySkipTimeout": 60, //skip content that doesn't complete after x seconds. 
    "_enableLocalStorage": false, //allow storing of progress in the browser when using lms type "local".    
    "_canvasGraphicsQuality": "auto", // allowed value: auto, low, med, hi
	"_singleFrame": true
};