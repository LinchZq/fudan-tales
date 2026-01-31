import EntityCard from "../components/EntityCard";
import LockedCard from "../components/LockedCard";
import {cards} from "../data/cards";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Atlas() {
    useEffect(() => {
        document.title = "异闻图鉴";
    }, []);

    const navigate = useNavigate();

    const zones = ["光华楼区", "相辉堂区", "南区"];
    const [zone, setZone] = useState(zones[0]);
    const visibleCards = cards.filter((c) => {
        if (!c.zone) return true; // 没写 zone：全区可见
        if (Array.isArray(c.zone)) return c.zone.includes(zone); // 多区
        return c.zone === zone; // 单区
    });

    return (
        <div
            className="relative min-h-screen flex flex-col w-full max-w-md mx-auto shadow-2xl overflow-hidden bg-background-dark">
            <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none z-0 mix-blend-overlay"/>
            <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none z-0"/>
            <div
                className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none z-0"/>
            <header
                className="relative z-10 p-4 pb-2 flex flex-col gap-4 border-b border-white/5 bg-background-dark/80 backdrop-blur-md">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-1 animate-pulse">系统状态：在线</h2>
                        <h1 className="text-white text-xl font-black leading-none tracking-tight">异闻图鉴</h1>
                    </div>
                    <div className="relative group">
                        <button
                            className="flex items-center gap-2 bg-surface-dark border border-white/10 hover:border-primary/50 transition-colors rounded pl-3 pr-2 py-1.5">
                            <span className="text-sm font-bold text-white tracking-tight">复旦大学</span>
                            <span className="material-symbols-outlined text-primary text-lg">arrow_drop_down</span>
                        </button>
                    </div>
                </div>
                <div className="flex p-1 rounded-lg bg-black/40 border border-white/5">
                    {zones.map((z) => {
                        const active = z === zone;

                        return (
                            <button
                                key={z}
                                type="button"
                                onClick={() => setZone(z)}
                                className={[
                                    "flex-1 py-2 px-1 rounded text-xs font-bold text-center transition-all",
                                    active
                                        ? "bg-primary text-white shadow-[0_0_15px_rgba(255,0,85,0.4)]"
                                        : "text-text-dim hover:text-white hover:bg-white/5",
                                ].join(" ")}
                            >
                                {z}
                            </button>
                        );
                    })}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-text-dim font-mono opacity-80">
                    <span className="material-symbols-outlined text-[12px]">database</span>
                    <span className="tracking-wide">同步中: 98% COMPLETE // 区域：{zone}</span>
                </div>
            </header>
            <main className="relative z-10 flex-1 overflow-y-auto p-4 scroll-smooth">
                <div className="grid grid-cols-2 gap-4 pb-24">
                    {visibleCards.length === 0 ? (
                        <div className="col-span-2 text-center text-text-dim text-sm py-10">
                            当前区域暂无收录条目
                        </div>
                    ) : (visibleCards.map((c) => {
                        if (c.type === "locked") {
                            return (
                                <LockedCard
                                    key={c.id}
                                    requiredLevel={c.requiredLevel}
                                    coverUrl={c.coverUrl}
                                />
                            );
                        }

                        return (
                            <EntityCard
                                key={c.code}
                                code={c.code}
                                title={c.title}
                                coverUrl={c.coverUrl}
                                status={c.status}
                                progress={c.progress}
                                onClick={() => navigate(`/atlas/${c.code}`)}
                            />
                        );
                    }))}
                </div>
                <div className="fixed bottom-24 right-4 z-40">
                    <button
                        className="group flex items-center gap-3 bg-black border border-primary text-primary px-4 py-3 rounded-full shadow-[0_0_20px_rgba(255,0,85,0.3)] hover:bg-primary hover:text-white transition-all duration-300">
                        <span className="material-symbols-outlined">terminal</span>
                        <span className="text-sm font-bold tracking-tight pr-1">商户模拟 [调试模式]</span>
                    </button>
                </div>
            </main>
            <nav
                className="relative z-50 bg-background-dark border-t border-white/10 px-6 py-3 flex justify-between items-center pb-6">
                <button className="flex flex-col items-center gap-1 text-text-dim hover:text-white group">
                        <span
                            className="material-symbols-outlined group-hover:scale-110 transition-transform">home_app_logo</span>
                    <span
                        className="text-[10px] font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3 bg-black px-1">首页</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-primary relative group">
                    <div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_#ff0055]"/>
                    <span className="material-symbols-outlined scale-110">grid_view</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-text-dim hover:text-white group">
                        <span
                            className="material-symbols-outlined group-hover:scale-110 transition-transform">bedtime</span>
                    <span
                        className="text-[10px] font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3 bg-black px-1">睡眠</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-text-dim hover:text-white group">
                        <span
                            className="material-symbols-outlined group-hover:scale-110 transition-transform">person</span>
                    <span
                        className="text-[10px] font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3 bg-black px-1">个人</span>
                </button>
            </nav>
            <div
                className="pointer-events-none absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"/>
        </div>
    );
}
