export interface Menuoption {
    id:number
    path:string
    parentId:number
    label:string
    icon?:string|null
    name?:string
    component?:string
    children:Menuoption[] | null
}