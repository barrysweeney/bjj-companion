import React from "react";
import { Component } from "react";
import { Button } from "./components/Button";
import styled from "styled-components";

const NoteWrapper = styled.div`
  background: #eee;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid black;
  border-radius: 5px;

  span {
    font-weight: bold;
  }
`;

export class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  componentDidMount() {
    this.getNotesFromDatabase();
  }

  async getNotesFromDatabase() {
    const token = localStorage.getItem("auth-token");
    const response = await fetch("http://localhost:9000/notes/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (response.status === 200 || response.status === 304) {
      const data = await response.json();
      this.setState({
        notes: data,
      });
    }
  }

  async saveNoteToDatabase(e) {
    e.preventDefault();
    e.persist();
    const content = e.target.note.value;
    const token = localStorage.getItem("auth-token");
    const body = {};
    body.content = content;
    const response = await fetch("http://localhost:9000/notes/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(body),
    });
    if (response.status === 200) {
      this.setState({
        saveable: false,
      });
      e.target.reset();
      this.getNotesFromDatabase();
    }
  }

  render() {
    return (
      <div id="notes">
        <header>
          <h2
            style={{
              fontFamily: `'Dancing Script', cursive`,
              fontSize: `3.5rem`,
            }}
          >
            Notes
          </h2>
        </header>
        <form
          style={{
            display: `grid`,
            gridTemplateColumns: `1fr`,
            gridGap: `10px`,
          }}
          onSubmit={this.saveNoteToDatabase.bind(this)}
        >
          <label htmlFor="note">New Note</label>
          <textarea name="note" id="note" cols="30" rows="5"></textarea>
          <Button>Save</Button>
        </form>
        {this.state.notes.reverse().map((note) => {
          return (
            <NoteWrapper>
              <span>{note.date}</span>
              <p>{note.content}</p>
            </NoteWrapper>
          );
        })}
      </div>
    );
  }
}
