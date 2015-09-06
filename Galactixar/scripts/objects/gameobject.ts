/*
	Description: A class which defines the default properties and constructor of a game object.
*/

module objects {
	// GameObject super class
	export class GameObject extends createjs.Sprite {
		public width: number;
		public height: number;
		public stage: createjs.Stage;
		public game: createjs.Container;

		// GameObject super constructor. Takes a sprite sheet, sprite string, stage and game reference. Sets up default register points.
		constructor(spriteSheet: createjs.SpriteSheet, spriteString: string, stage: createjs.Stage, game: createjs.Container) {
			super(spriteSheet, spriteString);
			this.width = this.getBounds().width;
			this.height = this.getBounds().height;
			this.regX = this.width * 0.5;
			this.regY = this.height * 0.5;
			this.stage = stage;
			this.game = game;
		}
	}
} 
