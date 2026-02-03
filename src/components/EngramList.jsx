import React from 'react';

// 辅助函数：获取稀有度样式
const getRarityStyles = (rarity) => {
    switch (rarity) {
        case "legendary":
            return "border-yellow-400/50 text-yellow-400 bg-yellow-400/5 shadow-[0_0_15px_rgba(250,204,21,0.2)]";
        case "epic":
            return "border-purple-400/50 text-purple-400 bg-purple-400/5 shadow-[0_0_15px_rgba(192,132,252,0.2)]";
        case "rare":
            return "border-cyan-400/50 text-cyan-400 bg-cyan-400/5";
        default:
            return "border-white/20 text-white bg-white/5"; // common
    }
};

export default function EngramList({engrams, onSelect}) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {engrams.map((engram) => {
                const isLocked = engram.status === "locked";
                const isParsing = engram.status === "parsing";
                const styles = getRarityStyles(engram.rarity);

                return (
                    <button
                        key={engram.id}
                        onClick={() => !isLocked && !isParsing && onSelect(engram)}
                        disabled={isLocked || isParsing}
                        className={`relative text-left rounded-xl p-3 border flex flex-col gap-2 transition-all duration-300 
                            ${isLocked
                            ? "border-white/5 bg-transparent blur-cipher cursor-not-allowed"
                            : `bg-background-dark/80 ${styles} hover:scale-[1.02] active:scale-95 cursor-pointer group`
                        }
                        `}
                    >
                        {/* Header: Icon & Rarity */}
                        <div className="flex justify-between items-start relative z-10">
                            <span className={`font-icon text-2xl ${isLocked ? 'text-white/20' : ''}`}>
                                {isLocked ? 'lock' : engram.icon}
                            </span>
                            {!isLocked && (
                                <span
                                    className="text-[8px] uppercase border border-current px-1.5 py-0.5 rounded opacity-70 font-mono">
                                    {engram.rarity}
                                </span>
                            )}
                        </div>

                        <div className="relative z-10 w-full">
                            <h3 className={`text-xs font-bold mb-1 truncate ${isLocked ? 'text-text-dim' : 'text-white'}`}>
                                {isLocked ? "ENCRYPTED" : engram.name}
                            </h3>

                            {isParsing ? (
                                // 进度条状态
                                <div className="mt-1 w-full">
                                    <div className="flex justify-between text-[8px] text-text-dim mb-1 font-mono">
                                        <span>解析中...</span>
                                        <span>{engram.progress}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-current animate-pulse"
                                             style={{width: `${engram.progress}%`}}/>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-[9px] text-text-dim leading-tight h-8 overflow-hidden line-clamp-2">
                                    {isLocked ? "Wait for sync..." : engram.desc}
                                </p>
                            )}
                        </div>

                        {/* Unlocked 状态下的装饰性全息扫描 */}
                        {!isLocked && !isParsing && (
                            <div className="absolute inset-0 holo-scan pointer-events-none opacity-30 rounded-xl"/>
                        )}

                        {/* 装饰性背景网格 */}
                        {!isLocked && (
                            <div className="absolute inset-0 bg-scanlines opacity-10 rounded-xl pointer-events-none"/>
                        )}
                    </button>
                );
            })}
        </div>
    );
}