"use client";

import { projectCatalogItems } from "@/src/lib/mock/dashboard";

export type Resource = {
  id: string;
  projectId: string;
  name: string;
  url: string;
  description: string;
};

export type ResourceInput = {
  projectId: string;
  name: string;
  url: string;
  description: string;
};

const STORAGE_KEY = "project-hub-resources";

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function readResourcesRaw(): Resource[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as Resource[];
  } catch {
    return [];
  }
}

function writeResourcesRaw(items: Resource[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function ensureResourcesInitialized() {
  if (typeof window === "undefined") {
    return;
  }

  const hasData = window.localStorage.getItem(STORAGE_KEY);
  if (hasData) {
    return;
  }

  const initialResources: Resource[] = projectCatalogItems.flatMap((project) =>
    project.resources.map((resource) => ({
      id: resource.id,
      projectId: project.id,
      name: resource.name,
      url: `https://example.com/resource/${resource.id}`,
      description: resource.description,
    })),
  );

  writeResourcesRaw(initialResources);
}

export function listResourcesByProject(projectId: string) {
  ensureResourcesInitialized();
  return readResourcesRaw().filter((item) => item.projectId === projectId);
}

export function deleteResourcesByProject(projectId: string) {
  ensureResourcesInitialized();
  const items = readResourcesRaw();
  const next = items.filter((item) => item.projectId !== projectId);
  writeResourcesRaw(next);
}

export function createResource(input: ResourceInput) {
  ensureResourcesInitialized();
  const items = readResourcesRaw();
  const newItem: Resource = {
    id: createId("resource"),
    projectId: input.projectId,
    name: input.name.trim(),
    url: input.url.trim(),
    description: input.description.trim(),
  };
  const next = [newItem, ...items];
  writeResourcesRaw(next);
  return newItem;
}

export function updateResource(id: string, input: Omit<ResourceInput, "projectId">) {
  ensureResourcesInitialized();
  const items = readResourcesRaw();
  const next = items.map((item) =>
    item.id === id
      ? {
          ...item,
          name: input.name.trim(),
          url: input.url.trim(),
          description: input.description.trim(),
        }
      : item,
  );
  writeResourcesRaw(next);
}

export function deleteResource(id: string) {
  ensureResourcesInitialized();
  const items = readResourcesRaw();
  const next = items.filter((item) => item.id !== id);
  writeResourcesRaw(next);
}
