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
    createAppointment,
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

    const handleAddEventClick = () => {
        console.log('Add Event Clicked')
        history.push('/appointments/add')
    }

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
                            left: 'prev,next',
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
                            addEventButton: {text: 'Ajouter un rendez-vous', click: handleAddEventClick}
                        }}
                        events={appointments.length > 1 ? appointments?.map((appointment) => (
                            { id: appointment._id, title: 'App', allDay: false, start: appointment?.startDate?.replace('Z', ''), end: appointment?.endDate?.replace('Z', '')}
                        )) : [
                            {
                                title: 'appointment 1', start: appointments[0]?.startTime.replace('Z', ''), end: appointments[0]?.endTime.replace('Z', ''), extendedProps: {
                                                client: userLogin.name
                                }
                            }
                        ]} 
                    />


                </>
            )}

        </>
    )
}

export default AppointmentScreen;