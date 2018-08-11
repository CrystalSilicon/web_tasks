class Change {
    constructor(listLi, optionLi, arrow, wrap) {
        this.listLi = listLi;
        this.optionLi = optionLi;
        this.arrow = arrow;
		this.wrap = wrap;
        this.len = optionLi.length;
        this.index = 0;
    }
    init(canTouch) {
        this.optionSwitch();
        this.arrowSwitch();
		if(canTouch) {
			this.touchSwitch();
		}
    }	
    optionSwitch() {
        $("#option").on("click", (event) => {
			if(event.target.nodeName=="LI") {
				let i = parseInt(event.target.id);
				this.optionLi[this.index].className = "";
				this.optionLi[i].className = "active";
				this.listLi[this.index].className = "";
				this.listLi[i].className = "block";
				this.index = i;
			}
        });
	}
    arrowSwitch() {
        $("#arrow").on("click", (event) => {
			if(event.target.nodeName=="BUTTON"){
				this.optionLi[this.index].className = "";
				this.listLi[this.index].className = "";
				if (event.target.id=="right") {
					this.index++;
					if (this.index == this.len) {
						this.index = 0;
					}
				} 
				else {
					this.index--;
					if (this.index == -1) {
						this.index = this.len - 1;
					}
				}
				this.optionLi[this.index].className = "active";
				this.listLi[this.index].className = "block";
			}
		});
    }
	touchSwitch() {
		let startX,endX,moveX;
		this.wrap.addEventListener("touchstart", (event) => {
			let touch = event.touches[0];
			startX = touch.pageX;
		});
		this.wrap.addEventListener("touchmove", (event) => {
			event.preventDefault();
			let touch = event.touches[0];
			endX = touch.pageX;
		});
		this.wrap.addEventListener("touchend", (event) => {
			event.preventDefault();
			moveX = startX - endX;
			if(moveX>50) {
				this.optionLi[this.index].className = "";
				this.listLi[this.index].className = "";
				this.index++;
				if (this.index == this.len) {
					this.index = 0;
				}
				this.optionLi[this.index].className = "active";
				this.listLi[this.index].className = "block";
			}
			else if(moveX<-50) {
				this.optionLi[this.index].className = "";
				this.listLi[this.index].className = "";
				this.index--;
				if (this.index == -1) {
					this.index = this.len - 1;
				}
				this.optionLi[this.index].className = "active";
				this.listLi[this.index].className = "block";
			}
		});
	}
}
class ChangeAuto extends Change {
    constructor(listLi, optionLi, arrow, wrap) {
        super(listLi, optionLi, arrow, wrap);
        this.timer = null;
    }
    init(canTouch) {
		this.play();
		this.pause();
		this.optionSwitch();
		this.arrowSwitch();
		if(canTouch) {
			this.touchSwitch();
		}
    }
    play() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
			this.optionLi[this.index].className = "";
			this.listLi[this.index].className = "";
			this.index++;
			if (this.index == this.len) {
				this.index = 0;
			}
			this.optionLi[this.index].className = "active";
			this.listLi[this.index].className = "block";
        }, 2000);
    }
    pause() {
        this.wrap.addEventListener("mouseover",() => {
			clearInterval(this.timer);
		});
        this.wrap.addEventListener("mouseout",() => {
			this.play();
		});
		this.wrap.addEventListener("touchstart",() => {
			clearInterval(this.timer);
		});
		this.wrap.addEventListener("touchend",() => {
			this.play();
		});
    }
}
function adjustSize() {
	if($(window).width()<768){
		document.querySelector("#wrap").className = "visible-xs";
	}
	else{
		document.querySelector("#wrap").className = "hidden-xs";
	}
	$(window).resize(() => {
		adjustSize();
	});
}
function carousel_init(options) { 
	let defaults = {
		isAuto : true,
		canTouch : true
	}
	let opts = $.extend(defaults, options);
	let listLi = document.querySelectorAll("#list li");
	let optionLi = document.querySelectorAll("#option li");
	let arrow = document.querySelectorAll("#arrow button");
	let wrap = document.querySelector("#wrap");
	adjustSize();
	if(opts.isAuto){	
		let changeAuto = new ChangeAuto(listLi, optionLi, arrow, wrap);
		changeAuto.init(opts.canTouch);
	}
	else{
		let change = new Change(listLi, optionLi, arrow, wrap);
		change.init(opts.canTouch);
	}
}
carousel_init();


		