
function RandN(trials, candidates) {
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

function CumSum(x) {
	const arr = new Array(x.length);
	for (let k = 0; k < x.length; k++) {
		const col = new Array(x.length);
		let sum = x[k][0];
		col[0] = sum;
		let i = 1;
		while (i < x[k].length) {
			sum += x[k][i];
			col[i] = sum;
			i++;
		}
		arr[k] = Rerange(col);
	}
	return arr;
}

function Rerange(input) {
	const min = Math.min(...input);
	const max = Math.max(...input);
	return input.map(x => (x - min) / (max - min));
}

function TotalDistance(arr1, arr2) {
	let sum = 0;
	for (let i = 0; i < arr1.length; i++) {
		const diff = arr2[i] - arr1[i];
		sum += Math.abs(diff);
	}
	return sum;
}

function ProbBandit(trials, maxAttempts = 10) {
	do {
		const x = RandN(trials, 70);
		const y = CumSum(x);

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

				if (TotalDistance(y[i], y[j]) < trials / 3.5) {
					continue;
				}

				if (!minDistance || Math.abs(distance) < Math.abs(minDistance.distance)) {
					minDistance = { "i": i, "j": j, "distance": distance };
				}

			}
		}

		if (minDistance) {
			return [y[minDistance.i], y[minDistance.j]];
		}
	} while (maxAttempts-- > 0);
}

function doplot(trials) {
	const res = ProbBandit(trials);
	const arr = res[0].map((x,i) => [i, x, res[1][i]]);
	arr.splice(0, 0, ['Trial', 'Walk 1', 'Walk 2']);

	const data = google.visualization.arrayToDataTable(arr);
	const chart = new google.visualization.LineChart(document.querySelector(".QuestionBody"));
	chart.draw(data, {
		title: "Chart",
		legend: { position: "none" }
	});
}
