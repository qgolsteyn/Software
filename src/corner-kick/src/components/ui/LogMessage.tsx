import * as React from 'react';
import styled from 'styled-components';
import {IROSOut} from '~/types/standardTopics';

/**
 * Styling for the LogMessage
 */
const StyledWrapper = styled.div`
    padding: 8px;
`;

const Title = styled.p`
    font-size: 12px;
    padding-left: 3px;

    &.debug {
        color: black;
    }

    &.info {
        color: green;
    }

    &.warn {
        color: yellow;
    }

    &.error {
        color: orange;
    }

    &.fatal {
        color: red;
    }
`;

const DetailsWrapper = styled.div`
    padding-left: 25px;
    font-size: 11px;
`;

const Details = styled.p`
`;

/**
 * Displays a single log message in our UI
 */
export const LogMessage = (props: IROSOut) => {

    /* Levels are taken in as a number and remapped to label */
    const logMap = {
        1: "debug",
        2: "info",
        3: "warn",
        4: "error",
        5: "fatal"
    };

    return (
        <StyledWrapper>

            <Title className={`${logMap[props.level] }`}>
            <strong>{props.name}</strong>: {props.msg}
            </Title>

            <DetailsWrapper>

                <Details>
                Topics: {props.topics}
                </Details>

                <Details>
                From {props.file}, Line {props.line}
                </Details>

            </DetailsWrapper>

        </StyledWrapper>
    );
};
