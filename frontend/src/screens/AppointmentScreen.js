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
import Modal from 'react-bootstrap/Modal'

const AppointmentScreen = ({ history, match }) => {

    const dispatch = useDispatch()

    const appointmentList = useSelector((state) => state.appointmentList)
    const { loading, error, appointments, page, pages } = appointmentList

    const [showModal, setModal] = useState(false);
    const [eventInfo, setEventInfo] = useState({});

    const userLogin = useSelector((state) => state.userLogin)

    const { userInfo } = userLogin

    const handleDateClick = (arg) => {
        console.log(arg)
    }
    const handleClose = () => setModal(false)
    const handleShow = () => setModal(true)


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
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

                    <Modal
                        show={showModal}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        aria-labelledby='modal-label'>
                            <Modal.Header closeButton>
                                <Modal.Title>Appointment Info</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {eventInfo.title + ' ' + eventInfo.start}
                                <p>{eventInfo.extendedProps?.client}</p>
                            </Modal.Body>
                    </Modal>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, bootstrapPlugin]}
                        themeSystem='bootstrap'
                        allDaySlot={false}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'addEventButton',
                            right: 'dayGridMonth, timeGridWeek, timeGridDay'
                        }}
                        dateClick={handleDateClick}
                        initialView="timeGridDay"
                        weekends={false}
                        eventClick={(info) => {
                            handleShow();
                            setEventInfo(info.event)
                        }}
                        customButtons={{
                            addEventButton: {text: 'Ajouter un rendez-vous', click: () => {
                                let dateStr = prompt('Entrer la ddate avec la forme YYYY-MM-DD');
                                let date = new Date(dateStr + 'T00:00:00') // Will be in local time

                            }}
                        }}
                        // events={appointments.map((appointment) => (
                        //     { id: appointment._id, title: 'App', allDay: false, start: appointment?.startDate, end: appointment?.endDate}
                        // ))} 
                        events={
                            [
                                { title: 'appointment 1', start: appointments[0]?.startTime.replace('Z', ''), end: appointments[0]?.endTime.replace('Z', ''), extendedProps: {
                                    client: 'Ziad'
                                } }
                            ]
                        }
                    />


                </>
            )}

        </>
    )
}

export default AppointmentScreen;