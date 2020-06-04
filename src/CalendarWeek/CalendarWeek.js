import React, {useState, useEffect} from 'react';
import { Grid } from 'semantic-ui-react';
import moment from 'moment';
import DayTasks from '../DayTasks/DayTasks';
import Moment from 'react-moment';

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

const CalendarWeek = (props) => {
    const time_slots = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM',
    '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'];
    let width = useRowWidth();
    let days = Array(7).fill(0).map((n, i) => moment(props.currDate).startOf('week').clone().add(n + i, 'day'))
    return (
        <Grid columns={2} style={{"padding": "0", "margin": "0"}}>
            <Grid.Column width={1} style={{"padding": "0", "margin": "0"}}>
                <Grid style={{"padding": "0", "margin": "0"}}>
                    <Grid.Row style={{"padding": "0", "margin":"0"}}>
                        <Grid.Column style={{"padding": "0", "margin":"0", "height": "52px"}}>
                            All Day Events
                        </Grid.Column>
                    </Grid.Row>
                    {
                        time_slots.map(time_slot => {
                            return (
                                <Grid.Row key={time_slot} style={{"padding": "0", "margin":"0"}}>
                                    <Grid.Column id="time-slot" style={{"padding": "0", "margin":"0", "height": "52px"}}>
                                        {time_slot}
                                    </Grid.Column>
                                </Grid.Row>
                            )
                        })
                    }
                </Grid>
            </Grid.Column>
            <Grid.Column width={15} style={{"padding": "0", "margin":"0"}}>
                <Grid columns={7} celled divided style={{"padding": "0", "margin":"0"}}>
                    <Grid.Row style={{"padding": "0", "margin":"0"}}>
                        {
                            days.map(day => {
                                return (
                                    <Grid.Column key={day} style={{"padding": "0", "margin":"0"}}>
                                        <Moment format="DD MMM, YYYY">{day}</Moment>
                                    </Grid.Column>
                                )
                            })
                        }
                    </Grid.Row>
                    {
                        days.map((day, index) => {
                            return (
                                <Grid.Column key={index} id='cal-row' style={{"padding": "0", "margin":"0"}}>
                                    <DayTasks width={width} height={50} events={props.events[moment(day).format("YYYY-MM-DD")]} />
                                </Grid.Column>
                            )
                        })
                    }
                </Grid>
            </Grid.Column>
        </Grid>
    )
}

export default CalendarWeek;