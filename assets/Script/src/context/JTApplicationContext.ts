///<reference path="../events/JTEventSignaler.ts"/>
namespace com 
{
    export abstract class JTApplicationContext extends JTEventSignaler implements JTIApplicationContext
    {
        constructor()
        {
            super();
        }

        public abstract build():void;

        public abstract notifyComplete():void;
    }
}
