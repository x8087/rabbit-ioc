module com 
{
     export interface JTIChannelIdleStateAdapter extends JTIChannelContext
     {
          protocol:string | number;

          connected:boolean;
     }
}