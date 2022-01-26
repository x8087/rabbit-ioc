module com 
{
    export interface JTIEnterFrame extends JTIPoolObject, JTIEventDispatcher
    {
        currentFrame:number;

        totalFrame:number;

        frameRate:number;

        running:boolean;

        loop:number;

        currentLoop:number;

        setup(totalFrames:number, loop:number, frameRate?:number):void;

        play(totalFrames:number, loop:number, frameRate?:number):void;

        stop():void;

        reset():void;
    }
}
