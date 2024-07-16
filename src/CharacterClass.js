import { useEffect, useState } from 'react';

function CharacterClass({
    className,
    classRequirements,
    characterAttributeData,
}) {
    const [areRequirementsMet, setAreRequirementsMet] = useState(false);
    const [showRequirements, setShowRequirements] = useState(false);

    const recomputeClassRequirementsAreMet = () => {
        const remainingRequiredValues = Object.entries(classRequirements).map(([attributeName, requirementValue]) => {
            return requirementValue - characterAttributeData[attributeName].value;
        });

        setAreRequirementsMet(remainingRequiredValues.every(value => value <= 0));
    }

    const handleClickClassName = () => {
        setShowRequirements((prevShowRequirements) => !prevShowRequirements)
    }

    useEffect(() => {
        recomputeClassRequirementsAreMet();
    }, [characterAttributeData]);

    return (
        <>
            <p className={areRequirementsMet ? "red" : ""} onClick={handleClickClassName}>
                    {className}
            </p>
            {showRequirements && (
                Object.entries(classRequirements).map(([attributeName, initialRequiredValue], i) => (
                    <span key={i}>{attributeName}: {initialRequiredValue}&nbsp;</span>
            )))}
        </>
    );
}

export default CharacterClass;