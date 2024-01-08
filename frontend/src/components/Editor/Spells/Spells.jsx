import React, { useEffect, useState } from "react";
import "../Spells/styles/Spells.css"; // You can create a separate CSS file for styling
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Spells({ charInfo, setCharInfo }) {

  const [spellInfo, setSpellInfo] = useState({
    spellcastingClass: "",
    spellcastingAbility: "",
    spellSaveDC: "",
    spellAttackBonus: "",
    cantrips: "",
    spellLevels: {
      spellLevel1: { spells: [] },
      spellLevel2: { spells: [] },
      spellLevel3: { spells: [] },
      spellLevel4: { spells: [] },
      spellLevel5: { spells: [] },
      spellLevel6: { spells: [] },
      spellLevel7: { spells: [] },
      spellLevel8: { spells: [] },
    },
  });

  useEffect(() => {
    setCharInfo({
      ...charInfo,
      data: {
        ...charInfo.data,
        spells: spellInfo,
      },
    });
  }, [spellInfo]);

  const handleChange = (field, value) => {
    setSpellInfo({
      ...spellInfo,
      [field]: value,
    });
  };

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

  const handleSpellLevelChange = (spellLevel, index, value) => {
    setSpellInfo((prevSpellInfo) => ({
      ...prevSpellInfo,
      spellLevels: {
        ...prevSpellInfo.spellLevels,
        [spellLevel]: {
          ...prevSpellInfo.spellLevels[spellLevel],
          spells: prevSpellInfo.spellLevels[spellLevel].spells.map(
            (item, i) => (i === index ? value : item)
          ),
        },
      },
    }));
  };

  return (
    <div className="spell-container" style={{ marginBottom: "10%" }}>
      <table className="spell-table">
        <tbody>

          {/* Basic spell info DC saving, ATK bonus etc. */}
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

      {/* Actual spell grid showing the selfwritten abilities */}
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
}

export default Spells;
