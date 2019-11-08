class Singleton {
	static obj: any;
	private constructor() { }
	public static getInstance() {
		if (!this.obj) this.obj = new Singleton()
		return this.obj;
	}

}

let obj = Singleton.getInstance();

