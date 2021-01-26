async function wait(ms) {
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

function setupVolumeControl() {
	document.querySelector("input[name='volume']").addEventListener("input", function(evt) {
		const volControl = event.target;
		for (const elem of document.querySelectorAll("piano-player")) {
			elem.volumeControl = volControl.value;
		}
	});
}

function setupIcons() {
	for (let elem of document.querySelectorAll("img.clickable")) {
		elem.addEventListener("click", function(evt) {
			gamePage(parseInt(evt.target.dataset.page), evt);
		});
	}
}

function generateRandomValues() {
	let arr = new Uint16Array(100);
	crypto.getRandomValues(arr);
	return Array.from(arr).map(x => x/65536.0);
}

const randomVals = generateRandomValues();

function checkProbabilityOfWin(activePiano) {
	if (globalThis.pageConfig.setup.trial >= randomVals.length - 1) {
		throw new Error("out of range");
	}

	const probabilityArray = globalThis.pageConfig.probJson.probabilities;
	const activeProbability = probabilityArray[globalThis.pageConfig.setup.trial];
	const probabilityOfWin = (activePiano.dataset.sequence == 1) ? activeProbability.score1 / (activeProbability.score1 + activeProbability.score2) :  activeProbability.score2 / (activeProbability.score1 + activeProbability.score2);

	return randomVals[globalThis.pageConfig.setup.trial] > probabilityOfWin;
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
			updatedEventLogs.push({type: "correctSequence", time: performance.now(), sequence: correctSequence, round: globalThis.pageConfig.setup.round, trial: globalThis.pageConfig.setup.trial, mouse: false });
			res = 1;
			break;
		} else {
			if (!correctSequence.toLowerCase().startsWith(typedCharacters.toLowerCase())) {
				updatedEventLogs.push({type: "incorrectSequence", time: performance.now(), sequence: typedCharacters, round: globalThis.pageConfig.setup.round, trial: globalThis.pageConfig.setup.trial, mouse: false });
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
			updatedEventLogs.push({type: "correctSequence", time: performance.now(), sequence: correctSequence, round: globalThis.pageConfig.setup.round, trial: globalThis.pageConfig.setup.trial, mouse: false });
			break;
		} else {
			if (!correctSequence.toLowerCase().startsWith(typedCharacters.toLowerCase())) {
				wasIncorrectSequence = true;
				continue;
			}
		}
	}

	if (wasIncorrectSequence && notesPlayed === 4) {
		updatedEventLogs.push({type: "incorrectSequence", time: performance.now(), sequence: typedCharacters, round: globalThis.pageConfig.setup.round, trial: globalThis.pageConfig.setup.trial, mouse: false });
	}

	if (updatedEventLogs.length > 0) {
		for (const item of updatedEventLogs) {
			eventLog.push(item);
		}
	}

	return notesPlayed;
}

