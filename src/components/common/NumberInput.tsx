import Row from './Row';

function NumberInput(props: { max?: number, min?: number, setter: Function, value: number }) {
    const {max, min, setter, value} = props;

    return (<Row>
        <button onClick={() => {
            if (!min || value > min) {
                setter(value - 1);
            }
        }}>{'-1'}</button>
        <input value={value} style={{width: '30px'}} />
        <button onClick={() => {
            if(!max || value < max){
                setter(value + 1);
            }
        }}>{'+1'}</button>
    </Row>);
}

export default NumberInput;
