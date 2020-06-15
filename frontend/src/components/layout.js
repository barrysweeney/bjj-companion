import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";

const GridContainer = styled.div`
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
`;

const NavList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

export default function Layout({ children }) {
  return (
    <Container>
      <GridContainer>
        <nav>
          <NavList>
            <li>
              <a href="#">Progress</a>
            </li>
            <li>
              <a href="#">Notes</a>
            </li>
            <li>
              <a href="#">Gameplan</a>
            </li>
          </NavList>
        </nav>
        <header>
          <h1>Jiu-Jitsu Companion</h1>
        </header>
        {children}
        <footer>The footer</footer>
      </GridContainer>
    </Container>
  );
}
