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
			updatedEventLogs.push({type: "correctSequence", time: performance.now(), sequence: correctSequence });
			res = 1;
			break;
		} else {
			if (!correctSequence.toLowerCase().startsWith(typedCharacters.toLowerCase())) {
				updatedEventLogs.push({type: "incorrectSequence", time: performance.now(), sequence: typedCharacters });
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

function checkStep13(piano) {
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
			updatedEventLogs.push({type: "correctSequence", time: performance.now(), sequence: correctSequence });
			break;
		} else {
			if (!correctSequence.toLowerCase().startsWith(typedCharacters.toLowerCase())) {
				wasIncorrectSequence = true;
				continue;
			}
		}
	}

	if (wasIncorrectSequence && notesPlayed === 4) {
		updatedEventLogs.push({type: "incorrectSequence", time: performance.now(), sequence: typedCharacters });
	}

	if (updatedEventLogs.length > 0) {
		for (const item of updatedEventLogs) {
			eventLog.push(item);
		}
	}

	return notesPlayed;
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

function gamePage(icon, evt) {
	globalThis.pageConfig.setup.round = 13;
	globalThis.pageConfig.setup.trial++;
	eventLog.push({ type: "startNextRound", time: performance.now(), round: 13, trial: globalThis.pageConfig.setup.trial });

	if (icon === 1) {
		document.querySelector(".page-13 > piano-player").notes = "gjhk";
		document.querySelector(".page-13 > .active-icon").src = "fractal1.png";
		document.querySelector(".page-13 > .statusLbl").textContent = "Play Sequence 1";
	} else {
		document.querySelector(".page-13 > piano-player").notes = "kgjh";
		document.querySelector(".page-13 > .active-icon").src = "fractal2.png";
		document.querySelector(".page-13 > .statusLbl").textContent = "Play Sequence 2";
	}

	document.querySelector(".page-12").hidden = true;
	document.querySelector(".page-14").hidden = true;
	document.querySelector(".page-15").hidden = true;
	document.querySelector(".page-13").hidden = false;
}

const pressedKeys = new Set();

async function keyDownManager(evt) {
	if (evt.repeat) {
		return;
	}
	
	if (pressedKeys.has(evt.key)) {
		return;
	} else {
		pressedKeys.add(evt.key);
	}

	const activePiano = document.querySelector(`section:not([hidden]) piano-player`);
	if (activePiano) {
		if (evt.key === "F1") {
			evt.preventDefault();
			evt.stopPropagation();
			await activePiano.playNextRound();
			return false;
		}
	
		await activePiano.keyNotePressed(evt);
	}
}


async function keyUpManager(evt, key) {
	pressedKeys.delete(key);

	if (!document.getElementById("nextButton").disabled) {
		if (key === "Return" || key === "Enter" || key === "Control" || key === "n" || key === "N") {
			await globalThis.onNextPage(evt);
			return;
		}
		if (!document.querySelector(".page-14").hidden || !document.querySelector(".page-15").hidden) {
			if (key === "1" || key === "2") {
				await globalThis.onNextPage(evt);
				return;
			}
		}
	}

	if (!document.querySelector(".page-12").hidden) {
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
				globalThis.onNextPage(evt);
			}
		}

		if (!document.querySelector(".page-9").hidden) {
			if (checkStep4(activePiano, "h")) {
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
					const requiredTrials = (await globalThis.pageConfig.configPromise).practicetrials;
					const numCorrectSequences = countCorrectSequences(activePiano, requiredTrials);
					if (numCorrectSequences == requiredTrials) {
						globalThis.onNextPage(evt);
					}
					const statusLbl = document.querySelector(".page-6 > .statusLbl");
					statusLbl.classList.remove("incorrect-msg");
					statusLbl.classList.add("correct-msg");
					statusLbl.textContent = `Correct! Now play it again ${requiredTrials - numCorrectSequences} more time${(requiredTrials - numCorrectSequences) == 1 ? '' : 's'}.`;
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
						globalThis.onNextPage(evt);
					}
					const statusLbl = document.querySelector(".page-11 > .statusLbl");
					statusLbl.classList.remove("incorrect-msg");
					statusLbl.classList.add("correct-msg");
					statusLbl.textContent = `Correct! Now play it again ${requiredTrials - numCorrectSequences} more time${(requiredTrials - numCorrectSequences) == 1 ? '' : 's'}.`;
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

		if (!document.querySelector(".page-13").hidden) {
			const seqResult = checkStep13(activePiano);
			if (seqResult >= 4) {
				const numCorrectSequences = countCorrectSequences(activePiano, 1);

				if (numCorrectSequences === 1) {
					globalThis.pageConfig.setup.round = 15;

					eventLog.push({ type: "startNextRound", time: performance.now(), round: globalThis.round });
					document.querySelector(".page-12").hidden = true;
					document.querySelector(".page-13").hidden = true;
					document.querySelector(".page-14").hidden = true;
					document.querySelector(".page-15").hidden = false;
					
					document.getElementById("nextButton").hidden = false;
					document.getElementById("nextButton").disabled = false;
				} else {
					globalThis.pageConfig.setup.round = 14;

					document.querySelector(".page-12").hidden = true;
					document.querySelector(".page-13").hidden = true;
					document.querySelector(".page-14").hidden = false;
					document.querySelector(".page-15").hidden = true;

					document.getElementById("nextButton").hidden = false;
					document.getElementById("nextButton").disabled = false;
				}
			}
		}
	}
}


export { wait, setupVolumeControl, setupIcons, checkStep4, checkStep6, countCorrectSequences, keyUpManager, keyDownManager };
