import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import moment from 'moment';
import './CalendarMonth.scss';

const CalendarMonth = (props) => {
    const [columnHeight, setColumnHeight] = useState(null);
    const [calendar, setCalendar] = useState([]);
    const inverted = props.theme === "dark" ? true: false;
    useEffect(() => {
        const startWeek = moment(props.currDate).startOf('month').week();
        const endWeek = moment(props.currDate).endOf('month').week() === 1 ? moment(props.currDate).weeksInYear() + 1 : moment(props.currDate).endOf('month').week();
        let month = []
        for(let j=startWeek;j<=endWeek;j++){
            month.push({
                key:j,
                days:Array(7).fill(0).map((n, i) => moment(props.currDate).week(j).startOf('week').clone().add(n + i, 'day'))
            })
        }
        setCalendar(month);
    }, [props.currDate]);
    useEffect(() => {
        let day_row_height = document.getElementById('day-row').clientHeight;
        setColumnHeight(calendar.length > 0 ? ((props.height - day_row_height -5)/ calendar.length): 0)
    }, [calendar, props.height]);
    return (
        <Grid style={{"margin":"0px", "height": "100%"}} divided="vertically">
            <Grid.Row columns={7} style={{"paddingTop": "0", "paddingBottom": "0", "height": "20px"}} id='day-row'>
                <Grid.Column style={{"padding": "0", "margin":"0"}}>Sunday</Grid.Column>
                <Grid.Column style={{"padding": "0", "margin":"0"}}>Monday</Grid.Column>
                <Grid.Column style={{"padding": "0", "margin":"0"}}>Tuesday</Grid.Column>
                <Grid.Column style={{"padding": "0", "margin":"0"}}>Wednesday</Grid.Column>
                <Grid.Column style={{"padding": "0", "margin":"0"}}>Thursday</Grid.Column>
                <Grid.Column style={{"padding": "0", "margin":"0"}}>Friday</Grid.Column>
                <Grid.Column style={{"padding": "0", "margin":"0"}}>Saturday</Grid.Column>
            </Grid.Row>
            {
                calendar.map(cw => {
                    const allowedEvents = Math.floor((columnHeight - 26) / 20) - 1;
                    return (
                        <Grid.Row columns={7} style={{"padding": "0","height": `${columnHeight}px`}} key={cw.key}>
                            {
                                cw.days.map(day => {
                                    const color = moment(props.currDate).month() === day.month() ? inverted ? "black" : "#fff" : inverted? "#404242" :"#d2d5d9";
                                    return (
                                        <Grid.Column style={{"padding": "0", "margin":"0"}} key={day.date()} id={day.date()}>
                                            <div style={{backgroundColor: color, height:"100%", width: "100%", "zIndex": "1", "borderWidth" : '1px'}}>
                                                <span className="month-date">{day.date()}</span>
                                                {
                                                    props.events[day.format("YYYY-MM-DD")] && props.events[day.format("YYYY-MM-DD")].map((e, index) => {
                                                        const borderStyles = {
                                                            "borderTopLeftRadius": e.starting ? '6px' : 0,
                                                            "borderBottomLeftRadius": e.starting ? '6px' : 0,
                                                            "borderBottomRightRadius": e.ending ? '6px': 0,
                                                            "borderTopRightRadius": e.ending ? '6px': 0,
                                                            "borderTop": '1px',
                                                            "borderBottom": '1px',
                                                            "borderLeft" : e.starting ? '1px': 0,
                                                            "borderRight" : e.ending ? '1px' : 0,
                                                            "marginLeft" : '-1px',
                                                            "marginRight" : '-1px',
                                                            "marginBottom": '1px'
                                                        }
                                                        return index < 3 && (
                                                            <div style={{
                                                                "backgroundColor": e.event.color,
                                                                width: "100%",
                                                                ...borderStyles
                                                            }}
                                                                key={index}
                                                                className="cal-event"
                                                            >
                                                                {e.starting ? e.event.title: null}
                                                            </div>
                                                        )
                                                    })
                                                }
                                                {
                                                    props.events[day.format("YYYY-MM-DD")] && (
                                                        props.events[day.format("YYYY-MM-DD")].length > allowedEvents && (
                                                            <div style={{
                                                                width: "100%",
                                                                "border": '1px',
                                                                "borderRadius" : '6px',
                                                                color: 'white',
                                                                backgroundColor: "#58a6a6"
                                                            }}>
                                                                {`+${props.events[day.format("YYYY-MM-DD")].length - allowedEvents} more`}
                                                            </div>
                                                        )
                                                    )
                                                }
                                            </div>
                                        </Grid.Column>
                                    )
                                })
                            }
                        </Grid.Row>
                    )
                })
            }
        </Grid>
    )
}

export default CalendarMonth;