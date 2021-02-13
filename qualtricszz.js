
const pianoJson = {
	"keyboard": [
		{ "note": "A",  "octave": 0, "freq": 220.000000000000000,  "alignment":    0 },
		{ "note": "A#", "octave": 0, "freq": 233.081880759044958,  "alignment":   30 },
		{ "note": "B",  "octave": 0, "freq": 246.941650628062055,  "alignment":   45 },
		{ "note": "C",  "octave": 1, "freq": 261.625565300598634,  "alignment":   90 },
		{ "note": "C#", "octave": 1, "freq": 277.182630976872096,  "alignment":  120 },
		{ "note": "D",  "octave": 1, "freq": 293.664767917407560,  "alignment":  135 },
		{ "note": "D#", "octave": 1, "freq": 311.126983722080910,  "alignment":  165 },
		{ "note": "E",  "octave": 1, "freq": 329.627556912869929,  "alignment":  180 },
		{ "note": "F",  "octave": 1, "freq": 349.228231433003884,  "alignment":  225 },
		{ "note": "F#", "octave": 1, "freq": 369.994422711634398,  "alignment":  255 },
		{ "note": "G",  "octave": 1, "freq": 391.995435981749294,  "alignment":  270 },
		{ "note": "G#", "octave": 1, "freq": 415.304697579945138,  "alignment":  300 },
		{ "note": "A",  "octave": 1, "freq": 440.000000000000000,  "alignment":  315 },
		{ "note": "A#", "octave": 1, "freq": 466.163761518089916,  "alignment":  345 },
		{ "note": "B",  "octave": 1, "freq": 493.883301256124111,  "alignment":  360 },
		{ "note": "C",  "octave": 2, "freq": 523.251130601197269,  "alignment":  405 },
		{ "note": "C#", "octave": 2, "freq": 554.365261953744192,  "alignment":  435 },
		{ "note": "D",  "octave": 2, "freq": 587.329535834815120,  "alignment":  450 },
		{ "note": "D#", "octave": 2, "freq": 622.253967444161821,  "alignment":  480 },
		{ "note": "E",  "octave": 2, "freq": 659.255113825739859,  "alignment":  495 },
		{ "note": "F",  "octave": 2, "freq": 698.456462866007768,  "alignment":  540 },
		{ "note": "F#", "octave": 2, "freq": 739.988845423268797,  "alignment":  570 },
		{ "note": "G",  "octave": 2, "freq": 783.990871963498588,  "alignment":  600 },
		{ "note": "G#", "octave": 2, "freq": 830.609395159890277,  "alignment":  630 },
		{ "note": "A",  "octave": 2, "freq": 880.000000000000000,  "alignment":  645 },
		{ "note": "A#", "octave": 2, "freq": 932.327523036179832,  "alignment":  675 },
		{ "note": "B",  "octave": 2, "freq": 987.766602512248223,  "alignment":  690 },
		{ "note": "C",  "octave": 3, "freq": 1046.502261202394538, "alignment":  735 },
		{ "note": "C#", "octave": 3, "freq": 1108.730523907488384, "alignment":  765 },
		{ "note": "D",  "octave": 3, "freq": 1174.659071669630241, "alignment":  780 },
		{ "note": "D#", "octave": 3, "freq": 1244.507934888323642, "alignment":  810 },
		{ "note": "E",  "octave": 3, "freq": 1318.510227651479718, "alignment":  840 },
		{ "note": "F",  "octave": 3, "freq": 1396.912925732015537, "alignment":  885 },
		{ "note": "F#", "octave": 3, "freq": 1479.977690846537595, "alignment":  915 },
		{ "note": "G",  "octave": 3, "freq": 1567.981743926997176, "alignment":  945 },
		{ "note": "G#", "octave": 3, "freq": 1661.218790319780554, "alignment":  975 },
		{ "note": "A",  "octave": 3, "freq": 1760.000000000000000, "alignment":  990 },
		{ "note": "A#", "octave": 3, "freq": 1864.655046072359665, "alignment": 1020 },
		{ "note": "B",  "octave": 3, "freq": 1975.533205024496447, "alignment": 1035 },
		{ "note": "C",  "octave": 4, "freq": 2093.004522404789077, "alignment": 1080 },
		{ "note": "C#", "octave": 4, "freq": 2217.461047814976769, "alignment": 1110 },
		{ "note": "D",  "octave": 4, "freq": 2349.318143339260482, "alignment": 1140 },
		{ "note": "D#", "octave": 4, "freq": 2489.015869776647285, "alignment": 1170 },
		{ "note": "E",  "octave": 4, "freq": 2637.020455302959437, "alignment": 1200 },
		{ "note": "F",  "octave": 4, "freq": 2793.825851464031075, "alignment": 1245 },
		{ "note": "F#", "octave": 4, "freq": 2959.955381693075191, "alignment": 1275 },
		{ "note": "G",  "octave": 4, "freq": 3135.963487853994352, "alignment": 1305 },
		{ "note": "G#", "octave": 4, "freq": 3322.437580639561108, "alignment": 1335 },
		{ "note": "A",  "octave": 4, "freq": 3520.000000000000000, "alignment": 1350 },
		{ "note": "A#", "octave": 4, "freq": 3729.310092144719331, "alignment": 1380 },
		{ "note": "B",  "octave": 4, "freq": 3951.066410048992894, "alignment": 1395 }
	],
	"practicetrials": 5,
	"totaltrials": 180,
	"defaultOctave": 1,
	"keymap": [
		// {"key": "a", "note": "A", "octave": 0 },
		// {"key": "s", "note": "B", "octave": 0 },
		{"key": "d", "note": "C", "octave": 1 },
		{"key": "f", "note": "D" },
		{"key": "g", "note": "E" },
		{"key": "h", "note": "F" },
		{"key": "j", "note": "G" },
		{"key": "k", "note": "A" },
		{"key": "l", "note": "B" },
		{"key": ";", "note": "C", "octave": 2 },
		{"key": "r", "note": "C#" },
		{"key": "t", "note": "D#" },
		{"key": "u", "note": "F#" },
		{"key": "i", "note": "G#" },
		{"key": "o", "note": "A#" }
		// {"key": "w", "note": "A#", "octave": 0 }
	]
};

