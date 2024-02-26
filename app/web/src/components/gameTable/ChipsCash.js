import React  from "react";
import styles from './ChipsCash.module.css';


function ChipsCash(){
    const chips = 9999999999;
    const formattedChips = chips.toLocaleString();
    const dollarSign = '$';
    return (
        <div className={`${styles.chipCashPanel}`}>
            {formattedChips}{dollarSign}
        </div>
    )
}

export default ChipsCash;
