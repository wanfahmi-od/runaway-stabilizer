(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes
lib.webFontTxtFilters = {}; 

// library properties:
lib.properties = {
	width: 1000,
	height: 550,
	fps: 12,
	color: "#999999",
	webfonts: {},
	manifest: [
		{src:"images/b737_max_cockpit_intro_con_boeing.png", id:"b737_max_cockpit_intro_con_boeing"},
		{src:"images/texture.jpg", id:"texture"}
	]
};



lib.webfontAvailable = function(family) { 
	lib.properties.webfonts[family] = true;
	var txtFilters = lib.webFontTxtFilters && lib.webFontTxtFilters[family] || [];
	for(var f = 0; f < txtFilters.length; ++f) {
		txtFilters[f].updateCache();
	}
};
// symbols:



(lib.b737_max_cockpit_intro_con_boeing = function() {
	this.initialize(img.b737_max_cockpit_intro_con_boeing);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1470,1754);


(lib.texture = function() {
	this.initialize(img.texture);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,10,10);


(lib.prot = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.texture();
	this.instance.setTransform(0,0,100,55);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1000,550);


(lib.cockpitimg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.b737_max_cockpit_intro_con_boeing();
	this.instance.setTransform(-257.2,-306.9,0.35,0.35);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-257.2,-306.9,514.5,613.9);


(lib.bulletgrey = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#21292E").s().p("AgTABIgkg+IBvA+IhqA9g");
	this.shape.setTransform(4.1,3.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.6,-2.4,11.4,12.6);


(lib.point2_indent = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.bulletgrey("synched",0);
	this.instance.setTransform(25.9,73.4,1,1,0,0,0,4.9,4.9);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgBA8QgFgCgCgFQgBgEAAgPIAAgzIgMAAIAAgNIAMAAIAAgXIANgJIAAAgIAQAAIAAANIgQAAIAAA0QAAAIABABQAAABABAAQAAAAAAABQAAAAABABQAAAAABABIAFABIAHgBIACAOIgMABQgIAAgDgDg");
	this.shape.setTransform(375.3,92.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgZApQgKgIgCgPIAPgCQACAJAGAFQAGAFAJAAQALAAAFgEQAFgFAAgGQAAgFgFgDQgDgCgNgDQgPgFgHgCQgHgCgDgGQgEgFAAgHQAAgHADgFQADgFAFgEQAEgCAGgCQAGgCAIAAQAJAAAIADQAIADAEAGQAEAFACAJIgQACQgBgHgFgEQgFgEgIAAQgKAAgFADQgEAEAAAFQAAADACACQACADAEACIAMAEIAXAHQAHABAEAFQADAGAAAIQAAAIgEAHQgFAHgJAEQgIADgLAAQgRAAgJgHg");
	this.shape_1.setTransform(368.1,94.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgHBAIAAhcIAPAAIAABcgAgHgtIAAgSIAPAAIAAASg");
	this.shape_2.setTransform(361.7,92.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgGBAIAAh/IAOAAIAAB/g");
	this.shape_3.setTransform(357.7,92.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AATBAIgdgwIgLALIAAAlIgQAAIAAh/IAQAAIAABHIAjgkIAUAAIgiAiIAmA6g");
	this.shape_4.setTransform(351.8,92.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgcAkQgLgNAAgXQAAgNAFgMQAFgLAKgFQAKgGAKAAQAQAAAJAIQAKAHADAOIgQADQgCgKgGgEQgFgFgIAAQgKAAgHAIQgIAJAAARQAAASAHAJQAHAIAKAAQAJAAAHgFQAGgGACgMIAPACQgCAQgLAJQgKAJgQAAQgRAAgMgMg");
	this.shape_5.setTransform(342.5,94.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgdAkQgNgNAAgXQAAgVANgNQAMgNARAAQATAAAMANQAMAMAAAWIAAAEIhEAAQABAPAHAIQAJAIAJAAQAJAAAGgEQAGgFAEgKIAQACQgEAPgKAHQgLAIgQAAQgSAAgMgMgAgQgbQgIAHAAANIAyAAQgBgMgFgGQgIgJgMAAQgJAAgHAHg");
	this.shape_6.setTransform(332.7,94.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AAVBAIAAg7QABgKgGgFQgEgGgKAAQgFAAgHAEQgFADgDAHQgDAEAAALIAAAzIgQAAIAAh/IAQAAIAAAuQALgNAPABQAKAAAIADQAIAFADAHQADAHABAMIAAA7g");
	this.shape_7.setTransform(322.7,92.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgdA6QgNgJgHgQQgGgQAAgRQgBgTAIgQQAIgOAOgIQAOgIAPAAQAUAAANAKQANAKAFARIgRAEQgEgOgIgGQgJgHgNAAQgNABgKAGQgKAIgEAMQgEAMAAAMQAAAPAFAMQAEANALAFQAKAHAJAAQAPAAAKgJQAKgIADgQIARAEQgFAVgOALQgOALgUAAQgTAAgNgIg");
	this.shape_8.setTransform(311.3,92.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgHBAIAAh/IAOAAIAAB/g");
	this.shape_9.setTransform(297.7,92.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AghApQgJgIABgLQAAgHACgGQADgGAGgDQAFgBAGgCIAOgDQASgCAJgDIAAgEQgBgKgEgEQgGgFgLAAQgKAAgFAEQgGAEgCAKIgQgCQADgKAEgGQAFgHAJgDQAJgDALAAQAMAAAHADQAHACAEAFQADAEACAGIABAPIAAATQAAAWABAGQABAGACAFIgQAAQgCgFgBgGQgJAHgIADQgGADgKAAQgPAAgIgHgAgCAFQgKACgEACQgEABgCAEQgCADAAAEQgBAHAFAEQAFAEAJAAQAIAAAGgEQAIgEADgHQACgFABgLIAAgFQgJADgPACg");
	this.shape_10.setTransform(290.7,94.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAvAvIAAg5QAAgJgCgEQgBgEgEgDQgEgCgGAAQgKAAgGAGQgHAHAAAOIAAA0IgNAAIAAg6QAAgLgEgFQgEgFgJAAQgHAAgFADQgGAEgDAGQgCAHAAAMIAAAvIgQAAIAAhbIAOAAIAAANQAFgHAHgEQAHgEAKAAQAKAAAHAEQAEAEADAIQALgQASAAQAOAAAHAIQAIAHAAAQIAAA+g");
	this.shape_11.setTransform(278.2,94.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgYAvIAAhbIAOAAIAAAOQAGgKAEgDQADgDAFAAQAJAAAIAFIgGAPQgGgEgFAAQgGAAgCADQgDADgDAGQgCAIAAAKIAAAvg");
	this.shape_12.setTransform(268.4,94.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgeAkQgMgNAAgXQAAgYAOgNQAMgKAQAAQATAAAMAMQAMANAAAWQAAAQgFALQgGAKgKAGQgKAFgMAAQgSAAgMgMgAgSgZQgIAJAAAQQAAASAIAIQAIAJAKAAQALAAAIgJQAIgJAAgRQAAgQgIgJQgIgJgLAAQgKAAgIAJg");
	this.shape_13.setTransform(259.7,94.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AAhBAIhChjIAABjIgQAAIAAh/IARAAIBCBjIAAhjIAQAAIAAB/g");
	this.shape_14.setTransform(248.1,92.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgXAHIAAgOIAvAAIAAAOg");
	this.shape_15.setTransform(238.7,94.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AAWAvIAAg3QAAgJgCgFQgCgFgFgDQgEgCgHAAQgIAAgHAGQgIAGAAASIAAAxIgPAAIAAhbIAOAAIAAANQAKgPASAAQAIAAAHADQAHADAEAFQADAFACAGIAAAQIAAA3g");
	this.shape_16.setTransform(230.7,94.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgeAkQgMgNAAgXQAAgYAOgNQAMgKAQAAQATAAAMAMQAMANAAAWQAAAQgFALQgGAKgKAGQgKAFgMAAQgSAAgMgMgAgSgZQgIAJAAAQQAAASAIAIQAIAJAKAAQALAAAIgJQAIgJAAgRQAAgQgIgJQgIgJgLAAQgKAAgIAJg");
	this.shape_17.setTransform(220.7,94.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AAhBAIhChjIAABjIgQAAIAAh/IARAAIBCBjIAAhjIAQAAIAAB/g");
	this.shape_18.setTransform(209.1,92.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgYAvIAAhbIAPAAIAAAOQAFgKAEgDQADgDAFAAQAJAAAIAFIgGAPQgFgEgGAAQgGAAgCADQgEADgCAGQgCAIAAAKIAAAvg");
	this.shape_19.setTransform(195.4,94.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgeAkQgLgNgBgXQABgVALgNQANgNARAAQATAAAMANQAMAMAAAWIAAAEIhEAAQABAPAIAIQAHAIAKAAQAJAAAGgEQAGgFAEgKIAQACQgEAPgKAHQgKAIgRAAQgTAAgMgMgAgQgbQgHAHgBANIAyAAQgBgMgFgGQgIgJgLAAQgKAAgHAHg");
	this.shape_20.setTransform(186.7,94.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgoAuIAAgNIA6hCIgSABIgkAAIAAgNIBKAAIAAAKIgwA6IgKAKIAUAAIApAAIAAANg");
	this.shape_21.setTransform(177.2,94.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgGBAIAAhcIAOAAIAABcgAgGgtIAAgSIAOAAIAAASg");
	this.shape_22.setTransform(170.7,92.5);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgGBAIAAh/IAOAAIAAB/g");
	this.shape_23.setTransform(166.7,92.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgGBAIAAhcIAOAAIAABcgAgGgtIAAgSIAOAAIAAASg");
	this.shape_24.setTransform(162.7,92.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgYAzIAAAMIgPAAIAAh/IAQAAIAAAuQAKgMANAAQAJgBAIAEQAHADAFAHQAFAGADAJQADAHAAAKQAAAYgMANQgMANgQAAQgPAAgJgOgAgRgJQgHAJAAAPQAAARAEAIQAIAMAMAAQAJAAAHgJQAIgJAAgSQAAgQgHgJQgIgIgJgBQgJABgIAIg");
	this.shape_25.setTransform(155.9,92.6);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AghApQgJgIABgLQAAgHADgGQADgGAFgDQAFgBAGgCIAOgDQASgCAJgDIAAgEQgBgKgEgEQgGgFgLAAQgKAAgGAEQgFAEgCAKIgQgCQADgKAEgGQAFgHAJgDQAJgDALAAQALAAAIADQAHACAEAFQADAEABAGIACAPIAAATQAAAWABAGQABAGACAFIgQAAQgDgFAAgGQgJAHgIADQgGADgKAAQgPAAgIgHgAgCAFQgKACgEACQgEABgCAEQgCADgBAEQAAAHAFAEQAFAEAJAAQAIAAAGgEQAIgEADgHQACgFABgLIAAgFQgJADgPACg");
	this.shape_26.setTransform(145.7,94.2);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgBA8QgFgCgCgFQgBgEAAgPIAAgzIgMAAIAAgNIAMAAIAAgXIANgJIAAAgIAQAAIAAANIgQAAIAAA0QAAAIABABQAAABABAAQAAAAAAABQAAAAABABQAAAAABABIAFABIAHgBIACAOIgMABQgIAAgDgDg");
	this.shape_27.setTransform(138.3,92.7);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgYA9QgMgFgHgKQgGgKgBgNIAQgCQACAKAEAGQAEAGAJAEQAIAEAJAAQAKAAAIgDQAHgDAEgFQADgFAAgGQAAgGgDgFQgEgEgIgDIgVgGQgRgFgHgBQgKgFgEgHQgFgIAAgIQAAgLAGgHQAFgJALgFQALgEAMAAQANAAALAEQALAFAGAJQAGAJAAALIgQABQgCgMgHgGQgIgGgOAAQgOAAgHAFQgHAHAAAIQAAAHAFAEQAFAEASAFQAVAFAIADQALAEAGAHQAFAIAAAKQAAALgGAJQgGAJgLAFQgLAFgOAAQgPAAgMgFg");
	this.shape_28.setTransform(129.6,92.5);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AghA/IgCgPIAJACQAFAAAEgCQADgCACgDIAFgMIABgEIgjhbIARAAIATA2IAFAUIAGgUIAUg2IAQAAIgjBdIgHAVQgEAIgGAEQgFADgIAAQgEAAgGgCg");
	this.shape_29.setTransform(114.3,96.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AghApQgIgIgBgLQAAgHADgGQAEgGAFgDQAFgBAGgCIAOgDQASgCAIgDIAAgEQABgKgFgEQgGgFgLAAQgKAAgFAEQgGAEgCAKIgQgCQACgKAFgGQAFgHAJgDQAKgDAJAAQAMAAAIADQAHACADAFQAFAEABAGIAAAPIAAATQAAAWABAGQABAGAEAFIgRAAQgCgFgBgGQgJAHgIADQgHADgIAAQgQAAgIgHgAgDAFQgJACgEACQgEABgDAEQgBADAAAEQAAAHAEAEQAFAEAJAAQAHAAAIgEQAGgEAEgHQADgFgBgLIAAgFQgIADgQACg");
	this.shape_30.setTransform(104.7,94.2);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AASAuIgPg2IgDgQIgRBGIgRAAIgchbIAQAAIAOA0IAGAUIAFgTIAPg1IAOAAIAOA0IAFASIAFgSIAQg0IAPAAIgcBbg");
	this.shape_31.setTransform(93.2,94.2);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AghApQgJgIAAgLQABgHADgGQADgGAFgDQAFgBAGgCIAOgDQARgCAKgDIAAgEQAAgKgFgEQgGgFgLAAQgKAAgGAEQgFAEgDAKIgPgCQACgKAFgGQAFgHAJgDQAKgDAJAAQANAAAHADQAHACAEAFQADAEABAGIABAPIAAATQAAAWACAGQABAGACAFIgQAAQgDgFAAgGQgJAHgIADQgGADgKAAQgPAAgIgHgAgCAFQgKACgEACQgEABgCAEQgDADAAAEQAAAHAFAEQAFAEAJAAQAIAAAGgEQAIgEADgHQADgFAAgLIAAgFQgJADgPACg");
	this.shape_32.setTransform(81.7,94.2);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AAWAvIAAg3QAAgJgCgFQgCgFgFgDQgEgCgHAAQgIAAgHAGQgIAGAAASIAAAxIgPAAIAAhbIAOAAIAAANQAKgPASAAQAIAAAHADQAHADAEAFQADAFACAGIAAAQIAAA3g");
	this.shape_33.setTransform(71.7,94.1);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgUAsQgHgDgDgFQgEgFgBgGIgBgPIAAg4IAQAAIAAAyQAAAMABAEQABAHAFADQAFAEAHAAQAFAAAGgEQAGgEADgGQADgGAAgMIAAgwIAPAAIAABbIgOAAIAAgNQgLAPgQAAQgJAAgHgDg");
	this.shape_34.setTransform(61.6,94.3);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AAjBAIgRgbIgMgSIgHgIIgIgEIgJAAIgUAAIAAA5IgRAAIAAh/IA3AAQARAAAJADQAJAEAGAJQAFAIAAALQAAAOgJAKQgJAHgSADQAGADAEADQAHAHAHAKIAWAjgAgmgGIAlAAQAJAAAHgDQAGgCAEgFQADgGAAgGQAAgJgGgGQgHgFgOAAIgnAAg");
	this.shape_35.setTransform(50.8,92.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgdAkQgMgNgBgXQABgVAMgNQAMgNARAAQATAAAMANQAMAMAAAWIAAAEIhEAAQABAPAHAIQAJAIAJAAQAJAAAGgEQAGgFAEgKIAQACQgEAPgKAHQgLAIgQAAQgTAAgLgMgAgQgbQgHAHgBANIAyAAQgBgMgFgGQgIgJgMAAQgJAAgHAHg");
	this.shape_36.setTransform(583.7,74.1);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AAWBAIAAg7QAAgKgGgFQgEgGgKAAQgFAAgHAEQgFADgDAGQgDAFAAALIAAAzIgQAAIAAh/IAQAAIAAAvQALgOAPAAQAKABAIAEQAIADADAIQAEAHAAAMIAAA7g");
	this.shape_37.setTransform(573.7,72.4);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AgBA9QgFgDgCgFQgBgEAAgPIAAgzIgMAAIAAgMIAMAAIAAgYIANgJIAAAhIAQAAIAAAMIgQAAIAAA0QAAAHABACQAAABABAAQAAAAAAABQAAAAABABQAAAAABAAIAFACIAHgBIACAOIgMABQgIAAgDgCg");
	this.shape_38.setTransform(566.3,72.6);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgMBBIAAhPIgOAAIAAgMIAOAAIAAgKQAAgKACgEQACgGAGgEQAEgEAKAAIAPACIgDANIgJgBQgHAAgDADQgDAEAAAIIAAAJIASAAIAAAMIgSAAIAABPg");
	this.shape_39.setTransform(556.6,72.3);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgeAkQgMgNAAgXQAAgYAOgNQAMgKAQAAQATAAAMAMQAMANAAAWQAAAQgFALQgGAKgKAGQgKAFgMAAQgSAAgMgMgAgSgZQgIAJAAAQQAAASAIAIQAIAJAKAAQALAAAIgJQAIgJAAgRQAAgQgIgJQgIgJgLAAQgKAAgIAJg");
	this.shape_40.setTransform(548.7,74.1);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgZApQgKgIgCgPIAPgCQACAJAGAFQAGAFAJAAQALAAAFgEQAFgFAAgGQAAgFgFgDQgDgCgNgDQgPgFgHgCQgHgCgDgGQgEgFAAgHQAAgHADgFQADgFAFgEQAEgCAGgCQAGgCAIAAQAJAAAIADQAIADAEAGQAEAFACAJIgQACQgBgHgFgEQgFgEgIAAQgKAAgFADQgEAEAAAFQAAADACACQACADAEACIAMAEIAXAHQAHABAEAFQADAGAAAIQAAAIgEAHQgFAHgJAEQgIADgLAAQgRAAgJgHg");
	this.shape_41.setTransform(534.1,74.1);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgnBBIAAh/IAPAAIAAAMQAEgHAHgEQAGgDAIAAQAMAAAIAGQAKAGAEALQAFAMAAANQAAAOgFAKQgGALgJAGQgKAGgKAAQgGAAgHgDQgHgDgDgFIAAAtgAgRgqQgIAJAAASQAAAQAIAJQAHAIAKAAQAIAAAJgJQAGgIAAgRQAAgSgGgJQgIgJgJAAQgKAAgHAKg");
	this.shape_42.setTransform(525,75.8);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgdAkQgMgNAAgXQAAgVAMgNQAMgNARAAQATAAAMANQALAMAAAWIAAAEIhDAAQABAPAHAIQAJAIAJAAQAJAAAGgEQAGgFAEgKIAQACQgEAPgKAHQgLAIgQAAQgTAAgLgMgAgQgbQgIAHAAANIAyAAQgBgMgFgGQgHgJgNAAQgIAAgIAHg");
	this.shape_43.setTransform(514.7,74.1);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgBA9QgFgDgCgFQgBgEAAgPIAAgzIgMAAIAAgMIAMAAIAAgYIANgJIAAAhIAQAAIAAAMIgQAAIAAA0QAAAHABACQAAABABAAQAAAAAAABQAAAAABABQAAAAABAAIAFACIAHgBIACAOIgMABQgIAAgDgCg");
	this.shape_44.setTransform(507.3,72.6);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgZApQgKgIgCgPIAPgCQACAJAGAFQAGAFAJAAQALAAAFgEQAFgFAAgGQAAgFgFgDQgDgCgNgDQgPgFgHgCQgHgCgDgGQgEgFAAgHQAAgHADgFQADgFAFgEQAEgCAGgCQAGgCAIAAQAJAAAIADQAIADAEAGQAEAFACAJIgQACQgBgHgFgEQgFgEgIAAQgKAAgFADQgEAEAAAFQAAADACACQACADAEACIAMAEIAXAHQAHABAEAFQADAGAAAIQAAAIgEAHQgFAHgJAEQgIADgLAAQgRAAgJgHg");
	this.shape_45.setTransform(500.1,74.1);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgGBAIAAh/IANAAIAAB/g");
	this.shape_46.setTransform(488.7,72.4);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AghApQgIgIAAgLQAAgHACgGQADgGAGgDQAFgBAGgCIAOgDQARgCAJgDIAAgEQAAgKgEgEQgGgFgLAAQgKAAgFAEQgGAEgCAKIgQgCQADgKAEgGQAFgHAJgDQAKgDAKAAQAMAAAHADQAHACADAFQAFAEABAGIABAPIAAATQAAAWAAAGQABAGADAFIgQAAQgCgFgBgGQgJAHgIADQgHADgJAAQgPAAgIgHgAgDAFQgJACgEACQgEABgCAEQgCADAAAEQgBAHAFAEQAFAEAJAAQAHAAAIgEQAGgEAEgHQADgFgBgLIAAgFQgIADgQACg");
	this.shape_47.setTransform(481.7,74.1);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AgcAkQgLgNAAgXQAAgNAFgMQAFgLAKgFQAKgGAKAAQAQAAAJAIQAKAHADAOIgQADQgCgKgGgEQgFgFgIAAQgKAAgHAIQgIAJAAARQAAASAHAJQAHAIAKAAQAJAAAHgFQAGgGACgMIAPACQgCAQgLAJQgKAJgQAAQgRAAgMgMg");
	this.shape_48.setTransform(472.5,74.1);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AgGBAIAAhbIANAAIAABbgAgGgsIAAgTIANAAIAAATg");
	this.shape_49.setTransform(465.7,72.4);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AgBA9QgFgDgCgFQgBgEAAgPIAAgzIgMAAIAAgMIAMAAIAAgYIANgJIAAAhIAQAAIAAAMIgQAAIAAA0QAAAHABACQAAABABAAQAAAAAAABQAAAAABABQAAAAABAAIAFACIAHgBIACAOIgMABQgIAAgDgCg");
	this.shape_50.setTransform(461.3,72.6);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AgGBAIAAhbIANAAIAABbgAgGgsIAAgTIANAAIAAATg");
	this.shape_51.setTransform(456.7,72.4);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AgYAvIAAhbIAOAAIAAAOQAGgKAEgDQADgDAGAAQAHAAAJAFIgFAPQgGgEgGAAQgFAAgDADQgEADgBAGQgDAIAAAKIAAAvg");
	this.shape_52.setTransform(452.4,74);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AgcAkQgLgNAAgXQAAgNAFgMQAFgLAKgFQAKgGAKAAQAQAAAJAIQAKAHADAOIgQADQgCgKgGgEQgFgFgIAAQgKAAgHAIQgIAJAAARQAAASAHAJQAHAIAKAAQAJAAAHgFQAGgGACgMIAPACQgCAQgLAJQgKAJgQAAQgRAAgMgMg");
	this.shape_53.setTransform(444.5,74.1);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AAWBAIAAg7QAAgKgGgFQgEgGgKAAQgFAAgHAEQgFADgDAGQgDAFAAALIAAAzIgQAAIAAh/IAQAAIAAAvQALgOAPAAQAKABAIAEQAIADADAIQAEAHAAAMIAAA7g");
	this.shape_54.setTransform(429.7,72.4);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AgBA9QgFgDgCgFQgBgEAAgPIAAgzIgMAAIAAgMIAMAAIAAgYIANgJIAAAhIAQAAIAAAMIgQAAIAAA0QAAAHABACQAAABABAAQAAAAAAABQAAAAABABQAAAAABAAIAFACIAHgBIACAOIgMABQgIAAgDgCg");
	this.shape_55.setTransform(422.3,72.6);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgHBAIAAhbIAPAAIAABbgAgHgsIAAgTIAPAAIAAATg");
	this.shape_56.setTransform(417.7,72.4);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AASAuIgPg2IgDgQIgRBGIgRAAIgchbIAQAAIAOA0IAGAUIAFgTIAPg1IAOAAIAOA0IAFASIAFgSIAQg0IAPAAIgdBbg");
	this.shape_57.setTransform(409.2,74.1);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AgTA7QgKgGgEgLQgGgMAAgNQAAgPAFgJQAEgLAKgHQAJgFALgBQAHAAAGAEQAHAEAEAGIAAgvIAQAAIAAB/IgPAAIAAgMQgIAOgRAAQgKAAgJgGgAgPgIQgIAIABARQAAASAHAIQAIAJAIAAQAKAAAIgIQAGgJAAgSQAAgRgGgIQgIgKgLABQgJgBgGAKg");
	this.shape_58.setTransform(392.4,72.5);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgeAkQgMgNABgXQgBgVAMgNQANgNARAAQATAAAMANQALAMAAAWIAAAEIhDAAQABAPAIAIQAHAIAKAAQAJAAAGgEQAGgFAEgKIAQACQgEAPgKAHQgKAIgRAAQgSAAgNgMgAgQgbQgHAHgBANIAyAAQgBgMgFgGQgHgJgMAAQgJAAgIAHg");
	this.shape_59.setTransform(382.7,74.1);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AgBA9QgFgDgCgFQgBgEAAgPIAAgzIgMAAIAAgMIAMAAIAAgYIANgJIAAAhIAQAAIAAAMIgQAAIAAA0QAAAHABACQAAABABAAQAAAAAAABQAAAAABABQAAAAABAAIAFACIAHgBIACAOIgMABQgIAAgDgCg");
	this.shape_60.setTransform(375.3,72.6);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AghApQgJgIAAgLQAAgHAEgGQADgGAFgDQAFgBAGgCIAOgDQASgCAIgDIAAgEQABgKgFgEQgGgFgLAAQgKAAgGAEQgFAEgDAKIgPgCQACgKAFgGQAFgHAJgDQAJgDAKAAQAMAAAIADQAHACAEAFQADAEABAGIABAPIAAATQAAAWABAGQACAGADAFIgRAAQgDgFAAgGQgJAHgIADQgHADgIAAQgQAAgIgHgAgCAFQgKACgEACQgEABgDAEQgCADAAAEQABAHAEAEQAFAEAJAAQAHAAAHgEQAHgEAEgHQACgFAAgLIAAgFQgIADgPACg");
	this.shape_61.setTransform(367.7,74.1);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AgGBAIAAhbIAOAAIAABbgAgGgsIAAgTIAOAAIAAATg");
	this.shape_62.setTransform(360.7,72.4);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AgcAkQgLgNAAgXQAAgNAFgMQAFgLAKgFQAKgGAKAAQAQAAAJAIQAKAHADAOIgQADQgCgKgGgEQgFgFgIAAQgKAAgHAIQgIAJAAARQAAASAHAJQAHAIAKAAQAJAAAHgFQAGgGACgMIAPACQgCAQgLAJQgKAJgQAAQgRAAgMgMg");
	this.shape_63.setTransform(354.5,74.1);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AgeAkQgMgNAAgXQAAgYAOgNQAMgKAQAAQATAAAMAMQAMANAAAWQAAAQgFALQgGAKgKAGQgKAFgMAAQgSAAgMgMgAgSgZQgIAJAAAQQAAASAIAIQAIAJAKAAQALAAAIgJQAIgJAAgRQAAgQgIgJQgIgJgLAAQgKAAgIAJg");
	this.shape_64.setTransform(344.7,74.1);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AgZApQgKgIgCgPIAPgCQACAJAGAFQAGAFAJAAQALAAAFgEQAFgFAAgGQAAgFgFgDQgDgCgNgDQgPgFgHgCQgHgCgDgGQgEgFAAgHQAAgHADgFQADgFAFgEQAEgCAGgCQAGgCAIAAQAJAAAIADQAIADAEAGQAEAFACAJIgQACQgBgHgFgEQgFgEgIAAQgKAAgFADQgEAEAAAFQAAADACACQACADAEACIAMAEIAXAHQAHABAEAFQADAGAAAIQAAAIgEAHQgFAHgJAEQgIADgLAAQgRAAgJgHg");
	this.shape_65.setTransform(335.1,74.1);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AgZApQgKgIgCgPIAPgCQACAJAGAFQAGAFAJAAQALAAAFgEQAFgFAAgGQAAgFgFgDQgDgCgNgDQgPgFgHgCQgHgCgDgGQgEgFAAgHQAAgHADgFQADgFAFgEQAEgCAGgCQAGgCAIAAQAJAAAIADQAIADAEAGQAEAFACAJIgQACQgBgHgFgEQgFgEgIAAQgKAAgFADQgEAEAAAFQAAADACACQACADAEACIAMAEIAXAHQAHABAEAFQADAGAAAIQAAAIgEAHQgFAHgJAEQgIADgLAAQgRAAgJgHg");
	this.shape_66.setTransform(326.1,74.1);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AghApQgJgIABgLQAAgHADgGQADgGAFgDQAFgBAGgCIAOgDQASgCAJgDIAAgEQgBgKgEgEQgGgFgLAAQgKAAgGAEQgFAEgCAKIgQgCQADgKAEgGQAFgHAJgDQAJgDALAAQALAAAIADQAHACAEAFQADAEABAGIACAPIAAATQAAAWABAGQABAGACAFIgQAAQgDgFAAgGQgJAHgIADQgGADgKAAQgPAAgIgHgAgCAFQgKACgEACQgEABgCAEQgCADgBAEQAAAHAFAEQAFAEAJAAQAIAAAGgEQAIgEADgHQACgFABgLIAAgFQgJADgPACg");
	this.shape_67.setTransform(316.7,74.1);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AgeAkQgMgNABgXQgBgVAMgNQANgNARAAQATAAAMANQALAMAAAWIAAAEIhDAAQABAPAIAIQAHAIAKAAQAJAAAGgEQAGgFAEgKIAQACQgEAPgKAHQgKAIgRAAQgSAAgNgMgAgQgbQgHAHgBANIAyAAQgBgMgFgGQgHgJgMAAQgJAAgIAHg");
	this.shape_68.setTransform(301.7,74.1);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AgaA7QgLgIABgPIAPACQABAHAEAEQAGAEAKAAQAJAAAHgEQAFgFACgIQACgEAAgQQgLAMgOAAQgTAAgKgOQgLgOAAgRQABgNAEgMQAFgLAJgGQAJgGAMAAQAPAAALANIAAgLIAOAAIAABPQABAVgFAKQgFAJgJAFQgJAFgNAAQgRAAgJgHgAgQgrQgHAIgBARQABASAHAHQAHAIAJAAQALAAAIgIQAHgHAAgSQAAgRgIgIQgHgJgLAAQgIAAgIAJg");
	this.shape_69.setTransform(291.4,75.9);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AgTA7QgJgGgGgLQgFgMAAgNQAAgPAFgJQAFgLAJgHQAJgFALgBQAHAAAHAEQAGAEAFAGIAAgvIAPAAIAAB/IgPAAIAAgMQgJAOgQAAQgKAAgJgGgAgQgIQgGAIgBARQAAASAIAIQAHAJAJAAQAKAAAHgIQAIgJgBgSQABgRgIgIQgHgKgLABQgIgBgIAKg");
	this.shape_70.setTransform(281.4,72.5);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AgdAkQgMgNAAgXQAAgVAMgNQAMgNARAAQATAAAMANQALAMAAAWIAAAEIhDAAQABAPAHAIQAJAIAJAAQAJAAAGgEQAGgFAEgKIAQACQgEAPgKAHQgLAIgQAAQgTAAgLgMgAgQgbQgIAHAAANIAyAAQgBgMgFgGQgHgJgNAAQgIAAgIAHg");
	this.shape_71.setTransform(271.7,74.1);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AgGBAIAAh/IANAAIAAB/g");
	this.shape_72.setTransform(264.7,72.4);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AASAuIgPg2IgDgQIgRBGIgRAAIgchbIAQAAIAOA0IAGAUIAFgTIAPg1IAOAAIAOA0IAFASIAFgSIAQg0IAPAAIgdBbg");
	this.shape_73.setTransform(256.2,74.1);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AgeAkQgMgNAAgXQAAgYAOgNQAMgKAQAAQATAAAMAMQAMANAAAWQAAAQgFALQgGAKgKAGQgKAFgMAAQgSAAgMgMgAgSgZQgIAJAAAQQAAASAIAIQAIAJAKAAQALAAAIgJQAIgJAAgRQAAgQgIgJQgIgJgLAAQgKAAgIAJg");
	this.shape_74.setTransform(244.7,74.1);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AAWAvIAAg3QAAgJgCgFQgCgFgFgDQgEgCgHAAQgIAAgHAGQgIAGAAASIAAAxIgPAAIAAhbIAOAAIAAANQAKgPASAAQAIAAAHADQAHADAEAFQADAFACAGIAAAQIAAA3g");
	this.shape_75.setTransform(234.7,74);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AATBAIgdgvIgLAKIAAAlIgQAAIAAh/IAQAAIAABIIAjgkIAUAAIgiAhIAmA6g");
	this.shape_76.setTransform(225.8,72.4);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AgZApQgKgIgCgPIAPgCQACAJAGAFQAGAFAJAAQALAAAFgEQAFgFAAgGQAAgFgFgDQgDgCgNgDQgPgFgHgCQgHgCgDgGQgEgFAAgHQAAgHADgFQADgFAFgEQAEgCAGgCQAGgCAIAAQAJAAAIADQAIADAEAGQAEAFACAJIgQACQgBgHgFgEQgFgEgIAAQgKAAgFADQgEAEAAAFQAAADACACQACADAEACIAMAEIAXAHQAHABAEAFQADAGAAAIQAAAIgEAHQgFAHgJAEQgIADgLAAQgRAAgJgHg");
	this.shape_77.setTransform(211.1,74.1);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AAvAvIAAg5QAAgJgCgEQgBgEgEgDQgEgCgGAAQgKAAgGAGQgHAHAAAOIAAA0IgNAAIAAg6QAAgLgEgFQgEgFgJAAQgHAAgFADQgGAEgDAGQgCAHAAAMIAAAvIgQAAIAAhbIAOAAIAAANQAFgHAHgEQAHgEAKAAQAKAAAHAEQAEAEADAIQALgQASAAQAOAAAHAIQAIAHAAAQIAAA+g");
	this.shape_78.setTransform(199.2,74);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AgeAkQgLgNgBgXQABgVALgNQANgNARAAQATAAAMANQAMAMAAAWIAAAEIhEAAQABAPAIAIQAHAIAKAAQAJAAAGgEQAGgFAEgKIAQACQgEAPgKAHQgKAIgRAAQgTAAgMgMgAgQgbQgHAHgBANIAyAAQgBgMgFgGQgIgJgLAAQgKAAgHAHg");
	this.shape_79.setTransform(186.7,74.1);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AgBA9QgFgDgCgFQgBgEAAgPIAAgzIgMAAIAAgMIAMAAIAAgYIANgJIAAAhIAQAAIAAAMIgQAAIAAA0QAAAHABACQAAABABAAQAAAAAAABQAAAAABABQAAAAABAAIAFACIAHgBIACAOIgMABQgIAAgDgCg");
	this.shape_80.setTransform(179.3,72.6);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AgZApQgKgIgCgPIAPgCQACAJAGAFQAGAFAJAAQALAAAFgEQAFgFAAgGQAAgFgFgDQgDgCgNgDQgPgFgHgCQgHgCgDgGQgEgFAAgHQAAgHADgFQADgFAFgEQAEgCAGgCQAGgCAIAAQAJAAAIADQAIADAEAGQAEAFACAJIgQACQgBgHgFgEQgFgEgIAAQgKAAgFADQgEAEAAAFQAAADACACQACADAEACIAMAEIAXAHQAHABAEAFQADAGAAAIQAAAIgEAHQgFAHgJAEQgIADgLAAQgRAAgJgHg");
	this.shape_81.setTransform(172.1,74.1);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AghA/IgCgPIAJACQAFAAAEgCQADgCACgDIAFgMIABgEIgjhbIARAAIATA2IAFAUIAGgUIAUg2IAQAAIgjBdIgHAVQgEAIgGAEQgFADgIAAQgEAAgGgCg");
	this.shape_82.setTransform(163.3,76);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("AgZApQgKgIgCgPIAPgCQACAJAGAFQAGAFAJAAQALAAAFgEQAFgFAAgGQAAgFgFgDQgDgCgNgDQgPgFgHgCQgHgCgDgGQgEgFAAgHQAAgHADgFQADgFAFgEQAEgCAGgCQAGgCAIAAQAJAAAIADQAIADAEAGQAEAFACAJIgQACQgBgHgFgEQgFgEgIAAQgKAAgFADQgEAEAAAFQAAADACACQACADAEACIAMAEIAXAHQAHABAEAFQADAGAAAIQAAAIgEAHQgFAHgJAEQgIADgLAAQgRAAgJgHg");
	this.shape_83.setTransform(154.1,74.1);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#000000").s().p("AgcAkQgLgNAAgXQAAgNAFgMQAFgLAKgFQAKgGAKAAQAQAAAJAIQAKAHADAOIgQADQgCgKgGgEQgFgFgIAAQgKAAgHAIQgIAJAAARQAAASAHAJQAHAIAKAAQAJAAAHgFQAGgGACgMIAPACQgCAQgLAJQgKAJgQAAQgRAAgMgMg");
	this.shape_84.setTransform(140.5,74.1);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#000000").s().p("AgGBAIAAhbIANAAIAABbgAgGgsIAAgTIANAAIAAATg");
	this.shape_85.setTransform(133.7,72.4);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("AgZApQgKgIgCgPIAPgCQACAJAGAFQAGAFAJAAQALAAAFgEQAFgFAAgGQAAgFgFgDQgDgCgNgDQgPgFgHgCQgHgCgDgGQgEgFAAgHQAAgHADgFQADgFAFgEQAEgCAGgCQAGgCAIAAQAJAAAIADQAIADAEAGQAEAFACAJIgQACQgBgHgFgEQgFgEgIAAQgKAAgFADQgEAEAAAFQAAADACACQACADAEACIAMAEIAXAHQAHABAEAFQADAGAAAIQAAAIgEAHQgFAHgJAEQgIADgLAAQgRAAgJgHg");
	this.shape_86.setTransform(127.1,74.1);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#000000").s().p("AghApQgJgIAAgLQABgHADgGQADgGAFgDQAFgBAGgCIAOgDQARgCAKgDIAAgEQAAgKgFgEQgGgFgLAAQgKAAgGAEQgFAEgDAKIgPgCQACgKAFgGQAFgHAJgDQAKgDAJAAQANAAAHADQAHACAEAFQADAEABAGIABAPIAAATQAAAWACAGQABAGACAFIgQAAQgDgFAAgGQgJAHgIADQgGADgKAAQgPAAgIgHgAgCAFQgKACgEACQgEABgCAEQgDADAAAEQAAAHAFAEQAFAEAJAAQAIAAAGgEQAIgEADgHQADgFAAgLIAAgFQgJADgPACg");
	this.shape_87.setTransform(117.7,74.1);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("AgYA0IAAALIgPAAIAAh/IAQAAIAAAuQAKgNANAAQAJAAAIAEQAHAEAFAGQAFAGADAJQADAHAAAKQAAAYgMANQgMANgQAAQgPAAgJgNgAgRgIQgHAIAAAQQAAAQAEAIQAIAMAMAAQAJAAAHgJQAIgJAAgSQAAgQgHgIQgIgKgJABQgJgBgIAKg");
	this.shape_88.setTransform(107.9,72.5);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#000000").s().p("AgBA9QgFgDgCgFQgBgEAAgPIAAgzIgMAAIAAgMIAMAAIAAgYIANgJIAAAhIAQAAIAAAMIgQAAIAAA0QAAAHABACQAAABABAAQAAAAAAABQAAAAABABQAAAAABAAIAFACIAHgBIACAOIgMABQgIAAgDgCg");
	this.shape_89.setTransform(95.3,72.6);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#000000").s().p("AgGBAIAAhbIAOAAIAABbgAgGgsIAAgTIAOAAIAAATg");
	this.shape_90.setTransform(90.7,72.4);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#000000").s().p("AgYA0IAAALIgPAAIAAh/IAQAAIAAAuQAKgNANAAQAJAAAIAEQAHAEAFAGQAFAGADAJQADAHAAAKQAAAYgMANQgMANgQAAQgPAAgJgNgAgRgIQgHAIAAAQQAAAQAEAIQAIAMAMAAQAJAAAHgJQAIgJAAgSQAAgQgHgIQgIgKgJABQgJgBgIAKg");
	this.shape_91.setTransform(83.9,72.5);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#000000").s().p("AgHBAIAAhbIAOAAIAABbgAgHgsIAAgTIAOAAIAAATg");
	this.shape_92.setTransform(76.7,72.4);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#000000").s().p("AAWBAIAAg7QAAgKgGgFQgEgGgKAAQgFAAgHAEQgFADgDAGQgDAFAAALIAAAzIgQAAIAAh/IAQAAIAAAvQALgOAPAAQAKABAIAEQAIADADAIQAEAHAAAMIAAA7g");
	this.shape_93.setTransform(69.7,72.4);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#000000").s().p("AAYAuIgUgdIgEgIIgXAlIgTAAIAiguIgggtIAUAAIAOAWIAGAKIAGgKIAQgWIASAAIgfAsIAiAvg");
	this.shape_94.setTransform(60.2,74.1);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#000000").s().p("AgvBAIAAh/IBcAAIAAAPIhKAAIAAAoIBFAAIAAANIhFAAIAAAsIBNAAIAAAPg");
	this.shape_95.setTransform(49.9,72.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(19.4,60.5,581.8,44.2);


(lib.point1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.bulletgrey("synched",0);
	this.instance.setTransform(-29,55.9);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgYAvIAAhbIAPAAIAAAOQAFgKAEgDQADgDAFAAQAJAAAIAFIgGAPQgGgEgFAAQgGAAgCADQgDADgDAGQgCAIAAAKIAAAvg");
	this.shape.setTransform(250.4,62);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgdAkQgMgNgBgXQABgVAMgNQAMgNARAAQATAAAMANQAMAMAAAWIAAAEIhEAAQABAPAHAIQAJAIAJAAQAJAAAGgEQAGgFAEgKIAQACQgEAPgKAHQgLAIgQAAQgTAAgLgMgAgQgbQgHAHgBANIAyAAQgBgMgFgGQgIgJgMAAQgJAAgHAHg");
	this.shape_1.setTransform(241.7,62.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgoAuIAAgNIA6hCIgSABIgkAAIAAgNIBKAAIAAAKIgwA6IgKAKIAUAAIApAAIAAANg");
	this.shape_2.setTransform(232.2,62.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgGBAIAAhcIAOAAIAABcgAgGgtIAAgSIAOAAIAAASg");
	this.shape_3.setTransform(225.7,60.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgGBAIAAh/IAOAAIAAB/g");
	this.shape_4.setTransform(221.7,60.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgHBAIAAhcIAPAAIAABcgAgHgtIAAgSIAPAAIAAASg");
	this.shape_5.setTransform(217.7,60.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgYAzIAAAMIgPAAIAAh/IAQAAIAAAuQAKgNANAAQAJABAIADQAHAEAFAGQAFAGADAJQADAHAAAKQAAAYgMANQgMANgQAAQgPAAgJgOgAgRgIQgHAIAAAPQAAASAEAHQAIAMAMAAQAJAAAHgJQAIgJAAgSQAAgQgHgIQgIgJgJAAQgJAAgIAJg");
	this.shape_6.setTransform(210.9,60.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AghApQgJgIABgLQAAgHACgGQADgGAGgDQAFgBAGgCIAOgDQASgCAJgDIAAgEQgBgKgEgEQgGgFgLAAQgKAAgFAEQgGAEgCAKIgQgCQADgKAEgGQAFgHAJgDQAJgDALAAQAMAAAHADQAHACADAFQAEAEACAGIABAPIAAATQAAAWABAGQABAGACAFIgQAAQgCgFgBgGQgJAHgIADQgGADgKAAQgPAAgIgHgAgCAFQgKACgEACQgEABgCAEQgCADAAAEQgBAHAFAEQAFAEAJAAQAIAAAGgEQAIgEADgHQACgFABgLIAAgFQgJADgPACg");
	this.shape_7.setTransform(200.7,62.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgBA9QgFgDgCgEQgBgFAAgOIAAg0IgMAAIAAgNIAMAAIAAgWIANgKIAAAgIAQAAIAAANIgQAAIAAA1QAAAGABACQAAAAABABQAAAAAAABQAAAAABABQAAAAABAAIAFABIAHAAIACAOIgMABQgIAAgDgCg");
	this.shape_8.setTransform(193.3,60.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgYA9QgMgFgHgKQgGgLgBgNIAQgBQACAKAEAGQAEAHAJADQAIAEAJAAQAKAAAIgDQAHgDAEgFQADgFAAgGQAAgGgDgEQgEgFgIgDIgVgHQgRgDgHgDQgKgFgEgGQgFgIAAgJQAAgJAGgJQAFgJALgDQALgFAMAAQANAAALAFQALAEAGAJQAGAJAAALIgQACQgCgNgHgGQgIgGgOAAQgOAAgHAFQgHAGAAAIQAAAIAFADQAFAFASAFQAVAEAIAEQALADAGAJQAFAHAAALQAAAKgGAJQgGAJgLAFQgLAFgOAAQgPAAgMgFg");
	this.shape_9.setTransform(184.6,60.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AghA/IgCgPIAJACQAFAAAEgCQADgCACgDIAFgMIABgEIgjhbIARAAIATA2IAFAUIAGgUIAUg2IAQAAIgjBdIgHAVQgEAIgGAEQgFADgIAAQgEAAgGgCg");
	this.shape_10.setTransform(169.3,64);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AghApQgJgIAAgLQAAgHADgGQADgGAGgDQAFgBAGgCIAOgDQASgCAIgDIAAgEQABgKgFgEQgGgFgLAAQgKAAgGAEQgFAEgDAKIgPgCQACgKAFgGQAFgHAJgDQAJgDAKAAQAMAAAIADQAHACADAFQAFAEAAAGIABAPIAAATQAAAWABAGQABAGAEAFIgRAAQgDgFAAgGQgJAHgIADQgHADgIAAQgQAAgIgHgAgDAFQgJACgEACQgEABgDAEQgCADABAEQAAAHAEAEQAFAEAJAAQAHAAAIgEQAGgEAEgHQACgFAAgLIAAgFQgIADgQACg");
	this.shape_11.setTransform(159.7,62.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AASAuIgPg2IgDgQIgSBGIgQAAIgdhbIARAAIAOA0IAGAUIAFgTIAPg1IAOAAIAOA0IAFASIAFgSIAQg0IAPAAIgdBbg");
	this.shape_12.setTransform(148.2,62.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AghApQgJgIABgLQAAgHADgGQADgGAFgDQAFgBAGgCIAOgDQASgCAJgDIAAgEQgBgKgEgEQgGgFgLAAQgKAAgGAEQgFAEgCAKIgQgCQADgKAEgGQAFgHAJgDQAJgDALAAQALAAAIADQAHACAEAFQADAEABAGIACAPIAAATQAAAWABAGQABAGACAFIgQAAQgDgFAAgGQgJAHgIADQgGADgKAAQgPAAgIgHgAgCAFQgKACgEACQgEABgCAEQgCADgBAEQAAAHAFAEQAFAEAJAAQAIAAAGgEQAIgEADgHQACgFABgLIAAgFQgJADgPACg");
	this.shape_13.setTransform(136.7,62.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AAWAvIAAg3QAAgJgCgFQgCgFgFgDQgEgCgHAAQgIAAgHAGQgIAGAAASIAAAxIgPAAIAAhbIAOAAIAAANQAKgPASAAQAIAAAHADQAHADAEAFQADAFACAGIAAAQIAAA3g");
	this.shape_14.setTransform(126.7,62);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgUAsQgHgDgDgFQgEgFgBgGIgBgPIAAg4IAQAAIAAAyQAAAMABAEQABAHAFADQAFAEAHAAQAFAAAGgEQAGgEADgGQADgGAAgMIAAgwIAPAAIAABbIgOAAIAAgNQgLAPgQAAQgJAAgHgDg");
	this.shape_15.setTransform(116.6,62.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AAjBAIgRgbIgMgRIgHgJIgIgEIgJAAIgUAAIAAA5IgRAAIAAh/IA3AAQARAAAJAEQAJADAGAJQAFAJAAAKQAAAOgJAKQgJAHgSACQAGADAEAEQAHAHAHAKIAWAjgAgmgGIAlAAQAJAAAHgDQAGgCAEgFQADgFAAgHQAAgJgGgFQgHgHgOAAIgnAAg");
	this.shape_16.setTransform(105.8,60.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AghApQgJgIAAgLQAAgHAEgGQADgGAFgDQAFgBAGgCIAOgDQASgCAIgDIAAgEQABgKgFgEQgGgFgLAAQgKAAgGAEQgFAEgDAKIgPgCQACgKAFgGQAFgHAJgDQAJgDAKAAQAMAAAIADQAHACAEAFQADAEABAGIABAPIAAATQAAAWABAGQACAGADAFIgRAAQgDgFAAgGQgJAHgIADQgHADgIAAQgQAAgIgHgAgCAFQgKACgEACQgEABgDAEQgCADAAAEQABAHAEAEQAFAEAJAAQAHAAAHgEQAHgEAEgHQACgFAAgLIAAgFQgIADgPACg");
	this.shape_17.setTransform(88.7,62.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgdAkQgMgNAAgXQAAgVAMgNQAMgNARAAQATAAAMANQALAMAAAWIAAAEIhDAAQABAPAHAIQAJAIAJAAQAJAAAGgEQAGgFAEgKIAQACQgEAPgKAHQgLAIgQAAQgTAAgLgMgAgQgbQgIAHAAANIAyAAQgBgMgFgGQgHgJgNAAQgIAAgIAHg");
	this.shape_18.setTransform(73.7,62.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgoAuIAAgNIA6hCIgSABIgkAAIAAgNIBKAAIAAAKIgwA6IgKAKIAUAAIApAAIAAANg");
	this.shape_19.setTransform(64.2,62.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgHBAIAAhcIAOAAIAABcgAgHgtIAAgSIAOAAIAAASg");
	this.shape_20.setTransform(57.7,60.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AAWAvIAAg3QAAgJgCgFQgCgFgFgDQgEgCgHAAQgIAAgHAGQgIAGAAASIAAAxIgPAAIAAhbIAOAAIAAANQAKgPASAAQAIAAAHADQAHADAEAFQADAFACAGIAAAQIAAA3g");
	this.shape_21.setTransform(50.7,62);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgaA7QgLgIABgPIAPACQABAHAEAEQAGAEAKAAQAKAAAGgEQAFgFADgIQABgEAAgQQgLAMgOAAQgTAAgKgOQgLgOAAgRQAAgNAFgMQAFgLAJgGQAKgGALAAQAQAAAKANIAAgLIAOAAIAABPQABAVgFAKQgEAJgKAFQgKAFgMAAQgQAAgKgHgAgQgrQgHAIgBARQABASAHAHQAHAIAJAAQALAAAHgIQAIgHAAgSQAAgRgIgIQgHgJgLAAQgIAAgIAJg");
	this.shape_22.setTransform(40.4,63.9);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgeAkQgMgNAAgXQAAgYAOgNQAMgKAQAAQATAAAMAMQAMANAAAWQAAAQgFALQgGAKgKAGQgKAFgMAAQgSAAgMgMgAgSgZQgIAJAAAQQAAASAIAIQAIAJAKAAQALAAAIgJQAIgJAAgRQAAgQgIgJQgIgJgLAAQgKAAgIAJg");
	this.shape_23.setTransform(30.7,62.1);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgcAkQgLgNAAgXQAAgNAFgMQAFgLAKgFQAKgGAKAAQAQAAAJAIQAKAHADAOIgQADQgCgKgGgEQgFgFgIAAQgKAAgHAIQgIAJAAARQAAASAHAJQAHAIAKAAQAJAAAHgFQAGgGACgMIAPACQgCAQgLAJQgKAJgQAAQgRAAgMgMg");
	this.shape_24.setTransform(21.5,62.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgdAkQgMgNAAgXQAAgVAMgNQAMgNARAAQATAAAMANQALAMAAAWIAAAEIhDAAQABAPAHAIQAIAIAKAAQAJAAAGgEQAGgFAEgKIAQACQgEAPgKAHQgLAIgQAAQgSAAgMgMgAgQgbQgIAHAAANIAyAAQgBgMgFgGQgIgJgLAAQgJAAgIAHg");
	this.shape_25.setTransform(11.7,62.1);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AAjBAIgRgbIgMgRIgHgJIgIgEIgJAAIgUAAIAAA5IgRAAIAAh/IA3AAQARAAAJAEQAJADAGAJQAFAJAAAKQAAAOgJAKQgJAHgSACQAGADAEAEQAHAHAHAKIAWAjgAgmgGIAlAAQAJAAAHgDQAGgCAEgFQADgFAAgHQAAgJgGgFQgHgHgOAAIgnAAg");
	this.shape_26.setTransform(0.8,60.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.6,48.5,587.7,24.1);


(lib.introbackground_Generic = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// bar
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#263746").s().p("EhOHAGqIAAtUMCcPAAAIAALgIAAB0g");
	this.shape.setTransform(0,-204.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EhOHAq+MAAAhV7MCcPAAAMAAABV7g");

	// cockpit
	this.instance = new lib.cockpitimg("synched",0);
	this.instance.setTransform(275.3,21.1);
	this.instance.alpha = 0.078;

	this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Blue BG
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBEBEB").s().p("EhOHAq+MAACg0UIgCAAMAAAghnMCcPAAAMAAABV7g");

	this.shape_1.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-500,-275,1000,550);


// stage content:
(lib.rs01intro = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{s1:0});

	// timeline functions:
	this.frame_0 = function() {
		/*   Normal Template  v1.0 (Jun 2015)
			 Designed for DreamSky Player v4.1+ or Aurora Html5 Player v1.0+
		 	 All rights reserved.
		*/
		
		var normalData = new Object();
		
		// Timeline variables and Functions
		this.outputData = "";
		this.saveTemplateData  = function (){
		
			parent.pageControllerAPI.setPrivateData(this.outputData);
			
		}
		
		this.init  = function(param)
		{
			this.outputData = param;
		}
		
		this.start = function (param) {
			normalData = param;	
			parent.pageControllerAPI.templateReady();
		}
	}
	this.frame_117 = function() {
		this.stop();
		parent.pageControllerAPI.completeVision();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(117).call(this.frame_117).wait(1));

	// prot
	this.prot = new lib.prot();
	this.prot.setTransform(500,275,1,1,0,0,0,500,275);

	this.timeline.addTween(cjs.Tween.get(this.prot).wait(118));

	// t2
	this.instance = new lib.point2_indent("synched",0);
	this.instance.setTransform(160.2,190.6,1,1,0,0,0,97,12.1);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(76).to({_off:false},0).to({alpha:1},5).wait(37));

	// t1
	this.instance_1 = new lib.point1("synched",0);
	this.instance_1.setTransform(246.8,152.6,1,1,0,0,0,133.6,12.1);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(42).to({_off:false},0).to({alpha:1},5).wait(71));

	// title
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B3E5F9").s().p("AgcAtQgLgIgDgRIASgCQABAKAHAGQAHAFAKAAQAMAAAGgFQAFgFAAgGQAAgGgFgEQgDgCgPgEQgRgFgHgCQgIgDgEgGQgEgGAAgIQAAgHAEgGQADgGAFgEQAEgDAHgCQAHgCAJAAQAKAAAJAEQAJADAFAGQAEAGACAKIgSADQgBgIgFgFQgGgEgJAAQgLAAgFAEQgGAEAAAFQAAADACADQADADAEACIAOAEQASAFAIAEQAHABAEAGQAFAGAAAJQAAAJgGAHQgFAIgJAEQgKAFgMAAQgSAAgLgJg");
	this.shape.setTransform(270.8,89.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B3E5F9").s().p("AgsBIIAAiNIARAAIAAAOQAGgIAGgEQAIgEAIAAQANAAAKAHQALAGAEANQAGAMgBAPQAAAQgFALQgGANgKAGQgLAHgMAAQgIAAgGgEQgHgDgEgGIAAAygAgSgvQgKAKABAUQgBATAJAJQAIAKALAAQAKAAAIgKQAJgKAAgTQAAgUgJgKQgHgKgLAAQgKAAgIALg");
	this.shape_1.setTransform(260.6,91.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#B3E5F9").s().p("AghAoQgNgOAAgaQAAgYANgOQAOgPATAAQAVAAANAOQANAPAAAYIAAAEIhLAAQABARAIAJQAJAJALAAQAKAAAHgFQAGgFAEgLIATACQgFAQgLAJQgMAJgSAAQgVAAgNgOgAgSgeQgIAIgBANIA4AAQgCgNgFgGQgIgKgOAAQgKAAgIAIg");
	this.shape_2.setTransform(249.2,89.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#B3E5F9").s().p("AgBBDQgGgDgCgFQgCgFAAgQIAAg5IgNAAIAAgOIANAAIAAgaIAQgKIAAAkIARAAIAAAOIgRAAIAAA6IABAKQAAABAAAAQAAABABAAQAAAAABABQAAAAABAAQACACAEAAIAHgBIADAQIgNABQgKAAgDgDg");
	this.shape_3.setTransform(241,87.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#B3E5F9").s().p("AgbBEQgNgGgIgLQgHgLgBgPIASgBQACAKAFAHQAEAHAJAEQAKAEALABQALAAAIgEQAIgDAEgGQAEgFAAgHQAAgGgEgFQgDgGgJgDQgGgCgSgFQgUgFgIgCQgKgFgFgJQgFgHAAgKQAAgLAGgKQAGgJAMgEQAMgGAOAAQAPAAAMAGQALAEAHAKQAHAKAAANIgSACQgCgOgIgHQgJgHgPAAQgQAAgIAHQgIAGAAAIQAAAIAGAGQAFAEAWAGQAWAEAJAFQANAEAFAIQAHAJAAAMQgBALgGAKQgHAKgMAGQgMAGgQgBQgRABgNgGg");
	this.shape_4.setTransform(231.4,87.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#B3E5F9").s().p("AgHBHIAAiNIAPAAIAACNg");
	this.shape_5.setTransform(216.9,87.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#B3E5F9").s().p("AglAtQgJgIAAgNQAAgIADgGQAEgGAGgEQAFgCAHgCIAQgDQATgCAKgEIAAgEQAAgLgFgEQgGgGgNAAQgLAAgGAEQgGAEgDALIgRgCQACgLAGgHQAFgGAKgEQAKgEAMAAQANAAAIADQAJADAEAFQADAFACAHIABAQIAAAWQAAAYABAHQABAGADAGIgSAAQgDgFAAgIQgKAJgJADQgHAEgLAAQgRAAgJgJgAgDAGQgKABgFACQgEACgDAEQgCAEAAAEQAAAHAFAFQAFAFALAAQAIAAAIgFQAIgEADgIQADgGAAgLIAAgGQgJADgSADg");
	this.shape_6.setTransform(209.1,89.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#B3E5F9").s().p("AgeAoQgNgOAAgaQgBgPAGgNQAFgMAMgGQALgHAMAAQARAAAKAJQALAIADAQIgRADQgCgLgGgFQgHgFgIAAQgMAAgJAJQgHAKAAATQAAAUAHAKQAJAJALAAQAKAAAHgGQAHgHACgNIARADQgDARgMALQgLAKgRAAQgUAAgMgOg");
	this.shape_7.setTransform(199,89.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#B3E5F9").s().p("AgHBHIAAhlIAPAAIAABlgAgHgyIAAgUIAPAAIAAAUg");
	this.shape_8.setTransform(191.4,87.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#B3E5F9").s().p("AgBBDQgGgDgCgFQgCgFAAgQIAAg5IgNAAIAAgOIANAAIAAgaIAQgKIAAAkIARAAIAAAOIgRAAIAAA6IABAKQAAABAAAAQAAABABAAQAAAAABABQAAAAABAAQACACAEAAIAHgBIADAQIgNABQgKAAgDgDg");
	this.shape_9.setTransform(186.5,87.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#B3E5F9").s().p("AgHBHIAAhlIAPAAIAABlgAgHgyIAAgUIAPAAIAAAUg");
	this.shape_10.setTransform(181.4,87.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#B3E5F9").s().p("AgbA1IAAhmIAQAAIAAAQQAGgMAFgDQADgDAHAAQAIAAAKAFIgGAQQgHgDgGAAQgGAAgDADQgEAEgCAFQgDAKAAALIAAA1g");
	this.shape_11.setTransform(176.7,89.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#B3E5F9").s().p("AggBAQgPgJgHgTQgIgRAAgTQAAgWAJgQQAIgRAQgJQAQgIARgBQAVAAAPALQAPAMAFATIgSAEQgFgPgKgHQgJgIgPABQgOgBgLAJQgLAHgFAOQgEANAAAOQAAAQAFAOQAFAOAMAHQALAGALAAQAQAAALgJQALgJAEgSIATAEQgGAYgQAMQgPAMgXAAQgVABgOgKg");
	this.shape_12.setTransform(165.4,87.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#B3E5F9").s().p("AgWBBQgKgHgGgMQgGgMAAgQQABgQAEgKQAFgNALgHQALgGAMAAQAHAAAIAEQAHAEAFAGIAAgzIARAAIAACNIgQAAIAAgNQgKAPgSAAQgMAAgKgHgAgSgKQgHAJgBATQAAAUAJAKQAIAKAKAAQALAAAJgKQAHgJABgUQAAgTgJgKQgIgKgMAAQgKAAgIAKg");
	this.shape_13.setTransform(146.7,87.6);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#B3E5F9").s().p("AAYA1IAAg9QAAgMgCgEQgCgGgFgDQgFgDgHAAQgKgBgIAIQgIAHAAAUIAAA3IgSAAIAAhmIAQAAIAAAPQAMgRATAAQAKAAAIADQAHADAEAFQAEAGACAIIABARIAAA+g");
	this.shape_14.setTransform(135.9,89.4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#B3E5F9").s().p("AglAtQgJgIAAgNQAAgIADgGQAEgGAGgEQAFgCAHgCIAQgDQATgCAKgEIAAgEQAAgLgFgEQgGgGgNAAQgLAAgGAEQgGAEgDALIgRgCQACgLAGgHQAFgGAKgEQAKgEAMAAQANAAAIADQAJADAEAFQADAFACAHIABAQIAAAWQAAAYABAHQABAGADAGIgSAAQgDgFAAgIQgKAJgJADQgHAEgLAAQgRAAgJgJgAgDAGQgKABgFACQgEACgDAEQgCAEAAAEQAAAHAFAFQAFAFALAAQAIAAAIgFQAIgEADgIQADgGAAgLIAAgGQgJADgSADg");
	this.shape_15.setTransform(124.7,89.5);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#B3E5F9").s().p("AAUAzIgRg8IgDgSIgUBOIgSAAIgghlIATAAIAQA5IAGAXIAGgWIAQg6IAQAAIAQA6IAFAUIAGgUIASg6IARAAIghBlg");
	this.shape_16.setTransform(106.4,89.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#B3E5F9").s().p("AghAoQgNgOAAgaQAAgYANgOQAOgPATAAQAVAAANAOQANAPAAAYIAAAEIhLAAQABARAIAJQAJAJALAAQAKAAAHgFQAGgFAEgLIATACQgFAQgLAJQgMAJgSAAQgVAAgNgOgAgSgeQgIAIgBANIA4AAQgCgNgFgGQgIgKgOAAQgKAAgIAIg");
	this.shape_17.setTransform(93.7,89.5);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#B3E5F9").s().p("AgHBHIAAhlIAPAAIAABlgAgHgyIAAgUIAPAAIAAAUg");
	this.shape_18.setTransform(85.9,87.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#B3E5F9").s().p("AgGAzIgohlIASAAIAXA8IAFAVIAGgUIAXg9IASAAIgnBlg");
	this.shape_19.setTransform(78.7,89.5);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#B3E5F9").s().p("AgbA1IAAhmIAQAAIAAAQQAGgMAFgDQADgDAHAAQAIAAAKAFIgGAQQgHgDgGAAQgGAAgDADQgEAEgCAFQgDAKAAALIAAA1g");
	this.shape_20.setTransform(71.2,89.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#B3E5F9").s().p("AghAoQgNgOAAgaQAAgYANgOQAOgPATAAQAVAAANAOQANAPAAAYIAAAEIhLAAQABARAIAJQAJAJALAAQAKAAAHgFQAGgFAEgLIATACQgFAQgLAJQgMAJgSAAQgVAAgNgOgAgSgeQgIAIgBANIA4AAQgCgNgFgGQgIgKgOAAQgKAAgIAIg");
	this.shape_21.setTransform(61.5,89.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#B3E5F9").s().p("AgHAzIgnhlIATAAIAWA8IAFAVIAGgUIAXg9IASAAIgnBlg");
	this.shape_22.setTransform(51,89.5);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#B3E5F9").s().p("AgjA/QgQgJgHgRQgJgRAAgTQAAghATgVQATgTAdgBQAUABAPAJQARAJAIARQAIARAAAUQAAAVgJASQgIARgRAIQgPAJgTAAQgSAAgRgKgAgggrQgPAOgBAeQABAaAOAPQAOAPATAAQAVAAAOgPQAOgPAAgbQAAgQgHgNQgFgNgMgHQgLgHgOAAQgTgBgNAOg");
	this.shape_23.setTransform(38.2,87.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AA3BkIgbgqIgTgcQgIgJgEgEQgGgEgGgBIgOgBIgfAAIAABZIgbAAIAAjHIBXAAQAbAAAOAGQAOAFAIAOQAIANAAARQAAAVgNAPQgOANgdAEQALAFAFAFQAMAKAKAQIAjA3gAg8gKIA5AAQAQAAAKgEQAKgEAGgIQAFgIAAgKQAAgOgKgJQgKgKgXAAIg9AAg");
	this.shape_24.setTransform(325.7,56.9);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AhJBkIAAjHICPAAIAAAYIh1AAIAAA9IBtAAIAAAWIhtAAIAABEIB5AAIAAAYg");
	this.shape_25.setTransform(305.6,56.9);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AhOBkIAAgZIBlh+QALgOAKgKIhuAAIAAgYICOAAIAAAYIhvCJIgMAOIB+AAIAAAYg");
	this.shape_26.setTransform(287.4,56.9);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgMBkIAAjHIAZAAIAADHg");
	this.shape_27.setTransform(275,56.9);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("Ag9BkIAAjHIAbAAIAACvIBgAAIAAAYg");
	this.shape_28.setTransform(263.9,56.9);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgMBkIAAjHIAZAAIAADHg");
	this.shape_29.setTransform(251.7,56.9);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AhKBkIAAjHIBKAAQAWAAAOAGQAOAGAIANQAHANAAAOQAAAMgHAMQgHALgOAHQATAFAJALQAKANAAASQAAAOgGAMQgGAMgJAGQgIAHgNADQgOAEgTAAgAgwBMIAwAAIASgBQAJgBAHgEQAGgEAEgHQAEgIAAgJQAAgMgGgIQgGgIgKgDQgKgEgRAAIgvAAgAgwgOIAsAAQAPAAAIgDQAKgDAFgHQAFgHAAgKQAAgKgEgIQgFgHgJgDQgJgDgUAAIgoAAg");
	this.shape_30.setTransform(238.7,56.9);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AA/BkIgXg9IhSAAIgWA9IgcAAIBNjHIAaAAIBSDHgAgMgnIgWA4IBCAAIgVg1IgNgqQgDAUgHATg");
	this.shape_31.setTransform(219.7,56.9);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgMBkIAAivIhCAAIAAgYICdAAIAAAYIhCAAIAACvg");
	this.shape_32.setTransform(204,56.9);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgmBfQgTgIgKgQQgLgQAAgUIAZgCQACAPAGAKQAHAJANAHQAOAFAPAAQAPAAAMgEQALgFAGgHQAGgIAAgKQAAgJgGgHQgFgHgNgFQgIgDgZgHQgcgGgLgEQgOgIgHgLQgIgLAAgOQAAgPAJgNQAJgNAQgHQARgHAUAAQAUAAARAHQARAHAKAOQAJAOAAASIgZACQgCgTgMgKQgMgKgWAAQgXAAgLAJQgLAJAAAMQAAALAIAHQAIAHAeAHQAgAIAMAFQASAGAIANQAIAMAAAQQAAAQgJAOQgJAOgRAIQgRAIgWAAQgZAAgSgIg");
	this.shape_33.setTransform(185.9,56.9);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgNBkIAAhVIhNhyIAgAAIAnA9IATAiQAJgQANgUIAmg7IAfAAIhQByIAABVg");
	this.shape_34.setTransform(159.9,56.9);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AA/BkIgXg9IhSAAIgWA9IgcAAIBNjHIAaAAIBSDHgAgMgnIgWA4IBCAAIgVg1IgNgqQgDAUgHATg");
	this.shape_35.setTransform(143.4,56.9);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AAwBkIgqiXIgGgXIgFAXIgqCXIgbAAIg1jHIAbAAIAeCCIAJApIAJglIAmiGIAeAAIAdBkQALAmAEAhIAKgsIAgh/IAaAAIg3DHg");
	this.shape_36.setTransform(121.9,56.9);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AA/BkIgXg9IhSAAIgWA9IgcAAIBNjHIAaAAIBSDHgAgMgnIgWA4IBCAAIgVg1IgNgqQgDAUgHATg");
	this.shape_37.setTransform(100.3,56.9);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAzBkIhnicIAACcIgZAAIAAjHIAbAAIBnCcIAAicIAZAAIAADHg");
	this.shape_38.setTransform(80.8,56.9);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgsBcQgSgKgIgSQgHgTAAgfIAAhzIAaAAIAAByQAAAaAFANQAFAMAMAHQAMAGARAAQAbAAAMgNQANgNAAgmIAAhyIAaAAIAABzQAAAdgGASQgHASgSAMQgSAKgdABQgagBgSgJg");
	this.shape_39.setTransform(60.7,57.1);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AA3BkIgbgqIgTgcQgIgJgEgEQgGgEgGgBIgOgBIgfAAIAABZIgbAAIAAjHIBXAAQAbAAAOAGQAOAFAIAOQAIANAAARQAAAVgNAPQgOANgdAEQALAFAFAFQAMAKAKAQIAjA3gAg8gKIA5AAQAQAAAKgEQAKgEAGgIQAFgIAAgKQAAgOgKgJQgKgKgXAAIg9AAg");
	this.shape_40.setTransform(41.4,56.9);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgIAuIAAgSIAQAAIAAASgAgIgbIAAgSIAQAAIAAASg");
	this.shape_41.setTransform(431,149.2);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgeAkQgMgNAAgXQAAgYAOgNQAMgKAQAAQATAAAMAMQAMANAAAWQAAAQgFALQgGAKgKAGQgKAFgMAAQgSAAgMgMgAgSgZQgIAJAAAQQAAASAIAIQAIAJAKAAQALAAAIgJQAIgJAAgRQAAgQgIgJQgIgJgLAAQgKAAgIAJg");
	this.shape_42.setTransform(423.4,149.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgBA8QgFgCgCgEQgBgFAAgPIAAgzIgMAAIAAgNIAMAAIAAgWIANgKIAAAgIAQAAIAAANIgQAAIAAA1QAAAGABACQAAAAABABQAAAAAAABQAAAAABABQAAAAABABIAFABIAHgBIACAOIgMABQgIAAgDgDg");
	this.shape_43.setTransform(416,147.7);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgeAkQgMgNABgXQgBgVAMgNQANgNARAAQATAAAMANQAMAMgBAWIAAAEIhDAAQABAPAIAIQAHAIAKAAQAJAAAGgEQAGgFAEgKIAQACQgEAPgKAHQgKAIgRAAQgSAAgNgMgAgQgbQgHAHgBANIAyAAQgBgMgFgGQgHgJgMAAQgJAAgIAHg");
	this.shape_44.setTransform(403.4,149.2);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_45.setTransform(396.4,147.5);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgYAzIAAAMIgPAAIAAh/IAQAAIAAAuQAKgMANAAQAJAAAIADQAHADAFAHQAFAGADAJQADAHAAAKQAAAYgMANQgMANgQAAQgPAAgJgOgAgRgJQgHAJAAAPQAAARAEAIQAIAMAMAAQAJAAAHgJQAIgJAAgSQAAgQgHgJQgIgIgJgBQgJABgIAIg");
	this.shape_46.setTransform(389.6,147.6);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AghApQgJgIAAgLQAAgHAEgGQADgGAFgDQAFgBAGgCIAOgDQASgCAIgDIAAgEQABgKgFgEQgGgFgLAAQgKAAgGAEQgFAEgDAKIgPgCQACgKAFgGQAFgHAJgDQAJgDAKAAQAMAAAIADQAHACAEAFQAEAEAAAGIABAPIAAATQAAAWABAGQACAGADAFIgRAAQgDgFAAgGQgJAHgIADQgHADgIAAQgQAAgIgHgAgCAFQgKACgEACQgEABgDAEQgCADAAAEQABAHAEAEQAFAEAJAAQAHAAAHgEQAHgEAEgHQACgFAAgLIAAgFQgIADgPACg");
	this.shape_47.setTransform(379.4,149.2);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AgdAkQgMgNAAgXQAAgVAMgNQAMgNARAAQATAAAMANQALAMAAAWIAAAEIhDAAQABAPAHAIQAJAIAJAAQAJAAAGgEQAGgFAEgKIAQACQgEAPgKAHQgLAIgQAAQgTAAgLgMgAgQgbQgIAHAAANIAyAAQgBgMgFgGQgHgJgNAAQgJAAgHAHg");
	this.shape_48.setTransform(364.4,149.2);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AgYAzIAAAMIgPAAIAAh/IAQAAIAAAuQAKgMANAAQAJAAAIADQAHADAFAHQAFAGADAJQADAHAAAKQAAAYgMANQgMANgQAAQgPAAgJgOgAgRgJQgHAJAAAPQAAARAEAIQAIAMAMAAQAJAAAHgJQAIgJAAgSQAAgQgHgJQgIgIgJgBQgJABgIAIg");
	this.shape_49.setTransform(354.6,147.6);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_50.setTransform(342.4,147.5);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AgGBAIAAh/IANAAIAAB/g");
	this.shape_51.setTransform(338.4,147.5);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AgGBAIAAhcIANAAIAABcgAgGgtIAAgSIANAAIAAASg");
	this.shape_52.setTransform(334.4,147.5);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AASAuIgPg2IgDgQIgSBGIgQAAIgdhbIARAAIAPA0IAGAUIAEgTIAPg1IAOAAIAOA0IAFASIAFgSIAQg0IAQAAIgeBbg");
	this.shape_53.setTransform(325.9,149.2);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgUAsQgHgDgDgFQgEgFgBgGIgBgPIAAg4IAQAAIAAAyQAAAMABAEQABAHAFADQAFAEAHAAQAFAAAGgEQAGgEADgGQADgGAAgMIAAgwIAPAAIAABbIgOAAIAAgNQgLAPgQAAQgJAAgHgDg");
	this.shape_54.setTransform(309.3,149.3);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AgeAkQgMgNAAgXQAAgYAOgNQAMgKAQAAQATAAAMAMQAMANAAAWQAAAQgFALQgGAKgKAGQgKAFgMAAQgSAAgMgMgAgSgZQgIAJAAAQQAAASAIAIQAIAJAKAAQALAAAIgJQAIgJAAgRQAAgQgIgJQgIgJgLAAQgKAAgIAJg");
	this.shape_55.setTransform(299.4,149.2);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AghA/IgCgPIAJACQAFAAAEgCQADgCACgDIAFgMIABgEIgjhbIARAAIATA2IAFAUIAGgUIAUg2IAQAAIgjBdIgHAVQgEAIgGAEQgFADgIAAQgEAAgGgCg");
	this.shape_56.setTransform(290,151.1);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgIAOQAFgCACgEQABgEAAgGIgHAAIAAgSIAQAAIAAASQAAAIgDAGQgEAGgFADg");
	this.shape_57.setTransform(277.9,154.3);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AAWAvIAAg3QAAgJgCgFQgCgFgFgDQgEgCgHAAQgIAAgHAGQgIAGAAASIAAAxIgPAAIAAhbIAOAAIAAANQAKgPASAAQAIAAAHADQAHADAEAFQADAFACAGIAAAQIAAA3g");
	this.shape_58.setTransform(270.4,149.1);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgeAkQgMgNAAgXQAAgYAOgNQAMgKAQAAQATAAAMAMQAMANAAAWQAAAQgFALQgGAKgKAGQgKAFgMAAQgSAAgMgMgAgSgZQgIAJAAAQQAAASAIAIQAIAJAKAAQALAAAIgJQAIgJAAgRQAAgQgIgJQgIgJgLAAQgKAAgIAJg");
	this.shape_59.setTransform(260.4,149.2);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AgZApQgKgIgCgPIAPgCQACAJAGAFQAGAFAJAAQALAAAFgEQAFgFAAgGQAAgFgFgDQgDgCgNgDQgPgFgHgCQgHgCgDgGQgEgFAAgHQAAgHADgFQADgFAFgEQAEgCAGgCQAGgCAIAAQAJAAAIADQAIADAEAGQAEAFACAJIgQACQgBgHgFgEQgFgEgIAAQgKAAgFADQgEAEAAAFQAAADACACQACADAEACIAMAEIAXAHQAHABAEAFQADAGAAAIQAAAIgEAHQgFAHgJAEQgIADgLAAQgRAAgJgHg");
	this.shape_60.setTransform(250.8,149.2);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AgZApQgKgIgCgPIAPgCQACAJAGAFQAGAFAJAAQALAAAFgEQAFgFAAgGQAAgFgFgDQgDgCgNgDQgPgFgHgCQgHgCgDgGQgEgFAAgHQAAgHADgFQADgFAFgEQAEgCAGgCQAGgCAIAAQAJAAAIADQAIADAEAGQAEAFACAJIgQACQgBgHgFgEQgFgEgIAAQgKAAgFADQgEAEAAAFQAAADACACQACADAEACIAMAEIAXAHQAHABAEAFQADAGAAAIQAAAIgEAHQgFAHgJAEQgIADgLAAQgRAAgJgHg");
	this.shape_61.setTransform(241.8,149.2);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AgeAkQgMgNABgXQgBgVAMgNQANgNARAAQATAAAMANQAMAMgBAWIAAAEIhDAAQABAPAIAIQAHAIAKAAQAJAAAGgEQAGgFAEgKIAQACQgEAPgKAHQgKAIgRAAQgSAAgNgMgAgQgbQgHAHgBANIAyAAQgBgMgFgGQgHgJgMAAQgJAAgIAHg");
	this.shape_62.setTransform(232.4,149.2);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AgGBAIAAh/IAOAAIAAB/g");
	this.shape_63.setTransform(225.4,147.5);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AgZApQgKgIgCgPIAPgCQACAJAGAFQAGAFAJAAQALAAAFgEQAFgFAAgGQAAgFgFgDQgDgCgNgDQgPgFgHgCQgHgCgDgGQgEgFAAgHQAAgHADgFQADgFAFgEQAEgCAGgCQAGgCAIAAQAJAAAIADQAIADAEAGQAEAFACAJIgQACQgBgHgFgEQgFgEgIAAQgKAAgFADQgEAEAAAFQAAADACACQACADAEACIAMAEIAXAHQAHABAEAFQADAGAAAIQAAAIgEAHQgFAHgJAEQgIADgLAAQgRAAgJgHg");
	this.shape_64.setTransform(213.8,149.2);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AgGBAIAAhcIANAAIAABcgAgGgtIAAgSIANAAIAAASg");
	this.shape_65.setTransform(207.4,147.5);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AAVBAIAAg7QAAgKgEgFQgGgGgJAAQgFAAgHAEQgGAEgCAGQgDAEAAALIAAAzIgQAAIAAh/IAQAAIAAAuQAMgNAOABQALAAAHADQAIAFADAHQADAHABAMIAAA7g");
	this.shape_66.setTransform(200.4,147.5);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgBA8QgFgCgCgEQgBgFAAgPIAAgzIgMAAIAAgNIAMAAIAAgWIANgKIAAAgIAQAAIAAANIgQAAIAAA1QAAAGABACQAAAAABABQAAAAAAABQAAAAABABQAAAAABABIAFABIAHgBIACAOIgMABQgIAAgDgDg");
	this.shape_67.setTransform(193,147.7);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AgMBBIAAhPIgOAAIAAgNIAOAAIAAgJQAAgKACgEQACgGAGgEQADgEALAAIAPABIgDAPIgJgBQgHAAgDADQgDACAAAJIAAAIIASAAIAAANIgSAAIAABPg");
	this.shape_68.setTransform(183.3,147.4);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AgeAkQgMgNAAgXQAAgYAOgNQAMgKAQAAQATAAAMAMQAMANAAAWQAAAQgFALQgGAKgKAGQgKAFgMAAQgSAAgMgMgAgSgZQgIAJAAAQQAAASAIAIQAIAJAKAAQALAAAIgJQAIgJAAgRQAAgQgIgJQgIgJgLAAQgKAAgIAJg");
	this.shape_69.setTransform(175.4,149.2);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AAWAvIAAg3QAAgJgCgFQgCgFgFgDQgEgCgHAAQgIAAgHAGQgIAGAAASIAAAxIgPAAIAAhbIAOAAIAAANQAKgPASAAQAIAAAHADQAHADAEAFQADAFACAGIAAAQIAAA3g");
	this.shape_70.setTransform(160.4,149.1);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AgeAkQgMgNAAgXQAAgYAOgNQAMgKAQAAQATAAAMAMQAMANAAAWQAAAQgFALQgGAKgKAGQgKAFgMAAQgSAAgMgMgAgSgZQgIAJAAAQQAAASAIAIQAIAJAKAAQALAAAIgJQAIgJAAgRQAAgQgIgJQgIgJgLAAQgKAAgIAJg");
	this.shape_71.setTransform(150.4,149.2);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AgHBAIAAhcIAOAAIAABcgAgHgtIAAgSIAOAAIAAASg");
	this.shape_72.setTransform(143.4,147.5);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AgBA8QgFgCgCgEQgBgFAAgPIAAgzIgMAAIAAgNIAMAAIAAgWIANgKIAAAgIAQAAIAAANIgQAAIAAA1QAAAGABACQAAAAABABQAAAAAAABQAAAAABABQAAAAABABIAFABIAHgBIACAOIgMABQgIAAgDgDg");
	this.shape_73.setTransform(139,147.7);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AgdAkQgMgNAAgXQAAgVAMgNQAMgNARAAQATAAAMANQALAMAAAWIAAAEIhDAAQABAPAHAIQAIAIAKAAQAJAAAGgEQAGgFAEgKIAQACQgEAPgKAHQgLAIgQAAQgSAAgMgMgAgQgbQgIAHAAANIAyAAQgBgMgFgGQgIgJgLAAQgJAAgIAHg");
	this.shape_74.setTransform(131.4,149.2);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AgGBAIAAh/IAOAAIAAB/g");
	this.shape_75.setTransform(124.4,147.5);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AgnBBIAAh/IAOAAIAAAMQAGgHAGgEQAGgDAHAAQAMAAAKAGQAIAGAFALQAFAMAAANQAAAOgFAKQgGALgJAGQgKAGgKAAQgGAAgHgDQgGgDgFgFIAAAtgAgRgqQgIAJAAASQAAAQAHAJQAIAIAKAAQAJAAAHgJQAIgIAAgRQAAgSgIgJQgHgJgJAAQgKAAgHAKg");
	this.shape_76.setTransform(117.7,150.9);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AAvAvIAAg5QAAgJgCgEQgBgEgEgDQgEgCgGAAQgKAAgGAGQgHAHAAAOIAAA0IgNAAIAAg6QAAgLgEgFQgEgFgJAAQgHAAgFADQgGAEgDAGQgCAHAAAMIAAAvIgQAAIAAhbIAOAAIAAANQAFgHAHgEQAHgEAKAAQAKAAAHAEQAEAEADAIQALgQASAAQAOAAAHAIQAIAHAAAQIAAA+g");
	this.shape_77.setTransform(104.9,149.1);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AgeAkQgMgNAAgXQAAgYAOgNQAMgKAQAAQATAAAMAMQAMANAAAWQAAAQgFALQgGAKgKAGQgKAFgMAAQgSAAgMgMgAgSgZQgIAJAAAQQAAASAIAIQAIAJAKAAQALAAAIgJQAIgJAAgRQAAgQgIgJQgIgJgLAAQgKAAgIAJg");
	this.shape_78.setTransform(92.4,149.2);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AgcAkQgLgNAAgXQAAgNAFgMQAFgLAKgFQAKgGAKAAQAQAAAJAIQAKAHADAOIgQADQgCgKgGgEQgFgFgIAAQgKAAgHAIQgIAJAAARQAAASAHAJQAHAIAKAAQAJAAAHgFQAGgGACgMIAPACQgCAQgLAJQgKAJgQAAQgRAAgMgMg");
	this.shape_79.setTransform(83.2,149.2);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AAWAvIAAg3QAAgJgCgFQgCgFgFgDQgEgCgHAAQgIAAgHAGQgIAGAAASIAAAxIgPAAIAAhbIAOAAIAAANQAKgPASAAQAIAAAHADQAHADAEAFQADAFACAGIAAAQIAAA3g");
	this.shape_80.setTransform(68.4,149.1);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AgeAkQgMgNAAgXQAAgYAOgNQAMgKAQAAQATAAAMAMQAMANAAAWQAAAQgFALQgGAKgKAGQgKAFgMAAQgSAAgMgMgAgSgZQgIAJAAAQQAAASAIAIQAIAJAKAAQALAAAIgJQAIgJAAgRQAAgQgIgJQgIgJgLAAQgKAAgIAJg");
	this.shape_81.setTransform(58.4,149.2);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AgnBBIAAh/IAPAAIAAAMQAFgHAGgEQAGgDAIAAQALAAAJAGQAKAGAEALQAFAMAAANQAAAOgFAKQgFALgKAGQgKAGgKAAQgHAAgGgDQgGgDgEgFIAAAtgAgRgqQgIAJAAASQAAAQAHAJQAIAIAKAAQAJAAAHgJQAIgIgBgRQABgSgIgJQgHgJgJAAQgJAAgIAKg");
	this.shape_82.setTransform(48.7,150.9);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("AgcA7QgLgHgFgLQgFgMAAgVIAAhIIARAAIAABIQAAASADAHQADAIAIAFQAHAEALAAQARAAAIgJQAIgIAAgZIAAhIIARAAIAABIQAAAUgEAMQgFALgLAHQgLAHgTAAQgQAAgMgGg");
	this.shape_83.setTransform(36.9,147.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(118));

	// bg
	this.instance_2 = new lib.introbackground_Generic("synched",0);
	this.instance_2.setTransform(500,275);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(118));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(500,275,1000,550);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;