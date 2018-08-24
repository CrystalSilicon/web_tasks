import React from "react";
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
export default Arrows;