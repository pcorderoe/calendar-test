import React, { Component } from 'react';
import moment from "moment";
import './App.css';
import {Calendar} from './components/calendar/Calendar';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate:'2008-08-15',
      numberOfDays:17,
      countryCode:'US',
      calendar:[]
    };
    this.handleChanges = this.handleChanges.bind(this);
    this.holidays = [];
  }
  handleChanges(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]:value
    });
    
  }
  dayClass(date$, holidays) {
    this.holidays = Object.values(holidays);
    let holiday = this.holidays.findIndex(h => h[0].date == date$.format('YYYY-MM-DD'));
    if(holiday == -1) {
      switch(date$.day()) {
        case 0: case 6: return 'weekends';
        case 5: case 1: case 2: case 3: case 4: return 'weekdays';
        default: return 'default';
      }
    } else {
      return 'holiday';
    }
  }
  getHolidaysData() {
    return new Promise((resolve, reject) => {
      axios.get('https://holidayapi.com/v1/holidays?key=2c6f2acd-ad3c-427f-b5e1-6a685f16c0b1&country='+this.state.countryCode+'&year=2008')
        .then((res) => {
          if(res.status == 200 && res.data.status == 200) {
            resolve(res.data.holidays);
          }
          reject();
        })
        .catch(err => reject(err));

    });
  }
  updateCalendar(holidays) {
    let start$ = moment(this.state.startDate).format('YYYY-MM-DD');
    let end$ = moment(start$).add(this.state.numberOfDays,'days').format('YYYY-MM-DD');
    let acum$ = moment(start$);

    let months = [];

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
      months[month].weeks.find(w => w.id == acum$.week()).days.push({
        id:acum$.format('DD'), 
        dayNumber:acum$.day(),
        class:this.dayClass(acum$, holidays)
      });

      acum$.add(1, 'day');
    }


    this.setState({
      calendar:months
    });
  }
  onSubmitForm(event) {
    this.getHolidaysData()
      .then((data) => {
        this.updateCalendar(data);
      });
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
