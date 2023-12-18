/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import CharacterCard from "../../components/Characters/CharacterCard";
import "./style/CharactersPage.css";

function CharactersPage() {
  const [characters, setCharacters] = useState(defaultCharacters);
  const [shownCharacters, setShownCharacters] = useState(defaultCharacters);
  const [sortingMethod, setSortingMethod] = useState("1"); // 1 = A to Z, 2 = Z to A
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    search();
  }, [sortingMethod, searchValue]);

  function viewCharacter(id) {
    console.log(`View character ${id}`);
  }

  function deleteCharacter(id) {
    console.log(`Delete character ${id}`);
  }

  function search() {
    let filteredCharacters = characters
      .filter(
        (character) =>
          character.name.toLowerCase().includes(searchValue?.toLowerCase()) ||
          character.raceClass.toLowerCase().includes(searchValue?.toLowerCase())
      )
      .sort((a, b) => {
        if (sortingMethod === "1") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    setShownCharacters(filteredCharacters);
  }

  return (
    <div className="characters-container row" style={{ marginBottom: "5rem" }}>
      <div className="col-12">
        <h1 className="" style={{ marginTop: "2rem", marginBottom: "1rem" }}>
          My Characters
        </h1>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-2">
            Slots: {characters.length ? characters.length : 0}
          </div>
          <button className="col-2 btn btn-primary">
            Create a new Character
          </button>
          <div className="col-4"></div>
        </div>
      </div>
      <div id="characters-page-line"></div>
      <div className="col-12">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <div className="row characters-search-box">
              <div className="col-6">
                <input
                  type="text"
                  onChange={(event) => {
                    event.preventDefault();
                    setSearchValue(event.target.value);
                  }}
                  placeholder="Search"
                  style={{ margin: "0.5rem" }}
                ></input>
              </div>
              <div className="col-4">
                <select
                  name="characters-sort-by"
                  id="characters-sort-by"
                  onChange={(event) => {
                    event.preventDefault();
                    setSortingMethod(event.target.value);
                  }}
                  style={{ margin: "0.5rem" }}
                >
                  <option value="1">Name: A to Z</option>
                  <option value="2">Name: Z to A</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10 row row-cols-1 row-cols-md-3 g-4">
            {shownCharacters?.map((character, index) => (
              <div key={index}>
                <CharacterCard
                  character={character}
                  viewCharacter={viewCharacter}
                  deleteCharacter={deleteCharacter}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
}

const defaultCharacters = [
  {
    id: 1,
    name: "AName 1",
    image: null,
    raceClass: "race class 1",
  },
  {
    id: 2,
    name: "Name 2",
    image: null,
    raceClass: "race class 2",
  },
  {
    id: 3,
    name: "BName 3",
    image: null,
    raceClass: "race class 3",
  },
  {
    id: 4,
    name: "Name 4a",
    image: null,
    raceClass: "race class 4",
  },
  {
    id: 5,
    name: "Name 5C",
    image: null,
    raceClass: "race class 5",
  },
  {
    id: 6,
    name: "8Name 6",
    image: null,
    raceClass: "race class 6",
  },
  {
    id: 7,
    name: "Name 7",
    image: null,
    raceClass: "race class 7",
  },
  {
    id: 8,
    name: "TName 8",
    image: null,
    raceClass: "race class 8",
  },
  {
    id: 9,
    name: "PName 9o",
    image: null,
    raceClass: "race class 9",
  },
  {
    id: 10,
    name: "MMName 10",
    image: null,
    raceClass: "race class 10",
  },
  {
    id: 11,
    name: "Name 11q",
    image: null,
    raceClass: "race class 11",
  },
];

export default CharactersPage;
