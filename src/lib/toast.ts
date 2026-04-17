"use client";

export type ToastType = "error" | "success" | "info";

export type ToastPayload = {
  type: ToastType;
  message: string;
};

const TOAST_EVENT = "project-hub-toast";

export function showToast(payload: ToastPayload) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent<ToastPayload>(TOAST_EVENT, { detail: payload }));
}

export function showErrorToast(message: string) {
  showToast({ type: "error", message });
}

export function showSuccessToast(message: string) {
  showToast({ type: "success", message });
}

export function getToastEventName() {
  return TOAST_EVENT;
}

