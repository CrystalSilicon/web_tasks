import React from "react";
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
export default Images;