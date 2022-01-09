namespace com 
{
    export abstract class JTExtensionClass extends JTEventSignaler implements JTIExtensionClass
    {
        constructor()
        {
            super();
        }

        public abstract build():void;
    }
}
