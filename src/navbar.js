import {Container,Nav,Navbar}from 'react-bootstrap';

function navbar() {
    return (
        <Navbar bg="d" expand="lg">
            <Container fluid className="ml-0">
                <Navbar.Brand href="/">Book Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="list">Books List</Nav.Link>
                        <Nav.Link href="create">Add Book</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>);
}
export default navbar;