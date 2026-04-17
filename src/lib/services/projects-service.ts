"use client";

import { projectCatalogItems } from "@/src/lib/mock/dashboard";

export type ProjectStatus = "正常" | "需更新";
export type ProjectSource = "WPS" | "飞书" | "其他";

export type Project = {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  source: ProjectSource;
  updatedAt: string;
};

export type ProjectInput = {
  name: string;
  owner: string;
  status: ProjectStatus;
  source: ProjectSource;
};

const STORAGE_KEY = "project-hub-projects";

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

function readProjectsRaw(): Project[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as Project[];
  } catch {
    return [];
  }
}

function writeProjectsRaw(items: Project[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function ensureProjectsInitialized() {
  if (typeof window === "undefined") {
    return;
  }

  const hasData = window.localStorage.getItem(STORAGE_KEY);
  if (hasData) {
    return;
  }

  const initialProjects: Project[] = projectCatalogItems.map((item) => ({
    id: item.id,
    name: item.name,
    owner: item.owner,
    status: item.status,
    source: item.source,
    updatedAt: item.updatedAt,
  }));

  writeProjectsRaw(initialProjects);
}

export function listProjects() {
  ensureProjectsInitialized();
  return readProjectsRaw();
}

export function createProject(input: ProjectInput) {
  ensureProjectsInitialized();
  const items = readProjectsRaw();
  const newItem: Project = {
    id: createId("project"),
    name: input.name.trim(),
    owner: input.owner.trim(),
    status: input.status,
    source: input.source,
    updatedAt: getNowString(),
  };
  const next = [newItem, ...items];
  writeProjectsRaw(next);
  return newItem;
}

export function updateProject(id: string, input: ProjectInput) {
  ensureProjectsInitialized();
  const items = readProjectsRaw();
  const next = items.map((item) =>
    item.id === id
      ? {
          ...item,
          name: input.name.trim(),
          owner: input.owner.trim(),
          status: input.status,
          source: input.source,
          updatedAt: getNowString(),
        }
      : item,
  );
  writeProjectsRaw(next);
}

export function deleteProject(id: string) {
  ensureProjectsInitialized();
  const items = readProjectsRaw();
  const next = items.filter((item) => item.id !== id);
  writeProjectsRaw(next);
}
