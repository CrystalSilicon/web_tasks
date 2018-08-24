import React from "react";
import Images from "./images.jsx";
import Options from "./options.jsx";
import Arrows from "./arrows.jsx";
let imgData = require("./img/imgDatas.json");
imgData.forEach((item,index) => {
	item.url = "./img/" + item.filename;
});
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
	arrowPrev = () => {
		let currentN = this.state.current-1;
		this.setState({
			current : currentN==-1 ? this.props.number-1 : currentN
		});
	}
	arrowNext = () => {
		let currentN = this.state.current+1;
		this.setState({
			current : currentN==this.props.number ? 0 : currentN
		});
	}
	touchStart = (event) => {
		this.startX = event.touches[0].clientX;
		this.pause();
	}
	touchMove = (event) => {
		this.endX = event.touches[0].clientX;
	}
	touchEnd = (event) => {
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
			this.arrowNext();
		}, interval);
	}
	pause = () => {
		clearInterval(this.timer);
	}
	render() {
		let imgList = [], optionList = [];
		imgData.forEach((item, index) => {
			imgList.push (
				<Images key={index} {...item} isCenter={this.state.current==index ? true : false} />
			);
			optionList.push (
				<Options key={index} isCenter={this.state.current==index ? true : false} optionChange={() => this.change(index)} />
			);
		});
		return (
			<div id="wrap" 
				onMouseOver={this.pause} 
				onMouseOut={this.props.isAuto ? ()=>this.changeAuto(this.props.interval) : null}
				onTouchStart={this.props.canTouch ? this.touchStart : null}
				onTouchMove={this.props.canTouch ? this.touchMove : null}
				onTouchEnd={this.props.canTouch ? this.touchEnd : null} >
				<ul id="list">
					{imgList}
				</ul>
				<ul id="option">
					{optionList}
				</ul>
				<Arrows arrowPrev={this.arrowPrev} arrowNext={this.arrowNext} />
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

	