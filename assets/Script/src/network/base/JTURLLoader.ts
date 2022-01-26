module com
{
    export class JTURLLoader extends JTHttpRequest
    {
        public static TEXT:string = "text";
		public static JSON:string = "json";
		public static XML:string = "xml";
		public static BUFFER:string = "arraybuffer";
		public static IMAGE:string = "image";
		public static SOUND:string = "sound";
		public static ATLAS:string = "atlas";
		public static FONT:string = "font";
        
        constructor()
        {
            super();
        }
    }
}
