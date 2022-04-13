/**
 * User's learning session model that is transferred between CPD and the runtime controller.
 * @class
 * @param {object} data
 */
function LearningSessionModel(data) {
    data = data || {};
    this._className = "LearningSessionModel";

    this.learningSessionId = data.learningSessionId;
    this.AICC_SID = data.AICC_SID;
    this.lessonType = data.lessonType;
    this.courseType = data.courseType;
    this.standard = data.standard;
    this.lessonId = data.lessonId;
    this.packageId = data.packageId;

    this.learnerId = data.learnerId;
    this.learnerName = data.learnerName;
    this.lessonLocation = data.lessonLocation;
    this.lessonStatus = data.lessonStatus; // assigned to cmi.completion_status or cmi.success_status
    this.rawScore = data.rawScore;
    this.totalTime = data.totalTime;
    this.credit = data.credit;
    this.lessonMode = data.lessonMode;
    this.launchData = data.launchData;
    this.suspendData = data.suspendData;
    this.masteryScore = data.masteryScore;
    this.maxTimeAllowed = data.maxTimeAllowed;
    this.timeLimitAction = data.timeLimitAction;
}

//constant
var LessonStatusType = {
    "completed": "Completed",
    "incomplete": "Incomplete",
    "not attempted": "Not Attempted",
    "unknown": "Unknown",
    "failed": "Failed",
    "passed": "Passed"
};
