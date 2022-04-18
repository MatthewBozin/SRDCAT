import React, { useState, useContext } from "react";
import Character from "../../data/character.js";
import Description from "../bits/Description.js";

const Notes = () => {
    const [character, setCharacter] = useContext(Character);
    const [notesData, setNotesData] = useState("");
    const [input, setInput] = useState(false);

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
          {input === false && !character.notes && 
            <div>
                <Description description={"Hero notes go here!"} />
                <button
                    className="button bordered padded5px fullwidth"
                    onClick={() => {
                      setInput(true);
                    }}
                >
                    Add Notes
                </button>  
            </div>}
          {input === false && character.notes && 
            <div>
                <Description description={character.notes} />
                <button
                      className="button bordered padded5px fullwidth"
                      onClick={() => {
                        setInput(true);
                      }}
                  >
                      Edit Notes
                </button>  
            </div>}
          {input === true && <div>
            <textarea
                className="textarea"
                name="notesText"
                id="notesText"
                cols="40"
                rows="5"
                onChange={(e) => setNotesData(e.target.value)}
            >{notes}</textarea>
            <button
                className="button bordered padded5px fullwidth"
                onClick={() => {
                  saveNotes(notesData);
                  setInput(false);
                }}
            >
                Save Notes
            </button>    
          </div>}
          
      </div>
    )
}

export default Notes