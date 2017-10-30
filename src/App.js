import React, { Component } from 'react';
import moment from "moment";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate:moment().format('YYYY-MM-DD'),
      numberOfDays:30,
      countryCode:'US'
    };
    this.handleChanges = this.handleChanges.bind(this);
  }
  handleChanges(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]:value
    });
  }
  onSubmitForm(event) {
    console.log(this.state);
    event.preventDefault();
  }
  render() {
    return (
      <div className="app container col-md-5">
        {/* Encabezado */}
        <header className="text-center mt-5">
          <h1>Calendar custom implementation</h1>
          <p>This is a custom calendar implementation</p>
        </header>
        {/* Formulario */}
        <form className="mt-5">
          <div className="form-group row">
            <label className="col-md-3 control-label" htmlFor="startDate">Start Date (*):</label>
            <div className="col-md-9">
              <input type="date" className="form-control" name="startDate" required value={this.state.startDate} onChange={this.handleChanges} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 control-label" htmlFor="numberOfDays">Number of Days (*):</label>
            <div className="col-md-9">
              <input type="number" className="form-control" name="numberOfDays" value={this.state.numberOfDays} required onChange={this.handleChanges} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 control-label" htmlFor="countryCode">Country Code:</label>
            <div className="col-md-9">
              <input type="text" className="form-control" name="countryCode" value={this.state.countryCode} onChange={this.handleChanges} />
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={this.onSubmitForm.bind(this)}>Send</button>
        </form>
        {/* Calendar wrapper */}
        <div className="calendarWrapper">
          
        </div>
      </div>



      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
    );
  }
}

export default App;
