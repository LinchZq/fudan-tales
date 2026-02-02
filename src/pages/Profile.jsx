import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import BottomNav from "../components/BottomNav";
import {currentUser, syncLog, engrams} from "../data/user-data.js";

export default function Profile() {
    const navigate = useNavigate();
    // 启动序列状态，用于控制级联动画
    const [booted, setBooted] = useState(false);
    const [activeBar, setActiveBar] = useState(null);

    useEffect(() => {
        document.title = "神经档案 | ARCHIVE";
        // 模拟 CRT 开机延迟
        setTimeout(() => setBooted(true), 150);
    }, []);

    // --- 辅助函数：动态获取颜色 ---
    const getStatusColor = (status) => {
        switch (status) {
            case "OPTIMAL":
                return "bg-primary shadow-[0_0_10px_#ff0055]";
            case "STABLE":
                return "bg-teal-500";
            case "UNSTABLE":
                return "bg-orange-500";
            case "CRITICAL":
                return "bg-red-600 animate-pulse";
            default:
                return "bg-white/20";
        }
    };

    const getRarityStyles = (rarity) => {
        switch (rarity) {
            case "legendary":
                return "border-yellow-400/50 text-yellow-400 bg-yellow-400/5";
            case "epic":
                return "border-purple-400/50 text-purple-400 bg-purple-400/5";
            case "rare":
                return "border-cyan-400/50 text-cyan-400 bg-cyan-400/5";
            default:
                return "border-white/20 text-white bg-white/5"; // common
        }
    };

    return (
        <div
            className="relative min-h-screen flex flex-col w-full max-w-md mx-auto bg-background-dark overflow-hidden font-mono text-white selection:bg-primary selection:text-white">

            {/* 环境特效 */}
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none z-0 mix-blend-overlay"/>
            <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none z-0"/>

            {/* ID CARD */}
            <header
                className={`relative z-10 p-5 pt-8 transition-all duration-1000 ${booted ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                <div className="glass-card rounded-xl p-5 border-l-4 border-l-primary overflow-hidden relative group">

                    {/* 装饰：背景大字 */}
                    <div
                        className="absolute -top-4 -right-4 text-9xl font-black text-white/5 pointer-events-none select-none">
                        049
                    </div>

                    <div className="flex items-start gap-5 relative z-10">
                        {/* 头像框 (带扫描线) */}
                        <div
                            className="w-20 h-24 bg-black border border-white/20 relative shrink-0 overflow-hidden stamp-box">
                            <img
                                src="https://api.dicebear.com/9.x/avataaars/svg?seed=123"
                                alt="Avatar"
                                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-scanlines opacity-30 mix-blend-overlay"/>
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-pulse"/>
                        </div>

                        {/* 信息区 */}
                        <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-display font-bold tracking-wider">{currentUser.id}</h1>
                                    <p className="text-[10px] text-primary font-bold tracking-[-0.02em]">{currentUser.alias}</p>
                                </div>
                                <span className="font-icon text-white/20 text-3xl">fingerprint</span>
                            </div>

                            <div className="pt-2 border-t border-dashed border-white/10 mt-2">
                                <p className="text-[10px] text-text-dim">{currentUser.department}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span
                                        className="px-1.5 py-0.5 bg-white/10 text-[9px] rounded border border-white/10">Lv.{currentUser.level}</span>
                                    <span
                                        className="px-1.5 py-0.5 bg-primary/20 text-primary text-[9px] rounded border border-primary/30">CLASS-B</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 理智值 (Sanity Bar) */}
                    <div className="mt-5 relative z-10">
                        <div className="flex justify-between text-[10px] text-text-dim mb-1 font-bold">
                            <h3>
                                理智值 <span className="text-primary/70 ml-1">// SANITY_STABILITY</span>
                            </h3>
                            <span
                                className={currentUser.sanity < 50 ? "text-red-500" : "text-teal-400"}>{currentUser.sanity}%</span>
                        </div>
                        <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/10">
                            <div
                                className="h-full bg-gradient-to-r from-primary-dark to-primary shadow-[0_0_15px_#ff0055]"
                                style={{width: `${currentUser.sanity}%`, transition: 'width 1s ease-out'}}
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="relative z-10 flex-1 overflow-y-auto px-5 pb-32 space-y-6 scroll-smooth">
                {/* DASHBOARD */}
                <section className={`transition-all duration-1000 delay-100 ${booted ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            {en: "NEURAL EFFICIENCY", cn: "神经效能", data: currentUser.stats.efficiency},
                            {en: "WAVE STABILITY", cn: "波形稳定性", data: currentUser.stats.stability},
                            {en: "SYNC LATENCY", cn: "延迟", data: currentUser.stats.latency},
                            {en: "REM COHERENCE", cn: "REM 一致度", data: currentUser.stats.coherence},
                        ].map((item, i) => (
                            <div key={i}
                                 className="glass-card relative p-3 rounded border border-white/5 flex flex-col justify-between overflow-hidden group">
                                {/* 局部扫描线 */}
                                <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none"/>
                                <div
                                    className="relative z-10 text-[9px] text-text-dim font-bold tracking-wider flex flex-col leading-tight">
                                    <span>{item.cn}</span>
                                    <span className="scale-75 origin-top-left opacity-50">// {item.en}</span>
                                </div>

                                <div className="relative z-10 flex justify-between items-end mt-2">
                    <span
                        className={`text-lg font-mono font-bold ${item.data.status === 'warn' ? 'text-yellow-400' : 'text-white'}`}>
                      {item.data.val}
                    </span>
                                    <span
                                        className={`text-[8px] px-1 rounded ${item.data.status === 'opt' ? 'text-teal-400 bg-teal-400/10' : 'text-text-dim bg-white/5'}`}>
                      {item.data.trend}
                    </span>
                                </div>
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20"/>
                            </div>
                        ))}
                    </div>
                </section>
                {/* CHART */}
                <section className={`transition-all duration-1000 delay-200 ${booted ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                            <span className="font-icon text-primary text-sm">ssid_chart</span>
                            <h2 className="text-xs font-bold text-white">
                                校准记录 <span className="text-text-dim text-[9px] ml-1">// CALIBRATION RECORD</span>
                            </h2>
                        </div>
                        <span className="text-[9px] text-text-dim">TOTAL: {currentUser.totalSyncHours}h</span>
                    </div>

                    <div
                        className="glass-card relative p-4 rounded-xl border border-white/5 bg-black/40 overflow-hidden">
                        <div className="absolute inset-0 scanline-overlay opacity-20 pointer-events-none"/>
                        <div className="relative z-10 flex justify-between items-end h-36 gap-2">
                            {syncLog.map((log, idx) => {
                                const heightPercent = Math.min((log.hours / 10) * 100, 100);

                                // 点击(active)时显示特殊色，否则显示 primary 主题色
                                const isActive = activeBar === idx;
                                const barColor = isActive
                                    ? getStatusColor(log.status) // 选中：显示多彩状态
                                    : "bg-primary/30 hover:bg-primary/60"; // 默认：统一深红色，hover 变亮

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setActiveBar(idx)} // 点击触发
                                        className="flex flex-col items-center gap-2 flex-1 group h-full justify-end cursor-pointer"
                                    >
                                        {/* 悬浮数值提示 */}
                                        <div
                                            className={`absolute -top-2 text-[9px] font-bold transition-opacity duration-300 ${isActive ? 'opacity-100 text-white' : 'opacity-0 text-text-dim'}`}>
                                            {log.hours}h
                                        </div>

                                        <div
                                            className="w-full h-full flex items-end relative rounded-sm bg-white/5 overflow-hidden">
                                            <div
                                                className={`w-full rounded-sm transition-all duration-300 ${barColor} ${booted ? 'bar-grow' : ''}`}
                                                style={{height: `${heightPercent}%`, animationDelay: `${idx * 50}ms`}}
                                            />
                                        </div>
                                        <span
                                            className={`text-[9px] font-mono transition-colors ${isActive ? 'text-primary font-bold' : 'text-text-dim'}`}>
                         {log.day.charAt(0)}
                       </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* 详细信息面板 (仅选中时) */}
                        <div
                            className="mt-3 pt-2 border-t border-white/10 flex justify-between text-[9px] min-h-[20px]">
                            {activeBar !== null ? (
                                <>
                                    <span className="text-white">STATUS: {syncLog[activeBar].status}</span>
                                    <span
                                        className="text-text-dim">SYNC_QUALITY: {Math.floor(syncLog[activeBar].hours * 12)}%</span>
                                </>
                            ) : (
                                <span className="text-text-dim w-full text-center tracking-widest animate-pulse">Select a time fragment...</span>
                            )}
                        </div>
                    </div>
                </section>
                {/* MEDALS */}
                <section className={`transition-all duration-1000 delay-300 ${booted ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                        <span className="font-icon text-primary text-sm">extension</span>
                        <h2 className="text-xs font-bold text-white">
                            记忆印痕 <span className="text-text-dim text-[9px] ml-1">// MEMORY_ENGRAMS</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {engrams.map((engram) => {
                            const isLocked = engram.status === "locked";
                            const isParsing = engram.status === "parsing";
                            const styles = getRarityStyles(engram.rarity);

                            return (
                                <div
                                    key={engram.id}
                                    className={`relative rounded-xl p-3 border flex flex-col gap-2 transition-all hover:scale-[1.02] active:scale-95 group overflow-hidden
                     ${isLocked ? "border-white/5 bg-transparent blur-cipher" : `bg-background-dark/50 ${styles}`}
                   `}
                                >
                                    {/* Header: Icon & Rarity */}
                                    <div className="flex justify-between items-start">
                       <span className={`font-icon text-2xl ${isLocked ? 'text-white/20' : ''}`}>
                         {isLocked ? 'lock' : engram.icon}
                       </span>
                                        {!isLocked && (
                                            <span
                                                className="text-[8px] uppercase border border-current px-1 rounded opacity-70">
                           {engram.rarity}
                         </span>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className={`text-xs font-bold mb-1 ${isLocked ? 'text-text-dim' : 'text-white'}`}>
                                            {isLocked ? "ENCRYPTED" : engram.name}
                                        </h3>

                                        {isParsing ? (
                                            // 进度条状态
                                            <div className="mt-1">
                                                <div className="flex justify-between text-[8px] text-text-dim mb-1">
                                                    <span>解析中...</span>
                                                    <span>{engram.progress}%</span>
                                                </div>
                                                <div className="h-1 w-full bg-white/10 rounded-full">
                                                    <div className="h-full bg-current"
                                                         style={{width: `${engram.progress}%`}}/>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-[9px] text-text-dim leading-tight h-8 overflow-hidden line-clamp-2">
                                                {isLocked ? "Wait for sync..." : engram.desc}
                                            </p>
                                        )}
                                    </div>

                                    {engram.status === 'unlocked' && (
                                        <div
                                            className="absolute inset-0 holo-scan pointer-events-none opacity-50 rounded-xl"/>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
                <div className="h-4"/>
                {/* Spacer */}
            </main>

            <BottomNav
                activeKey="me"
                onNavigate={(key) => {
                    if (key === "atlas") navigate("/atlas");
                    if (key === "me") navigate("/me");
                    // Add other navigation logic
                }}
            />
        </div>
    );
}