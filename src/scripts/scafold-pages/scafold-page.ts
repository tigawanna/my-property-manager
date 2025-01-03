import { resolve } from "node:path";
import { writeFile, access, mkdir } from "node:fs/promises";
import {
  rootPageComponentTemplate,
  rootPageListComponentsTemplate,
  rootPageTemplate,
} from "./base-templates";
import {
  rootPageBaseFormComponentsTemplate,
  rootPageCreateFormComponentsTemplate,
  rootPageUpdateFormComponentsTemplate,
} from "./form-templates";
import {
  rootOnePageComponentsTemplate,
  rootOnePageDetailsComponentsTemplate,
  rootOnePageTemplate,
} from "./one-page-template";
import { rootPageQeuryOptionsTemplate } from "./query-options-tempaltes";
export async function scaffoldPage(pagename: string, path: string) {
  const roootDirpath = `./src/routes${path}`;
  // const roootDirpath = resolve("./src/routes",path)
  await mkdir(roootDirpath, { recursive: true });
  const capitalpagename = pagename.charAt(0).toUpperCase() + pagename.slice(1);
  let rootPath = path.trim();
  if (rootPath.length == 0) {
    throw new Error("Path cannot be empty");
  }
  if (rootPath.endsWith("/")) {
    rootPath = rootPath.slice(0, rootPath.length - 1);
  }
  if (rootPath.startsWith("./")) {
    rootPath = rootPath.slice(2);
  }
  if (rootPath.startsWith("/")) {
    rootPath = rootPath.slice(1);
  }

  const indexPage = {
    path: `${rootPath}/index.tsx`,
    component: rootPageTemplate(pagename, rootPath),
  };
  const indexPageComponent = {
    path: `${rootPath}/-components/${capitalpagename}Page.tsx`,
    component: rootPageComponentTemplate(pagename, rootPath),
  };
  const indexPageListComponent = {
    path: `${rootPath}/-components/list/${capitalpagename}List.tsx`,
    component: rootPageListComponentsTemplate(pagename, rootPath),
  };

  const baseForm = {
    path: `${rootPath}/-components/form/base.tsx`,
    component: rootPageBaseFormComponentsTemplate(pagename),
  };
  const createForm = {
    path: `${rootPath}/-components/form/create.tsx`,
    component: rootPageCreateFormComponentsTemplate(pagename),
  };
  const updateForm = {
    path: `${rootPath}/-components/form/update.tsx`,
    component: rootPageUpdateFormComponentsTemplate(pagename),
  };

  // const listComponent = {
  //   path: `${rootPath}/-components/${capitalpagename}List.tsx`,
  //   component: rootPageListComponentsTemplate(pagename, rootPath),
  // };
  const onePageComponent = {
    path: `${rootPath}/$${pagename}/index.tsx`,
    component: rootOnePageTemplate(pagename, rootPath),
  };
  const onepageComponent = {
    path: `${rootPath}/-components/one${pagename}/One${capitalpagename}Page.tsx`,
    component: rootOnePageComponentsTemplate(pagename),
  };
  const onepageDetailsComponent = {
    path: `${rootPath}/-components/one${pagename}/One${capitalpagename}Details.tsx`,
    component: rootOnePageDetailsComponentsTemplate(pagename, rootPath),
  };
  const queryOptions = {
    path: `${rootPath}/-query-options/${pagename}-query-option.ts`,
    component: rootPageQeuryOptionsTemplate(pagename),
  };

  const allPaths = [
    indexPage,
    indexPageComponent,
    baseForm,
    createForm,
    updateForm,
    indexPageListComponent,
    onePageComponent,
    onepageComponent,
    onepageDetailsComponent,
    queryOptions,
  ];

  const allComponentPaths = allPaths.map((path) => {
    console.log("path======= > ", path.path);
    return ensurePathExistsOrCreate(path.path, path.component);
  });
  await Promise.all(allComponentPaths);
}

async function ensurePathExistsOrCreate(path: string, component: string) {
  const component_path = resolve("./src/routes", path);
  try {
    await access(component_path);
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message.includes("no such file or directory")) {
        await writeFile(component_path, component).catch(async (err) => {
          if (err.code === "ENOENT") {
            const directryPath = component_path
              .split("/")
              .slice(0, -1)
              .join("/");
            await mkdir(directryPath, { recursive: true });
            await writeFile(component_path, component);
          }
        });
      }
    }
  }
}
