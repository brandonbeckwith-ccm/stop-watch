import { ref, inject, provide, watch, type Ref } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";

export type NavigationState = {
  title: string;
  icon: string;
  status: string;
};

const navigationKey = Symbol("navigation");

export function provideNavigation(
  routeRef?: Ref<RouteLocationNormalizedLoaded>
) {
  const title = ref("");
  const icon = ref("");
  const status = ref("");

  const updateNavigation = (newState: Partial<NavigationState>) => {
    if (newState.title) title.value = newState.title;
    if (newState.icon) icon.value = newState.icon;
    if (newState.status) status.value = newState.status;
  };

  const state = {
    title,
    icon,
    status,
    updateNavigation,
  };

  const APP_NAME = "Stop Watch";
  watch(
    title,
    (val) => {
      if (typeof document !== "undefined") {
        document.title = val ? `${val}`  : APP_NAME;
      }
    },
    { immediate: true }
  );

  if (routeRef) {
    const humanize = (s: string) =>
      s
        .replace(/^\//, "")
        .replace(/[-_/]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()) || "Home";

    watch(
      () => routeRef.value && (routeRef.value.name ?? routeRef.value.path),
      (val) => {
        if (!title.value) {
          const raw = String(val ?? "");
          title.value = humanize(raw);
        }
      },
      { immediate: true }
    );
  }

  provide(navigationKey, state);
  return state;
}

export function useNavigation() {
  const navigation =
    inject<ReturnType<typeof provideNavigation>>(navigationKey);

  if (!navigation) {
    throw new Error("Navigation context not provided");
  }

  return navigation;
}
