import {Builder} from "@builder.io/react";
// 引入你的组件
import AtlasHeader from "./components/AtlasHeader";
import BottomNav from "./components/BottomNav";
import EntityCard from "./components/EntityCard";
import LockedCard from "./components/LockedCard";

// 初始化 Builder
Builder.init(import.meta.env.VITE_BUILDER_PUBLIC_KEY);
// 注册组件

Builder.registerComponent(AtlasHeader, {
    name: "AtlasHeader",
    inputs: [
        {name: "title", type: "string", defaultValue: "\u5F02\u95FB\u56FE\u9274"},
        {
            name: "subtitle",
            type: "string",
            defaultValue: "\u7CFB\u7EDF\u72B6\u6001\uFF1A\u5728\u7EBF",
        },
        {
            name: "schoolName",
            type: "string",
            defaultValue: "\u590D\u65E6\u5927\u5B66",
        },
        {
            name: "syncText",
            type: "string",
            defaultValue:
                "\u540C\u6B65\u4E2D: 98% COMPLETE // \u533A\u57DF\uFF1A\u5149\u534E\u697C\u533A",
        },
    ],
});

Builder.registerComponent(BottomNav, {
    name: "BottomNav",
    inputs: [
        {
            name: "activeKey",
            type: "string",
            enum: ["home", "atlas", "sleep", "me"],
            defaultValue: "atlas",
        },
    ],
});

Builder.registerComponent(LockedCard, {
    name: "LockedCard",
    inputs: [
        {name: "requiredLevel", type: "number", defaultValue: 5},
        {
            name: "coverUrl",
            type: "string",
            defaultValue: "/images/atlas/cards/fd-unknown.png",
        },
    ],
});

Builder.registerComponent(EntityCard, {
    // 引入你的组件
    name: "EntityCard",
});
