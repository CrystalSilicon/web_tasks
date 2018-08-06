class Change {
    constructor(listLi, optionLi, arrow, wrap) {
        this.listLi = listLi;
        this.optionLi = optionLi;
        this.arrow = arrow;
		this.wrap = wrap;
        this.len = optionLi.length;
        this.index = 0;
    }
    init() {
        this.optionSwitch();
        this.arrowSwitch();
		this.touchSwitch();
    }	
    optionSwitch() {
        for (let i = 0; i < this.len; i++) {
            this.optionLi[i].addEventListener("click", () => {
					this.optionLi[this.index].className = "";
					this.optionLi[i].className = "active";
					this.listLi[this.index].className = "";
					this.listLi[i].className = "block";
					this.index = i;
                });
		}
	}
    arrowSwitch() {
        for (let i = 0; i < 2; i++) {
            this.arrow[i].addEventListener("click", () => {
					this.optionLi[this.index].className = "";
					this.listLi[this.index].className = "";
					if (i==1) {
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
				});
        }
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
				if(moveX>50){
					this.optionLi[this.index].className = "";
					this.listLi[this.index].className = "";
					this.index++;
					if (this.index == this.len) {
						this.index = 0;
					}
					this.optionLi[this.index].className = "active";
					this.listLi[this.index].className = "block";
				}
				else if(moveX<-50){
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
    init() {
        this.play();
        this.pause();
        this.optionSwitch();
        this.arrowSwitch();
		this.touchSwitch();
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
    pause(){
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
function initSize(){
	let listLi = document.querySelectorAll("#list li");
	let optionLi = document.querySelectorAll("#option li");
	let arrow = document.querySelectorAll("#arrow button");
	let wrap = document.querySelector("#wrap");
	let changeAuto = new ChangeAuto(listLi, optionLi, arrow, wrap);
	changeAuto.init();
}
if($(window).width()<768){
	$("#wrap").attr("class","visible-xs");
	initSize();
}
else{
	initSize();
}
$(window).resize(function() {
	if($(window).width()<768){
		if($("#wrap").attr("class")!="visible-xs"){
			$("#wrap").attr("class","visible-xs");
		}
	}
	else{
		if($("#wrap").attr("class")!="hidden-xs"){
			$("#wrap").attr("class","hidden-xs");
		}
	}
});
		