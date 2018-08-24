import React from "react";
class Options extends React.Component {
	render() {
		const props = this.props;
		let optionClassName = (props.isCenter ? "active" : "");
		return (
			<li className={optionClassName} onClick={props.optionChange}></li>
		);
	}
}
export default Options;