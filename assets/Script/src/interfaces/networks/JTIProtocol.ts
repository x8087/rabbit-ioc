module com 
{
    export interface JTIProtocol
    {
        protocols:number | string[];

        encrypts:number[];

        build():void;

        registerProtocol(protocol:number | string, waiting:boolean, encrypt?:string):void;

        getProtocol(protocol:number | string):JTItemProtocol;

        execute(message:any):void;
    }
}
