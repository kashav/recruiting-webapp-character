function Attribute({name, value, modifier, incrementOrDecrementValueCallback}) {
    return (
        <>
            {name}
            <div>
                Value: {value} (attribute modifier: {modifier})&nbsp;
                <button onClick={() => incrementOrDecrementValueCallback(+1)}>+</button>
                <button onClick={() => incrementOrDecrementValueCallback(-1)}>-</button>
            </div>
        </>
    );
}

export default Attribute;