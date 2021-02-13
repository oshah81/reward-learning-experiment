export default class ConfigManager {
	constructor() {
		// if (!sessionStorage.setup) {
		this.newGame();
		// }
		this.setup = JSON.parse(sessionStorage.setup);

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

	async getConfig() {
		const pianoResponse = await fetch("piano.json", {
			method: "GET",
			credentials: "same-origin"
		});
		this._config = await pianoResponse.json();
		const headers = new Headers();
		headers.append("Content-Type", "application/x-www-form-urlencoded");
		const body = this.setup.id ? `id=${this.setup.id}` : ``;

		const probabilityResponse = await fetch("probabilities.json", {
			method: "GET",
			// body: body,
			// headers: headers,
			cache: "no-cache",
			credentials: "include",
			mode: "cors"
		});
		this.probJson = await probabilityResponse.json();
		this.setup.id = this.probJson.id;
		this.flush();

		return this._config;
	}

	newGame() {
		sessionStorage.setup = JSON.stringify({
			eventLog: [],
			round: 1,
			trial: 0,
			version: 1,
			score: 0,
			id: 0
		});
	}

	flush() {
		// sessionStorage.setup = JSON.stringify(this.setup);
	}

	async save() {
		this.flush();
		
	}
}
