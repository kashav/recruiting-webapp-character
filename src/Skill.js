function Skill({name, skillObj, modifierValue, incrementOrDecrementValueCallback}) {
    return (
        <div>
            {name} ({skillObj.attributeModifier} modifier: {modifierValue})&nbsp;
            <button onClick={() => incrementOrDecrementValueCallback(+1)}>+</button>
            <button onClick={() => incrementOrDecrementValueCallback(-1)}>-</button>&nbsp;
            Value: {skillObj.value + modifierValue}
        </div>
    );
}

export default Skill;