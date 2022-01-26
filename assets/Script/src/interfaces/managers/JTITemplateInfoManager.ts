

/*
* name;
*/
module com 
{
    export interface JTITemplateInfoManager
    {
        updateConfigs(configs:any[]):void;

        put(url:string, data:any):void

        getValue(url:string):any
    }
}