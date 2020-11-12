import * as React from 'react';
import styled from 'styled-components';

export default function Highlight({color, children}) {
    const Span = styled.span`
        ${color};
        display: inline;
    `;

    return (
        <Span>{ children }</Span>
    );
}

