import { useState } from "react";
import { GetWalletWrapped } from "../api/wallet";
import type { WalletWrappedResponse } from "../api/types";
import { toast } from "sonner";

export function useWalletWrapped() {
    const [isLoading, setIsLoading] = useState(false);
    const [walletWrapped, setWalletWrapped] = useState<WalletWrappedResponse | null>(null);

    const LoadWallet = async (wallet: string) => {
        setIsLoading(true);

        const loadingToast = toast.loading("Your Wrapped is loading…");
        try {
            const walletResi = await GetWalletWrapped(wallet);

            setWalletWrapped(walletResi);
            toast.dismiss();
        } catch (err) {
            const message =
                err instanceof Error
                ? err.message
                : typeof err === "string"
                ? err
                : "Failed to load your trenches. Try again.";
            console.error(err);
            toast.error(message, {
                duration: 3000,
            });
        } finally {
            setIsLoading(false);
            toast.dismiss(loadingToast);
        }
    };

    return {
        isLoading,
        walletWrapped,
        LoadWallet
    }
}