export function formatBytesIEC(bytes: number, decimals = 2): string {
    if (bytes === 0) return "0 B";
    if (!Number.isFinite(bytes)) return "NaN";

    const k = 1024;
    const units = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const size = parseFloat(
        (bytes / Math.pow(k, i)).toFixed(decimals),
    );
    return `${size} ${units[i]}`;
}
