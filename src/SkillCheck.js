import { useState } from 'react';
import { SKILL_LIST } from './consts.js';


function SkillCheck({attributeData, skillData}) {
    const [DC, setDC] = useState(20);
    const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);

    const [skillCheckDC, setSkillCheckDC] = useState(NaN);
    const [skillCheckRollValue, setSkillCheckRollValue] = useState(NaN);
    const [skillCheckSuccess, setSkillCheckSuccess] = useState(null);

    const handleRollClick = () => {
        const characterSkillValue = skillData[selectedSkill].value + attributeData[skillData[selectedSkill].attributeModifier].modifier;
        const rollValue = Math.floor(Math.random() * 20) + 1;

        setSkillCheckDC(DC);
        setSkillCheckRollValue(rollValue);
        setSkillCheckSuccess(characterSkillValue + rollValue > DC);
    };

    return (
        <>
            <select onChange={e => setSelectedSkill(e.target.value)}>
                {SKILL_LIST.map((skill, i) =>
                    <option key={i} value={skill.name}>{skill.name}</option>
                )}
            </select>&nbsp;
            DC: <input value={DC} onChange={(e) => setDC(e.target.value)} min={1} />
            <button onClick={handleRollClick}>Roll</button>
            {!isNaN(skillCheckRollValue) && (
                <>
                    <br />
                    You rolled: {skillCheckRollValue} and the DC was: {skillCheckDC}<br />
                    {skillCheckSuccess && "Success!" || "Failure :("}&nbsp;
                </>
            )}
        </>
    );
}

export default SkillCheck;