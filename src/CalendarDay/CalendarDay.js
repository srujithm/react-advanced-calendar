import React, { useState, useEffect } from 'react';
import { Grid,  Segment, Divider } from 'semantic-ui-react';
import moment from 'moment';

const useRowWidth = () => {
    const [rowWidth, setRowWidth] = useState(0);
    useEffect(() => {
        let timeoutId = null;
        const resizeListener = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setRowWidth(document.getElementById('cal-row').clientWidth), 150);
        };
        setRowWidth(document.getElementById('cal-row').clientWidth)
        window.addEventListener('resize', resizeListener);

        // clean up function
        return () => {
            window.removeEventListener('resize', resizeListener)
        }
    }, []);
    return rowWidth;
};

const CalendarDay = (props) => {
    const time_slots = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM',
    '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'];
    const inverted = props.theme === "dark" ? true : false;
    const all_day_events = props.events && props.events.filter(e => e.all_day);
    let regular_events = props.events
                            ? props.events
                                .filter(e => !e.all_day)
                                .sort((a,b) => moment(b.event.end).diff(moment(b.event.start)) - moment(a.event.end).diff(moment(a.event.start)))
                            : [];
    let totalWidth = useRowWidth();
    let final_regular_events = []
    let parallel_regular_events = []
    for (let i=0; i<regular_events.length; i++) {
        let e = regular_events[i];
        let eventStart = moment(e.event.start);
        let eventEnd = moment(e.event.end);
        // get parallel events
        let parallel = 1;
        let parallelWith = []
        for ( let m=0;m<regular_events.length; m++) {
            let s = regular_events[m];
            if ( m !== i) {
                if ( moment(s.event.start).isBetween(eventStart, eventEnd) || moment(s.event.end).isBetween(eventStart, eventEnd)
                    || eventStart.isBetween(moment(s.event.start), moment(s.event.end)) || eventEnd.isBetween(moment(s.event.start), moment(s.event.end))) {
                    parallel = parallel + 1;
                    parallelWith.push(s);
                }
            }
        }
        const final_event = {
            ...e,
            parallel,
            parallelWith
        }
        parallel_regular_events.push(final_event);
    }
    for ( let i= 0; i<parallel_regular_events.length; i++) {
        let e = parallel_regular_events[i];
        let eventStart = moment(e.event.start);
        let eventEnd = moment(e.event.end);
        const diff = moment(e.event.end).diff(moment(e.event.start));
        const event_props = e.starting && e.ending
                        ? {
                            height: (moment.duration(diff).as('minutes')/60) * 82,
                            top: 80 + (eventStart.hours() * 82) + (eventStart.minutes()/60 * 82)
                        }
                        : e.starting
                            ? {
                                height: (moment.duration(eventStart.clone().endOf('day').diff(eventStart)).as('minutes')/60) * 82,
                                top: 80 + (eventStart.hours() * 82) + (eventStart.minutes()/60 * 82)
                            } : {
                                top: 80,
                                height: (moment.duration(eventEnd.diff(eventEnd.clone().startOf('day'))).as('minutes')/60) * 82,
                            }
        // calculate width
        let width = (totalWidth * 15)/(16 * e.parallel);
        let left = totalWidth/16;
        for ( let j=0; j<i;j++) {
            let k = parallel_regular_events[j];
            if ( moment(k.event.start).isBetween(eventStart, eventEnd) || moment(k.event.end).isBetween(eventStart, eventEnd)
                || eventStart.isBetween(moment(k.event.start), moment(k.event.end)) || eventEnd.isBetween(moment(k.event.start), moment(k.event.end))) {
                width = ((totalWidth) * 15)/(16 * (e.parallel));
                left = left + width;
            }
        }
        const final_event = {
            ...e,
            ...event_props,
            left,
            width
        }
        final_regular_events.push(final_event);
    }
    return (
        <Grid columns={2} textAlign="center" style={{"margin": "0"}}>
            <Grid.Row divided style={{"paddingTop": "0", "paddingBottom": "0"}} id="cal-row">
                <Grid.Column width={1} style={{"padding": "0", "margin":"0"}}>All day events</Grid.Column>
                <Grid.Column width={15} style={{"padding": "0", "margin":"0"}}>
                    <Segment basic inverted={inverted} style={{"height": "80px", "padding": "0", "margin":"0"}}>
                        {
                            all_day_events && all_day_events.map((e, index) => {
                                return (
                                    <div style={{
                                        "backgroundColor": e.event.color,
                                        width: "100%",
                                        "borderRadius": "6px"
                                    }}
                                        key={index}
                                        className="cal-event"
                                    >
                                        {e.event.title}
                                    </div>
                                )
                            })
                        }
                    </Segment>
                    <Divider fitted/>
                </Grid.Column>
            </Grid.Row>
            {
                time_slots.map(time_slot => {
                    return (
                        <Grid.Row key={time_slot} divided style={{"paddingTop": "0", "paddingBottom": "0"}}>
                            <Grid.Column width={1} id="time-slot" style={{"padding": "0", "margin":"0"}}>
                                {time_slot}
                            </Grid.Column>
                            <Grid.Column width={15} style={{"padding": "0", "margin":"0"}}>
                                <Segment basic inverted={inverted} style={{"height": "80px", "padding": "0", "margin":"0"}}>

                                </Segment>
                                <Divider fitted style={{"margin": 0}}/>
                            </Grid.Column>
                        </Grid.Row>
                    )
                })
            }
            {
                final_regular_events && final_regular_events.map((e, index) => {
                    return (
                        <div style={{
                            position:"absolute",
                            top: `${e.top}px`,
                            backgroundColor: e.event.color,
                            height: `${e.height}px`,
                            borderRadius: '6px',
                            width: `${e.width}px`,
                            left: `${e.left}px`,
                            color: 'white',
                            padding: '5px',
                            textAlign: 'left'
                        }} key={index}>
                            {e.event.title}
                            <br />
                            <div style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}>{e.event.description}</div>
                        </div>
                    )
                })
            }
        </Grid>
    )
}

export default CalendarDay;