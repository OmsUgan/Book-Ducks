"use client"

import { useEffect } from "react";

export default function ThemeLoader({ theme }) {
    useEffect(() => {
        if (theme) {
            document.documentElement.className = theme;
        }
    }, [theme]);

    return null;
}