import React  from "react";

const ChipsCash = ({style,currentChips}) =>{
    const chips = currentChips;
    const formattedChips = chips.toLocaleString();
    const dollarSign = '$';
    return (
        <div className={style}>
            {formattedChips}{dollarSign}
        </div>
    )
}

export default ChipsCash;
