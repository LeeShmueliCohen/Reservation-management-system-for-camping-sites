import React, { useState } from 'react';
import logo from './logo2.png';
import './Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { cartActions } from '../../store/cart-slice';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  const counter = useSelector((state) => state.cart.counter);
  const cartIcon = (
    <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
  );
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="navbar-custom"
        fixed="top"
        onToggle={(isOpen) => setIsCollapseOpen(isOpen)}
      >
        <Container fluid className="d-flex">
          <Navbar.Brand as={NavLink} to="/" className="ms-auto">
            <img
              className="custom-logo-link"
              src={logo}
              alt="רשות הטבע והגנים"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link as={NavLink} to="/Info">
                {' '}
                אודות{' '}
              </Nav.Link>
              <NavDropdown title="אתרי קמפינג " id="basic-nav-dropdown">
                <NavDropdown.Item
                  as={NavLink}
                  to="/חניון-לילה-גן-לאומי-אכזיב-וחוף-אכזיב/2"
                >
                  חניון לילה אכזיב
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/חניון-לילה-גן-לאומי-מעיין-חרוד/3"
                >
                  חניון לילה מעיין חרוד
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/חניון-לילה-שמורת-טבע-נחל-עמוד/6"
                >
                  חניון לילה נחל עמוד
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={NavLink} to="/PrivacyPolicy">
                {' '}
                מדיניות פרטיות{' '}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/TermsUse">
                {' '}
                תנאי שימוש{' '}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Link
            id="cart-button"
            to="cart"
            onMouseOver={() => dispatch(cartActions.showCart(true))}
            className={isCollapseOpen ? 'cart-button-open' : 'cart-button'}
          >
            {isCollapseOpen ? null : (
              <>
                <span id="count">{counter}</span>
                {cartIcon}
              </>
            )}
          </Link>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
