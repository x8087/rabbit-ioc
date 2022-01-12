namespace com 
{
    export abstract class JTProtocolErrorMsg extends JTApplicationContext
    {
        constructor()
        {
            super();
        }

        public build(): void 
        {
        }


        public checkPackageStatus(receivePackage:JTIReceivePackage):boolean
        {
                return receivePackage.status == JTProtocol.NORMAL;
        }

        public showErrorMessage(receivePackage:JTIReceivePackage):void
        {
                
        }
    }
}
