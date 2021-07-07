
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

const AdminDashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <section className="module-cards">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Rendez-vous</Card.Title>
                        <Card.Text>Voir tous les rendez-vous dans une view calendrier</Card.Text>
                    </Card.Body>
                    <LinkContainer to='admin/appointments'>
                        <Button variant='primary'>
                            Voir Plus
                        </Button>
                    </LinkContainer>

                </Card>

            </section>
        </div>
    )
}

export default AdminDashboard;