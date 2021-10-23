import fs from "fs";

class database {

    path: string;

    constructor(path?: string) {
        if (path) this.path = path
        else this.path = "./database.json"
        if (!fs.existsSync(this.path) || !fs.lstatSync(this.path).isFile()) fs.writeFileSync(this.path, "{}");
    };

    read(data: string | number, callbackfn?: (data: string | number | undefined) => void) {
        const file = JSON.parse(fs.readFileSync(this.path, 'utf-8'))

        if (!data) throw new Error("please enter the name of the data to be read")
        if (callbackfn && typeof callbackfn === "function") return file[data] ? callbackfn(file[data]) : callbackfn(undefined)

        else return file[data] ? file[data] : undefined
    };

    push(data: string | number, element: Object | Array<any> | string | number) {
        const file = JSON.parse(fs.readFileSync(this.path, 'utf-8'))

        if (!data) throw new Error("please enter the name of the data to be pushed")
        if (!element) throw new Error("please enter the values of the data to be pushed")

        if (!file[data]) file[data] = []
        file[data].push(element)
        return fs.writeFileSync(this.path, JSON.stringify(file, null, 2), "utf-8")
    }


    delete(data: string | number) {
        const file = JSON.parse(fs.readFileSync(this.path, 'utf-8'))

        if (!file[data]) throw Error("the data you tried to extract was not found")

        delete file[data]
        return fs.writeFileSync(this.path, JSON.stringify(file, null, 2), "utf-8")
    }
};

export default new database();  
