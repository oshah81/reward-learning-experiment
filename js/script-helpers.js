
let keyDownListener;
let keyUpListener;
let qualtricsContext;

const pressedKeys = new Set();


function wait(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

function findLastIndex(array, predicate) {
	for (let i = array.length - 1; i >= 0; --i) {
		const x = array[i];
		if (predicate(x)) {
			return i;
		}
	}
}

function getLangForTask() {
	return "${e://Field/Q_Language}".toLowerCase();
}

function getQualtricsSessionId() {
	return "${e://Field/ResponseID}";
}

function setupVolumeControl() {
	document.querySelector("input[name='volume']").addEventListener("input", function (evt) {
		const volControl = event.target;
		for (const elem of document.querySelectorAll("piano-player")) {
			elem.volumeControl = volControl.value;
		}
	});
}

function setupIcons() {
	for (let elem of document.querySelectorAll("img.clickable")) {
		elem.addEventListener("click", function (evt) {
			gamePage(parseInt(evt.target.dataset.page), evt);
		});
	}
}

function checkProbabilityOfWin(activePiano) {
	const activeProbability = globalThis.pageConfig.probJson.probability1[globalThis.pageConfig.setup.trial - 2];
	const unchosenProbability = globalThis.pageConfig.probJson.probability2[globalThis.pageConfig.setup.trial - 2];

	const mcsScore = Math.random();

	return { "mcsScore": mcsScore, "activeProbability": activeProbability, "unchosenProbability": unchosenProbability };
}

function checkStep4(piano, keyToCheck) {
	const roundStart = findLastIndex(eventLog, x => x.type === "startNextRound");

	let numKs = 0;
	for (let i = roundStart; i < eventLog.length; i++) {
		const elem = eventLog[i];
		if (elem.type === "keyup" && elem.key === keyToCheck) {
			numKs++;
		}
	}
	return (numKs > 9);
}

function evaluateSequence(roundStart, keymap, correctSequence) {
	let typedCharacters = "";
	const updatedEventLogs = [];
	let res = 0;

	for (let i = roundStart; i < eventLog.length; i++) {
		const elem = eventLog[i];
		if (elem.type !== "keydown") {
			continue;
		}
		if (!keymap.some(x => x.key === elem.key)) {
			continue;
		}

		typedCharacters += elem.key;
		if (typedCharacters === correctSequence) {
			updatedEventLogs.push({ type: "correctSequence", time: performance.now(), sequence: correctSequence, round: globalThis.pageConfig.setup.round, trial: globalThis.pageConfig.setup.trial, mouse: false });
			res = 1;
			break;
		} else {
			if (!correctSequence.toLowerCase().startsWith(typedCharacters.toLowerCase())) {
				updatedEventLogs.push({ type: "incorrectSequence", time: performance.now(), sequence: typedCharacters, round: globalThis.pageConfig.setup.round, trial: globalThis.pageConfig.setup.trial, mouse: false });
				res = 2;
				break;
			}
		}
	}

	if (updatedEventLogs.length > 0) {
		for (const item of updatedEventLogs) {
			eventLog.push(item);
		}
	}
	return res;
}

function checkStep6(piano) {
	const roundStart = findLastIndex(eventLog, x => x.type === "startNextRound" || x.type === "correctSequence" || x.type === "incorrectSequence");
	const keymap = piano.keymap;
	const correctSequence = piano.notes;

	return evaluateSequence(roundStart, keymap, correctSequence);
}

function checkStep19(piano) {
	const roundStart = findLastIndex(eventLog, x => x.type === "startNextRound");
	const keymap = piano.keymap;
	const correctSequence = piano.notes;
	const updatedEventLogs = [];
	let wasIncorrectSequence = false;
	let typedCharacters = "";

	let notesPlayed = 0;
	for (let i = roundStart; i < eventLog.length; i++) {
		const elem = eventLog[i];
		if (elem.type !== "keydown") {
			continue;
		}
		if (!keymap.some(x => x.key === elem.key)) {
			continue;
		}

		notesPlayed++;

		typedCharacters += elem.key;
		if (typedCharacters === correctSequence) {
			updatedEventLogs.push({ type: "correctSequence", time: performance.now(), sequence: correctSequence, round: globalThis.pageConfig.setup.round, trial: globalThis.pageConfig.setup.trial, mouse: false });
			break;
		} else {
			if (!correctSequence.toLowerCase().startsWith(typedCharacters.toLowerCase())) {
				wasIncorrectSequence = true;
				continue;
			}
		}
	}

	if (wasIncorrectSequence && notesPlayed === 4) {
		updatedEventLogs.push({ type: "incorrectSequence", time: performance.now(), sequence: typedCharacters, round: globalThis.pageConfig.setup.round, trial: globalThis.pageConfig.setup.trial, mouse: false });
	}

	if (updatedEventLogs.length > 0) {
		for (const item of updatedEventLogs) {
			eventLog.push(item);
		}
	}

	return notesPlayed;
}

function timeoutManager(evt) {
	const activePiano = document.querySelector(`section:not([hidden]) piano-player`);
	const rolledDie = checkProbabilityOfWin(activePiano);
	eventLog.push({
		type: "timedOut",
		time: performance.now(),
		round: globalThis.pageConfig.setup.round,
		trial: globalThis.pageConfig.setup.trial,
		sequence: activePiano.notes,
		mouse: false,
		activeProbability: rolledDie.activeProbability,
		unchosenProbability: rolledDie.unchosenProbability,
		mcsScore: rolledDie.mcsScore
	});
	globalThis.pageConfig.setup.round = 22;

	return navigateToPage(evt);
}

function countCorrectSequences(piano, requiredTrials) {
	const roundStart = findLastIndex(eventLog, x => x.type === "startNextRound");

	let trials = 0;
	for (let i = eventLog.length - 1; i > roundStart; i--) {
		const elem = eventLog[i];
		if (elem.type !== "incorrectSequence" && elem.type !== "correctSequence") {
			continue;
		}
		if (elem.type === "incorrectSequence") {
			break;
		}
		trials++;
		if (trials >= requiredTrials) {
			break;
		}
	}
	return trials;
}

function gamePage(icon, evt, key) {
	const lang = getLangForTask();
	globalThis.pageConfig.setup.round = 19;
	globalThis.pageConfig.setup.trial++;
	document.querySelector(".page-19 > piano-player").dataset.sequence = icon;

	const activePiano = document.querySelector(".page-19 > piano-player");
	if (icon === 1) {
		activePiano.notes = "gjhk";
		document.querySelector(".page-19 > .active-icon").src = "https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_byJfzLUIsrGJw6W&V=1612980021";
		switch (lang) {
			case "it":
				document.querySelector(".page-19 > .statusLbl").textContent = "Esegui la Sequenza 1";
				break;
			default:
				document.querySelector(".page-19 > .statusLbl").textContent = "Play Sequence 1";
		}

	} else {
		activePiano.notes = "kgjh";
		document.querySelector(".page-19 > .active-icon").src = "https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_eOPh8J8BPOgcJvM&V=1612980058";
		switch (lang) {
			case "it":
				document.querySelector(".page-19 > .statusLbl").textContent = "Esegui la Sequenza 2";
				break;
			default:
				document.querySelector(".page-19 > .statusLbl").textContent = "Play Sequence 2";
		}
	}

	res = navigateToPage(evt);
	return res;
}

function keyDownManager(evt, key) {
	if (typeof evt.repeat !== "undefined" && evt.repeat) {
		return;
	}

	if (pressedKeys.has(key)) {
		return;
	} else {
		pressedKeys.add(key);
	}

	if (key === " ") {
		evt.preventDefault();
		evt.stopPropagation();
	}

	const prm = new Promise(resolve => {
		if (!document.querySelector(".page-18").hidden || !document.querySelector(".page-24").hidden) {
			if (key === "g") {
				gamePage(1, evt, key).then(() => {
					resolve();
				});
			} else if (key === "k") {
				gamePage(2, evt, key).then(() => {
					resolve();
				});
			} else {
				resolve();
			}
		} else {
			resolve();
		}
	}).then(() => {
		const activePiano = document.querySelector(`section:not([hidden]) piano-player`);
		if (activePiano) {
			activePiano.keyNotePressed(evt, key);
		}
	});
}


function keyUpManager(evt, key) {
	const lang = getLangForTask();
	const wasMouse = evt.type.startsWith("mouse") || evt.type.startsWith("click") || evt.type.startsWith("touch");
	pressedKeys.delete(key);

	const activePiano = document.querySelector(`section:not([hidden]) piano-player`);

	if (activePiano) {
		if (key === "q" || key === "Q") {
			evt.preventDefault();
			evt.stopPropagation();
			document.querySelector("countdown-clock").pause();
			activePiano.playNextRound().then(() => {
				document.querySelector("countdown-clock").resume();
			});
			return;
		}

		activePiano.keyNoteUnPressed(evt, key);

		if (!document.querySelector(".page-2").hidden) {
			if (key === " " || key === "Enter" || key === "Return" || key === "Escape") {
				evt.preventDefault();
				evt.stopPropagation();
				globalThis.onNextPage(evt);
			}
		}

		if (!document.querySelector(".page-4").hidden) {
			if (checkStep4(activePiano, "k")) {
				globalThis.onNextPage(evt);
			}
			if (key === " " || key === "Enter" || key === "Return" || key === "Escape") {
				evt.preventDefault();
				evt.stopPropagation();
				globalThis.onNextPage(evt);
			}
		}

		if (!document.querySelector(".page-9").hidden) {
			if (checkStep4(activePiano, "h")) {
				globalThis.onNextPage(evt);
			}
			if (key === " " || key === "Enter" || key === "Return" || key === "Escape") {
				globalThis.onNextPage(evt);
			}
		}

		if (!document.querySelector(".page-6").hidden) {
			const seqResult = checkStep6(activePiano);
			switch (seqResult) {
				case 0:
				default:
					break;
				case 1: {
					globalThis.pageConfig.configPromise.then(config => {
						const requiredTrials = (config).practicetrials;
						const numCorrectSequences = countCorrectSequences(activePiano, requiredTrials);
						if (numCorrectSequences == requiredTrials) {
							globalThis.onNextPage(evt);
						} else {
							const statusLbl = document.querySelector(".page-6 > .statusLbl");
							statusLbl.classList.remove("incorrect-msg");
							statusLbl.classList.add("correct-msg");
							switch (lang) {
								case "it":
									if ((requiredTrials - numCorrectSequences) == 1) {
										statusLbl.textContent = "Corretto! Ora esequi la sequenza un'ultima volta.";
									} else {
										statusLbl.textContent = "Corretto! Ora esequi la sequenza altre " + (requiredTrials - numCorrectSequences) + " volte";
									}
									break;
								default:
									if ((requiredTrials - numCorrectSequences) == 1) {
										statusLbl.textContent = "Correct! Now play it again " + (requiredTrials - numCorrectSequences) + " more time";
									} else {
										statusLbl.textContent = "Correct! Now play it again " + (requiredTrials - numCorrectSequences) + " more times";
									}
									break;
							}
						}
					});
					break;
				}
				case 2: {
					const statusLbl = document.querySelector(".page-6 > .statusLbl");
					statusLbl.classList.remove("correct-msg");
					statusLbl.classList.add("incorrect-msg");
					switch (lang) {
						case "it":
							statusLbl.textContent = "Qualcosa è andato storto. Riprova.";
							break;
						default:
							statusLbl.textContent = "Something went wrong. Try again.";
							break;
					}
					break;
				}
			}
		}

		if (!document.querySelector(".page-11").hidden) {
			const seqResult = checkStep6(activePiano);
			switch (seqResult) {
				case 0:
				default:
					break;
				case 1: {
					globalThis.pageConfig.configPromise.then(config => {
						const requiredTrials = (config).practicetrials;
						const numCorrectSequences = countCorrectSequences(activePiano, requiredTrials);
						if (numCorrectSequences == requiredTrials) {
							globalThis.onNextPage(evt);
						} else {
							const statusLbl = document.querySelector(".page-11 > .statusLbl");
							statusLbl.classList.remove("incorrect-msg");
							statusLbl.classList.add("correct-msg");
							switch (lang) {
								case "it":
									if ((requiredTrials - numCorrectSequences) == 1) {
										statusLbl.textContent = "Corretto! Ora esequi la sequenza un'ultima volta.";
									} else {
										statusLbl.textContent = "Corretto! Ora esequi la sequenza altre " + (requiredTrials - numCorrectSequences) + " volte";
									}
									break;
								default:
									if ((requiredTrials - numCorrectSequences) == 1) {
										statusLbl.textContent = "Correct! Now play it again " + (requiredTrials - numCorrectSequences) + " more time";
									} else {
										statusLbl.textContent = "Correct! Now play it again " + (requiredTrials - numCorrectSequences) + " more times";
									}
									break;
							}
						}
					});
					break;
				}
				case 2: {
					const statusLbl = document.querySelector(".page-11 > .statusLbl");
					statusLbl.classList.remove("correct-msg");
					statusLbl.classList.add("incorrect-msg");
					switch (lang) {
						case "it":
							statusLbl.textContent = "Qualcosa è andato storto. Riprova.";
							break;
						default:
							statusLbl.textContent = "Something went wrong. Try again.";
							break;
					}
					break;
				}
			}
		}

		if (!document.querySelector(".page-19").hidden) {
			const seqResult = checkStep19(activePiano);
			if (seqResult >= 4) {
				const numCorrectSequences = countCorrectSequences(activePiano, 1);
				const rolledDie = checkProbabilityOfWin(activePiano);
				let roundResult = "unknown";

				if (numCorrectSequences !== 1) {
					roundResult = "incorrectPlay";
				} else if (activePiano.dataset.sequence == 1) {
					roundResult = rolledDie.mcsScore <= rolledDie.activeProbability ? "winRound" : "lostRound";
				} else {
					roundResult = rolledDie.mcsScore > rolledDie.activeProbability ? "winRound" : "lostRound";
				}

				eventLog.push({
					type: roundResult,
					time: performance.now(),
					round: globalThis.pageConfig.setup.round,
					trial: globalThis.pageConfig.setup.trial,
					mouse: wasMouse,
					activeProbability: rolledDie.activeProbability,
					sequence: activePiano.notes,
					unchosenProbability: rolledDie.unchosenProbability,
					mcsScore: rolledDie.mcsScore
				});
				if (roundResult === "winRound") {
					globalThis.pageConfig.setup.score = globalThis.pageConfig.setup.score + 5;
					globalThis.pageConfig.setup.hintCount = 0;
					globalThis.pageConfig.setup.round = 21;
					for (const hints of document.querySelectorAll(".hint-text")) {
						hints.textContent = "";
						hints.hidden = true;
					}
				} else {
					globalThis.pageConfig.setup.hintCount++;
					for (const hints of document.querySelectorAll(".hint-text")) {
						hints.hidden = (globalThis.pageConfig.setup.hintCount < 5);
						if (roundResult === "lostRound") {
							hints.innerHTML = "";
						}
						else {
							switch (lang) {
								case "it":
									hints.innerHTML = "Suggerimento: stai premendo i <strong>tasti sbagliati</strong>.<br/><i>Premi &quot;q&quot; per farti ricordare la sequenza dal computer. </i>";
									break;
								default:
									hints.innerHTML = "Hint: <strong>wrong notes</strong> played.<br/><i>Press &quot;q&quot; to be reminded of the sequence</i>";
									break;
							}
						}
					}
					globalThis.pageConfig.setup.round = 20;
				}
				navigateToPage(evt);
			}
		}
		return;
	}

	if (!document.getElementById("nxtbtn").disabled) {
		globalThis.onNextPage(evt);
	}
}

function splashWait(timeToWait, hideText) {
	const splashElem = document.getElementById("splash");
	splashElem.hidden = false;
	const timerElem = splashElem.querySelector("countdown-clock");
	timerElem.time = timeToWait;
	timerElem.hideText = hideText;
	const prm = new Promise((resolve, reject) => {
		const timListener = timerElem.addEventListener("timeout", evt => {
			splashElem.hidden = true;
			resolve();
			timerElem.removeEventListener("timeout", timListener);
		});
	});
	timerElem.startTimer();

	return prm;
}

function handleRound23() {
	return new Promise(resolve => {
		resolve();
	});
}

function handleRound24(lang) {
	return new Promise(resolve => {
		const trial = globalThis.pageConfig.setup.trial;
		globalThis.pageConfig.configPromise.then(config => {
			switch (lang) {
				case "it":
					document.querySelector(".page-24 .scoreboard").textContent =
						"Round " + trial + " di " + config.totaltrials;
					break;
				default:
					document.querySelector(".page-24 .scoreboard").textContent =
						"Round " + trial + " of " + config.totaltrials + ".";
					break;
			}
			if (trial > config.totaltrials) {
				/* The next button will be disabled for the duration of this experiment. */
				codaGame().then(() => {
					resolve();
				});
			} else {
				resolve();
			}
		});
	});
}

function navigateToPage(evt) {
	const lang = getLangForTask();
	const roundWaitTime = 3000;
	const round = globalThis.pageConfig.setup.round;
	const wasMouse = evt && (evt.type.startsWith("mouse") || evt.type.startsWith("click") || evt.type.startsWith("touch"));
	eventLog.push({ type: "startNextRound", time: performance.now(), round: round, trial: globalThis.pageConfig.setup.trial, mouse: wasMouse });

	for (let item of document.querySelectorAll(".core-experiment section[class*='page-'")) {
		item.hidden = true;
	}

	const prm1 = globalThis.pageConfig.save();

	document.querySelector(".page-" + parseInt(round)).hidden = false;

	if (round === 1) {
		document.getElementById("nxtbtn").hidden = false;
		document.getElementById("nxtbtn").disabled = false;
	} else if (round === 2) {
		switch (lang) {
			case "it":
				document.getElementById("nxtbtn").textContent = "Premi qui o la barra spaziatrice per continuare";
				break;
			default:
				document.getElementById("nxtbtn").textContent = "Click here or press space to continue";
				break;
		}
		document.getElementById("nxtbtn").hidden = true;
		document.getElementById("nxtbtn").disabled = true;
		wait(1000).then(() => {
			document.getElementById("nxtbtn").hidden = false;
			document.getElementById("nxtbtn").disabled = false;
		});
	} else if (round === 3) {
		switch (lang) {
			case "it":
				document.getElementById("nxtbtn").textContent = "Premi qui o qualsiasi altro tasto per continuare";
				break;
			default:
				document.getElementById("nxtbtn").textContent = "Click here or press any key to continue";
				break;
		}
		document.getElementById("nxtbtn").hidden = true;
		document.getElementById("nxtbtn").disabled = true;
		wait(1000).then(() => {
			document.getElementById("nxtbtn").hidden = false;
			document.getElementById("nxtbtn").disabled = false;
		});
	} else if (round === 4) {
		const activePiano = document.querySelector("section.page-4 piano-player");
		activePiano.playNextRound();
		switch (lang) {
			case "it":
				document.getElementById("nxtbtn").textContent = "Premi qui o la barra spaziatrice per continuare";
				break;
			default:
				document.getElementById("nxtbtn").textContent = "Click here or press space to continue";
				break;
		}
	} else if (round == 5) {
		switch (lang) {
			case "it":
				document.getElementById("nxtbtn").textContent = "Premi qui o qualsiasi altro tasto per continuare";
				break;
			default:
				document.getElementById("nxtbtn").textContent = "Click here or press any key to continue";
				break;
		}
		document.getElementById("nxtbtn").hidden = true;
		document.getElementById("nxtbtn").disabled = true;
		wait(2000).then(() => {
			document.getElementById("nxtbtn").hidden = false;
			document.getElementById("nxtbtn").disabled = false;
		});
	} else if (round === 6) {
		document.getElementById("nxtbtn").hidden = true;
		document.getElementById("nxtbtn").disabled = true;
	} else if (round == 7) {
		wait(2000).then(() => {
			document.getElementById("nxtbtn").hidden = false;
			document.getElementById("nxtbtn").disabled = false;
		});
	} else if (round === 9) {
		switch (lang) {
			case "it":
				document.getElementById("nxtbtn").textContent = "Premi qui o la barra spaziatrice per continuare";
				break;
			default:
				document.getElementById("nxtbtn").textContent = "Click here or press space to continue";
				break;
		}
		const activePiano = document.querySelector("section.page-9 piano-player");
		activePiano.playNextRound();
	} else if (round === 10) {
		switch (lang) {
			case "it":
				document.getElementById("nxtbtn").textContent = "Premi qui o qualsiasi altro tasto per continuare";
				break;
			default:
				document.getElementById("nxtbtn").textContent = "Click here or press any key to continue";
				break;
		}
		document.getElementById("nxtbtn").hidden = true;
		document.getElementById("nxtbtn").disabled = true;
		wait(2000).then(() => {
			document.getElementById("nxtbtn").hidden = false;
			document.getElementById("nxtbtn").disabled = false;
		});
	} else if (round === 11) {
		document.getElementById("nxtbtn").hidden = true;
		document.getElementById("nxtbtn").disabled = true;
	} else if (round === 12) {
		wait(2000).then(() => {
			document.getElementById("nxtbtn").hidden = false;
			document.getElementById("nxtbtn").disabled = false;
		});
	} else if (round === 13) {
		switch (lang) {
			case "it":
				document.getElementById("nxtbtn").textContent = "Continua >";
				break;
			default:
				document.getElementById("nxtbtn").textContent = "Continue >";
				break;
		}
	} else if (round === 18) {
		document.getElementById("nxtbtn").hidden = true;
		document.getElementById("nxtbtn").disabled = true;
		globalThis.pageConfig.setup.trial = 1;
	} else if (round === 19) {
		document.querySelector(".page-19 > countdown-clock").startTimer();
	} else if (round === 20 || round === 21 || round === 22) {
		document.querySelector(".page-19 > countdown-clock").stopTimer();
		document.getElementById("nxtbtn").hidden = true;
		document.getElementById("nxtbtn").disabled = true;
		const splashWaitPrm = wait(roundWaitTime);
		handleRound23().then(x => {
			splashWaitPrm.then(() => {
				globalThis.onNextPage(evt);
			});
		});
	} else if (round === 23) {
		globalThis.onNextPage(evt);
	} else if (round === 24) {
		document.getElementById("nxtbtn").hidden = true;
		document.getElementById("nxtbtn").disabled = true;
		document.querySelector(".page-19 piano-player").clearKeyStates();
		handleRound24(lang);
	}

	return prm1;
}


function onNextPage(event) {
	let round = globalThis.pageConfig.setup.round;
	if (round === 24) {
		round = 18;
	} else if (round === 20 || round === 21 || round === 22) {
		round = 23;
	} else {
		round++;
	}
	globalThis.pageConfig.setup.round = round;
	navigateToPage(event);
}


export { wait, setupVolumeControl, setupIcons, checkStep4, checkStep6, countCorrectSequences, keyUpManager, keyDownManager, navigateToPage, timeoutManager };
