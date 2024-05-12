import { useTranslation } from "./Translations";

export function NumberFormatter({ value }) {
    try {
        const formattedNumber = value.toLocaleString();
        return <div>{formattedNumber}</div>;
    } catch (error) {
        console.error("Failed to format number:", error);
        return <div>Error formatting number.</div>;
    }
}
