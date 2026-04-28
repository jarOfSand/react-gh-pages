import { CSSProperties } from 'react';

function Row(props: { children: React.JSX.Element | React.JSX.Element[], style?: CSSProperties }): React.JSX.Element {
    return <div style={{ display: 'flex', flexDirection: 'row', ...props.style }}>{props.children}</div>
}

export default Row;
