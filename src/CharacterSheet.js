import { useEffect, useState } from 'react';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import Attribute from './Attribute.js';
import CharacterClass from './CharacterClass.js';
import Skill from './Skill.js';


function computeModifierValue({value}) {
    if (value > 10) {
        return Math.floor((value - 10) / 2);
    }
    if (value < 10) {
        return -Math.ceil((10 - value) / 2);
    }
    return 0;
};

function processInitialData(dataFromAPI) {
    let initialAttributeData;
    if ("attributes" in dataFromAPI) {
        initialAttributeData = dataFromAPI.attributes;
    } else {
        initialAttributeData = {};
        for (let attributeName of ATTRIBUTE_LIST) {
            initialAttributeData[attributeName] = { value: 10, modifier: 0 };
        }
    }

    let initialSkillData;
    if ("skills" in dataFromAPI) {
        initialSkillData = dataFromAPI.skills;
    } else {
        initialSkillData = {};
        for (let skill of SKILL_LIST) {
            initialSkillData[skill.name] = { ...skill, value: 0 };
        }
    }

    return {initialAttributeData, initialSkillData}
}

function CharacterSheet({ characterData }) {
    const { initialAttributeData, initialSkillData } = processInitialData(characterData);

    const [attributeData, setAttributeData] = useState(initialAttributeData);
    const [skillData, setSkillData] = useState(initialSkillData);

    const [maxSkillPoints, setMaxSkillPoints] = useState(0);
    const [usedSkillPoints, setUsedSkillPoints] = useState(0);

    const setMaxSkillPointsBasedOnIntelligenceModifier = () => {
        setMaxSkillPoints(10 + 4 * attributeData["Intelligence"].modifier);
    }

    const availableAttributeModifierPoints = () => {
        return 70 - Object.values(attributeData).map(attribute => attribute.value).reduce((a, b) => a + b);
    }

    const getCurrentModifierValueForAttribute = (modifierName) => {
        return attributeData[modifierName].modifier;
    }

    const handleIncrementOrDecrementAttributeValue = (attributeName, incOrDec) => {
        if (availableAttributeModifierPoints() === 0 && incOrDec > 0) {
            return;
        }

        setAttributeData(prevAttributeData => {
            const objForUpdatedAttribute = {
                ...prevAttributeData[attributeName],
                value: prevAttributeData[attributeName].value + incOrDec,
            }

            objForUpdatedAttribute.modifier = computeModifierValue(objForUpdatedAttribute);

            return {
                ...prevAttributeData,
                [attributeName]: { ...objForUpdatedAttribute },
            }
        });
    }

    const handleIncrementOrDecrementSkillValue = (name, incOrDec) => {
        if (maxSkillPoints - usedSkillPoints === 0 && incOrDec > 0) {
            return;
        }

        if (usedSkillPoints === 0 && incOrDec < 0) {
            return;
        }

        setUsedSkillPoints(prevUsedSkillPoints => prevUsedSkillPoints + incOrDec);

        setSkillData(prevSkillData => {
            return {
                ...prevSkillData,
                [name]: {
                    ...prevSkillData[name],
                    value: prevSkillData[name].value + incOrDec,
                }
            }
        });
    }

    const attributes = Object.entries(attributeData).map(([name, data], i) => {
        return (
            <Attribute
                key={i}
                name={name}
                value={data.value}
                modifier={data.modifier}
                incrementOrDecrementValueCallback={(incOrDec) => handleIncrementOrDecrementAttributeValue(name, incOrDec)}
            />
        );
    });

    const classes = Object.entries(CLASS_LIST).map(([className, classRequirements], i) => {
        return (
            <CharacterClass
                key={i}
                className={className}
                classRequirements={classRequirements}
                characterAttributeData={attributeData}
            />
        )
    });

    const skills = Object.entries(skillData).map(([name, skill], i) => {
        return (
            <Skill key={i}
                name={name}
                skillObj={skill}
                modifierValue={getCurrentModifierValueForAttribute(skill.attributeModifier)}
                incrementOrDecrementValueCallback={(incOrDec) => handleIncrementOrDecrementSkillValue(name, incOrDec)} />
        )
    });

    useEffect(() => {
        characterData.attributes = attributeData;
        setMaxSkillPointsBasedOnIntelligenceModifier();
    }, [attributeData]);

    useEffect(() => {
        characterData.skills = skillData;
    }, [skillData]);

    return (
        <>
            <div>
            <h2>Attributes (available points: {availableAttributeModifierPoints()})</h2>
            {attributes}
            <h2>Classes</h2>
            {classes}
            <h2>Skills (available skill points: {maxSkillPoints - usedSkillPoints})</h2>
            {skills}
            </div>
        </>
    );
}

export default CharacterSheet;

