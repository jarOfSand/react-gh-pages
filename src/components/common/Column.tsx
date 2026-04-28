import { CSSProperties } from 'react';

function Column(props: { children: React.JSX.Element | (React.JSX.Element | null)[], style?: CSSProperties }): React.JSX.Element {
    return <div style={{ display: 'flex', flexDirection: 'column', ...props.style }}>{props.children}</div>
}

export default Column;
