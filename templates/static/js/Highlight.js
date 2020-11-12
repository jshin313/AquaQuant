import * as React from 'react';
import styled from 'styled-components';

export default function Highlight({color, children}) {
    const Div = styled.div`
        ${color};
        display: inline;
    `;

    return (
        <Div>{ children }</Div>
    );
}

