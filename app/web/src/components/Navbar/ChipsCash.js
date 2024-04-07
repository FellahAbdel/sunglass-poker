import React  from "react";

const ChipsCash = ({styleClass,currentChips}) =>{
    const chips = currentChips;
    //const formattedChips = chips.toLocaleString();
    const dollarSign = '$';
    return (
        <div className={styleClass}>
            {chips}{dollarSign}
        </div>
    )
}

export default ChipsCash;
