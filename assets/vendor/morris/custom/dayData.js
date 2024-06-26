// Morris Days
var day_data = [
	{ period: "2016-10-01", licensed: 3213, "Bootstrap Gallery": 887, "cheta": 552 },
	{ period: "2016-09-30", licensed: 3321, "Bootstrap Gallery": 776, "cheta": 552 },
	{ period: "2016-09-29", licensed: 3671, "Bootstrap Gallery": 884, "cheta": 552 },
	{ period: "2016-09-20", licensed: 3176, "Bootstrap Gallery": 448, "cheta": 552 },
	{ period: "2016-09-19", licensed: 3376, "Bootstrap Gallery": 565, "cheta": 552 },
	{ period: "2016-09-18", licensed: 3976, "Bootstrap Gallery": 627, "cheta": 552 },
	{ period: "2016-09-17", licensed: 2239, "Bootstrap Gallery": 660, "cheta": 552 },
	{ period: "2016-09-16", licensed: 3871, "Bootstrap Gallery": 676, "cheta": 552 },
	{ period: "2016-09-15", licensed: 3659, "Bootstrap Gallery": 656, "cheta": 552 },
	{ period: "2016-09-10", licensed: 3380, "Bootstrap Gallery": 663, "cheta": 552 },
];
Morris.Line({
	element: "dayData",
	data: day_data,
	xkey: "period",
	ykeys: ["licensed", "Bootstrap Gallery", "cheta"],
	labels: ["Licensed", "Bootstrap Gallery", "cheta"],
	resize: true,
	hideHover: "auto",
	gridLineColor: "rgba(255, 255, 255, .30)",
	pointFillColors: ["#e94235", "#4285f4", "#fabb05", "#34a853"],
	pointStrokeColors: ["#ffffff"],
	lineColors: ["#e94235", "#4285f4", "#fabb05", "#34a853"],
});
