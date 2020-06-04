import React, { useState, useEffect } from 'react';
import './Calendar.scss';
import CalendarMonth from '../CalendarMonth/CalendarMonth';
import CalendarDay from '../CalendarDay/CalendarDay';
import CalendarWeek from '../CalendarWeek/CalendarWeek';
import CalendarAgenda from '../CalendarAgenda/CalendarAgenda';
import { Segment, Menu, Grid, Icon } from 'semantic-ui-react';
import Moment from 'react-moment';
import moment from 'moment';

const Calendar = (props) => {
    const [currentView, setCurrentView] = useState(props.view || 'month');
    const [header, setHeader] = useState('');
    const [currDate, setCurrDate] = useState(moment());
    const [height, setHeight] = useState(props.height || 0);
    const inverted = props.theme === "dark" ? true : false;
    const event_colors = ["#58a6a6", "#5e4a6b", "#51a2c2", "#6d785a", "#9c7b5f", "#734172", "#7bad39"]
    const events = [
        {
            "start": "2020-05-07 10:30:00",
            "end": "2020-05-07 11:30:00",
            "format": "YYYY-MM-DD HH:mm:ss",
            "title": "First Event",
            "description": "First event being used for test",
            "all_day": false,
            "color": "#58a6a6"
        },
        {
            "start": "2020-05-22 11:30:00",
            "end": "2020-05-22 12:30:00",
            "format": "YYYY-MM-DD HH:mm:ss",
            "title": "Same day different Event with lengthier title",
            "description": "parallel event being used for test",
            "all_day": false,
            "color": "#58a6a6"
        },
        {
            "start": "2020-05-22 10:30:00",
            "end": "2020-05-22 11:00:00",
            "format": "YYYY-MM-DD HH:mm:ss",
            "title": "Second Event",
            "all_day": false,
            "description": "Second event being used for test",
            "color": "#5e4a6b"
        },
        {
            "start": "2020-05-28 09:30:00",
            "end": "2020-05-28 11:00:00",
            "format": "YYYY-MM-DD HH:mm:ss",
            "title": "Second Event2",
            "all_day": false,
            "description": "Second event being used for test",
            "color": "#5e4a6b"
        },
        {
            "start": "2020-05-28 08:30:00",
            "end": "2020-05-28 11:00:00",
            "format": "YYYY-MM-DD HH:mm:ss",
            "title": "Second Event3",
            "all_day": false,
            "description": "Second event being used for test",
            "color": "#5e4a6b"
        },
        {
            "start": "2020-05-28 08:30:00",
            "end": "2020-05-28 12:00:00",
            "format": "YYYY-MM-DD HH:mm:ss",
            "title": "Fun with Kundu",
            "all_day": false,
            "description": "Second event being used for test",
            "color": "#5e4a6b"
        },
        {
            "start": "2020-05-28 11:30:00",
            "end": "2020-05-28 12:30:00",
            "format": "YYYY-MM-DD HH:mm:ss",
            "title": "Fight with Kundu",
            "all_day": false,
            "description": "Second event being used for test",
            "color": "#5e4a6b"
        },
        {
            "start": "2020-05-22 08:30:00",
            "end": "2020-05-22 11:00:00",
            "format": "YYYY-MM-DD HH:mm:ss",
            "title": "Second Event5",
            "all_day": false,
            "description": "Second event being used for test",
            "color": "#5e4a6b"
        },
        {
            "start": "2020-05-22 09:30:00",
            "end": "2020-05-22 11:00:00",
            "format": "YYYY-MM-DD HH:mm:ss",
            "title": "Breakfast with Kundu",
            "all_day": false,
            "description": "Breakfast with Kundu",
            "color": "#51a2c2"
        },
        {
            "start": "2020-05-28 12:15:00",
            "end": "2020-05-28 14:00:00",
            "format": "YYYY-MM-DD HH:mm:ss",
            "title": "Lnch with Kundu",
            "all_day": false,
            "description": "Lunch with Kundu",
            "color": "#51a2c2"
        },
        {
            "start": "2020-05-26 07:30:00",
            "end": "2020-05-26 10:00:00",
            "format": "YYYY-MM-DD HH:mm:ss",
            "title": "Second Event7",
            "all_day": false,
            "description": "Second event being used for test",
            "color": "#5e4a6b"
        },
        {
            "start": "2020-05-03 10:30:00",
            "end": "2020-05-07 10:30:00",
            "format": "YYYY-MM-DD HH:mm:ss",
            "title": "Test Event",
            "description": "Test event which is basically third event",
            "all_day": false,
            "color": "#51a2c2"
        },
        {
            "start": "2020-05-03 14:30:00",
            "end": "2020-05-03 16:30:00",
            "format": "YYYY-MM-DD HH:mm:ss",
            "title": "Lunch with kundu",
            "description": "Test event which is basically third event",
            "all_day": false,
            "color": "#51a2c2"
        },
        {
            "start": "2020-05-15 10:30:00",
            "end": "2020-05-18 10:30:00",
            "format": "YYYY-MM-DD HH:mm:ss",
            "title": "Test Event",
            "description": "Test event which is basically third event",
            "all_day": false,
            "color": "#51a2c2"
        }
    ]
    let events_per_date = {};
    if ( events.length > 0) {
        //eslint-disable-next-line
        events.sort((a,b) => moment(a.start) - moment(b.start)).map(event => {
            let event_days = moment(event.end).diff(moment(event.start), 'days');
            if ( event_days === 0 ) {
                const start_day = moment(event.start).format("YYYY-MM-DD");
                if ( events_per_date[start_day] ) {
                    events_per_date[start_day].push({
                        event: event,
                        starting: true,
                        ending: true,
                        all_day: event.all_day
                    })
                } else {
                    events_per_date[start_day] = [{
                        event: event,
                        starting: true,
                        ending: true,
                        all_day: event.all_day
                    }]
                }
            } else {
                const start_day = moment(event.start).format("YYYY-MM-DD");
                if ( events_per_date[start_day] ) {
                    events_per_date[start_day].push({
                        event: event,
                        starting: true,
                        ending: false,
                        all_day: moment(event.start).hour() === 0 ? true : false
                    })
                } else {
                    events_per_date[start_day] = [{
                        event: event,
                        starting: true,
                        ending: false,
                        all_day: moment(event.start).hour() === 0 ? true : false
                    }]
                }

                for ( let k=1; k<event_days; k++) {
                    const this_day = moment(event.start).add(k, 'days').format("YYYY-MM-DD");
                    if ( events_per_date[this_day] ) {
                        events_per_date[this_day].push({
                            event: event,
                            starting: false,
                            ending: false,
                            all_day: true
                        })
                    } else {
                        events_per_date[this_day] = [{
                            event: event,
                            starting: false,
                            ending: false,
                            all_day: true
                        }]
                    }
                }

                const end_day = moment(event.start).add(event_days, 'days').format("YYYY-MM-DD");
                if ( events_per_date[end_day] ) {
                    events_per_date[end_day].push({
                        event: event,
                        starting: false,
                        ending: true,
                        all_day: moment(event.end).hour() === 23 ? true : false
                    })
                } else {
                    events_per_date[end_day] = [{
                        event: event,
                        starting: false,
                        ending: true,
                        all_day: moment(event.end).hour() === 23 ? true : false
                    }]
                }
            }
        })
    }
    const handleMenuClick = (e, {name}) => setCurrentView(name);
    const handleTodayClick = () => setCurrDate(moment());
    const handlePreviousClick = () => {
        let newDate = moment(currDate);
        if ( currentView === "month" || currentView === "agenda") {
            setCurrDate(newDate.subtract(1,'months'))
        } else if ( currentView === "day") {
            setCurrDate(newDate.subtract(1, 'days'))
        } else {
            setCurrDate(newDate.subtract(1, 'weeks'))
        }
    };
    const handleNextClick = () => {
        let newDate = moment(currDate);
        if ( currentView === "month" || currentView === "agenda") {
            setCurrDate(newDate.add(1,'months'))
        } else if ( currentView === "day") {
            setCurrDate(newDate.add(1, 'days'))
        } else {
            setCurrDate(newDate.add(1, 'weeks'))
        }
    };
    const getCurrentView = () => {
        switch (currentView) {
            case("month"): {
                return (
                    <CalendarMonth {...props} currDate={currDate} height={height} events={events_per_date} />
                );
            }
            case("day"): {
                return (
                    <CalendarDay {...props} currDate={currDate} height={height} events={events_per_date[moment(currDate).format("YYYY-MM-DD")]}/>
                );
            }
            case("week"): {
                return (
                    <CalendarWeek {...props} currDate={currDate} height={height} events={events_per_date}/>
                );
            }
            case("agenda"): {
                return (
                    <CalendarAgenda {...props} currDate={currDate} height={height} events={events_per_date}/>
                );
            }
            default: throw new Error(`Invalid view: ${currentView}.`);
        }
    }
    useEffect(() => {
        const getHeader = () => {
            switch(currentView) {
                case("month"): {
                    return <Moment local format="MMM YYYY">{currDate}</Moment>
                }
                case("day"): {
                    return <Moment local format="MMM DD, YYYY">{currDate}</Moment>
                }
                case("week"): {
                    const weekStart = moment(currDate).startOf('week');
                    const weekEnd = moment(currDate).endOf('week');
                    return (
                        <>
                            <Moment format="MMM DD, YYYY">{weekStart}</Moment>
                            <span style={{"padding": "0 1rem"}}>-</span>
                            <Moment format="MMM DD, YYYY">{weekEnd}</Moment>
                        </>
                    )
                }
                case("agenda"): {
                    return (
                        <>
                            <Moment format="MMM DD, YYYY">{currDate}</Moment>
                            <span style={{"padding": "0 1rem"}}>-</span>
                            <Moment format="MMM DD, YYYY" add={{days: 30}}>{currDate}</Moment>
                        </>
                    )
                }
                default: throw new Error(`Invalid view: ${currentView}.`);
            }
        }
        setHeader(getHeader())
    }, [currentView, currDate]);
    useEffect(() => {
        if (!props.height) {
            let height = document.getElementById('view-holder').clientHeight;
            setHeight(height);
        }
    }, [props.height]);
    return (
        <Grid columns={1} style={{"minHeight": "100%","marginLeft": "1rem", "marginRight": "1rem"}} padded textAlign="center">
            <Grid.Column>
            <div className="calendar-heading">{props.title || "Calendar"}</div>
            <Segment inverted={inverted} style={{"minHeight": "90%", "maxHeight": "90vh"}}>
                <Menu inverted={inverted} attached="top">
                    <Menu.Item name="Today" onClick={handleTodayClick}/>
                    <span style={{"marginLeft": "35%", "padding": "0.9rem", fontWeight: "500"}}>
                        <Icon name="angle left" style={{"paddingRight":"2rem", "cursor": "pointer"}} onClick={handlePreviousClick}/>
                        {header}
                        <Icon name="angle right" style={{"paddingLeft":"2rem", "cursor": "pointer"}} onClick={handleNextClick}/>
                    </span>
                    <Menu.Menu position="right">
                        <Menu.Item name="month" active={currentView === "month"} onClick={handleMenuClick}>Month</Menu.Item>
                        <Menu.Item name="week" active={currentView === "week"} onClick={handleMenuClick}>Week</Menu.Item>
                        <Menu.Item name="day" active={currentView === "day"} onClick={handleMenuClick}>Day</Menu.Item>
                        <Menu.Item name="agenda" active={currentView === "agenda"} onClick={handleMenuClick}>Agenda</Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Segment
                    id="view-holder"
                    attached="bottom"
                    inverted={inverted}
                    style={{"padding":"1px 1px","minHeight": "80vh", "maxHeight": "80vh", overflowY: "scroll", "border": "none"}}
                >
                    { getCurrentView() }
                </Segment>
            </Segment>
            </Grid.Column>
        </Grid>
    )
};

export default Calendar;