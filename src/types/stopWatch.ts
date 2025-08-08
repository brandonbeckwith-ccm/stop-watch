export type Lap={
    id:number,
    timeStamp:string
}

export type stopWatch={
    startTimer:number,
    elapsed:number,
    running:boolean
    laps:Lap[]
}