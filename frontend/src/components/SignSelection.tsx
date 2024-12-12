import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";

interface ZodiacSign {
    name: string;
    description: string;
}

type EmojiSymbolDictionary = {
     [key: string]: string
}

const emojiSymbolDictionary: EmojiSymbolDictionary = {
    // Sternzeichen
    "Widder": "♈",
    "Stier": "♉",
    "Zwillinge": "♊",
    "Krebs": "♋",
    "Löwe": "♌",
    "Jungfrau": "♍",
    "Waage": "♎",
    "Skorpion": "♏",
    "Schütze": "♐",
    "Steinbock": "♑",
    "Wassermann": "♒",
    "Fische": "♓",
};

const theme = createTheme({});

const SignSelection = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [zodiacSign, setZodiacSign] = useState<ZodiacSign | null>();

    useEffect(() => {
        if (!selectedDate) {
            return;
        }

        const fetchZodiacSign = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/zodiac-sign/${selectedDate.toISOString()}`);
                if (!response.ok) {
                    throw new Error("Fehler beim Abrufen des Sternzeichens");
                }
                const data: ZodiacSign = await response.json();
                setZodiacSign(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchZodiacSign();
    }, [selectedDate]);

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                    <DatePicker 
                        label="Basic date picker" 
                        value={selectedDate} 
                        onChange={(newValue) => setSelectedDate(newValue)} 
                    />
                    {zodiacSign && (
                        <div><h3>Sternzeichen: {zodiacSign?.name}{emojiSymbolDictionary[zodiacSign?.name || '']}</h3>
                            <p>{zodiacSign.description}</p>
                        </div>
                    )}
                </div>
            </LocalizationProvider>
        </ThemeProvider>
    );
};


export default SignSelection;