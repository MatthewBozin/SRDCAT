import React, { useState, useContext } from "react";
import Character from "../../data/character.js";

const Notes = () => {
    const [character, setCharacter] = useContext(Character);
    const [notesData, setNotesData] = useState("");

    const saveNotes = () => {
        let newCharacter = character;
        newCharacter.notes = notesData;
        setCharacter(JSON.parse(JSON.stringify(newCharacter)));
    }

    let notes;
    if (character.notes){
        notes = character.notes;
    } else {notes = "Notes"};

    return (
      <div>
          <textarea
              className="textarea"
              name="notesText"
              id="notesText"
              placeholder={notes}
              cols="40"
              rows="5"
              onChange={(e) => setNotesData(e.target.value)}
          ></textarea>
          <button
              className="button bordered padded5px fullwidth"
              onClick={() => {
                saveNotes(notesData);
              }}
          >
              Save Notes
            </button>
      </div>
    )
}

export default Notes