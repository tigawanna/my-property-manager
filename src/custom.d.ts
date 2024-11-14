declare module "html-table-to-json" {

  export default class HtmlTableToJson {

    constructor(html: string);

    static parse(html: string): {
        _results: Record<string, string>[];
        _headers: string[];
        _count: null;
        _firstRowUsedAsHeaders: boolean;
    };

    getResults(): any;

  }

}
