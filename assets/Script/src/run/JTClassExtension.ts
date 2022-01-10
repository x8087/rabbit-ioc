///<reference path="../events/JTEventSignaler.ts"/>
namespace com 
{
    export abstract class JTClassExtension extends JTEventSignaler implements JTIClassExtension
    {
        constructor()
        {
            super();
        }

        public abstract build():void;
    }
}
