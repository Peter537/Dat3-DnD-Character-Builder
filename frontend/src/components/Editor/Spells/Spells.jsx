import React, { useState } from "react";
import "../Spells/styles/Spells.css"; // You can create a separate CSS file for styling
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Spells = () => {
  // State for spell information
  const [spellInfo, setSpellInfo] = useState({
    spellcastingClass: "",
    spellcastingAbility: "",
    spellSaveDC: "",
    spellAttackBonus: "",
    cantrips: "",
    spellLevels: {
      spellLevel1: { slots: 0, spells: [] },
      spellLevel2: { slots: 0, spells: [] },
      spellLevel3: { slots: 0, spells: [] },
      spellLevel4: { slots: 0, spells: [] },
      spellLevel5: { slots: 0, spells: [] },
      spellLevel6: { slots: 0, spells: [] },
      spellLevel7: { slots: 0, spells: [] },
      spellLevel8: { slots: 0, spells: [] },
    },
  });

  // Function to handle changes in spell information
  const handleChange = (field, value) => {
    setSpellInfo({
      ...spellInfo,
      [field]: value,
    });
  };

  const updateSlots = (spellLevel, e) => {
    const value = e.target.value;
    setSpellInfo((prevSpellInfo) => {
      const updatedSpellLevels = {
        ...prevSpellInfo.spellLevels,
        [spellLevel]: {
          ...prevSpellInfo.spellLevels[spellLevel],
          slots: value,
        },
      };
      return {
        ...prevSpellInfo,
        spellLevels: updatedSpellLevels,
      };
    });
  };


  // Function to add a new empty field for a specific spell level
  const addSpellField = (spellLevel) => {
    setSpellInfo((prevSpellInfo) => ({
      ...prevSpellInfo,
      spellLevels: {
        ...prevSpellInfo.spellLevels,
        [spellLevel]: {
          ...prevSpellInfo.spellLevels[spellLevel],
          spells: [...prevSpellInfo.spellLevels[spellLevel].spells, ""],
        },
      },
    }));
  };

  // Function to handle changes in spell level input fields
  const handleSpellLevelChange = (spellLevel, index, value) => {
    setSpellInfo((prevSpellInfo) => {
      const updatedSpellLevels = {
        ...prevSpellInfo.spellLevels,
        [spellLevel]: {
          ...prevSpellInfo.spellLevels[spellLevel],
          spells: prevSpellInfo.spellLevels[spellLevel].spells.map(
            (item, i) => (i === index ? value : item)
          ),
        },
      };
      return {
        ...prevSpellInfo,
        spellLevels: updatedSpellLevels,
      };
    });
  };

  // Function to handle using a spell slot
  const useSpellSlot = (spellLevel) => {
    setSpellInfo((prevSpellInfo) => {
      const currentSlots = prevSpellInfo.spellLevels[spellLevel].slots;
      if (currentSlots > 0) {
        const updatedSpellLevels = {
          ...prevSpellInfo.spellLevels,
          [spellLevel]: {
            ...prevSpellInfo.spellLevels[spellLevel],
            slots: currentSlots - 1,
          },
        };
        return {
          ...prevSpellInfo,
          spellLevels: updatedSpellLevels,
        };
      }
      return prevSpellInfo;
    });
  };

  return (
    <div className="spell-container" style={{ marginBottom: "10%" }}>
      <table className="spell-table">
        <tbody>
          {/* Spellcasting Information Grid */}
          <tr>
            <td>
              <label>Spellcasting Class:</label>
            </td>
            <td>
              <input
                type="text"
                value={spellInfo.spellcastingClass}
                onChange={(e) =>
                  handleChange("spellcastingClass", e.target.value)
                }
              />
            </td>
            <td>
              <label>Spellcasting Ability:</label>
            </td>
            <td>
              <input
                type="text"
                value={spellInfo.spellcastingAbility}
                onChange={(e) =>
                  handleChange("spellcastingAbility", e.target.value)
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Spell Save DC:</label>
            </td>
            <td>
              <input
                type="text"
                value={spellInfo.spellSaveDC}
                onChange={(e) => handleChange("spellSaveDC", e.target.value)}
              />
            </td>
            <td>
              <label>Spell Attack Bonus:</label>
            </td>
            <td>
              <input
                type="text"
                value={spellInfo.spellAttackBonus}
                onChange={(e) =>
                  handleChange("spellAttackBonus", e.target.value)
                }
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* Spells Grid */}
      <table className="spell-level-table">
        <tbody>
          <tr>
            <th></th>
            {Array.from({ length: 9 }, (_, index) => (
              <th key={index}>
                <div>
  {index === 0 ? "Cantrips" : `SPELL LEVEL ${index}`}
  <button
    type="button"
    onClick={() => addSpellField(`spellLevel${index + 1}`)}
  >
    +
  </button>
  <div>
    Slots:{" "}
    <input
      type="number"
      value={spellInfo.spellLevels[`spellLevel${index + 1}`]?.slots}
      onChange={(e) => updateSlots(`spellLevel${index + 1}`, e)}
    />
  </div>
</div>

              </th>
            ))}
          </tr>
          <tr>
            <td className="spell-level-header">Spells</td>
            {Array.from({ length: 9 }, (_, index) => (
              <td key={index}>
                <div>
                  {spellInfo.spellLevels[`spellLevel${index + 1}`]?.spells?.map(
                    (spell, subIndex) => (
                      <div key={subIndex} className="input-container">
                        <input
                          type="text"
                          value={spell}
                          onChange={(e) =>
                            handleSpellLevelChange(
                              `spellLevel${index + 1}`,
                              subIndex,
                              e.target.value
                            )
                          }
                        />
                        <button
                          type="button"
                          onClick={() => useSpellSlot(`spellLevel${index + 1}`)}
                        >
                          Use
                        </button>
                      </div>
                    )
                  )}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Spells;
