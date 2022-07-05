import React from "react";
import {useState, useEffect, useRef } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const MAX_POSSIBLE_HEIGHT = 500;

function ExandableBodyCard({ maxHeight, children }) {
    const ref = useRef();
    const [shouldShowExpand, setShouldShowExpand] = useState(false);
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        if (ref.current.scrollHeight > maxHeight) {
            setShouldShowExpand(true);
            setExpanded(false);
        }
    }, [maxHeight]);

    return (
        <Card.Text ref={ref}>
            <div
                style={{ maxHeight: expanded ? MAX_POSSIBLE_HEIGHT : maxHeight,
                    overflow: "hidden",
                    transition: "max-height 0.2s ease" }}
            >
                {children}
            </div>
            {shouldShowExpand && (
                <Button variant="light" onClick={() => setExpanded(!expanded)}>...</Button>
            )}
        </Card.Text>
    );
};

export default ExandableBodyCard;