$("input.text-input").focus(function() {
	$(this).siblings("label").animate({
		bottom:'25px',
		fontSize:'15px'
	},150);
});
$("input.text-input").blur(function() {
	$(this).siblings("label").animate({
		bottom:'0px',
		fontSize:'20px'
	},150);
});