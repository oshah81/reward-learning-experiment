import { wait, keyDownManager, keyUpManager } from "https://oshah81.github.io/reward-learning-experiment/js/script-helpers.js";
import ConfigManager from "https://oshah81.github.io/reward-learning-experiment/js/config-manager.js";

function iosShimHack() {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	return window.AudioContext;
}

export default class PianoPlayerElement extends HTMLElement {
	constructor() {
		super();
		this.oscList = [];
		this.keymap = null;
		this._audioContext = null;
		this.defaultOctave = null;

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
		linkElem.innerHTML = `
button:focus { outline: none; }

.keyboard { min-height: 300px; user-select: none; }
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

	async connectedCallback() {
		this.currentNote = 0;

		const gameConfig = await globalThis.pageConfig.configPromise;
		this.setup(gameConfig);
	}

	disconnectedCallback() {

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

		const keyboardWidth = this.getKeyboardWidth(gameconfig.keyboard.filter(x => this.hasKey(x, this.keymap)));
		for (let item of gameconfig.keyboard) {
			const matchedKey = this.keymap.find(x => x.note === item.note && ((x.octave === undefined || x.octave === null) && item.octave === this.defaultOctave || x.octave === item.octave));
			if (!matchedKey) {
				continue;
			}
			const musicKey = document.createElement("button");
			musicKey.dataset.note = item.note;
			musicKey.dataset.octave = item.octave;
			musicKey.dataset.freq = item.freq;
			musicKey.dataset.key = matchedKey.key;
			const leftPos = "calc(" + (item.alignment*1.5).toFixed(0) + "px - " + (keyboardWidth*1.5).toFixed(0) + "px)";
			musicKey.style.left = leftPos;
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
			const wasMouse = evt.type.startsWith("mouse") || evt.type.startsWith("click");
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
			const wasMouse = evt.type.startsWith("mouse") || evt.type.startsWith("click");
			const matchedElem = this.shadow.querySelector(".keyboard .key[data-note='" + note + "'][data-octave='" + octave + "']");
			if (matchedElem) {
				const dataset = matchedElem.dataset;
				matchedElem.dataset.pressed = "";
				eventLog.push({ type: "keyup", time: performance.now(), key: key, mouse: wasMouse, round: globalThis.pageConfig.setup.round, trial: globalThis.pageConfig.setup.trial });
			}
		}
	}

	hookEvents(keyElement) {
		keyElement.addEventListener("touchstart", evt => this.notePressed(evt), false)
		keyElement.addEventListener("touchend", evt => this.noteReleased(evt), false)
		keyElement.addEventListener("mousedown", evt => this.notePressed(evt), false);
		keyElement.addEventListener("mouseup", evt => this.noteReleased(evt), false);
		keyElement.addEventListener("mouseover", evt => this.notePressed(evt), false);
		keyElement.addEventListener("mouseleave", evt => this.noteReleased(evt), false);
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

	get audioContext() {
		if (!this._audioContext) {
			var audCT = iosShimHack();
			this._audioContext = new audCT();
		}
		return this._audioContext;
	}

	playTone(freq) {

		const osc = this.audioContext.createOscillator();

		const decayRate = 1.5;
		const envelope = this.audioContext.createGain();

		osc.frequency.value = parseFloat(freq);
		osc.type = "triangle";
		envelope.gain.value = this.volumeControl;

		osc.connect(envelope);
		envelope.connect(this.audioContext.destination);

		osc.start(this.audioContext.currentTime);

		envelope.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + decayRate);

		setTimeout(() => {
			if (envelope.gain.value == this.volumeControl) {
				// firefox workaround.
				setTimeout(() => {
					osc.stop(this.audioContext.currentTime);
				}, 250);
			}
		}, 10);
		setTimeout(() => {
			osc.stop(this.audioContext.currentTime);
		}, decayRate * 1000)

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

	getKeyboardWidth(keyboard) {
		const max = keyboard.map(x => x.alignment).reduce((a,b) => Math.max(a, b));
		const min = keyboard.map(x => x.alignment).reduce((a,b) => Math.min(a, b));
		return max - min;
	}

	hasKey(item, keymap) {
		const matchedKey = keymap.find(x => x.note === item.note && ((x.octave === undefined || x.octave === null) && item.octave === this.defaultOctave || x.octave === item.octave));
		return !(!matchedKey);
	}
}
