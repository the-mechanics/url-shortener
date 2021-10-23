import fs from "fs";

class database {

    path: string;

    constructor(path?: string) {
        if (path) this.path = path
        else this.path = "./database.json"
        if (!fs.existsSync(this.path) || !fs.lstatSync(this.path).isFile()) fs.writeFileSync(this.path, "{}");
    };

    create(data: string | number, value: string | number | any) {
        const file = JSON.parse(fs.readFileSync(this.path, 'utf-8'))

        if (!data) throw new Error("please enter the name of the data to be generated")
        if (!value) throw new Error("please enter the value of the data to be generated")
        if (file[data]) throw new Error("the data you are trying to create already exists")

        file[data] = value
        return fs.writeFileSync(this.path, JSON.stringify(file, value, 2), "utf-8")
    };

    update(data: string | number | any, value: string | number, callbackfn?: Function) {
        const file = JSON.parse(fs.readFileSync(this.path, 'utf-8'))

        if (!data) throw new Error("please enter the name of the data to be updated")
        if (!value) throw new Error("please enter the value of the data to be updated")
        if (callbackfn && typeof callbackfn === "function") callbackfn({ oldData: file[data], newData: value })

        file[data] = value
        return fs.writeFileSync(this.path, JSON.stringify(file, data, 2), "utf-8")
    };

    read(data: string | number, callbackfn?: (data: string | number | undefined) => void) {
        const file = JSON.parse(fs.readFileSync(this.path, 'utf-8'))

        if (!data) throw new Error("please enter the name of the data to be read")
        if (callbackfn && typeof callbackfn === "function") return file[data] ? callbackfn(file[data]) : callbackfn(undefined)

        else return file[data] ? file[data] : undefined
    };

    add(data: string | number, value: string | number) {
        const file = JSON.parse(fs.readFileSync(this.path, 'utf-8'))

        if (!data) throw new Error("please enter the name of the data to be added")
        if (!value) throw new Error("please enter the value of the data to be added")

        if (typeof value === "number") {
            if (!file[data]) throw new Error("you cannot add data that does not exist.")
            if (typeof file[data] === "string") throw new Error("the value you are trying to add is string , you can't add number.")
            if (!file[data]) {
                file[data] = value
                return fs.writeFileSync(this.path, JSON.stringify(file, null, 2), "utf-8")
            }
            else {
                file[data] += value
                return fs.writeFileSync(this.path, JSON.stringify(file, null, 2), "utf-8")
            }
        }
        if (typeof value === "string") {
            if (!file[data]) throw new Error("you cannot add data that does not exist.")
            if (typeof file[data] === "number") throw new Error("the value you are trying to add is number , you can't add string.")
            file[data] = value
            return fs.writeFileSync(this.path, JSON.stringify(file, null, 2), "utf-8")
        }
    }

    push(data: string | number, element: Object | Array<any> | string | number) {
        const file = JSON.parse(fs.readFileSync(this.path, 'utf-8'))

        if (!data) throw new Error("please enter the name of the data to be pushed")
        if (!element) throw new Error("please enter the values of the data to be pushed")

        if (!file[data]) file[data] = []
        file[data].push(element)
        return fs.writeFileSync(this.path, JSON.stringify(file, null, 2), "utf-8")
    }

    includes(data: string | number, callbackfn?: Function) {
        if (!data) throw new Error("please enter the name of the data to be searched")
        if (callbackfn && typeof callbackfn === "function") callbackfn(JSON.parse(fs.readFileSync(this.path, 'utf-8'))[data] ? true : false)
        return JSON.parse(fs.readFileSync(this.path, 'utf-8'))[data] ? true : false
    }

    delete(data: string | number) {
        const file = JSON.parse(fs.readFileSync(this.path, 'utf-8'))

        if (!file[data]) throw Error("the data you tried to extract was not found")

        delete file[data]
        return fs.writeFileSync(this.path, JSON.stringify(file, null, 2), "utf-8")
    }
};

export default new database();  