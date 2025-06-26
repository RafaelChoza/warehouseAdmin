export type PrpductType = {
    id?:number,
    name: string,
    description: string,
    vendor: string,
    quantity: number,
    quantityKanban: number,
    price: number,
    mro?: string,
    createdAt?: string,
}