import React from 'react';

/**
 * 风格化的双语文本组件
 * 样式：主要文字 // 次要文字(英文/注释)
 */
export default function BilingualText({cn, en, className = ""}) {
    return (
        <div className={`flex items-baseline gap-2 ${className}`}>
            <span className="font-bold tracking-wider">{cn}</span>
            <span className="text-xxs font-mono text-primary font-bold opacity-80 uppercase">
                // {en}
            </span>
        </div>
    );
}