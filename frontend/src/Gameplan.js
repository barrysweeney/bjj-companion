import React from "react";
import styled from "styled-components";
import { BsArrowDown } from "react-icons/bs";

const PositionWrapper = styled.div`
  ul {
    list-style: none;
    padding-left: 0;
  }

  background: #eee;
  padding: 10px;
  margin: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  text-align: center;
`;

const GameplanGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const ArrowWrapper = styled.div`
  font-size: 70px;
  text-align: center;
  padding: 10px;
  margin: 10px;
`;

const Position = (props) => {
  return (
    <PositionWrapper>
      {props.position}
      <ul>
        {props.moves.map((move) => (
          <li>{move.name}</li>
        ))}
      </ul>
    </PositionWrapper>
  );
};

export function Gameplan() {
  return (
    <div>
      <header>
        <h2>Gameplan</h2>
      </header>
      <GameplanGrid>
        <Position
          position={<input placeholder="Position Name" />}
          moves={[
            {
              name: <input placeholder="Move Name" />,
            },
          ]}
        />
        <ArrowWrapper>
          <BsArrowDown />
        </ArrowWrapper>
        <Position
          position={<input placeholder="Position Name" />}
          moves={[
            {
              name: <input placeholder="Move Name" />,
            },
          ]}
        />
        <ArrowWrapper>
          <BsArrowDown />
        </ArrowWrapper>
        <Position
          position={<input placeholder="Position Name" />}
          moves={[
            {
              name: <input placeholder="Move Name" />,
            },
          ]}
        />
        <ArrowWrapper>
          <BsArrowDown />
        </ArrowWrapper>
        <Position
          position={<input placeholder="Position Name" />}
          moves={[
            {
              name: <input placeholder="Move Name" />,
            },
          ]}
        />
        <ArrowWrapper>
          <BsArrowDown />
        </ArrowWrapper>
        <Position
          position={<input placeholder="Position Name" />}
          moves={[
            {
              name: <input placeholder="Move Name" />,
            },
          ]}
        />
        <ArrowWrapper>
          <BsArrowDown />
        </ArrowWrapper>
        <Position
          position={<input placeholder="Position Name" />}
          moves={[
            {
              name: <input placeholder="Move Name" />,
            },
          ]}
        />
        <ArrowWrapper>
          <BsArrowDown />
        </ArrowWrapper>
        <Position
          position={<input placeholder="Position Name" />}
          moves={[
            {
              name: <input placeholder="Move Name" />,
            },
          ]}
        />
        <ArrowWrapper>
          <BsArrowDown />
        </ArrowWrapper>
        <Position
          position={<input placeholder="Position Name" />}
          moves={[
            {
              name: <input placeholder="Move Name" />,
            },
          ]}
        />
        <ArrowWrapper>
          <BsArrowDown />
        </ArrowWrapper>
        <Position
          position={<input placeholder="Position Name" />}
          moves={[
            {
              name: <input placeholder="Move Name" />,
            },
          ]}
        />
      </GameplanGrid>
    </div>
  );
}
