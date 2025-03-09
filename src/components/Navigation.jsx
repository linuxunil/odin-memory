import { Container, Row, Col, Navbar } from "react-bootstrap";

function Navigation(props) {
    return (<Container fluid>
        <Navbar expand="lg" className="bg-body-tertiary" pb={4} fixed="top">
            <Navbar.Brand href="#home">Pokemon Memorization</Navbar.Brand>
            <Col className="justify-content-end">
                <Row>
                    <Navbar.Text>
                        Score: {props.score}
                    </Navbar.Text>
                </Row>
                <Row>
                    <Navbar.Text>
                        High Score: {props.highScore}
                    </Navbar.Text>
                </Row>
            </Col>
        </Navbar>
    </Container>)
}
export default Navigation;