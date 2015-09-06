/*
	Description: Displays the player's score and lives remaining as text on the game screen.
*/

module objects {
	// Scoreboard class
	export class Scoreboard {
		public stage: createjs.Stage;
		public game: createjs.Container;
		public lives: number;
		public score: number;
		public label: createjs.Text;
		public labelText: string = "";
		public width: number;
		public height: number;

		// Scoreboard constructor. Takes a reference to the stage and game.
		constructor(stage: createjs.Stage, game: createjs.Container) {
			this.stage = stage;
			this.game = game;
			this.lives = constants.PLAYER_LIVES;
			this.score = 0;
			this.label = new createjs.Text(this.labelText, constants.LABEL_FONT, constants.LABEL_COLOUR);
			this.update();
			this.width = this.label.getBounds().width;
			this.height = this.label.getBounds().height;

			game.addChild(this.label);
		}

		// Updates the scoreboard label text to show the updated ship lives and score values.
		public update() {
			this.labelText = "Ships: " + this.lives.toString() + " Score: " + this.score.toString();
			this.label.text = this.labelText;
		}

		// Removes the label from the game.
		public destroy() {
			game.removeChild(this.label);
		}
	}
} 
