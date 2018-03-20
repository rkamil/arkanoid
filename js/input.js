var buttons = {
	left: false,
	right: false,
	launch: false
};

document.onkeydown = function (e) {
	if (e.which == 37 || e.which == 65) buttons.left = true;
	if (e.which == 39 || e.which == 68) buttons.right = true;
	if (e.which == 32) buttons.launch = true;
}

document.onkeyup = function (e) {
	if (e.which == 37 || e.which == 65) buttons.left = false;
	if (e.which == 39 || e.which == 68) buttons.right = false;
	if (e.which == 32) buttons.launch = false;
}
