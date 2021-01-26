export interface response {
    msg: string,
    timeOfScan : Date,
    data : {networks? : any, clients? : any }
}