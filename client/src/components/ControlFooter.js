import React, { Component } from 'react';
import './style.css';

class ControlFooter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filterColor: ''
		};

		this.RED = '#FF8A80';
		this.YELLOW = '#FFEE58';
		this.GREEN = '#00E676';
		this.BG = 'transparent';

	}

	changeColor = (color) => {
		return () => {
			this.props.setColorFilter(color);
			this.setState({
				filterColor: color
			})
		}
	}
	render() {
		return (
			<div className="fixed-bottom">
				<nav className="navbar navbar-light" style={{ backgroundColor: this.BG }}>
					<a className="navbar-brand">
					</a>
					<span className="ml-auto">
						<button className="btn btn-success mr-2" id='addBtn' disabled={this.props.limReached} onClick={this.props.add}><i className="fa fa-plus" aria-hidden="true"></i></button>
						<button className="mr-2 btn" id='undoBtn' disabled={!this.props.hasHistory} onClick={this.props.undo}><i className="fa fa-undo" aria-hidden="true"></i></button>
						<button className="mr-2 btn" id='redoBtn' disabled={!this.props.hasFuture} onClick={this.props.redo}><i className="fa fa-repeat"></i></button>
						<button className="btn btn-danger mr-2" id='clearBtn' onClick={this.props.clearAll}>
							<i className="fa fa-trash-o" aria-hidden="true"></i>
							{'\u00A0'}
							<i className="fa fa-times" aria-hidden="true"></i>
						</button>
					</span>
				</nav>
			</div>
		)
	}
}





export default ControlFooter;