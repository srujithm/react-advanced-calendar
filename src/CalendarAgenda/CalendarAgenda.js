import React from 'react';
import { Table } from 'semantic-ui-react';
import moment from 'moment';
import Moment from 'react-moment';

const CalendarAgenda = (props) => {
    const inverted = props.theme === "dark" ? true : false;
    const sorted_events = Object.keys(props.events).sort().reduce((result, key) => {
        result[key] = props.events[key]
        return result;
    }, {});
    return (
        <Table inverted={inverted} celled structured striped>
            <Table.Header>
                <Table.Row textAlign="center">
                    <Table.HeaderCell width={2}>Date</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Time</Table.HeaderCell>
                    <Table.HeaderCell>Event Title</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    Object.keys(sorted_events).map(key => {
                            let e = sorted_events[key];
                            const agenda_start = moment(props.currDate).format("YYYY-MM-DD");
                            const agenda_end = moment(props.currDate).add(30, 'days').format("YYYY-MM-DD");
                            return moment(key).isBetween(agenda_start, agenda_end) && (
                                e.map((value, index) =>  {
                                    if ( index === 0 ) {
                                        return (
                                            <Table.Row textAlign="center" key={index}>
                                                <Table.Cell rowSpan={e.length}>{key}</Table.Cell>
                                                <Table.Cell>
                                                    {
                                                        value.all_day
                                                            ? <span>All Day Event</span>
                                                            : value.starting && value.ending ? (
                                                                <>
                                                                    <Moment format="HH:mm:ss">{value.event.start}</Moment>
                                                                    <span style={{"padding": "1rem"}}>-</span>
                                                                    <Moment format="HH:mm:ss">{value.event.end}</Moment>
                                                                </>
                                                            ) : value.starting ? (
                                                                <>
                                                                    <Moment format="HH:mm:ss">{value.event.start}</Moment>
                                                                    <span style={{"padding": "1rem"}}>-</span>
                                                                    <Moment format="HH:mm:ss" parse="HH:mm:ss">"23:59:59"</Moment>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span>00:00:00</span>
                                                                    <span style={{"padding": "1rem"}}>-</span>
                                                                    <Moment format="HH:mm:ss">{value.event.end}</Moment>
                                                                </>
                                                            )
                                                    }
                                                </Table.Cell>
                                                <Table.Cell>{value.event.title}</Table.Cell>
                                            </Table.Row>
                                        )
                                    } else {
                                        return (
                                            <Table.Row textAlign="center" key={index}>
                                                <Table.Cell>
                                                    {
                                                        value.all_day
                                                            ? <span>All Day Event</span>
                                                            : value.starting && value.ending ? (
                                                                <>
                                                                    <Moment format="HH:mm:ss">{value.event.start}</Moment>
                                                                    <span style={{"padding": "1rem"}}>-</span>
                                                                    <Moment format="HH:mm:ss">{value.event.end}</Moment>
                                                                </>
                                                            ) : value.starting ? (
                                                                <>
                                                                    <Moment format="HH:mm:ss">{value.event.start}</Moment>
                                                                    <span style={{"padding": "1rem"}}>-</span>
                                                                    <Moment format="HH:mm:ss" parse="HH:mm:ss">"23:59:59"</Moment>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span>00:00:00</span>
                                                                    <span style={{"padding": "1rem"}}>-</span>
                                                                    <Moment format="HH:mm:ss">{value.event.end}</Moment>
                                                                </>
                                                            )
                                                    }
                                                </Table.Cell>
                                                <Table.Cell>{value.event.title}</Table.Cell>
                                            </Table.Row>
                                        )
                                    }
                                })
                            )
                        })
                }
            </Table.Body>
        </Table>
    )
}

export default CalendarAgenda;