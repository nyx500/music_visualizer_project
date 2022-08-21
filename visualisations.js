//container function for the visualisations
function Visualisations(){
	//array to store visualisations
	this.visuals = [];
	//currently selected vis. set to null until vis loaded in
	this.selectedVisual = null;

	//add a new visualisation to the array
	//@param vis: a visualisation object
	this.add = function(vis){
		this.visuals.push(vis);
	};

	this.draw = function() {
		if (this.selectedVisual != null)
		{
				background(0);
		}	
	}

	//select a visualisation using it name property
	//@param visName: name property of the visualisation
	this.selectVisual = function(visName){
		for(var i = 0; i < this.visuals.length; i++){
			if(visName == this.visuals[i].name){
				this.draw();
				/* New visual being selected --> make sure that
				if the GUI for the new visual exists, it is
				being shown by changing the visGuiShowing global
				variable to 'true' (this variable is used in
				the toggleGuis() function called in draw()
				in sketch.js to determine if the GUI should be hidden)
				*/
				if (this.selectedVisual != this.visuals[i])
				{
					visGuiShowing = true;
				}
				this.selectedVisual = this.visuals[i];
			}
		}
	};

	
}
