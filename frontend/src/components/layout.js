import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";

const GridContainer = styled.div`
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  padding-top: 30px;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const NavList = styled.nav`
  position: fixed;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: -moz-available;
  background: white;
`;

export default function Layout({ children }) {
  return (
    <Container>
      <NavList>
        <a href="#progress">Progress</a>

        <a href="#notes">Notes</a>

        <a href="#gameplan">Gameplan</a>
      </NavList>

      <GridContainer>
        <header>
          <h1>Jiu-Jitsu Companion</h1>
        </header>
        {children}
        <footer>The footer</footer>
      </GridContainer>
    </Container>
  );
}
