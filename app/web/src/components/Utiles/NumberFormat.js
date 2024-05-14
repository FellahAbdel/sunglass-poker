import { useTranslation } from "./Translations";

export function formatNumber(value) {
    try {
        return value.toLocaleString();
    } catch (error) {
        console.error("Failed to format number:", error);
        return 0;  
    }
}