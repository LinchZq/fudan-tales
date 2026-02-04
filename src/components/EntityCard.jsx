export default function EntityCard({
                                       code,
                                       title,
                                       coverUrl,
                                       status = "contained", // "contained" | "analyzing"
                                       progress = 1, // 0~1
                                       onClick,
                                   }) {
    const isAnalyzing = status === "analyzing";

    const badgeVariantClass = isAnalyzing ? "badge-warning" : "badge-primary";
    const badgeDotClass = isAnalyzing ? "bg-yellow-500" : "bg-primary";
    const badgeLabel = isAnalyzing ? "解析中" : "已收容";

    const progressBarClass = isAnalyzing ? "progress-bar-warning" : "progress-bar";

    const clamped = Math.max(0, Math.min(1, progress));
    const widthPct = `${Math.round(clamped * 100)}%`;

    return (
        <div
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={(e) => {
                if (!onClick) return;
                if (e.key === "Enter") onClick();
            }}
            className={[
                "card-base card-glass card-hover-glow group",
                onClick ? "cursor-pointer" : "",
            ].join(" ")}>
            <div
                className={["absolute top-2 right-2 z-20 flex items-center gap-1 bg-black/60 backdrop-blur", "badge", badgeVariantClass].join(" ")}>
                <div className={["w-1.5 h-1.5 rounded-full animate-pulse", badgeDotClass].join(" ")}/>
                <span className="text-[9px] font-bold">{badgeLabel}</span>
            </div>

            <div
                className="aspect-[4/5] w-full bg-cover bg-center relative"
                style={{backgroundImage: `url("${coverUrl}")`}}
            >
                <div
                    className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-90"/>
                <div
                    className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"/>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-3">
                <p className="text-[10px] text-primary font-mono mb-0.5 tracking-wider">{code}</p>
                <h3 className="text-white text-sm font-bold leading-tight">{title}</h3>

                <div className="progress-track progress-track-sm mt-2">
                    <div className={["progress-bar", progressBarClass].join(" ")} style={{width: widthPct}}/>
                </div>
            </div>
        </div>
    );
}
