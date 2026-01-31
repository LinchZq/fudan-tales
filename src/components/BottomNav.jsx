export default function BottomNav({activeKey = "atlas", onNavigate}) {
    const items = [
        {key: "home", icon: "home_app_logo", label: "首页"},
        {key: "atlas", icon: "grid_view", label: "图鉴"},
        {key: "sleep", icon: "bedtime", label: "睡眠"},
        {key: "me", icon: "person", label: "个人"},
    ];

    return (
        <nav
            className="relative z-50 bg-background-dark border-t border-white/10 px-6 py-3 flex justify-between items-center pb-6">
            {items.map((it) => {
                const active = it.key === activeKey;

                if (active && it.key === "atlas") {
                    return (
                        <button
                            key={it.key}
                            type="button"
                            onClick={() => onNavigate?.(it.key)}
                            className="flex flex-col items-center gap-1 text-primary relative group"
                        >
                            <div
                                className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_#ff0055]"/>
                            <span className="material-symbols-outlined scale-110">{it.icon}</span>
                        </button>
                    );
                }

                return (
                    <button
                        key={it.key}
                        type="button"
                        onClick={() => onNavigate?.(it.key)}
                        className={[
                            "flex flex-col items-center gap-1 group relative",
                            active ? "text-primary" : "text-text-dim hover:text-white",
                        ].join(" ")}
                    >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
              {it.icon}
            </span>
                        <span
                            className="text-[10px] font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3 bg-black px-1">
              {it.label}
            </span>
                    </button>
                );
            })}
        </nav>
    );
}
