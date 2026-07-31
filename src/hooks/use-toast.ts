import { useState } from "react";

type Toast = {
    title?: string;
    description?: string;
};

export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = (data: Toast) => {
        console.log("Toast:", data);

        setToasts((prev) => [...prev, data]);

        setTimeout(() => {
            setToasts((prev) => prev.slice(1));
        }, 3000);
    };

    return {
        toast,
        toasts,
    };
}