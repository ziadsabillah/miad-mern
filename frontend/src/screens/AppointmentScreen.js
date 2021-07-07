import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Col, Row, Table } from 'react-bootstrap'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Message from '../components/Message'
import timeGridPlugin from '@fullcalendar/timegrid'
import bootstrapPlugin from '@fullcalendar/bootstrap'

import { useDispatch, useSelector } from 'react-redux'


import {
    listAppointments
} from '../actions/appointmentActions'
import Loader from '../components/Loader'


const AppointmentScreen = ({ history, match }) => {

    const dispatch = useDispatch()

    const appointmentList = useSelector((state) => state.appointmentList)
    const { loading, error, appointments, page, pages } = appointmentList

    const userLogin = useSelector((state) => state.userLogin)

    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listAppointments('', 1))
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    return (
        <>

            <Row className='align-items-center'>
                <Col>
                    <h1>Appointments</h1>
                </Col>
                <Col className="text-right">

                </Col>
            </Row>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, bootstrapPlugin]}
                        themeSystem='bootstrap'
                        allDaySlot={false}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth, timeGridWeek, timeGridDay'
                        }}
                        initialView="timeGridDay"
                        weekends={false}
                        // events={appointments.map((appointment) => (
                        //     { id: appointment._id, title: 'App', allDay: false, start: appointment?.startDate, end: appointment?.endDate}
                        // ))} 
                        events={
                            [
                                {title: 'appointment 1', start: appointments[0]?.startTime.replace('Z', ''), end: appointments[0]?.endTime.replace('Z', '')}
                            ]
                        }
                        />
                </>
            )}

        </>
    )
}

export default AppointmentScreen;