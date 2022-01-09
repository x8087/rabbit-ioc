namespace com 
{
    export class JTProtocolErrorMsg extends JTExtensionClass
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
