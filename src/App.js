import React, { Component } from 'react';
import './App.css';
import {Navbar, Input, Button} from 'react-materialize';

class App extends Component {
  constructor(props){
	super(props)
	this.state = {
		lastPkg: "",
		lastResult: ""
	}
	this.text = "";
	
  }
  handleSubmit(){
	
	fetch("http://localhost:5000/" + this.text).then(
		(res) => {
			return res.text()
		}
	).then(
		(code) => {
			console.log(code)
			this.setState((prev) => {
				return{
					lastPkg: this.text,
					lastResult: code
				};
			})
		}
	);
	
  }
  handleType(event){
	this.text = event.target.value;
  }
  render() {
	let result = (<div></div>);
	if(this.state.lastPkg !== ""){
		if(this.state.lastResult == 200){
			result = (
				<div>
					<h3><code>{this.state.lastPkg}</code></h3>
					<p>is a real npm package!</p>
					You Lose!
				</div>
			);
		}else if(this.state.lastResult == 404){
			result = (
				<div>
					<h3><code>{this.state.lastPkg}</code></h3>
					<p>{"isn't"}  a real npm package!</p>
					You Win!
				</div>
			);
		}
	}
    return (
      <div className="App">
		<Navbar brand={'Where\'s my npm package??'} left style={{paddingLeft:"2.5%", paddingRight:"2.5%"}} className="green darken-1">
		</Navbar>
		<div className="center-align" style={{marginLeft:"15%", marginRight:"15%"}}>
			<h2>
				Enter a word or some text. If its a real package on npmjs.com then you lose!
			</h2>
			<hr/>
			{result}
			<div style={{paddingTop:"3em"}}>
				<Input label="Guess a package here" onChange={evt => this.handleType(evt)}/>	
				<Button waves="light" onClick={this.handleSubmit.bind(this)}>
					Enter!
				</Button>
			</div>
		</div>
      </div>
    );
  }
}

export default App;
