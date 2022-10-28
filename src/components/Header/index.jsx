import { React } from 'react';
import 'rbx/index.css';
import { Navbar, Container } from 'rbx';
import { Link } from 'react-router-dom';
import Button from '../Button/index.jsx';

function Header() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <h1>OLA</h1>
          <Navbar.Burger
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-menu">
            <span aria-hidden="true"></span>
          </Navbar.Burger>
        </Navbar.Brand>

        <Navbar.Menu>
          <Navbar.Segment align="end">
            <Navbar.Item>
                  <Button>Login</Button>
            </Navbar.Item>
          </Navbar.Segment>
        </Navbar.Menu>
      </Container>
    </Navbar>
  );
}

export default Header;