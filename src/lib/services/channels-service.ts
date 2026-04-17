"use client";

import { channelRows } from "@/src/lib/mock/dashboard";

export type ChannelStatus = "正常" | "需更新";

export type ChannelAccount = {
  id: string;
  channelName: string;
  projectName: string;
  loginUrl: string;
  account: string;
  password: string;
  lastUser: string;
  updatedAt: string;
  status: ChannelStatus;
};

export type ChannelInput = {
  channelName: string;
  projectName: string;
  loginUrl: string;
  account: string;
  password: string;
  lastUser: string;
  status: ChannelStatus;
};

const STORAGE_KEY = "project-hub-channels";

function getNowString() {
  const now = new Date();
  const pad = (v: number) => String(v).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate(),
  )} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function readChannelsRaw(): ChannelAccount[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as ChannelAccount[];
  } catch {
    return [];
  }
}

function writeChannelsRaw(items: ChannelAccount[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function ensureChannelsInitialized() {
  if (typeof window === "undefined") {
    return;
  }

  const hasData = window.localStorage.getItem(STORAGE_KEY);
  if (hasData) {
    return;
  }

  const initialChannels: ChannelAccount[] = channelRows.map((item) => ({
    id: item.id,
    channelName: item.channelName,
    projectName: item.projectName,
    loginUrl: item.loginUrl ?? "",
    account: item.account,
    password: "123456",
    lastUser: item.lastUser,
    updatedAt: item.updatedAt,
    status: item.status ?? "正常",
  }));

  writeChannelsRaw(initialChannels);
}

export function listChannels() {
  ensureChannelsInitialized();
  return readChannelsRaw();
}

export function createChannel(input: ChannelInput) {
  ensureChannelsInitialized();
  const items = readChannelsRaw();
  const newItem: ChannelAccount = {
    id: createId("channel"),
    channelName: input.channelName.trim(),
    projectName: input.projectName.trim(),
    loginUrl: input.loginUrl.trim(),
    account: input.account.trim(),
    password: input.password.trim(),
    lastUser: input.lastUser.trim(),
    status: input.status,
    updatedAt: getNowString(),
  };
  const next = [newItem, ...items];
  writeChannelsRaw(next);
  return newItem;
}

export function updateChannel(id: string, input: ChannelInput) {
  ensureChannelsInitialized();
  const items = readChannelsRaw();
  const next = items.map((item) =>
    item.id === id
      ? {
          ...item,
          channelName: input.channelName.trim(),
          projectName: input.projectName.trim(),
          loginUrl: input.loginUrl.trim(),
          account: input.account.trim(),
          password: input.password.trim(),
          lastUser: input.lastUser.trim(),
          status: input.status,
          updatedAt: getNowString(),
        }
      : item,
  );
  writeChannelsRaw(next);
}

export function deleteChannel(id: string) {
  ensureChannelsInitialized();
  const items = readChannelsRaw();
  const next = items.filter((item) => item.id !== id);
  writeChannelsRaw(next);
}
