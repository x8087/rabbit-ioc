namespace com 
{
    export class JTProtocolErrorMsg
    {
            public static checkPackageStatus(receivePackage:JTIReceivePackage):boolean
            {
                    return receivePackage.status == JTProtocol.NORMAL;
            }

            public static showErrorMessage(receivePackage:JTIReceivePackage):void
            {
                    
            }
    }
}
