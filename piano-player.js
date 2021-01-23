import {wait, keyUpManager} from "./script-helpers.js";
import ConfigManager from "./config-manager.js";

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

		const linkElem = document.createElement("link");
		linkElem.rel = "stylesheet";
		linkElem.href = "piano-player.css";
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

	async playNextRound () {
		const nextSequence = [...this.notes.slice(this.currentNote, this.currentNote + 4)];
		this.currentNote = (this.currentNote + 4) % this.notes.length;

		this.playSequence(nextSequence);
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
			const leftPos = `calc(36% - ${keyboardWidth*1.5}px + ${item.alignment*1.5}px)`;
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

	async keyNotePressed(evt) {
		const matchedKey = this.keymap.find(x => x.key === evt.key);
		if (matchedKey) {
			const octave = (matchedKey.octave !== undefined) ? matchedKey.octave : this.defaultOctave;
			const note = matchedKey.note;
			eventLog.push({ type: "keydown", time: performance.now(), key: evt.key });

			const matchedElem = this.shadow.querySelector(`.keyboard .key[data-note="${note}"][data-octave="${octave}"]`);
			this.oscList[octave + note] = this.playTone(matchedElem.dataset.freq);
			matchedElem.dataset.pressed = "yes";
		}
	}

	keyNoteUnPressed(evt, key) {
		const matchedKey = this.keymap.find(x => x.key === key);
		if (matchedKey) {
			const octave = (matchedKey.octave !== undefined) ? matchedKey.octave : this.defaultOctave;
			const note = matchedKey.note;
			const matchedElem = this.shadow.querySelector(`.keyboard .key[data-note="${note}"][data-octave="${octave}"]`);
			if (matchedElem) {
				const dataset = matchedElem.dataset;
				matchedElem.dataset.pressed = "";
				eventLog.push({ type: "keyup", time: performance.now(), key: key });
			}
		}
	}

	hookEvents(keyElement) {
		keyElement.addEventListener("mousedown", evt => this.notePressed(evt), false);
		keyElement.addEventListener("mouseup", evt => this.noteReleased(evt), false);
		keyElement.addEventListener("mouseover", evt => this.notePressed(evt), false);
		keyElement.addEventListener("mouseleave", evt => this.noteReleased(evt), false);
	}


	async playSequence(sequence) {
		if (sequence.length == 0) {
			return;
		}
		const [item] = sequence.splice(0, 1);

		const matchedKey = this.keymap.find(x => x.key === item);
		const octave = (matchedKey.octave !== undefined) ? matchedKey.octave : this.defaultOctave;
		const note = matchedKey.note;

		const matchedElem = this.shadow.querySelector(`.keyboard .key[data-note="${note}"][data-octave="${octave}"]`);
		this.oscList[octave + note] = this.playTone(matchedElem.dataset.freq);
		matchedElem.dataset.pressed = "yes";

		const pace = parseFloat(this.pace) * 1000.0;
		await wait (pace);
		matchedElem.dataset.pressed = "";
		await this.playSequence(sequence);
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
			this._audioContext = new AudioContext();
		}
		return this._audioContext;
	}

	playTone(freq, finish) {

		const osc = this.audioContext.createOscillator();

		const decayRate = 1.5;
		const envelope = this.audioContext.createGain();

		osc.frequency.value = parseFloat(freq);
		osc.type = "triangle";
		envelope.gain.value = this.volumeControl;

		osc.connect(envelope);
		envelope.connect(this.audioContext.destination);

		osc.start(this.audioContext.currentTime)

		envelope.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + decayRate)
		setTimeout(() => {
			osc.stop(this.audioContext.currentTime);
			if (finish) {
				finish();
			}
		}, decayRate * 1000)

		return osc;
	}

	notePressed(event) {
		if (event.buttons & 1) {
			const dataset = event.currentTarget.dataset;
			eventLog.push({ type: "keydown", time: performance.now(), key: dataset.key });

			if (!dataset.pressed) {
				this.oscList[dataset.octave+dataset.note] = this.playTone(dataset.freq);
				dataset.pressed = "yes";
			}
		}

	}

	noteReleased(event) {
		const dataset = event.currentTarget.dataset;
		if (event.type !== "mouseleave") {
			eventLog.push({ type: "keyup", time: performance.now(), key: dataset.key });
		}

		if (dataset.pressed === "yes") {
			dataset.pressed = "";
		}
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
