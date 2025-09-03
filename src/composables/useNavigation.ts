import type { ToolTipContent } from "@ccm-engineering/ui-components/dist/C-Popper-Side-Panel/C-Popper-Side-Panel-Types";
import { ref, provide, inject } from "vue";

const NAV_KEY = Symbol("nav");

export const createNavigation = () => {
  const navGroups = ref<ToolTipContent[]>([
    {
      title: "Home",
      items: [{ label: "Home", value: "/", icon: "fal fa-home" }],
    },
    {
      title: "Clock",
      items: [
        { label: "Stopwatch", value: "/stopwatch", icon: "fal fa-stopwatch" },
        { label: "World Clock", value: "/worldclock", icon: "fal fa-globe" },
      ],
    },
    {
      title: "Calculator",
      items: [
        {
          label: "Calculator",
          value: "/calculator",
          icon: "fal fa-calculator",
        },
      ],
    },
  ]);

  const title = ref<string>("Home");
  const activePath = ref<string>("/");
  const setTitle = (t: string) => {
    title.value = t;
    document.title = t;
  };
  const setActivePath = (p: string) => (activePath.value = p);

  const api = {
    navGroups,
    title,
    activePath,
    setTitle,
    setActivePath,
  } as const;

  provide(NAV_KEY, api);

  if (
    typeof document !== "undefined" &&
    typeof document.title !== "undefined"
  ) {
    document.title = title.value;
  }
  return api;
};

export const useNavigation = (): ReturnType<typeof createNavigation> => {
  const nav = inject<ReturnType<typeof createNavigation>>(NAV_KEY as any);
  if (!nav) {
    throw new Error(
      "useNavigation must be used after createNavigation has been called (provide/inject)"
    );
  }
  return nav;
};
