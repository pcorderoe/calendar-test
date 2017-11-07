import React, { Component } from 'react';
import moment from "moment";
export class Calendar extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="wrapper">
                <table className="table table-bordered table-condensed text-center">
                    <thead>
                        <tr>
                            <td>S</td>
                            <td>M</td>
                            <td>T</td>
                            <td>W</td>
                            <td>T</td>
                            <td>F</td>
                            <td>S</td>
                        </tr>
                        <tr>
                            <td colSpan="7">{this.props.month.name} {this.props.month.year}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.month.weeks.map((week) => {
                                return (
                                    <tr key={week.id}>
                                        {
                                            week.days.map((day, i) => {
                                                //load previous
                                                if(i == 0 && day.dayNumber!=0){
                                                    return (
                                                        [<td colSpan={day.dayNumber} className="default">&nbsp;</td>, <td className={day.class}>{day.id}</td>]
                                                    )
                                                }
                                                return (<td className={day.class}>{day.id}</td>)
                                            })
                                        }
                                    </tr>
                                )
                                                           
                            })
                        }
                        
                    </tbody>
                </table>
            </div>
        );
    }
}