import React, { Component } from 'react';
import moment from "moment";
import './App.css';
import {Calendar} from './components/calendar/Calendar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate:moment().format('YYYY-MM-DD'),
      numberOfDays:30,
      countryCode:'US',
      calendar:[]
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
  updateCalendar() {
    console.log('state', this.state);
    let start$ = moment(this.state.startDate).format('YYYY-MM-DD');
    console.log('startM', start$);
    let end$ = moment(start$).add(this.state.numberOfDays,'days').format('YYYY-MM-DD');
    console.log('endM', end$);
    let acum$ = moment(start$);

    let months = [];

    console.log(acum$.month());

    while(moment(end$).isAfter(acum$)){

      //month
      let month = months.findIndex(m => m.id == acum$.month() + 1);
      if(month == -1) {
        months.push({
          id:acum$.month()+1,
          name:acum$.format('MMMM'),
          year:acum$.format('YYYY'),
          weeks:[]
        });
      }
      month = months.findIndex(m => m.id == acum$.month() + 1);
      
      //weeks
      let week = months[month].weeks.findIndex(w => w.id == acum$.week());
      if(week == -1) {
        months[month].weeks.push({
          id:acum$.week(),
          days:[]
        });
      }

      //add actual day
      months[month].weeks.find(w => w.id == acum$.week()).days.push({id:acum$.format('DD'), dayNumber:acum$.day()});




      // let actualMonth = months.findIndex(m => m.id == acum$.month()+1);
      // debugger;
      // if(actualMonth == -1){
      //   //if month is not defined then set
      //   actualMonth = acum$.month() + 1;
      // }
      // months.push({id:actualMonth, name:acum$.format('MMMM'), maxDays:acum$.daysInMonth(), year:acum$.format('YYYY'), weeks:[]});

      // let actualWeek = months[actualMonth].weeks.findIndex(w => w.id == acum$.week());
      // if(actualWeek == -1){
      //   months[actualMonth].weeks.push({id:acum$.week(), days:[]});
      // }

      // months[actualMonth].weeks.find(w => w.id == acum$.week()).days.push({id:acum$.format('DD'), dayNumber:acum$.day()});
      
      acum$.add(1, 'day');
    }

    console.log('calendar', months);


    this.setState({
      calendar:months
    });
  }
  onSubmitForm(event) {
    console.log(this.state);
    this.updateCalendar();
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
          {
            
            this.state.calendar.map((e, i) => {
              return <Calendar month={e} key={e.id}></Calendar>
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
