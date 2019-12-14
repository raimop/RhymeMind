import React from "react";
import Arrow from "react-arrow";

const ArrowComponent: React.FC = (): JSX.Element => {
    return(
        <>
            <div className={"arrow"}>
                <Arrow
                direction="right"
                shaftWidth={20}
                shaftLength={50}
                headWidth={50}
                headLength={40}
                fill="white"
                stroke="black"
                strokeWidth={3}
            />
            </div>
        </>
    );
}

export default ArrowComponent;