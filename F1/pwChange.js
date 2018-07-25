var isVisible = false;
function change() {
	var ps = document.getElementById("password");
	if (isVisible) {
		ps.type = "password";
		isVisible = false;
	}
	else {
		ps.type = "text";
		isVisible = true;
	}
}