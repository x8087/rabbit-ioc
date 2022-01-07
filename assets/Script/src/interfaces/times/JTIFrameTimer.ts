namespace com 
{
    export interface JTIFrameTimer extends JTIPoolObject, JTIEventDispatcher
    {
        currentFrame:number;

        totalFrame:number;

        frameRate:number;

        running:boolean;

        loop:number;

        currentLoop:number;

        setup(frameRate:number, totalFrames:number, loop:number):void;

        play(frameRate:number, totalFrames:number, loop:number):void;

        stop():void;

        reset():void;

    }
}
