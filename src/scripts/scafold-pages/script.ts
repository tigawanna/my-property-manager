import { rootPageTemplate } from "./base-templates"
import { rootPageBaseFormComponentsTemplate, rootPageCreateFormComponentsTemplate, rootPageUpdateFormComponentsTemplate } from "./form-templates"
import { rootPageQeuryOptionsTemplate } from "./query-options-tempaltes"



const filesToCreate = {

}

function scaffoldPage(pagename: string, path: string) {
    let rootPath = path.trim()
    if(rootPath.length == 0){
        throw new Error("Path cannot be empty")
    }
    if(rootPath.endsWith("/")){
        rootPath = rootPath.slice(0, rootPath.length - 1)
    }
    if(rootPath.startsWith("/")){
        rootPath = rootPath.slice(1)
    }

    const indexPage = {
      path: `${rootPath}/index.tsx`,
      component: rootPageTemplate(pagename, rootPath),
    };
    const queryOptions = {
      path: `${rootPath}/-query-options/${pagename}-query-option.ts`,
      component: rootPageQeuryOptionsTemplate(pagename, rootPath),
    };
    const baseForm = {
      path: `${rootPath}/-components/form/base.tsx`,
      component: rootPageBaseFormComponentsTemplate(pagename, rootPath),
    };
    const createForm = {
      path: `${rootPath}/-components/form/create.tsx`,
      component: rootPageCreateFormComponentsTemplate(pagename, rootPath),
    };
    const updateForm = {
      path: `${rootPath}/-components/form/update.tsx`,
      component: rootPageUpdateFormComponentsTemplate(pagename, rootPath),
    };

}

