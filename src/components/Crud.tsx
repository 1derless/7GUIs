import { useState } from "react";
import SelectBox from "./SelectBox";

const INITIAL_PEOPLE = [
  { surname: "Emil", forename: "Hans" },
  { surname: "Mustermann", forename: "Max" },
  { surname: "Tisch", forename: "Roman" },
];

function Crud() {
  const [prefix, setPrefix] = useState("");
  const [forename, setForename] = useState("John");
  const [surname, setSurname] = useState("Romba");
  const [people, setPeople] = useState(INITIAL_PEOPLE);
  const [selectedEntry, setSelectedEntry] = useState<null | number>(null);

  function createPerson() {
    setPeople([...people, { forename, surname }]);
    setForename("");
    setSurname("");
  }

  function updatePerson() {
    setPeople(
      people.map((p, i) => (i === selectedEntry ? { forename, surname } : p)),
    );
  }

  function deletePerson() {
    setPeople(people.filter((_, i) => i !== selectedEntry));
    setSelectedEntry(null);
  }

  const entries = people
    .map(({ surname, forename }) => `${surname}, ${forename}`)
    .filter((key) => key.startsWith(prefix));

  return (
    <div className="crud-container">
      <div className="crud-column">
        <label htmlFor="crud-prefix">Filter prefix</label>
        <input
          type="text"
          id="crud-prefix"
          placeholder="Filter prefix"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
        />
        <SelectBox
          selected={selectedEntry}
          entries={entries}
          onSelect={setSelectedEntry}
        />
      </div>
      <div className="crud-column">
        <label htmlFor="crud-forename">Forename</label>
        <input
          type="text"
          id="crud-forename"
          value={forename}
          onChange={(e) => setForename(e.target.value)}
        />
        <label htmlFor="crud-surname">Surname</label>
        <input
          type="text"
          id="crud-surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <button onClick={createPerson}>Create</button>
        <button onClick={updatePerson}>Update</button>
        <button onClick={deletePerson}>Delete</button>
      </div>
    </div>
  );
}

export default Crud;
