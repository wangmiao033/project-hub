export type StatItem = {
  title: string;
  value: string;
  hint: string;
};

export type FavoriteItem = {
  title: string;
  tag: string;
  actionLabel: string;
};

export type ResourceItem = {
  id: string;
  name: string;
  type: string;
  description: string;
};

export type ProjectItem = {
  id: string;
  name: string;
  status: "正常" | "需更新";
  owner: string;
  updatedAt: string;
  members: string[];
  resources: ResourceItem[];
};

export type AlertItem = {
  title: string;
  content: string;
  level: "warning" | "info";
};

export type ChannelRow = {
  id: string;
  channelName: string;
  projectName: string;
  loginUrl?: string;
  account: string;
  passwordMasked: string;
  lastUser: string;
  updatedAt: string;
  status?: "正常" | "需更新";
};

export type VisitItem = {
  title: string;
  meta: string;
};

export type OnlineUser = {
  name: string;
  role: string;
  status: "在线" | "忙碌";
};

export type ActivityItem = {
  id: string;
  content: string;
  time: string;
};

export type ProjectCatalogItem = {
  id: string;
  name: string;
  owner: string;
  status: "正常" | "需更新";
  source: "WPS" | "飞书" | "其他";
  updatedAt: string;
  resources: ResourceItem[];
};

export const dashboardStats: StatItem[] = [
  { title: "项目总数", value: "26", hint: "本周新增 2 个" },
  { title: "渠道总数", value: "41", hint: "覆盖 9 类渠道" },
  { title: "当前在线", value: "12", hint: "含协作成员与运营" },
  { title: "待更新入口", value: "5", hint: "建议今日完成" },
];

export const favoriteItems: FavoriteItem[] = [
  { title: "熊动主站发布台", tag: "发布", actionLabel: "打开文档" },
  { title: "素材审核总表", tag: "审核", actionLabel: "快速进入" },
  { title: "渠道登录备忘", tag: "账号", actionLabel: "查看渠道" },
];

export const projectItems: ProjectItem[] = [
  {
    id: "proj-1",
    name: "熊动官网增长项目",
    status: "正常",
    owner: "王敏",
    updatedAt: "今天 10:25",
    members: ["王敏", "小林", "阿泽"],
    resources: [
      {
        id: "r-11",
        name: "产品需求文档",
        type: "文档",
        description: "当前季度增长目标与排期",
      },
      {
        id: "r-12",
        name: "飞书多维表",
        type: "数据",
        description: "投放明细与转化追踪",
      },
      {
        id: "r-13",
        name: "公众号后台",
        type: "渠道",
        description: "内容发布与留言管理",
      },
    ],
  },
  {
    id: "proj-2",
    name: "熊动私域转化项目",
    status: "需更新",
    owner: "陈乔",
    updatedAt: "2 天前",
    members: ["陈乔", "Luna", "北北", "阿哲"],
    resources: [
      {
        id: "r-21",
        name: "私域 SOP",
        type: "文档",
        description: "标准接待流程和话术",
      },
      {
        id: "r-22",
        name: "企业微信后台",
        type: "渠道",
        description: "客户分层与群运营入口",
      },
      {
        id: "r-23",
        name: "每周复盘看板",
        type: "看板",
        description: "跟踪留存和成单率变化",
      },
    ],
  },
  {
    id: "proj-3",
    name: "熊动短视频冷启项目",
    status: "正常",
    owner: "阿青",
    updatedAt: "昨天 18:40",
    members: ["阿青", "May", "Kiki"],
    resources: [
      {
        id: "r-31",
        name: "脚本库",
        type: "素材",
        description: "高转化脚本集合，按场景分类",
      },
      {
        id: "r-32",
        name: "抖音创作者平台",
        type: "渠道",
        description: "账号内容发布与数据查看",
      },
    ],
  },
];

export const alerts: AlertItem[] = [
  {
    title: "异常提醒：私域项目入口待更新",
    content: "企业微信后台账号密码最近 14 天未轮换，建议尽快处理。",
    level: "warning",
  },
];

export const channelRows: ChannelRow[] = [
  {
    id: "c-1",
    channelName: "公众号",
    projectName: "熊动官网增长项目",
    loginUrl: "https://mp.weixin.qq.com",
    account: "xiongdongewm",
    passwordMasked: "********",
    lastUser: "王敏",
    updatedAt: "今天 09:32",
    status: "正常",
  },
  {
    id: "c-2",
    channelName: "企业微信",
    projectName: "熊动私域转化项目",
    loginUrl: "https://work.weixin.qq.com",
    account: "xiongdong-siyu",
    passwordMasked: "********",
    lastUser: "陈乔",
    updatedAt: "昨天 16:10",
    status: "需更新",
  },
  {
    id: "c-3",
    channelName: "抖音创作者平台",
    projectName: "熊动短视频冷启项目",
    loginUrl: "https://creator.douyin.com",
    account: "xiongdong-dy",
    passwordMasked: "********",
    lastUser: "阿青",
    updatedAt: "2 天前",
    status: "正常",
  },
];

export const recentVisits: VisitItem[] = [
  { title: "私域 SOP", meta: "熊动私域转化项目 · 10 分钟前" },
  { title: "公众号后台", meta: "熊动官网增长项目 · 25 分钟前" },
  { title: "脚本库", meta: "熊动短视频冷启项目 · 1 小时前" },
];

export const onlineUsers: OnlineUser[] = [
  { name: "王敏", role: "项目管理员", status: "在线" },
  { name: "陈乔", role: "运营负责人", status: "在线" },
  { name: "阿青", role: "内容负责人", status: "忙碌" },
  { name: "Luna", role: "渠道专员", status: "在线" },
];

export const activityItems: ActivityItem[] = [
  {
    id: "a-1",
    content: "王敏更新了「熊动官网增长项目」需求文档。",
    time: "今天 10:25",
  },
  {
    id: "a-2",
    content: "陈乔新增渠道账号「企业微信」。",
    time: "今天 09:40",
  },
  {
    id: "a-3",
    content: "阿青标记「短视频脚本库」为常用资源。",
    time: "昨天 18:50",
  },
];

export const projectCatalogItems: ProjectCatalogItem[] = [
  {
    id: "pc-1",
    name: "熊动官网增长项目",
    owner: "王敏",
    status: "正常",
    source: "飞书",
    updatedAt: "今天 10:25",
    resources: projectItems[0].resources,
  },
  {
    id: "pc-2",
    name: "熊动私域转化项目",
    owner: "陈乔",
    status: "需更新",
    source: "WPS",
    updatedAt: "2 天前",
    resources: projectItems[1].resources,
  },
  {
    id: "pc-3",
    name: "熊动短视频冷启项目",
    owner: "阿青",
    status: "正常",
    source: "WPS",
    updatedAt: "昨天 18:40",
    resources: projectItems[2].resources,
  },
];
