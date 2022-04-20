import "import-map-overrides";
import "systemjs/dist/system";
import "systemjs/dist/extras/amd";
import "systemjs/dist/extras/named-exports";
// import "systemjs/dist/extras/named-register";
import "systemjs/dist/extras/use-default";
import type { ModuleResolver } from "./types";

/**
 * Uses SystemJS to import all the modules by their URL.
 *
 * @param modules Module names for keys, URLs for values
 * @returns A tuple [name, moduleContents]
 */
export function loadModules(modules: Record<string, string>) {
  return Promise.all(
    Object.entries(modules).map(([name, url]) =>
      System.import(url).then(
        async (value): Promise<[string, System.Module]> => {
          console.log(name, url, value);
          // first check if this is a new module-type -> then we have a remote-entry first
          if ("init" in value && "get" in value) {
            await __webpack_init_sharing__("default");
            try {
              await value.init(__webpack_share_scopes__.default);
            } catch (e) {
              console.log("caught error", e);
            }
            const factory = await value.get("app");
            const newValue = factory();
            console.log("got value for", name, newValue);
            return [name, newValue];
          }

          // otherwise we can directly return
          return [name, value];
        },
        (error): [string, System.Module] => {
          console.error("Failed to load module", name, "from url", url, error);
          return [name, {}];
        }
      )
    )
  );
}

export function registerModules(modules: Record<string, ModuleResolver>) {
  Object.keys(modules).forEach((name) => registerModule(name, modules[name]));
}

export function registerModule(name: string, resolve: ModuleResolver) {
  System.register(name, [], (_exports) => ({
    execute() {
      const content = resolve();

      if (content instanceof Promise) {
        return content.then((innerContent) => _exports(innerContent));
      } else {
        _exports(content);

        if (typeof content === "function") {
          _exports("__esModule", true);
          _exports("default", content);
        } else if (typeof content === "object") {
          if (!("default" in content)) {
            _exports("default", content);
          }
        }
      }
    },
  }));
}
