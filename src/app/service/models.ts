export namespace models{
    export interface user{
        name:string,
        age: number,
        score:number
    }
    export interface winner{
        id?: string
        name:string,
        score:number
    }
    export interface topper{
        name:string,
    }
}