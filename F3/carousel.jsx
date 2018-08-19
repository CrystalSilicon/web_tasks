import React from "react";
let imgData = require("./img/imgDatas.json");
imgData.forEach((item,index) => {
	item.url = "./img/" + item.filename;
});
class Images extends React.Component {
	render() {
		const props = this.props;
		let imgClassName = (props.isCenter ? "block" : "");
		return (
			<li className={imgClassName}>
				<img src={props.url} alt={props.filename} />
			</li>
		);
	}
}
class Options extends React.Component {
	render() {
		const props = this.props;
		let optionClassName = (props.isCenter ? "active" : "");
		return (
			<li className={optionClassName} onClick={props.optionChange}></li>
		);
	}
}
class Arrows extends React.Component {
	render() {
		const props = this.props;
		return (
			<div id="arrow">
				<button className="prev" onClick={props.arrowPrev}>&lt;</button>
				<button className="next" onClick={props.arrowNext}>&gt;</button>
			</div>
		);
	}
}
class MyCarousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			current : 0
		};
		this.timer = null;
		this.startX = null;
		this.endX = null;
	}
	componentDidMount() {
		this.change(0);
		if(this.props.isAuto) {
			this.changeAuto(this.props.interval);
		}
	}
	change(index) {
		this.setState ({
			current : index
		});
	}
	arrowPrev() {
		let currentN = this.state.current-1;
		this.setState({
			current : currentN
		});
		if(currentN==-1){
			this.setState({
				current : this.props.number-1
			});
		}
	}
	arrowNext() {
		let currentN = this.state.current+1;
		this.setState({
			current : currentN
		});
		if(currentN==this.props.number){
			this.setState({
				current : 0
			});
		}
	}
	touchStart(event) {
		this.startX = event.touches[0].clientX;
		this.pause();
	}
	touchMove(event) {
		this.endX = event.touches[0].clientX;
	}
	touchEnd(event) {
		let moveX = this.startX - this.endX;
		if(moveX>50) {
			this.arrowNext();
		}
		else if(moveX<-50) {
			this.arrowPrev();
		}
		this.changeAuto(this.props.interval);
	}
	changeAuto(interval) {
		clearInterval(this.timer);
		this.timer = setInterval((interval) => {
			let currentN = this.state.current+1;
			this.setState({
				current : currentN
			});
			if(currentN==this.props.number){
				this.setState({
					current : 0
				});
			}
		}, interval);
	}
	pause() {
		clearInterval(this.timer);
	}
	render() {
		let imgList = [], optionList = [];
		imgData.forEach((item, index) => {
			imgList.push (
				<Images key={index} {...item} isCenter={this.state.current==index ? true : false} />
			);
			optionList.push (
				<Options key={index} isCenter={this.state.current==index ? true : false} optionChange={this.change.bind(this, index)} />
			);
		});
		return (
			<div id="wrap" 
				onMouseOver={this.pause.bind(this)} 
				onMouseOut={this.props.isAuto ? this.changeAuto.bind(this, this.props.interval) : null}
				onTouchStart={this.props.canTouch ? this.touchStart.bind(this) : null}
				onTouchMove={this.props.canTouch ? this.touchMove.bind(this) : null}
				onTouchEnd={this.props.canTouch ? this.touchEnd.bind(this) : null} >
				<ul id="list">
					{imgList}
				</ul>
				<ul id="option">
					{optionList}
				</ul>
				<Arrows arrowPrev={this.arrowPrev.bind(this)} arrowNext={this.arrowNext.bind(this)} />
			</div>
		);
	}
}
MyCarousel.defaultProps = {
	number : 3,
	isAuto : true,
	interval : 2000,
	canTouch : true
};
export default MyCarousel;

	