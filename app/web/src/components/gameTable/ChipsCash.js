import React  from "react";

const ChipsCash = ({style}) =>{
    const chips = 9999999999;
    const formattedChips = chips.toLocaleString();
    const dollarSign = '$';
    return (
        <div className={style}>
            {formattedChips}{dollarSign}
        </div>
    )
}

export default ChipsCash;
