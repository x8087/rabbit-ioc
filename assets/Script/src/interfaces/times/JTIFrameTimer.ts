namespace com 
{
    export interface JTIFrameTimer extends JTIPoolObject, JTIEventDispatcher
    {
        currentFrame:number;

        totalFrame:number;

        frameRate:number;

        running:boolean;

        play(frameRate:number, loop:number):void;

        stop():void;

        reset():void;

    }
}
