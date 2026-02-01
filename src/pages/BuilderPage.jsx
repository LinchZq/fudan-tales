import {useEffect, useState} from "react";
import {BuilderComponent, builder, useIsPreviewing} from "@builder.io/react";

builder.init(import.meta.env.VITE_BUILDER_PUBLIC_KEY);

export default function BuilderPage() {
    const isPreviewing = useIsPreviewing();
    const [content, setContent] = useState(null);

    useEffect(() => {
        async function fetchContent() {
            // 这里仍然按 /builder 去拉内容（如果你在 Builder 里创建了 /builder 页面，会拿到）
            // 如果没创建，也没关系：下面会给一个“提示页”，不再 404
            const c = await builder.get("page", {url: window.location.pathname}).promise();
            setContent(c || null);
        }

        fetchContent();
    }, []);

    // 普通访问 /builder（非预览）时：给提示页，不要 404
    if (!isPreviewing && !content) {
        return (
            <div className="min-h-screen bg-background-dark text-white p-6">
                <div className="text-xl font-black">Builder 预览入口</div>
                <div className="text-text-dim mt-2 text-sm">
                    这个页面用于 Builder.io 编辑器的预览 iframe。请从 Builder 编辑器里打开预览。
                </div>
            </div>
        );
    }

    // 预览模式时：即使 content 为空，也让 BuilderComponent 负责渲染（编辑器会注入预览内容）
    return <BuilderComponent model="page" content={content || undefined}/>;
}
