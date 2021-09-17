

Qualtrics.SurveyEngine.addOnload(function () {
	/*Place your JavaScript here to run when the page loads*/
	globalThis.pageConfig = new ConfigManager();
	globalThis.eventLog = globalThis.pageConfig.setup.eventLog;

	/* The next button will be disabled for the duration of this experiment. */
	for (const item of document.querySelectorAll("#Questions .Separator")) {
		item.hidden = true;
	}
	for (const item of Array.from(document.querySelectorAll("#Questions .QuestionOuter"))) {
		if (!item.querySelector("textarea")) {
			continue;
		}
		item.hidden = true;
	}
});


function getLangForTask() {
	return "${e://Field/Q_Language}".toLowerCase();
}

function getQualtricsSessionId() {
	return "${e://Field/ResponseID}";
}
