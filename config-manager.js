export default class ConfigManager {
	constructor() {
		if (!localStorage.setup) {
			localStorage.setup = JSON.stringify({
				eventLog: [],
				round: 1,
				trial: 0,
				probabilityindex: 0,
				version: 1,
				id: 0
			});
		}
		this.setup = JSON.parse(localStorage.setup);

		this._config = null;
		this.configPromise = this.getConfig();
	}

	// EventLog contains the following parameters
	// type = keydown keyup startNextRound correctSequence
	// time = performance.now
	// key
	// round
	// trial

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

	flush() {
		localStorage.setup = JSON.stringify(this.setup);
	}

	save() {
	}
}