async function timeoutManager(evt) {
	globalThis.pageConfig.setup.round = 21;

	await navigateToPage(evt);
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

async function gamePage(icon, evt) {
	globalThis.pageConfig.setup.round = 18;
	globalThis.pageConfig.setup.trial++;
	document.querySelector(".page-19 > piano-player").dataset.sequence = icon;

	if (icon === 1) {
		document.querySelector(".page-19 > piano-player").notes = "gjhk";
		document.querySelector(".page-19 > .active-icon").src = "fractal1.png";
		document.querySelector(".page-19 > .statusLbl").textContent = "Play Sequence 1";
	} else {
		document.querySelector(".page-19 > piano-player").notes = "kgjh";
		document.querySelector(".page-19 > .active-icon").src = "fractal2.png";
		document.querySelector(".page-19 > .statusLbl").textContent = "Play Sequence 2";
	}

	await navigateToPage(evt);
}

const pressedKeys = new Set();

async function keyDownManager(evt, key) {
	if (typeof evt.repeat !== "undefined" && evt.repeat) {
		return;
	}

	if (pressedKeys.has(key)) {
		return;
	} else {
		pressedKeys.add(key);
	}

	const activePiano = document.querySelector(`section:not([hidden]) piano-player`);
	if (activePiano) {
		if (key === "F1") {
			evt.preventDefault();
			evt.stopPropagation();
			await activePiano.playNextRound();
			return false;
		}
	
		await activePiano.keyNotePressed(evt, key);
	}
}


async function keyUpManager(evt, key) {
	const wasMouse = evt.type.startsWith("mouse") || evt.type.startsWith("click");
	pressedKeys.delete(key);

	if (!document.getElementById("nextButton").disabled) {
		if (key === "Return" || key === "Enter" || key === "Control" || key === "n" || key === "N") {
			await globalThis.onNextPage(evt);
			return;
		}
		if (!document.querySelector(".page-20").hidden || !document.querySelector(".page-21").hidden || !document.querySelector(".page-22").hidden) {
			if (key === "1" || key === "2") {
				await globalThis.onNextPage(evt);
				return;
			}
		}
	}

	if (!document.querySelector(".page-17").hidden || !document.querySelector(".page-24").hidden) {
		if (key === "1") {
			gamePage(1, evt);
		}
		if (key === "2") {
			gamePage(2, evt);
		}
	}
	
	const activePiano = document.querySelector(`section:not([hidden]) piano-player`);
	if (activePiano) {
		activePiano.keyNoteUnPressed(evt, key);

		if (!document.querySelector(".page-4").hidden) {
			if (checkStep4(activePiano, "k")) {
				await globalThis.onNextPage(evt);
			}
		}

		if (!document.querySelector(".page-9").hidden) {
			if (checkStep4(activePiano, "h")) {
				await globalThis.onNextPage(evt);
			}
		}

		if (!document.querySelector(".page-6").hidden) {
			const seqResult = checkStep6(activePiano);
			switch (seqResult) {
				case 0:
				default:
					break;
				case 1: {
					const requiredTrials = (await globalThis.pageConfig.configPromise).practicetrials;
					const numCorrectSequences = countCorrectSequences(activePiano, requiredTrials);
					if (numCorrectSequences == requiredTrials) {
						await globalThis.onNextPage(evt);
					} else {
						const statusLbl = document.querySelector(".page-6 > .statusLbl");
						statusLbl.classList.remove("incorrect-msg");
						statusLbl.classList.add("correct-msg");
						statusLbl.textContent = `Correct! Now play it again ${requiredTrials - numCorrectSequences} more time${(requiredTrials - numCorrectSequences) == 1 ? '' : 's'}.`;
					}
					break;
				}
				case 2: {
					const statusLbl = document.querySelector(".page-6 > .statusLbl");
					statusLbl.classList.remove("correct-msg");
					statusLbl.classList.add("incorrect-msg");
					statusLbl.textContent = "Something went wrong. Try again.";
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
					const requiredTrials = (await globalThis.pageConfig.configPromise).practicetrials;
					const numCorrectSequences = countCorrectSequences(activePiano, requiredTrials);
					if (numCorrectSequences == requiredTrials) {
						await globalThis.onNextPage(evt);
					} else {
						const statusLbl = document.querySelector(".page-11 > .statusLbl");
						statusLbl.classList.remove("incorrect-msg");
						statusLbl.classList.add("correct-msg");
						statusLbl.textContent = `Correct! Now play it again ${requiredTrials - numCorrectSequences} more time${(requiredTrials - numCorrectSequences) == 1 ? '' : 's'}.`;
					}
					break;
				}
				case 2: {
					const statusLbl = document.querySelector(".page-11 > .statusLbl");
					statusLbl.classList.remove("correct-msg");
					statusLbl.classList.add("incorrect-msg");
					statusLbl.textContent = "Something went wrong. Try again.";
					break;
				}
			}
		}

		if (!document.querySelector(".page-19").hidden) {
			const seqResult = checkStep19(activePiano);
			if (seqResult >= 4) {
				const numCorrectSequences = countCorrectSequences(activePiano, 1);
				const rolledDie = await checkProbabilityOfWin(activePiano);

				if (rolledDie && numCorrectSequences === 1) {
					globalThis.pageConfig.setup.score = globalThis.pageConfig.setup.score + 10;
					globalThis.pageConfig.setup.round = 21;
				} else {
					globalThis.pageConfig.setup.round = 20;
				}
				await navigateToPage(evt);
			}
		}
	}
}

async function splashWait(timeToWait, hideText) {
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

	return await prm;
}

function handleRound23() {
}

function handleRound24() {
	document.querySelector(".page-24 .scoreboard").textContent = `Your score: ${globalThis.pageConfig.setup.score} pts`;
}

async function navigateToPage(evt) {
	const round = globalThis.pageConfig.setup.round;
	const wasMouse = evt && (evt.type.startsWith("mouse") || evt.type.startsWith("click"));
	eventLog.push({ type: "startNextRound", time: performance.now(), round: round, trial: globalThis.pageConfig.setup.trial, mouse: wasMouse });

	for (let item of document.querySelectorAll("main > section")) {
		item.hidden = true;
	}

	await globalThis.pageConfig.save();

	document.querySelector(".page-" + parseInt(round)).hidden = false;
	
	if (round === 4) {
		const activePiano = document.querySelector("section.page-4 piano-player");
		await activePiano.playNextRound();
	} else if (round === 6) {
		document.getElementById("nextButton").disabled = true;
	} else if (round == 7) {
		document.getElementById("nextButton").disabled = false;
	} else if (round === 9) {
		const activePiano = document.querySelector("section.page-9 piano-player");
		await activePiano.playNextRound();
	} else if (round === 11) {
		document.getElementById("nextButton").disabled = true;
	} else if (round === 12) {
		document.getElementById("nextButton").hidden = false;
		document.getElementById("nextButton").disabled = false;
	} else if (round === 17) {
		document.getElementById("nextButton").hidden = true;
		document.getElementById("nextButton").disabled = true;
	} else if (round === 18) {
		document.getElementById("nextButton").hidden = true;
		document.getElementById("nextButton").disabled = true;
		await splashWait(0.5, true);
		await globalThis.onNextPage(evt);
	} else if (round === 19) {
		document.querySelector(".page-19 > countdown-clock").startTimer();
	} else if (round === 20 || round === 21 || round === 22) {
		document.querySelector(".page-19 > countdown-clock").stopTimer();
		document.getElementById("nextButton").hidden = false;
		document.getElementById("nextButton").disabled = false;
	} else if (round === 23) {
		document.getElementById("nextButton").hidden = true;
		document.getElementById("nextButton").disabled = true;
		const splashWaitPrm = wait(2000);
		await handleRound23();
		await splashWaitPrm;

		await globalThis.onNextPage(evt);
	} else if (round === 24) {
		document.getElementById("nextButton").hidden = true;
		document.getElementById("nextButton").disabled = true;
		handleRound24();
	}
}


export { wait, setupVolumeControl, setupIcons, checkStep4, checkStep6, countCorrectSequences, keyUpManager, keyDownManager, navigateToPage, timeoutManager };