const pressedKeys = new Set();


Qualtrics.SurveyEngine.addOnload(function()
{
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


class ConfigManager {
	constructor() {

		this.flushCounter = 0;
		this.setup = {
			eventLog: [],
			round: 1,
			trial: 0,
			version: 1,
			score: 0,
			hintCount: 0,
		};

		this._config = null;
		this.configPromise = this.getConfig();
	}

	// EventLog contains the following parameters
	// type = keydown keyup startNextRound correctSequence
	// time = performance.now
	// mouse
	// key
	// round
	// trial
	// score
	// mcsScore
	// 

	getConfig() {
		return new Promise((resolve, reject) => {
			this._config = pianoJson;
			const headers = new Headers();
			headers.append("Content-Type", "application/x-www-form-urlencoded");
			const body = this.setup.id ? "id=" + this.setup.id : "";

			const probGen = new ProbabilityGenerator();
			this.probJson = probGen.GenerateProbabilities(this._config.totaltrials);
			this.flush();

			resolve(this._config);
		});
	}

	flush() {
		// sessionStorage.setup = JSON.stringify(this.setup);
	}

	fullSave() {
		const serialised = JSON.stringify(this.setup);

		Qualtrics.SurveyEngine.setEmbeddedData("taskResult", serialised);

	}

	save() {
		return new Promise((resolve, reject) => {
			this.flush();
			this.flushCounter++;
			if (this.flushCounter % 10 == 0) {
				this.fullSave();
			}
			resolve();
		});
	}
}

class ProbabilityGenerator {
	shuffle(a) {
		const randArray = new Uint16Array(a.length);
		crypto.getRandomValues(randArray);

		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(randArray[i] * (i + 1) / 65536.0);
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	GenerateProbabilities(trials) {
		const probabilities = new Array(trials);

		const contingencies = this.shuffle([0.5,0.7,0.9,0.3,0.1]);
		const blockLengths = this.shuffle([4, 6, 0, -4, -6]).map((x,i,a) => Math.floor(trials / a.length + x));

		let i = 0, j = 0;
		for (const item of blockLengths) {
			const probability = contingencies[i++];
			probabilities.fill(probability, j, j+item);
			j += item;
		}

		return { probability1: probabilities, probability2: probabilities.map(x => 1 - x) };
	}

}

class ProbabilityGeneratorzz {

	RandN(trials, candidates) {
		// Uses the Marsaglia algorithm for compatibility with matlab.
		let randArray = new Uint16Array(trials * candidates);
		crypto.getRandomValues(randArray);
		const randVector = new Array(trials * candidates);

		let i = 0, j = 0;
		do {
			let y2;
			let use_last = false;
			let y1;
			if (use_last) {
				y1 = y2;
				use_last = false;
			}
			else {
				let x1, x2, w;
				do {
					if (i >= randArray.length - 1) {
						crypto.getRandomValues(randArray);
						i = 0;
					}
					x1 = 2.0 * randArray[i] / 65536.0 - 1.0;
					x2 = 2.0 * randArray[i + 1] / 65536.0 - 1.0;
					w  = x1 * x1 + x2 * x2;
					i++;
				} while (w >= 1.0);
				w = Math.sqrt( (-2.0 * Math.log(w)) / w );
				y1 = x1 * w;
				y2 = x2 * w;
				use_last = true;
			}
			randVector[j++] = y2;
		} while (j < trials * candidates);

		const resArray = new Array(candidates);
		for (let k = 0; k < candidates; k++) {
			resArray[k] = randVector.slice(k*trials, k*trials+trials);
		}
		return resArray;
	}

	CumSum(x) {
		const arr = new Array(x.length);
		for (let k = 0; k < x.length; k++) {
			const col = new Array(x[k].length);
			let sum = x[k][0];
			col[0] = sum;
			let i = 1;
			while (i < x[k].length) {
				sum += x[k][i];
				col[i] = sum;
				i++;
			}
			arr[k] = this.Rerange(col);
		}
		return arr;
	}

	Rerange(input) {
		const min = Math.min(...input);
		const max = Math.max(...input);
		return input.map(x => (x - min) / (max - min));
	}

	TotalDistance(arr1, arr2) {
		let sum = 0;
		for (let i = 0; i < arr1.length; i++) {
			const diff = arr2[i] - arr1[i];
			sum += Math.abs(diff);
		}
		return sum;
	}

	GenerateProbabilities(trials, maxAttempts = 10) {
		do {
			const x = this.RandN(trials, 70);
			const y = this.CumSum(x);

			const my = y.map((q, i) => q.reduce((a, b) => a + b, 0) / q.length);
			let minDistance = null;
			for (let i = 0; i < my.length; i++) {
				for (let j = 0; j < my.length; j++) {
					if (i == j) {
						continue;
					}

					const distance = my[i] - my[j];

					if (my[i] < 0.5) {
						continue;
					}

					if (this.TotalDistance(y[i], y[j]) < trials / 3.5) {
						continue;
					}

					if (!minDistance || Math.abs(distance) < Math.abs(minDistance.distance)) {
						minDistance = { "i": i, "j": j, "distance": distance };
					}
				}
			}

			if (minDistance) {
				return { probability1: y[minDistance.i], probability2: y[minDistance.j] };
			}
		} while (maxAttempts-- > 0);
	}
}


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

function checkProbabilityOfWin(activePiano) {
	const activeProbability = globalThis.pageConfig.probJson.probability1[globalThis.pageConfig.setup.trial];
	const unchosenProbability = globalThis.pageConfig.probJson.probability2[globalThis.pageConfig.setup.trial];

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
	globalThis.pageConfig.setup.round = 19;
	globalThis.pageConfig.setup.trial++;
	document.querySelector(".page-19 > piano-player").dataset.sequence = icon;

	const activePiano = document.querySelector(".page-19 > piano-player");
	if (icon === 1) {
		activePiano.notes = "gjhk";
		document.querySelector(".page-19 > .active-icon").src = "https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_byJfzLUIsrGJw6W&V=1612980021";
		document.querySelector(".page-19 > .statusLbl").textContent = "Play Sequence 1";
	} else {
		activePiano.notes = "kgjh";
		document.querySelector(".page-19 > .active-icon").src = "https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_eOPh8J8BPOgcJvM&V=1612980058";
		document.querySelector(".page-19 > .statusLbl").textContent = "Play Sequence 2";
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
							statusLbl.textContent = "Correct! Now play it again " + (requiredTrials - numCorrectSequences) + " more time";
							if ((requiredTrials - numCorrectSequences) != 1) {
								statusLbl.textContent = statusLbl.textContent + 's';
							}
						}
					});
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
					globalThis.pageConfig.configPromise.then(config => {
						const requiredTrials = (config).practicetrials;
						const numCorrectSequences = countCorrectSequences(activePiano, requiredTrials);
						if (numCorrectSequences == requiredTrials) {
							globalThis.onNextPage(evt);
						} else {
							const statusLbl = document.querySelector(".page-11 > .statusLbl");
							statusLbl.classList.remove("incorrect-msg");
							statusLbl.classList.add("correct-msg");
							statusLbl.textContent = "Correct! Now play it again " + (requiredTrials - numCorrectSequences) + " more time";
							if ((requiredTrials - numCorrectSequences) != 1) {
								statusLbl.textContent = statusLbl.textContent + 's';
							}
						}
					});
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
					unchosenProbability: rolledDie.unchosenProbability,
					mcsScore: rolledDie.mcsScore
				});
				if (roundResult === "winRound") {
					globalThis.pageConfig.setup.score = globalThis.pageConfig.setup.score + 10;
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
							hints.innerHTML = "Hint: <strong>wrong notes</strong> played.<br/><i>Press 'q' to be reminded of the sequence</i>";
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

function handleRound24() {
	return new Promise(resolve => {
		const trial = globalThis.pageConfig.setup.trial;
		globalThis.pageConfig.configPromise.then(config => {
			document.querySelector(".page-24 .scoreboard").textContent =
				"Round " + trial + " of " + config.totaltrials + ".";
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
	const roundWaitTime = 3000;
	const round = globalThis.pageConfig.setup.round;
	const wasMouse = evt && (evt.type.startsWith("mouse") || evt.type.startsWith("click") || evt.type.startsWith("touch"));
	eventLog.push({ type: "startNextRound", time: performance.now(), round: round, trial: globalThis.pageConfig.setup.trial, mouse: wasMouse });

	for (let item of document.querySelectorAll(".core-experiment section[class*='page-'")) {
		item.hidden = true;
	}

	const prm1 = globalThis.pageConfig.save();

	prm1.then(() => {
		document.querySelector(".page-" + parseInt(round)).hidden = false;

		if (round === 1) {
			document.getElementById("nxtbtn").hidden = false;
			document.getElementById("nxtbtn").disabled = false;
		} else if (round === 2) {
			document.getElementById("nxtbtn").textContent = "Click here or press space to continue";
			document.getElementById("nxtbtn").hidden = true;
			document.getElementById("nxtbtn").disabled = true;
			wait(1000).then(() => {
				document.getElementById("nxtbtn").hidden = false;
				document.getElementById("nxtbtn").disabled = false;
			});
		} else if (round === 3) {
			document.getElementById("nxtbtn").textContent = "Click here or press any key to continue";
			document.getElementById("nxtbtn").hidden = true;
			document.getElementById("nxtbtn").disabled = true;
			wait(1000).then(() => {
				document.getElementById("nxtbtn").hidden = false;
				document.getElementById("nxtbtn").disabled = false;
			});
		} else if (round === 4) {
			const activePiano = document.querySelector("section.page-4 piano-player");
			activePiano.playNextRound();
			document.getElementById("nxtbtn").textContent = "Click here or press space to continue";
		} else if (round == 5) {
			document.getElementById("nxtbtn").textContent = "Click here or press any key to continue";
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
			document.getElementById("nxtbtn").textContent = "Click here or press space to continue";
			const activePiano = document.querySelector("section.page-9 piano-player");
			activePiano.playNextRound();
		} else if (round === 10) {
			document.getElementById("nxtbtn").textContent = "Click here or press any key to continue";
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
			document.getElementById("nxtbtn").textContent = "Continue >";
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
			handleRound24();
		}
	});

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



class CountDownClockElement extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "closed" });

		this.stopTimer();
	}

	static get observedAttributes() {
		return ["width", "hidetext", "time", "autostart"];
	}

	attributeChangedCallback(name, oldVal, newVal) {
		if (oldVal === newVal) {
			return;
		}
		if (name === "width") {
			this.width = newVal;
		}
		if (name === "hidetext") {
			this.hideText = newVal;
		}
		if (name === "time") {
			this.time = parseFloat(newVal);
		}
		if (name === "autostart") {
			this.autostart = newVal;
		}
	}

	connectedCallback() {
		this.paused = false;
		this.timeLeft = this.time * 1000;

        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = this.width;
        this.context = canvas.getContext("2d");
        this.shadow.appendChild(canvas);

		if (this.autostart) {
			this.startTimer();
		}
	}

	disconnectedCallback() {
		this.stopTimer();
	}

	formatTimeLeft(timeLeft) {
		let seconds = Math.ceil(this.timeLeft / 1000.0);
		return seconds;
	}

	pause() {
		this.paused = true;
	}

	resume() {
		this.paused = false;
	}

	startTimer() {
		this.paused = false;
		this.start = null;
		this.timeLeft = this.time * 1000;
		this.shadow.querySelector("canvas").hidden = false;

		this.started = true;
		this.frameAdvance = (timestamp) => {
			if (!this.started) {
				return false;
			}
			if (this.start === null) {
				this.start = timestamp;
			}
			const elapsed = timestamp - this.start;
			this.start = timestamp;

			if (this.paused) {
				requestAnimationFrame(this.frameAdvance);
				return;
			}
			this.timeLeft -= elapsed;

			this.updateClock();

			if (this.timeLeft < 1) {
				this.triggerTimeOut();
				this.start = null;
			} else {
				requestAnimationFrame(this.frameAdvance);
			}
		};
		requestAnimationFrame(this.frameAdvance);
	}

	stopTimer() {
		this.start = null;
		this.timeLeft = this.time;
		this.started = false;
		this.frameAdvance = null;
	}

	updateClock() {
		const timeFraction = this.timeLeft / this.time / 1000.0;
        const radius = this.width/2;
        this.context.clearRect(0, 0, this.width, this.width);
        this.context.beginPath();
        this.context.moveTo(radius, radius);
		const currentTime = timeFraction;

        const gradient = this.context.createRadialGradient(radius, radius, 3, radius, radius, radius);
        gradient.addColorStop(0, "#ffffff");

        gradient.addColorStop(1, "hsl(" + Math.round(currentTime*120) + ", 100%, 50%)");

        this.context.fillStyle = gradient;
        this.context.arc(radius, radius, radius, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * currentTime, false);
        this.context.fill();

		if (!this.hideText) {
			const timeLeftText = this.formatTimeLeft(this.timeLeft);
			const dims = this.context.measureText(timeLeftText);
			this.context.beginPath();
			this.context.font = "24px sans-serif";
			this.context.fillStyle = "black";
			this.context.moveTo(0,0);
			this.context.textAlign = "center";
			this.context.fillText(timeLeftText, radius, radius+dims.actualBoundingBoxAscent/2, 150, 150);
			this.context.fill();
		}
	}

	triggerTimeOut() {
		if (this.started) {
			const detail = {

			};
			this.shadow.querySelector("canvas").hidden = true;
			this.dispatchEvent(new CustomEvent("timeout", { bubbles: true, detail: detail }));
		}
	}

	get width() {
		if(!this.hasAttribute("width")) {
			return 50;
		} else {
			return this.getAttribute("width");
		}
	}
	set width(value) {
		this.setAttribute("width", value);
	}

	get hideText() {
		return this.hasAttribute("hidetext");
	}
	set hideText(value) {
		if (value) {
			this.setAttribute("hidetext", value);
		} else {
			this.removeAttribute("hidetext");
		}
	}

	get autostart() {
		return this.hasAttribute("autostart");
	}
	set autostart(value) {
		if (value) {
			this.setAttribute("autostart", value);
		} else {
			this.removeAttribute("autostart");
		}
	}

	get time() {
		return parseFloat(this.getAttribute("time"));
	}
	set time(value) {
		const attrib = value.toFixed(2);
		this.setAttribute("time", value);
	}
}


function iosShimHack() {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	return window.AudioContext;
}

class PianoPlayerElement extends HTMLElement {
	constructor() {
		super();
		this.oscList = [];
		this.keymap = null;
		this.defaultOctave = null;
		this._audioContextRefCount = 0;
		this.resizeObserver = new ResizeObserver(entries => this.onResize(entries));

		this.currentNote = 0;

		this.shadow = this.attachShadow({ mode: "open" });
		const kbdElem = document.createElement("section");
		kbdElem.className = "keyboard";
		const blkNotes = document.createElement("div");
		blkNotes.className = "black-notes";
		const whtNotes = document.createElement("div");
		whtNotes.className = "white-notes";
		kbdElem.appendChild(blkNotes);
		kbdElem.appendChild(whtNotes);
		this.shadow.appendChild(kbdElem);

		const linkElem = document.createElement("style");
		linkElem.innerHTML =
`
button:focus { outline: none; }

.keyboard { min-height: 230px; user-select: none; }
.white-notes .mapped-to { color: #eeeeee; font-size: 0.5rem; }
.white-notes button { height: 225px; width: 45px; position: absolute; z-index: 1; border: 1px solid #404040; background-color: ivory; display: inline-grid; place-content: end center; }
.white-notes button:hover { background-color: #ddd5e8; }
.white-notes button[data-pressed="yes"] { background-color: #ddd5e8; }
.black-notes button { position: absolute; height: 135px; width: 30px; z-index: 2; background-color: #404040; font-size: 1em; color: #cccccc; display: inline-grid; place-content: end center; padding-bottom: 0.25rem; }
.black-notes button[data-pressed="yes"] { background-color: #808080; border: 1px solid ivory; }
.black-notes button:hover { background-color: #808080; border: 1px solid ivory; }
.black-notes .mapped-to { color: #666666; font-size: 0.5rem; }`;

		this.shadow.appendChild(linkElem);
	}

	connectedCallback() {
		this.currentNote = 0;

		globalThis.pageConfig.configPromise.then(gameConfig => {
			this.resizeObserver.observe(document.body);
			this.setup(gameConfig);
			this.onResize(this);
		});
	}

	disconnectedCallback() {
		this.clearKeyStates();
		for (const item of this.hookedEventListeners) {
			item.elm.removeEventListener(item.name, item.evt);
		}
		this.resizeObserver.disconnect();
	}

	attributeChangedCallback(name, oldVal, newVal) {
		if (oldVal === newVal) {
			return;
		}
		if (name === "volume-control") {
			this.volumeControl = newVal;
		}
		if (name === "notes") {
			this.notes = newVal;
		}
		if (name === "pace") {
			this.pace = newVal;
		}
	}

	static get observedAttributes() {
		return ["volume-control", "notes", "pace"];
	}

	playNextRound () {
		const nextSequence = [...this.notes.slice(this.currentNote, this.currentNote + 4)];
		this.currentNote = (this.currentNote + 4) % this.notes.length;

		return this.playSequence(nextSequence);
	}

	setup(gameconfig) {
		const whiteKeyboard = this.shadow.querySelector(".keyboard .white-notes");
		const blackKeyboard = this.shadow.querySelector(".keyboard .black-notes");
		this.keymap = gameconfig.keymap;
		this.defaultOctave = gameconfig.defaultOctave;

		this.keyboard = gameconfig.keyboard;
		for (let item of this.keyboard) {
			const matchedKey = this.keymap.find(x => x.note === item.note && ((x.octave === undefined || x.octave === null) && item.octave === this.defaultOctave || x.octave === item.octave));
			if (!matchedKey) {
				continue;
			}
			const musicKey = document.createElement("button");
			musicKey.dataset.note = item.note;
			musicKey.dataset.octave = item.octave;
			musicKey.dataset.freq = item.freq;
			musicKey.dataset.key = matchedKey.key;

			const keyLabel = document.createElement("span");
			keyLabel.className = "mapped-to";
			musicKey.textContent = matchedKey.key;
			keyLabel.textContent = item.note;
			musicKey.appendChild(keyLabel);

			this.hookEvents(musicKey);

			if (item.note.length > 1) {
				musicKey.className = "key black-key";
				blackKeyboard.appendChild(musicKey);
			} else {
				musicKey.className = "key white-key";
				whiteKeyboard.appendChild(musicKey);
			}
		}
	}

	keyNotePressed(evt, key) {
		const matchedKey = this.keymap.find(x => x.key === key);
		if (matchedKey) {
			const octave = (matchedKey.octave !== undefined) ? matchedKey.octave : this.defaultOctave;
			const note = matchedKey.note;
			const wasMouse = evt.type.startsWith("mouse") || evt.type.startsWith("click") || evt.type.startsWith("touch");
			eventLog.push({ type: "keydown", time: performance.now(), key: key, mouse: wasMouse, round: globalThis.pageConfig.setup.round, trial: globalThis.pageConfig.setup.trial });

			const matchedElem = this.shadow.querySelector(".keyboard .key[data-note='" + note + "'][data-octave='" + octave + "']");
			this.oscList[octave + note] = this.playTone(matchedElem.dataset.freq);
			matchedElem.dataset.pressed = "yes";
		}
	}

	keyNoteUnPressed(evt, key) {
		const matchedKey = this.keymap.find(x => x.key === key);
		if (matchedKey) {
			const octave = (matchedKey.octave !== undefined) ? matchedKey.octave : this.defaultOctave;
			const note = matchedKey.note;
			const wasMouse = evt.type.startsWith("mouse") || evt.type.startsWith("click") || evt.type.startsWith("touch");
			const matchedElem = this.shadow.querySelector(".keyboard .key[data-note='" + note + "'][data-octave='" + octave + "']");
			if (matchedElem) {
				const dataset = matchedElem.dataset;
				matchedElem.dataset.pressed = "";
				eventLog.push({ type: "keyup", time: performance.now(), key: key, mouse: wasMouse, round: globalThis.pageConfig.setup.round, trial: globalThis.pageConfig.setup.trial });
			}
		}
	}

	clearKeyStates() {
		for (const matchedElem of this.shadow.querySelectorAll(".keyboard .key")) {
			matchedElem.dataset.pressed = "";
		}
	}

	hookEvents(keyElement) {
		this.hookedListeners = [
			{elm: keyElement, name: "touchstart", evt: keyElement.addEventListener("touchstart", evt => this.notePressed(evt), false) },
			{elm: keyElement, name: "touchend", evt: keyElement.addEventListener("touchend", evt => this.noteReleased(evt), false) },
			{elm: keyElement, name: "mousedown", evt: keyElement.addEventListener("mousedown", evt => this.notePressed(evt), false) },
			{elm: keyElement, name: "mouseup", evt: keyElement.addEventListener("mouseup", evt => this.noteReleased(evt), false) },
			{elm: keyElement, name: "mouseover", evt: keyElement.addEventListener("mouseover", evt => this.notePressed(evt), false) },
			{elm: keyElement, name: "mouseleave", evt: keyElement.addEventListener("mouseleave", evt => this.noteReleased(evt), false) }
		];
	}


	playSequence(sequence) {
		if (sequence.length == 0) {
			return;
		}
		const [item] = sequence.splice(0, 1);

		const matchedKey = this.keymap.find(x => x.key === item);
		const octave = (matchedKey.octave !== undefined) ? matchedKey.octave : this.defaultOctave;
		const note = matchedKey.note;

		const matchedElem = this.shadow.querySelector(".keyboard .key[data-note='" + note + "'][data-octave='" + octave + "']");
		this.oscList[octave + note] = this.playTone(matchedElem.dataset.freq);
		matchedElem.dataset.pressed = "yes";

		const pace = parseFloat(this.pace) * 1000.0;
		return wait (pace).then(() => {
			matchedElem.dataset.pressed = "";
			return this.playSequence(sequence);
		});
	}

	get volumeControl() {
		return this.getAttribute("volumecontrol");
	}
	set volumeControl(val) {
		this.setAttribute("volumeControl", val);
	}

	get notes() {
		return this.getAttribute("notes");
	}
	set notes(val) {
		this.setAttribute("notes", val);
	}

	get pace() {
		return this.getAttribute("pace");
	}
	set pace(val) {
		this.setAttribute("pace", val);
	}

	playTone(freq) {
		if (this._audioContextRefCount === 0) {
			console.log("creating context");
			this._audioContextRefCount = 1;
			const audCT = iosShimHack();
			this._audioContext = new audCT();
		} else {
			console.log("reusing context");
			this._audioContextRefCount ++;
		}

		const ctt = this._audioContext;
		const osc = ctt.createOscillator();

		const decayRate = 1.5;
		const envelope = ctt.createGain();

		osc.frequency.value = parseFloat(freq);
		osc.type = "triangle";
		envelope.gain.value = this.volumeControl;

		envelope.gain.exponentialRampToValueAtTime(0.001, ctt.currentTime + decayRate);

		osc.connect(envelope);
		envelope.connect(ctt.destination);

		osc.start(ctt.currentTime);

		setTimeout(() => {
			const timeout = (envelope.gain.value == this.volumeControl) ? 250 : 2000;
			console.log(`chosen timeout ${timeout}`);
			setTimeout(() => {
				osc.stop(ctt.currentTime);
				osc.disconnect(envelope);
				envelope.disconnect(ctt);

				if (--this._audioContextRefCount === 0) {
					console.log("Closing Context");
					this._audioContext.close();
					this._audioContext = null;
				} else {
					console.log(`Leaving context open because ${this.audioContextRefCount} instance(s) still using it`);
				}
			}, timeout);
		}, 10);

		return osc;
	}

	notePressed(event) {
		if (event.buttons & 1 || event.type.startsWith("touch")) {
			const dataset = event.currentTarget.dataset;
			keyDownManager(event, dataset.key);
		}

	}

	noteReleased(event) {
		const dataset = event.currentTarget.dataset;

		keyUpManager(event, dataset.key);
	}

	onResize(entries) {
		const enabledKeys = this.keyboard.filter(x => this.hasKey(x, this.keymap));
		const deviceFactor = document.documentElement.clientWidth > 400 ? 1.0 : 0.75;
		for (const musicKey of this.shadow.querySelectorAll(".key")) {
			const matchedKey = this.keyboard.find(x => x.freq == musicKey.dataset.freq);
			if (!matchedKey) {
				continue;
			}
			
			const leftMostNotePosition = this.getFirstKey(enabledKeys);
			const keyboardWidth = this.getKeyboardWidth(enabledKeys);
			let leftPos = "calc(50% + ";
			leftPos += matchedKey.alignment * deviceFactor;
			leftPos += "px - ";
			leftPos += leftMostNotePosition * deviceFactor;
			leftPos += "px - ";
			leftPos += keyboardWidth / 2;
			leftPos += "px)";
			musicKey.style.left = leftPos;
		}
	}

	getKeyboardWidth(keyboard) {
		const max = keyboard.map(x => x.alignment).reduce((a,b) => Math.max(a, b));
		const min = keyboard.map(x => x.alignment).reduce((a,b) => Math.min(a, b));
		return max - min;
	}

	getFirstKey(keyboard) {
		const min = keyboard.map(x => x.alignment).reduce((a,b) => Math.min(a, b));
		return min;
	}

	hasKey(item, keymap) {
		const matchedKey = keymap.find(x => x.note === item.note && ((x.octave === undefined || x.octave === null) && item.octave === this.defaultOctave || x.octave === item.octave));
		return !(!matchedKey);
	}
}

function codaGame() {
	return new Promise((resolve) => {
		for (let item of document.querySelectorAll(".core-experiment section[class*='page-'")) {
			item.hidden = true;
		}

		globalThis.pageConfig.fullSave();
		document.querySelector("#NextButton").hidden = false;
		document.querySelector("#NextButton").click();
		resolve();
	});
}


	function buildHtml() {
		return `
		<div class="core-experiment">
			<aside class="settingsBar">
				<label>Volume:
					<input type="range" min="0.0" max="1.0" step="0.01" value="0.5" name="volume" />
				</label>
			</aside>
			<div class="core-container">
				<section class="page-1">
					<h1>Training phase</h1>
				</section>
				<section class="page-2" hidden="hidden">
					<piano-player notes="kgjh" pace="0.5" volumecontrol="0.5"></piano-player>
					<p>Place the index, middle, ring, little fingers of your right hand on keyboard keys g-h-j-k. Warm up by pressing the keys up and down in any order, but not simultaneously. Pay attention to the little finger, it should also comfortably press the corresponding key (k). Make sure you hear the tone of each key, at a comfortable sound level. Adjust the volume if you don’t hear the tones.</p>
					<iframe width="640" height="384" src="https://www.youtube.com/embed/kIyEu2Sb8_A?playlist=kIyEu2Sb8_A&controls=0&disablekb=1&loop=1&modestbranding=1&iv_load_policy=3" frameborder="0" allowfullscreen></iframe>
				</section>
				<section class="page-3" hidden="hidden">
					<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_byJfzLUIsrGJw6W&V=1612980021" alt="Pink button" style="width: 150px; height; 150px; float: right; padding-bottom: 1em;" />
					<p>Now you are going to practice sequence 1, represented by this image:</p>
					<p>Sequence 1 consists of four key presses, in this order:</p>
					<h2 class="sequence-display">g – j – h – k</h2>
					<p>(that is, index – ring – middle – little finger)</p>
					<p><iframe width="640" height="384" src="https://www.youtube.com/embed/CP41P5YggME?playlist=CP41P5YggME&controls=0&disablekb=1&loop=1&modestbranding=1&iv_load_policy=3" frameborder="0" allowfullscreen></iframe></p>
				</section>

				<section class="page-4" hidden="hidden">
					<piano-player notes="gjhk" pace="0.5" volumecontrol="0.5"></piano-player>
					<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_byJfzLUIsrGJw6W&V=1612980021" alt="Pink button" style="width: 150px; height; 150px; float: right;" />
					<p>Sequence 1 consists of four key presses, in this order:</p>
					<h2 class="sequence-display">g – j – h – k</h2>
					<p>(that is, index – ring – middle – little finger)</p>
					<p>Try it out at a comfortable speed, you can practice it slowly now, to make sure the order is clear.</p>
					<p>Take a little break of 1-2 seconds between each performance of the sequence. You can practice it up to 10 times.</p>
					<span id="steppedGame">Press the 'q' key to have the computer remind you of the sequence</span>
					<p>
					<iframe width="640" height="384" src="https://www.youtube.com/embed/CP41P5YggME?playlist=CP41P5YggME&controls=0&disablekb=1&loop=1&modestbranding=1&iv_load_policy=3" frameborder="0" allowfullscreen></iframe>
					</p>
				</section>

				<section class="page-5" hidden="hidden">
					<p>Was it enough practice? Can you remember the sequence?</p>
					<p>&nbsp;</p>
					<p>&nbsp;</p>
					<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_byJfzLUIsrGJw6W&V=1612980021" alt="Pink button" style="width: 150px; height; 150px;" />
				</section>

				<section class="page-6" hidden="hidden">
					<piano-player notes="gjhk" pace="0.5" volumecontrol="0.5"></piano-player>
					<p class="statusLbl">Try it out! Play it once at a time and wait for the computer to tell you whether it is correct.</p>
					<p>Hint: It starts with the right index pressing keyboard letter g.</p>
					<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_byJfzLUIsrGJw6W&V=1612980021" alt="Pink button" style="width: 150px; height; 150px;" />
				</section>

				<section class="page-7" hidden="hidden">
					<p>Now you are going to practice sequence 2, represented by this image:</p>
					<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_eOPh8J8BPOgcJvM&V=1612980058" alt="Yellow button" style="width: 150px; height; 150px;" />
				</section>

				<section class="page-8" hidden="hidden">
					<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_eOPh8J8BPOgcJvM&V=1612980058" alt="Yellow button" style="width: 150px; height; 150px; float: right; padding-bottom: 1em;" />
					<p>Sequence 2 consists of four key presses, in this order:</p>
					<h2 class="sequence-display">k – g – j – h</h2>
					<p>(that is, little - index – ring – middle finger)</p>
				</section>

				<section class="page-9" hidden="hidden">
					<piano-player notes="kgjh" pace="0.5" volumecontrol="0.5"></piano-player>
					<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_eOPh8J8BPOgcJvM&V=1612980058" alt="Yellow button" style="width: 150px; height; 150px; float: right; padding-bottom: 1em;" />
					<p>Sequence 2 consists of four key presses, in this order:</p>
					<h2 class="sequence-display">k – g – j – h</h2>
					<p>(that is, little - index – ring – middle finger)</p>
					<p>Try it out at a comfortable speed, you can practice it slowly now, to make sure the order is clear.</p>
					<p>Take a little break of 1-2 seconds between each performance of the sequence. You can practice it up to 10 times.</p>
					<span id="steppedGame">Press the 'q' key to have the computer remind you of the sequence</span>
				</section>

				<section class="page-10" hidden="hidden">
					<p>Was it enough practice? Can you remember the sequence?</p>
					<p>&nbsp;</p>
					<p>&nbsp;</p>
					<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_eOPh8J8BPOgcJvM&V=1612980058" alt="Yellow button" style="width: 150px; height; 150px;" />
				</section>

				<section class="page-11" hidden="hidden">
					<piano-player notes="kgjh" pace="0.5" volumecontrol="0.5"></piano-player>
					<p class="statusLbl">Try it out! Play it once at a time and wait for the computer to tell you whether it is correct.</p>
					<p>Hint: It starts with the right index pressing keyboard letter k.</p>
					<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_eOPh8J8BPOgcJvM&V=1612980058" alt="Yellow button" style="width: 150px; height; 150px;" />
				</section>

				<section class="page-12" hidden="hidden">
					<p>The training phase is over. Let's start with the real experiment.</p>
				</section>

				<section class="page-13" hidden="hidden">
					<h1>Experiment Main Phase.</h1>
				</section>

				<section class="page-14" hidden="hidden">
					<h1>Experiment Main Phase.</h1>
					<p>Now you will see the images representing sequence 1 and sequence 2 on the screen.</p>
					<div class="image-position">
						<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_byJfzLUIsrGJw6W&V=1612980021" alt="Pink button" style="width: 150px; height; 150px;" />
						<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_eOPh8J8BPOgcJvM&V=1612980058" alt="Yellow button" style="width: 150px; height; 150px;" />
					</div>
					<p>Each time you see both, you have to decide whether you play sequence 1 or sequence 2.</p>
				</section>

				<section class="page-15" hidden="hidden">
					<h1>Experiment Main Phase.</h1>
					<p>Now you will see the images representing sequence 1 and sequence 2 on the screen.</p>
					<div class="image-position">
						<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_byJfzLUIsrGJw6W&V=1612980021" alt="Pink button" style="width: 150px; height; 150px;" />
						<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_eOPh8J8BPOgcJvM&V=1612980058" alt="Yellow button" style="width: 150px; height; 150px;" />
					</div>
					<p>Each time you see both, you have to decide whether you play sequence 1 or sequence 2.</p>
					<p>Then you will simply play the sequence you choose on that attempt. Once you play the sequence, you will see whether you
					obtain a reward (10 points) or not.</p>
				</section>

				<section class="page-16" hidden="hidden">
					<h1>Experiment Main Phase.</h1>
					<p>Now you will see the images representing sequence 1 and sequence 2 on the screen.</p>
					<div class="image-position">
						<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_byJfzLUIsrGJw6W&V=1612980021" alt="Pink button" style="width: 150px; height; 150px;" />
						<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_eOPh8J8BPOgcJvM&V=1612980058" alt="Yellow button" style="width: 150px; height; 150px;" />
					</div>
					<p>Each time you see both, you have to decide whether you play sequence 1 or sequence 2.</p>
					<p>Then you will simply play the sequence you choose on that attempt. Once you play the sequence, you will see whether you
					obtain a reward (10 points) or not.</p>
					<p>Your aim is to obtain as many points as possible at the end of this study, so play the sequence you think will more
					likely give you reward!</p>
				</section>

				<section class="page-17" hidden="hidden">
					<h1>Experiment Main Phase.</h1>
					<p>Now you will see the images representing sequence 1 and sequence 2 on the screen.</p>
					<div class="image-position">
						<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_byJfzLUIsrGJw6W&V=1612980021" alt="Pink button" style="width: 150px; height; 150px;" />
						<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_eOPh8J8BPOgcJvM&V=1612980058" alt="Yellow button" style="width: 150px; height; 150px;" />
					</div>
					<p>Each time you see both, you have to decide whether you play sequence 1 or sequence 2.</p>
					<p>Then you will simply play the sequence you choose on that attempt. Once you play the sequence, you will see whether you
					obtain a reward (10 points) or not.</p>
					<p>Your aim is to obtain as many points as possible at the end of this study, so play the sequence you think will more
					likely give you reward!</p>
					<p>Careful though: The reward (points) associated with each sequence will change from time to time. So pay attention
					and adapt your decisions if you think that the conditions changed.</p>
				</section>

				<section class="page-18" hidden="hidden">
					<h1>Experiment Main Phase.</h1>
					<p>Now you will see the images representing sequence 1 and sequence 2 on the screen.</p>
					<div class="image-position">
						<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_byJfzLUIsrGJw6W&V=1612980021" class="clickable" alt="Pink button" style="width: 150px; height; 150px;" data-page="1" />
						<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_eOPh8J8BPOgcJvM&V=1612980058" class="clickable" alt="Yellow button" style="width: 150px; height; 150px;" data-page="2" />
					</div>
					<p>Each time you see both, you have to decide whether you play sequence 1 or sequence 2.</p>
					<p>Then you will simply play the sequence you choose on that attempt. Once you play the sequence, you will see whether you
					obtain a reward (10 points) or not.</p>
					<p>Your aim is to obtain as many points as possible at the end of this study, so play the sequence you think will more
					likely give you reward!</p>
					<p>Careful though: The reward (points) associated with each sequence will change from time to time. So pay attention
					and adapt your decisions if you think that the conditions changed.</p>
					<p>Now</p>
					<p>Start playing sequence 1 (hint: it starts with a &quot;g&quot;).</p>
					<p>Or</p>
					<p>Start playing sequence 2 (hint: it starts with a &quot;k&quot;).</p>
				</section>

				<section class="page-19" hidden="hidden">
					<piano-player notes="kgjh" pace="0.5" volumecontrol="0.5"></piano-player>
					<countdown-clock width="100" time="5.0"></countdown-clock>
					<p class="statusLbl">Play sequence.</p>
					<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_eOPh8J8BPOgcJvM&V=1612980058" class="active-icon" alt="Yellow button" style="width: 150px; height; 150px;" />
				</section>

				<section class="page-20" hidden="hidden">
					<h2 class="statusLbl incorrect-msg">You earned 0 points.</h2>
					<p class="hint-text" hidden="hidden"></p>
				</section>

				<section class="page-21" hidden="hidden">
					<h2 class="statusLbl correct-msg">You earned 10 points!</h2>
				</section>

				<section class="page-22" hidden="hidden">
					<h2 class="statusLbl incorrect-msg">You ran out of time to play the sequence, and lost the points.</h2>
				</section>

				<section class="page-23" hidden="hidden">
					<h2>+</h2>
				</section>

				<section class="page-24" hidden="hidden">
					<p class="scoreboard">Your score: </p>
					<h1>Sequence 1 or Sequence 2?</h1>
					<div class="image-position">
						<figure>
							<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_byJfzLUIsrGJw6W&V=1612980021" class="clickable" alt="Pink button" style="width: 150px; height; 150px;" data-page="1" />
							<figcaption>(hint: it starts with a &quot;g&quot;)</figcaption>
						</figure>
						<figure>
							<img src="https://goldpsych.eu.qualtrics.com/WRQualtricsControlPanel_rel/Graphic.php?IM=IM_eOPh8J8BPOgcJvM&V=1612980058" class="clickable" alt="Yellow button" style="width: 150px; height; 150px;" data-page="2" />
							<figcaption>(hint: it starts with a &quot;k&quot;)</figcaption>
						</figure>
					</div>
					<p class="hint-text" hidden="hidden"></p>
				</section>
			</div>
			<div id="splash" hidden="hidden"><countdown-clock width="500" time="0.5"></countdown-clock></div>
			<aside class="gold-footer">
				<button id="nxtbtn" class="pd_button" onclick="globalThis.onNextPage(event)">Click here to continue</button>
			</aside>
		</div>
`;
	}

	let keyDownListener;
	let keyUpListener;

	function init() {
		const docHtml = buildHtml();
		document.querySelector("#Questions div.QuestionBody").innerHTML = docHtml;

		setupVolumeControl();
		setupIcons();
		keyDownListener = document.addEventListener("keydown", evt => keyDownManager(evt, evt.key));
		keyUpListener = document.addEventListener("keyup", evt => keyUpManager(evt, evt.key));
		globalThis.onNextPage = onNextPage;

		if (!customElements.get("piano-player")) customElements.define("piano-player", PianoPlayerElement);

		if (!customElements.get("countdown-clock")) customElements.define("countdown-clock", CountDownClockElement);

		document.querySelector(".page-19 > countdown-clock").addEventListener("timeout", evt => timeoutManager(evt));

		document.querySelector("#NextButton").hidden = true;

		navigateToPage();
	}



Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/
    init();
});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/
	document.removeEventListener("keydown", keyDownListener);
	document.removeEventListener("keyup", keyUpListener);
	document.querySelector("#NextButton").hidden = false;
});

