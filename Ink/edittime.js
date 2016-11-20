function GetPluginSettings()
{
	return {
		"name":			"Ink",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"Ink",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.1",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"An ink (scripting language for writing interactive narrative) interpreter in javascript. Base code from y-lohse.",
		"author":		"CeyFun",
		"help url":		"https://github.com/y-lohse/inkjs",
		"category":		"Narration",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		0						// uncomment lines to enable flags...
					//	| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
					//	| pf_texture			// object has a single texture (e.g. tiled background)
					//	| pf_position_aces		// compare/set/get x, y...
					//	| pf_size_aces			// compare/set/get width, height...
					//	| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
					//	| pf_appearance_aces	// compare/set/get visible, opacity...
					//	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
					//	| pf_animations			// enables the animations system.  See 'Sprite' for usage
					//	| pf_zorder_aces		// move to top, bottom, layer...
					//  | pf_nosize				// prevent resizing in the editor
					//	| pf_effects			// allow WebGL shader effects to be added
					//  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
												// a single non-tiling image the size of the object) - required for effects to work properly
	};
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name
				
// example				
/*AddNumberParam("Number", "Enter a number to test if positive.");
AddCondition(0, cf_none, "Is number positive", "My category", "{0} is positive", "Description for my condition!", "MyCondition");*/

//Conditions of the plugin
AddCondition(1, cf_none, "Story created", "Data", "If the story is created", "The story made with the Json data and needed for the rest of plugin has been created.", "storyCreated");
AddCondition(2, cf_trigger, "Output updated", "Narration", "When the output is updated", "The last line of the output as been updated (usually because of the continue action).", "outputUpdated");
AddStringParam("Variable Name", "The name of the observed variable that will trigger the event.");
AddCondition(3, cf_trigger, "Variable changed", "Event", "{0} has changed", "The value of the observed variable has changed", "variableChanged");

////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

// example
/*AddStringParam("Message", "Enter a string to alert.");
AddAction(0, af_none, "Alert", "My category", "Alert {0}", "Description for my action!", "MyAction");*/

//Actions of the plugin
AddStringParam("Ink Json", "The ink in a Json format.");
AddAction(1, 0, "Set Ink Json", "Setup", "Update Ink Json", "Set the data in the Json format needed to make a story.", "inkJsonSet");
AddStringParam("Variable Name", "The name of variable you want to modify.");
AddAnyTypeParam("Value", "The value you want to give to the variable.");
AddAction(2, 0, "Set variable", "Data", "{1} assigned to {0}", "Give a value to an Ink variable.", "setVariable");
AddStringParam("Name of the Knot (or the Knot.Stitch)", "The scene you want to go.");
AddAction(3, 0, "Go to a scene", "Navigation", "Go to {0}", "Make the runtime engine to jump to a scene.", "gotoScene");
AddAction(4, 0, "Continue", "Navigation", "Story continues", "Make the story continue (change the output).", "continue");
AddAction(5, 0, "Build the story", "Setup", "Build the story", "Build the story.", "storyBuild");
AddAction(6, 0, "Continue Max", "Navigation", "Story continues maximally", "Continue the story maximally.", "continueMax");
AddNumberParam("Index of the choice", "Index of the choice selected.");
AddAction(7, 0, "Choose a choice", "Navigation", "{0} is choosen", "Select a choice.", "choose");
AddStringParam("Json to load", "The json data of the save.");
AddAction(8, 0, "Load save", "Save/Load", "Load save Json", "Load save json data.", "loadJson");
AddStringParam("Function Name", "The name of the function to bind.");
AddAction(9, 0, "Bind a function", "Data", "Bind {0} to a C2 function", "Bind an external function to a C2 one.", "bind");
AddStringParam("Variable Name", "The name of the variable you want to track the value.");
AddAction(10, 0, "Track an Ink variable", "Data", "{0} is tracked", "Track a value.", "tracking");

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example
/*AddExpression(0, ef_return_number, "Leet expression", "My category", "MyExpression", "Return the number 1337.");*/

//Expressions of the plugin
AddExpression(1, ef_return_string, "Output", "Output", "output", "Give the last line output.");
AddNumberParam("index", "index of the choice");
AddExpression(2, ef_return_string, "Choice", "Output", "choice", "Give the choice text by index.");
AddExpression(3, ef_return_number, "Number of current choices", "Data", "currentChoicesCount", "Give the number of current choices.");
AddExpression(4, ef_return_string, "Save Json", "Save/Load", "saveJson", "Give the current save Json data.");
AddStringParam("Name of the Ink variable", "The name of the variable you want to know the value.");
AddExpression(5, ef_return_any, "Value of an Ink variable", "Data", "variable", "Give the value of the Ink variable.");
AddExpression(6, ef_return_number, "Can continue", "Navigation", "canContinue", "Return a true string if the narration can carry on.");
AddStringParam("Knot", "Name of the knot tested");
AddExpression(7, ef_return_number, "Number of visits of the knot", "Data", "nbVisits", "Return the number of visits of a knot.");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
	new cr.Property(ept_text, "Json Ink", "", "The Json Ink if you don't want to use an action to get it.")
	];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
		
	// Plugin-specific variables
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}