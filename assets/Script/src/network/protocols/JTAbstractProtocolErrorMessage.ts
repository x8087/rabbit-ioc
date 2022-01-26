module com 
{
    export abstract class JTAbstractProtocolErrorMessage extends JTOptionContext
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
