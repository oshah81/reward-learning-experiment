export default class CountDownClockElement extends HTMLElement {
	constructor() {
		super();
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
		this.timeLeft = this.time * 1000;
		this.shadow = this.attachShadow({ mode: "closed" });

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

	startTimer() {
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

        gradient.addColorStop(1, `hsl(${Math.round(currentTime*120)}, 100%, 50%)`);

        this.context.fillStyle = gradient;
        this.context.arc(radius, radius, radius, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * currentTime, false);
        this.context.fill();

		if (!this.hideText) {
			const timeLeftText = this.formatTimeLeft(this.timeLeft);
			const dims = this.context.measureText(timeLeftText);
			this.context.beginPath();
			this.context.font = "24px source-sans-pro";
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
		const attrib = `${value}`;
		this.setAttribute("time", value);
	}
}
