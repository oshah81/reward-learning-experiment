
function shuffle(a) {
	let randArray = new Uint16Array(a.length);
	crypto.getRandomValues(randArray);

    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(randArray[i] * (i + 1) / 65536.0);
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function ProbBandit(trials, reserved1 = 10) {
	const probabilities = new Array(trials);

	const contingencies = shuffle([0.5,0.7,0.9,0.3,0.1]);
	const blockLengths = shuffle([4, 6, 0, -4, -6]).map((x,i,a) => Math.floor(trials / a.length + x));

	let i = 0, j = 0;
	for (const item of blockLengths) {
		const probability = contingencies[i++];
		probabilities.fill(probability, j, j+item);
		j += item;
	}

	return [probabilities, probabilities.map(x => 1-x)];
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
