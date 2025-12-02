import axios from "axios";
import type { WalletWrappedResponse } from "./types";

export async function GetWalletWrapped(wallet: string): Promise<WalletWrappedResponse> {
    const resi = await axios.get<WalletWrappedResponse>(import.meta.env.VITE_API_URL + "/wallet", {
        params: {
            wallet
        },
        validateStatus: () => true,
    });

    if (resi.status == 429) throw new Error("Slow down! Even the servers are sweating.");
    if (resi.status == 400) throw new Error("Invalid wallet. Copy-paste harder.");
    if (resi.status != 200) throw new Error("Failed to load your trenches. Try another wallet!");

    return resi.data;
}