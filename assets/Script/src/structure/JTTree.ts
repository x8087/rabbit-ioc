///<reference path="base/JTCollection.ts"/>
module com 
{
    export class JTTree<V> extends JTCollection<V>
    {
		public root:JTTreeNode<V> = null;
		private _compare:Function = null;
		constructor(compare?:Function)
		{
            super();
			if (compare == null)
			{
				this._compare = function(a:number, b:number):number
				{
					return a - b;
				};
			}
			else
				this._compare = compare;
		}

		public insert(value:V):void
		{
			var parent:JTTreeNode<V> = this.root;
			if (!this.root) this.root = new JTTreeNode(value);
			else
			{
				while (parent)
				{
					if (this._compare(value, parent.value) < 0)
					{
						if (parent.left)
							parent = parent.left;
						else
						{
							parent.setLeft(value);
						}
					}
					else
					{
						if (parent.right)
							parent = parent.right;
						else
						{
							parent.setRight(value);
						}
					}
				}
			}
		}

		public find(value:V):JTTreeNode<V>
		{
			var parent:JTTreeNode<V> = this.root;
            var i:number;
			while (parent)
			{
				i = this._compare(value, parent.value);
				if (i == 0) return parent;
				parent = i < 0 ? parent.left : parent.right;
			}
			return null;
		}
		
		public remove(node:JTTreeNode<V>):void
		{
			if (node.left && node.right)
			{
				var t:JTTreeNode<V> = node;
				while (t.right) t = t.right;
				
				if (node.left == t)
				{
					t.right = node.right;
					t.right.parent = t;
				}
				else
				{
					t.parent.right = t.left;
					if (t.left) t.left.parent = t.parent;
					
					t.left = node.left;
					t.left.parent = t;
					t.right = node.right;
					t.right.parent = t;
				}
				
				if (node == this.root)
					this.root = t;
				else
				{
					if (node.isLeft())
						node.parent.left = t;
					else
						node.parent.right = t;
				}
				
				t.parent = node.parent;
				node.left = null;
				node.right = null;
				node = null;
			}
			else
			{
				var child:JTTreeNode<V> = null;
				
				if (node.left)
					child = node.left;
				else
				if (node.right)
					child = node.right;
					
				if (node == this.root)
					this.root = child;
				else
				{
					if (node.isLeft())
						node.parent.left = child;
					else
						node.parent.right = child;
				}
				
				if (child) child.parent = node.parent;
				node.left = node.right = node.parent = null;
				node = null;
			}
		}

		public contains(value:V):boolean
		{
			return this.find(value) != null;
		}

		public clear():void
		{
			if (this.root)
			{
				this.root.destroy();
				this.root = null;
			}
		}

		public getIterator():JTIIterator<V>
		{
            return null;
			//return new NullIterator();
		}
		
		public get size():number
		{
			return this.root ? this.root.count() : 0;
		}
		
		public isEmpty():boolean
		{
			return this.root ? (this.root.count() == 0) : true;
		}
		
		public toValues():V[]
		{
			var a:V[] = [];
			var copy:Function = function(node:JTTreeNode<V>):void
			{
				a.push(node.value);
			};
			JTTreeNode.inorder(this.root, copy);
			return a;
		}

		public toString():string
		{
			return "[BST, size=" + this.size + "]";
		}

		public dump():string
		{
			var s:string = "";
			var dumpNode:Function = function(node:JTTreeNode<V>)
			{
				s += node + "\n";
			};
			JTTreeNode.inorder(this.root, dumpNode);
			return s;
		}
    }
}