import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import { Link } from "react-router-dom";
export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Book Management</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/lists">Books List</Link>
            </NavItem>
            <NavItem>
              <Link to="/create">Add Book</Link>
            </NavItem>
            <NavItem>
              <Link to="/graphics">Analytics</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

// export default Example;
// import React, { useState } from 'react';
// import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
//
// export default function Example() {
//   const [collapsed, setCollapsed] = useState(true);
//
//   const toggleNavbar = () => setCollapsed(!collapsed);
//
//   return (
//     <div>
//       <Navbar  light>
//         <NavbarBrand href="/" className="mr-auto">Book Management</NavbarBrand>
//         <NavbarToggler onClick={toggleNavbar} className="mr-2" />
//         <Collapse isOpen={!collapsed} navbar>
//           <Nav navbar>
//             <NavItem>
//               <NavLink href="/lists">Book List </NavLink>
//               <NavLink href="/create">Add Book </NavLink>
//               <NavLink href="/analysis">Analytics</NavLink>
//             </NavItem>
//           </Nav>
//         </Collapse>
//       </Navbar>
//     </div>
//   );
// }
//
