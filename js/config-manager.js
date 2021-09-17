
export default class ConfigManager {
	constructor() {

		this.flushCounter = 0;
		this.eventLogPointer = 0;
		this.setup = {
			eventLog: [],
			round: 1,
			trial: 0,
			version: 2,
			score: 0,
			hintCount: 0,
			id: getQualtricsSessionId()
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
	// activeProbability
	// unchosenProbability

	getConfig() {
		return new Promise((resolve, reject) => {
			this._config = pianoJson;

			const probGen = new ProbabilityGenerator();
			this.probJson = probGen.GenerateProbabilities(this._config.totaltrials);

			resolve(this._config);
		});
	}

	fullSave() {
		return new Promise(resolve => {
			const serialised = JSON.stringify(this.setup);
			const eventSlice = JSON.stringify(this.setup.eventLog.slice(this.eventLogPointer));
			const newLength = this.setup.eventLog.length;

			const msgBody = {
				"branch": "main",
				"commit_message": "Participation " + this.setup.id,
				"actions": [{
					"action": "create",
					"file_path": "Partial-" + this.setup.id + "-" + (new Date()).toJSON().replace(/\:|\./g, "_") + ".json",
					"content": eventSlice
				}]
			};

			const fetchPromise = fetch("https://gitlab.pavlovia.org/api/v4/projects/96989/repository/commits", {
				method: "POST",
				mode: "cors",
				credentials: "omit",
				headers: {
					"Content-Type": "application/json",
					"PRIVATE-TOKEN": "dMUwjzFBrKXXC7i1xcrM"
				},
				body: JSON.stringify(msgBody)
			});
			Qualtrics.SurveyEngine.setEmbeddedData("taskResult", serialised);

			fetchPromise.then((response) => {
				if (response.ok) {
					this.eventLogPointer = newLength;
				}
				resolve(serialised);
			});
		});
	}

	finalSave() {
		return new Promise((resolve, reject) => {
			this.fullSave().then(serialised => {

				const msgBody = {
					"branch": "main",
					"commit_message": "Participant Completion " + this.setup.id,
					"actions": [{
						"action": "create",
						"file_path": "Complete-" + this.setup.id + "-" + (new Date()).toJSON().replace(/\:|\./g, "_") + ".json",
						"content": serialised
					}]
				};

				const fetchPromise = fetch("https://gitlab.pavlovia.org/api/v4/projects/96989/repository/commits", {
					method: "POST",
					mode: "cors",
					credentials: "omit",
					headers: {
						"Content-Type": "application/json",
						"PRIVATE-TOKEN": "dMUwjzFBrKXXC7i1xcrM"
					},
					body: JSON.stringify(msgBody)
				});
				fetchPromise.then(() => {
					resolve();
				});
			});
		});
	}

	save() {
		return new Promise((resolve, reject) => {
			this.flushCounter++;
			if (this.flushCounter % 20 === 0) {
				this.fullSave().then(() => {
					resolve();
				});
			} else {
				resolve();
			}
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

		const contingencies = this.shuffle([0.5, 0.7, 0.9, 0.3, 0.1]);
		const blockLengths = this.shuffle([4, 6, 0, -4, -6]).map((x, i, a) => Math.floor(trials / a.length + x));

		let i = 0, j = 0;
		for (const item of blockLengths) {
			const probability = contingencies[i++];
			probabilities.fill(probability, j, j + item);
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
					w = x1 * x1 + x2 * x2;
					i++;
				} while (w >= 1.0);
				w = Math.sqrt((-2.0 * Math.log(w)) / w);
				y1 = x1 * w;
				y2 = x2 * w;
				use_last = true;
			}
			randVector[j++] = y2;
		} while (j < trials * candidates);

		const resArray = new Array(candidates);
		for (let k = 0; k < candidates; k++) {
			resArray[k] = randVector.slice(k * trials, k * trials + trials);
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
