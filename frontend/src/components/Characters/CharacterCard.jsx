/* eslint-disable react/prop-types */
import placeholder from "./assets/placeholder.png";

function CharacterCard({ character, viewCharacter, deleteCharacter }) {
  return (
    <div className="border">
      <img src={character?.img || placeholder} className="card-img-top"></img>
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
        <p className="card-text">{character.raceClass}</p>
      </div>
      <div>
        <button
          className="character-button btn btn-primary"
          onClick={() => viewCharacter(character.id)}
        >
          VIEW
        </button>
        <button
          className="character-button btn btn-primary"
          onClick={() => alert("Comming soon... (hopefully)")}
        >
          EDIT
        </button>
        <button
          className="character-button btn btn-primary"
          onClick={() => alert("Comming soon... (hopefully)")}
        >
          DUPLICATE
        </button>
        <button
          className="character-button btn btn-primary"
          onClick={() => deleteCharacter(character.id)}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

export default CharacterCard;
