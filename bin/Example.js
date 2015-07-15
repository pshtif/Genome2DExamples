(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,__class__: EReg
};
var com_genome2d_proto_GPrototypeHelper = function() { };
com_genome2d_proto_GPrototypeHelper.__name__ = true;
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
};
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
_$List_ListIterator.__name__ = true;
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
Type.__name__ = true;
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
var Xml = function(nodeType) {
	this.nodeType = nodeType;
	this.children = [];
	this.attributeMap = new haxe_ds_StringMap();
};
Xml.__name__ = true;
Xml.parse = function(str) {
	return haxe_xml_Parser.parse(str);
};
Xml.createElement = function(name) {
	var xml = new Xml(Xml.Element);
	if(xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xml.nodeType);
	xml.nodeName = name;
	return xml;
};
Xml.createPCData = function(data) {
	var xml = new Xml(Xml.PCData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createCData = function(data) {
	var xml = new Xml(Xml.CData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createComment = function(data) {
	var xml = new Xml(Xml.Comment);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocType = function(data) {
	var xml = new Xml(Xml.DocType);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createProcessingInstruction = function(data) {
	var xml = new Xml(Xml.ProcessingInstruction);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocument = function() {
	return new Xml(Xml.Document);
};
Xml.prototype = {
	get_nodeValue: function() {
		if(this.nodeType == Xml.Document || this.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + this.nodeType);
		return this.nodeValue;
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.get(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		this.attributeMap.set(att,value);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.exists(att);
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.keys();
	}
	,elements: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var ret;
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			if(child.nodeType == Xml.Element) _g.push(child);
		}
		ret = _g;
		return HxOverrides.iter(ret);
	}
	,elementsNamed: function(name) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var ret;
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			if(child.nodeType == Xml.Element && (function($this) {
				var $r;
				if(child.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + child.nodeType);
				$r = child.nodeName;
				return $r;
			}(this)) == name) _g.push(child);
		}
		ret = _g;
		return HxOverrides.iter(ret);
	}
	,firstElement: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nodeType == Xml.Element) return child;
		}
		return null;
	}
	,addChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		if(x.parent == this) return; else if(x.parent != null) x.parent.removeChild(x);
		this.children.push(x);
		x.parent = this;
	}
	,removeChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		return HxOverrides.remove(this.children,x);
	}
	,__class__: Xml
	,__properties__: {get_nodeValue:"get_nodeValue"}
};
var com_genome2d_debug_IGDebuggableInternal = function() { };
com_genome2d_debug_IGDebuggableInternal.__name__ = true;
var com_genome2d_Genome2D = function() {
	this.g2d_renderMatrixIndex = 0;
	this.g2d_runTime = 0;
	this.g2d_currentFrameId = 0;
	this.autoUpdateAndRender = true;
	if(!com_genome2d_Genome2D.g2d_instantiable) com_genome2d_debug_GDebug.error("Can't instantiate singleton directly",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "Genome2D.hx", lineNumber : 200, className : "com.genome2d.Genome2D", methodName : "new"});
	com_genome2d_Genome2D.g2d_instance = this;
	this.g2d_onInitialized = new com_genome2d_callbacks_GCallback0();
	this.g2d_onFailed = new com_genome2d_callbacks_GCallback1();
	this.g2d_onInvalidated = new com_genome2d_callbacks_GCallback0();
	this.g2d_onUpdate = new com_genome2d_callbacks_GCallback1();
	this.g2d_onPreRender = new com_genome2d_callbacks_GCallback0();
	this.g2d_onPostRender = new com_genome2d_callbacks_GCallback0();
	this.g2d_onKeyboardInput = new com_genome2d_callbacks_GCallback1();
};
com_genome2d_Genome2D.__name__ = true;
com_genome2d_Genome2D.__interfaces__ = [com_genome2d_debug_IGDebuggableInternal];
com_genome2d_Genome2D.getInstance = function() {
	if(com_genome2d_Genome2D.g2d_instance == null) {
		com_genome2d_Genome2D.g2d_instantiable = true;
		new com_genome2d_Genome2D();
		com_genome2d_Genome2D.g2d_instantiable = false;
	}
	return com_genome2d_Genome2D.g2d_instance;
};
com_genome2d_Genome2D.prototype = {
	get_onInitialized: function() {
		return this.g2d_onInitialized;
	}
	,get_onFailed: function() {
		return this.g2d_onFailed;
	}
	,get_onInvalidated: function() {
		return this.g2d_onInvalidated;
	}
	,get_onUpdate: function() {
		return this.g2d_onUpdate;
	}
	,get_onPreRender: function() {
		return this.g2d_onPreRender;
	}
	,get_onPostRender: function() {
		return this.g2d_onPostRender;
	}
	,get_onKeyboardInput: function() {
		return this.g2d_onKeyboardInput;
	}
	,getCurrentFrameId: function() {
		return this.g2d_currentFrameId;
	}
	,getRunTime: function() {
		return this.g2d_runTime;
	}
	,getCurrentFrameDeltaTime: function() {
		return this.g2d_currentFrameDeltaTime;
	}
	,get_root: function() {
		return this.g2d_root;
	}
	,getContext: function() {
		return this.g2d_context;
	}
	,init: function(p_config) {
		if(this.g2d_root != null) this.g2d_root.dispose();
		this.g2d_root = com_genome2d_node_GNode.create("root");
		this.g2d_cameras = [];
		this.g2d_renderMatrix = new com_genome2d_geom_GMatrix();
		this.g2d_renderMatrixIndex = 0;
		this.g2d_renderMatrixArray = [];
		if(this.g2d_context != null) this.g2d_context.dispose();
		this.g2d_contextConfig = p_config;
		this.g2d_context = Type.createInstance(p_config.contextClass,[this.g2d_contextConfig]);
		this.g2d_context.onInitialized.add($bind(this,this.g2d_contextInitialized_handler));
		this.g2d_context.onFailed.add($bind(this,this.g2d_contextFailed_handler));
		this.g2d_context.onInvalidated.add($bind(this,this.g2d_contextInvalidated_handler));
		com_genome2d_proto_GPrototypeFactory.initializePrototypes();
		com_genome2d_assets_GAssetManager.init();
		com_genome2d_text_GFontManager.init();
		com_genome2d_textures_GTextureManager.init(this.g2d_context);
		com_genome2d_ui_skin_GUISkinManager.init();
		this.g2d_context.init();
	}
	,update: function(p_deltaTime) {
		this.g2d_currentFrameDeltaTime = p_deltaTime;
		this.g2d_onUpdate.dispatch(this.g2d_currentFrameDeltaTime);
	}
	,render: function(p_camera) {
		if(this.g2d_context.begin()) {
			this.g2d_onPreRender.dispatch();
			if(this.g2d_root.g2d_localUseMatrix > 0) {
				this.g2d_renderMatrix.identity();
				this.g2d_renderMatrixArray = [];
			}
			if(p_camera != null) p_camera.render(); else {
				var cameraCount = this.g2d_cameras.length;
				if(cameraCount == 0) this.g2d_root.render(false,false,this.g2d_context.getDefaultCamera(),false,false); else {
					var _g = 0;
					while(_g < cameraCount) {
						var i = _g++;
						this.g2d_cameras[i].render();
					}
				}
			}
			if(this.g2d_onPostRender.hasListeners()) {
				this.g2d_context.setActiveCamera(this.g2d_context.getDefaultCamera());
				this.g2d_context.setRenderTarget(null);
				this.g2d_onPostRender.dispatch();
			}
			this.g2d_context.end();
		}
	}
	,dispose: function() {
		if(this.g2d_root != null) this.g2d_root.dispose();
		this.g2d_root = null;
		this.g2d_onInitialized.removeAll();
		this.g2d_onFailed.removeAll();
		this.g2d_onPostRender.removeAll();
		this.g2d_onPreRender.removeAll();
		this.g2d_onUpdate.removeAll();
		this.g2d_onInvalidated.removeAll();
		this.g2d_onKeyboardInput.removeAll();
		this.g2d_context.dispose();
		this.g2d_context = null;
	}
	,g2d_contextInitialized_handler: function() {
		this.g2d_context.onFrame.add($bind(this,this.g2d_frame_handler));
		this.g2d_context.g2d_onMouseInputInternal = $bind(this,this.g2d_contextMouseInput_handler);
		this.g2d_context.onKeyboardInput.add($bind(this,this.g2d_contextKeyboardInput_handler));
		this.g2d_onInitialized.dispatch();
	}
	,g2d_contextFailed_handler: function(p_error) {
		if(this.g2d_contextConfig.fallbackContextClass != null) {
			this.g2d_context = Type.createInstance(this.g2d_contextConfig.fallbackContextClass,[this.g2d_contextConfig]);
			this.g2d_context.onInitialized.add($bind(this,this.g2d_contextInitialized_handler));
			this.g2d_context.onFailed.add($bind(this,this.g2d_contextFailed_handler));
			this.g2d_context.init();
		}
		this.g2d_onFailed.dispatch(p_error);
	}
	,g2d_contextInvalidated_handler: function() {
		this.g2d_onInvalidated.dispatch();
	}
	,g2d_frame_handler: function(p_deltaTime) {
		if(this.autoUpdateAndRender) {
			this.g2d_currentFrameId++;
			this.g2d_runTime += p_deltaTime;
			this.update(p_deltaTime);
			this.render();
		}
	}
	,getCamera: function(p_id) {
		var _g1 = 0;
		var _g = this.g2d_cameras.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.g2d_cameras[i].id == p_id) return this.g2d_cameras[i];
		}
		return null;
	}
	,g2d_addCameraController: function(p_camera) {
		var _g1 = 0;
		var _g = this.g2d_cameras.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.g2d_cameras[i] == p_camera) return;
		}
		this.g2d_cameras.push(p_camera);
	}
	,g2d_removeCameraController: function(p_camera) {
		var _g1 = 0;
		var _g = this.g2d_cameras.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.g2d_cameras[i] == p_camera) this.g2d_cameras.splice(i,1);
		}
	}
	,g2d_contextMouseInput_handler: function(p_input) {
		if(this.g2d_cameras.length == 0) this.g2d_root.captureMouseInput(p_input); else {
			var _g1 = 0;
			var _g = this.g2d_cameras.length;
			while(_g1 < _g) {
				var i1 = _g1++;
				this.g2d_cameras[i1].g2d_capturedThisFrame = false;
			}
			var i = this.g2d_cameras.length - 1;
			while(i >= 0) {
				this.g2d_cameras[i].captureMouseInput(p_input);
				i--;
			}
		}
	}
	,g2d_contextKeyboardInput_handler: function(p_input) {
		this.g2d_onKeyboardInput.dispatch(p_input);
	}
	,__class__: com_genome2d_Genome2D
	,__properties__: {get_root:"get_root",get_onKeyboardInput:"get_onKeyboardInput",get_onPostRender:"get_onPostRender",get_onPreRender:"get_onPreRender",get_onUpdate:"get_onUpdate",get_onInvalidated:"get_onInvalidated",get_onFailed:"get_onFailed",get_onInitialized:"get_onInitialized"}
};
var com_genome2d_animation_GFrameAnimation = function(p_frameTextures) {
	this.g2d_currentFrame = -1;
	this.g2d_playing = true;
	this.g2d_endIndex = -1;
	this.g2d_startIndex = -1;
	this.g2d_lastUpdatedFrameId = 0;
	this.g2d_accumulatedTime = 0;
	this.g2d_speed = 33.333333333333336;
	this.reversed = false;
	this.repeatable = true;
	this.timeDilation = 1;
	this.g2d_frameTextures = p_frameTextures;
	this.g2d_frameCount = p_frameTextures.length;
	this.g2d_currentFrame = 0;
	if(this.g2d_frameTextures.length > 0) this.currentFrameTexture = this.g2d_frameTextures[0]; else this.currentFrameTexture = null;
	this.g2d_frameTextures;
};
com_genome2d_animation_GFrameAnimation.__name__ = true;
com_genome2d_animation_GFrameAnimation.prototype = {
	get_frameRate: function() {
		return 1000 / this.g2d_speed | 0;
	}
	,set_frameRate: function(p_value) {
		this.g2d_speed = 1000 / p_value;
		return p_value;
	}
	,get_frameCount: function() {
		return this.g2d_frameCount;
	}
	,get_currentFrame: function() {
		return this.g2d_currentFrame;
	}
	,set_frameTextures: function(p_value) {
		this.g2d_frameTextures = p_value;
		this.g2d_frameCount = p_value.length;
		this.g2d_currentFrame = 0;
		if(this.g2d_frameTextures.length > 0) this.currentFrameTexture = this.g2d_frameTextures[0]; else this.currentFrameTexture = null;
		return this.g2d_frameTextures;
	}
	,gotoFrame: function(p_frame) {
		if(this.g2d_frameTextures == null) return;
		this.g2d_currentFrame = p_frame;
		this.g2d_currentFrame %= this.g2d_frameCount;
		this.currentFrameTexture = this.g2d_frameTextures[this.g2d_currentFrame];
	}
	,gotoAndPlay: function(p_frame) {
		this.gotoFrame(p_frame);
		this.play();
	}
	,gotoAndStop: function(p_frame) {
		this.gotoFrame(p_frame);
		this.stop();
	}
	,stop: function() {
		this.g2d_playing = false;
	}
	,play: function() {
		this.g2d_playing = true;
	}
	,update: function(p_deltaTime) {
		if(this.g2d_playing && this.g2d_frameCount > 1) {
			this.g2d_accumulatedTime += p_deltaTime * this.timeDilation;
			if(this.g2d_accumulatedTime >= this.g2d_speed) {
				if(this.reversed) this.g2d_currentFrame += -(this.g2d_accumulatedTime / this.g2d_speed | 0); else this.g2d_currentFrame += this.g2d_accumulatedTime / this.g2d_speed | 0;
				if(this.reversed && this.g2d_currentFrame < 0) {
					if(this.repeatable) this.g2d_currentFrame = this.g2d_frameCount + this.g2d_currentFrame % this.g2d_frameCount; else {
						this.g2d_currentFrame = 0;
						this.g2d_playing = false;
					}
				} else if(!this.reversed && this.g2d_currentFrame >= this.g2d_frameCount) {
					if(this.repeatable) this.g2d_currentFrame = this.g2d_currentFrame % this.g2d_frameCount; else {
						this.g2d_currentFrame = this.g2d_frameCount - 1;
						this.g2d_playing = false;
					}
				}
				this.currentFrameTexture = this.g2d_frameTextures[this.g2d_currentFrame];
			}
			this.g2d_accumulatedTime %= this.g2d_speed;
		}
	}
	,__class__: com_genome2d_animation_GFrameAnimation
	,__properties__: {set_frameTextures:"set_frameTextures",get_currentFrame:"get_currentFrame",get_frameCount:"get_frameCount",set_frameRate:"set_frameRate",get_frameRate:"get_frameRate"}
};
var com_genome2d_assets_GAsset = function(p_url,p_id) {
	if(p_id == null) p_id = "";
	if(p_url == null) p_url = "";
	this.g2d_loaded = false;
	this.g2d_loading = false;
	this.g2d_id = "";
	this.onLoaded = new com_genome2d_callbacks_GCallback1(com_genome2d_assets_GAsset);
	this.onFailed = new com_genome2d_callbacks_GCallback1(com_genome2d_assets_GAsset);
	if(p_id != this.g2d_id && p_id.length > 0) {
		if(com_genome2d_assets_GAssetManager.g2d_references.get(p_id) != null) com_genome2d_debug_GDebug.error("Duplicate asset id: " + p_id,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GAsset.hx", lineNumber : 32, className : "com.genome2d.assets.GAsset", methodName : "set_id"});
		com_genome2d_assets_GAssetManager.g2d_references.set(p_id,this);
		if(com_genome2d_assets_GAssetManager.g2d_references.get(this.g2d_id) != null) com_genome2d_assets_GAssetManager.g2d_references.remove(this.g2d_id);
		this.g2d_id = p_id;
	}
	this.g2d_id;
	this.set_url(p_url);
};
com_genome2d_assets_GAsset.__name__ = true;
com_genome2d_assets_GAsset.prototype = {
	get_id: function() {
		return this.g2d_id;
	}
	,set_id: function(p_value) {
		if(p_value != this.g2d_id && p_value.length > 0) {
			if(com_genome2d_assets_GAssetManager.g2d_references.get(p_value) != null) com_genome2d_debug_GDebug.error("Duplicate asset id: " + p_value,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GAsset.hx", lineNumber : 32, className : "com.genome2d.assets.GAsset", methodName : "set_id"});
			com_genome2d_assets_GAssetManager.g2d_references.set(p_value,this);
			if(com_genome2d_assets_GAssetManager.g2d_references.get(this.g2d_id) != null) com_genome2d_assets_GAssetManager.g2d_references.remove(this.g2d_id);
			this.g2d_id = p_value;
		}
		return this.g2d_id;
	}
	,get_url: function() {
		return this.g2d_url;
	}
	,set_url: function(p_value) {
		if(!this.isLoaded()) {
			this.g2d_url = p_value;
			if(this.g2d_id == "") this.set_id((function($this) {
				var $r;
				var pos = $this.g2d_url.lastIndexOf("\\") + 1;
				$r = HxOverrides.substr($this.g2d_url,pos,null);
				return $r;
			}(this)));
		} else com_genome2d_debug_GDebug.warning("Asset already loaded " + this.g2d_id,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GAsset.hx", lineNumber : 54, className : "com.genome2d.assets.GAsset", methodName : "set_url"});
		return this.g2d_url;
	}
	,isLoading: function() {
		return this.g2d_loading;
	}
	,isLoaded: function() {
		return this.g2d_loaded;
	}
	,load: function() {
	}
	,toReference: function() {
		return null;
	}
	,dispose: function() {
	}
	,__class__: com_genome2d_assets_GAsset
	,__properties__: {set_url:"set_url",get_url:"get_url",set_id:"set_id",get_id:"get_id"}
};
var com_genome2d_assets_GAssetManager = function() { };
com_genome2d_assets_GAssetManager.__name__ = true;
com_genome2d_assets_GAssetManager.__properties__ = {get_onQueueFailed:"get_onQueueFailed",get_onQueueLoaded:"get_onQueueLoaded"}
com_genome2d_assets_GAssetManager.getAssets = function() {
	return com_genome2d_assets_GAssetManager.g2d_references;
};
com_genome2d_assets_GAssetManager.isLoading = function() {
	return com_genome2d_assets_GAssetManager.g2d_loading;
};
com_genome2d_assets_GAssetManager.get_onQueueLoaded = function() {
	return com_genome2d_assets_GAssetManager.g2d_onQueueLoaded;
};
com_genome2d_assets_GAssetManager.get_onQueueFailed = function() {
	return com_genome2d_assets_GAssetManager.g2d_onQueueFailed;
};
com_genome2d_assets_GAssetManager.init = function() {
	com_genome2d_assets_GAssetManager.g2d_loadQueue = [];
	com_genome2d_assets_GAssetManager.g2d_references = new haxe_ds_StringMap();
	com_genome2d_assets_GAssetManager.g2d_onQueueLoaded = new com_genome2d_callbacks_GCallback0();
	com_genome2d_assets_GAssetManager.g2d_onQueueFailed = new com_genome2d_callbacks_GCallback1(com_genome2d_assets_GAsset);
};
com_genome2d_assets_GAssetManager.getAssetById = function(p_id) {
	return com_genome2d_assets_GAssetManager.g2d_references.get(p_id);
};
com_genome2d_assets_GAssetManager.getXmlAssetById = function(p_id) {
	return com_genome2d_assets_GAssetManager.g2d_references.get(p_id);
};
com_genome2d_assets_GAssetManager.getImageAssetById = function(p_id) {
	return com_genome2d_assets_GAssetManager.g2d_references.get(p_id);
};
com_genome2d_assets_GAssetManager.addFromUrl = function(p_url,p_id) {
	if(p_id == null) p_id = "";
	var _g;
	com_genome2d_assets_GAssetManager.PATH_REGEX.match(p_url);
	_g = com_genome2d_assets_GAssetManager.PATH_REGEX.matched(2);
	switch(_g) {
	case "jpg":case "jpeg":case "png":case "atf":
		return new com_genome2d_assets_GImageAsset(p_url,p_id);
	case "xml":case "fnt":
		return new com_genome2d_assets_GXmlAsset(p_url,p_id);
	}
	return null;
};
com_genome2d_assets_GAssetManager.disposeAllAssets = function() {
	var $it0 = com_genome2d_assets_GAssetManager.g2d_references.iterator();
	while( $it0.hasNext() ) {
		var asset = $it0.next();
		asset.dispose();
	}
};
com_genome2d_assets_GAssetManager.loadQueue = function() {
	var $it0 = com_genome2d_assets_GAssetManager.g2d_references.iterator();
	while( $it0.hasNext() ) {
		var asset = $it0.next();
		if(!asset.isLoaded()) com_genome2d_assets_GAssetManager.g2d_loadQueue.push(asset);
	}
	if(!com_genome2d_assets_GAssetManager.g2d_loading) com_genome2d_assets_GAssetManager.g2d_loadQueueNext();
};
com_genome2d_assets_GAssetManager.g2d_loadQueueNext = function() {
	if(com_genome2d_assets_GAssetManager.g2d_loadQueue.length == 0) {
		com_genome2d_assets_GAssetManager.g2d_loading = false;
		com_genome2d_assets_GAssetManager.g2d_onQueueLoaded.dispatch();
	} else {
		com_genome2d_assets_GAssetManager.g2d_loading = true;
		var asset = com_genome2d_assets_GAssetManager.g2d_loadQueue.shift();
		asset.onLoaded.addOnce(com_genome2d_assets_GAssetManager.g2d_assetLoaded_handler);
		asset.onFailed.addOnce(com_genome2d_assets_GAssetManager.g2d_assetFailed_handler);
		asset.load();
	}
};
com_genome2d_assets_GAssetManager.getFileName = function(p_path) {
	com_genome2d_assets_GAssetManager.PATH_REGEX.match(p_path);
	return com_genome2d_assets_GAssetManager.PATH_REGEX.matched(1);
};
com_genome2d_assets_GAssetManager.getFileExtension = function(p_path) {
	com_genome2d_assets_GAssetManager.PATH_REGEX.match(p_path);
	return com_genome2d_assets_GAssetManager.PATH_REGEX.matched(2);
};
com_genome2d_assets_GAssetManager.g2d_assetLoaded_handler = function(p_asset) {
	com_genome2d_assets_GAssetManager.g2d_loadQueueNext();
};
com_genome2d_assets_GAssetManager.g2d_assetFailed_handler = function(p_asset) {
	com_genome2d_assets_GAssetManager.g2d_onQueueFailed.dispatch(p_asset);
	if(com_genome2d_assets_GAssetManager.ignoreFailed) com_genome2d_assets_GAssetManager.g2d_loadQueueNext();
};
com_genome2d_assets_GAssetManager.generateTextures = function(p_scaleFactor,p_overwrite) {
	if(p_overwrite == null) p_overwrite = false;
	if(p_scaleFactor == null) p_scaleFactor = 1;
	var $it0 = com_genome2d_assets_GAssetManager.g2d_references.iterator();
	while( $it0.hasNext() ) {
		var asset = $it0.next();
		if(!js_Boot.__instanceof(asset,com_genome2d_assets_GImageAsset) || !asset.isLoaded()) continue;
		var id = asset.g2d_id.substring(0,asset.g2d_id.lastIndexOf("."));
		var texture = com_genome2d_textures_GTextureManager.getTexture(id);
		if(texture != null) {
			if(p_overwrite) texture.dispose(); else continue;
		}
		texture = com_genome2d_textures_GTextureManager.createTexture(id,asset);
		if(com_genome2d_assets_GAssetManager.getXmlAssetById(id + ".xml") != null) com_genome2d_textures_GTextureManager.createSubTextures(texture,com_genome2d_assets_GAssetManager.getXmlAssetById(id + ".xml").xml); else if(com_genome2d_assets_GAssetManager.getXmlAssetById(id + ".fnt") != null) com_genome2d_text_GFontManager.createTextureFont(texture.g2d_id,texture,com_genome2d_assets_GAssetManager.getXmlAssetById(id + ".fnt").xml);
		texture.invalidateNativeTexture(false);
	}
};
var com_genome2d_assets_GImageAsset = function(p_url,p_id) {
	com_genome2d_assets_GAsset.call(this,p_url,p_id);
};
com_genome2d_assets_GImageAsset.__name__ = true;
com_genome2d_assets_GImageAsset.__super__ = com_genome2d_assets_GAsset;
com_genome2d_assets_GImageAsset.prototype = $extend(com_genome2d_assets_GAsset.prototype,{
	get_imageElement: function() {
		return this.g2d_imageElement;
	}
	,get_type: function() {
		return this.g2d_type;
	}
	,load: function() {
		var _this = window.document;
		this.g2d_imageElement = _this.createElement("img");
		this.g2d_imageElement.onload = $bind(this,this.loadedHandler);
		this.g2d_imageElement.src = this.g2d_url;
	}
	,loadedHandler: function(event) {
		this.g2d_type = 2;
		this.g2d_loaded = true;
		this.onLoaded.dispatch(this);
	}
	,__class__: com_genome2d_assets_GImageAsset
	,__properties__: $extend(com_genome2d_assets_GAsset.prototype.__properties__,{get_type:"get_type",get_imageElement:"get_imageElement"})
});
var com_genome2d_assets_GImageAssetType = function() { };
com_genome2d_assets_GImageAssetType.__name__ = true;
var com_genome2d_assets_GXmlAsset = function(p_url,p_id) {
	com_genome2d_assets_GAsset.call(this,p_url,p_id);
};
com_genome2d_assets_GXmlAsset.__name__ = true;
com_genome2d_assets_GXmlAsset.__super__ = com_genome2d_assets_GAsset;
com_genome2d_assets_GXmlAsset.prototype = $extend(com_genome2d_assets_GAsset.prototype,{
	load: function() {
		var http = new haxe_Http(this.g2d_url);
		http.onData = $bind(this,this.loadedHandler);
		http.onError = $bind(this,this.errorHandler);
		http.request();
	}
	,loadedHandler: function(p_data) {
		this.g2d_loaded = true;
		this.xml = Xml.parse(p_data);
		this.onLoaded.dispatch(this);
	}
	,errorHandler: function(p_error) {
		com_genome2d_debug_GDebug.error(p_error,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GXmlAsset.hx", lineNumber : 37, className : "com.genome2d.assets.GXmlAsset", methodName : "errorHandler"});
	}
	,__class__: com_genome2d_assets_GXmlAsset
});
var com_genome2d_callbacks_GCallback = function(p_valueClasses) {
	this.g2d_listenerCount = 0;
	if(p_valueClasses == null) this.g2d_valueClasses = []; else this.g2d_valueClasses = p_valueClasses;
	this.g2d_listeners = [];
	this.g2d_listenersOnce = [];
};
com_genome2d_callbacks_GCallback.__name__ = true;
com_genome2d_callbacks_GCallback.prototype = {
	hasListeners: function() {
		return this.g2d_listeners.length > 0 || this.g2d_listenersOnce.length > 0;
	}
	,add: function(p_listener) {
		if(HxOverrides.indexOf(this.g2d_listeners,p_listener,0) == -1 && HxOverrides.indexOf(this.g2d_listenersOnce,p_listener,0) == -1) {
			this.g2d_listeners.push(p_listener);
			this.g2d_listenerCount++;
		}
	}
	,addOnce: function(p_listener) {
		if(HxOverrides.indexOf(this.g2d_listeners,p_listener,0) == -1 && HxOverrides.indexOf(this.g2d_listenersOnce,p_listener,0) == -1) this.g2d_listenersOnce.push(p_listener);
	}
	,addWithPriority: function(p_listener) {
		if(HxOverrides.indexOf(this.g2d_listeners,p_listener,0) == -1 && HxOverrides.indexOf(this.g2d_listenersOnce,p_listener,0) == -1) {
			this.g2d_listeners.unshift(p_listener);
			this.g2d_listenerCount++;
		}
	}
	,remove: function(p_listener) {
		var index = HxOverrides.indexOf(this.g2d_listeners,p_listener,0);
		if(index >= 0) {
			if(index <= this.g2d_iteratingDispatch) this.g2d_iteratingDispatch--;
			HxOverrides.remove(this.g2d_listeners,p_listener);
			this.g2d_listenerCount--;
		} else HxOverrides.remove(this.g2d_listenersOnce,p_listener);
	}
	,removeAll: function() {
		this.g2d_listeners = [];
		this.g2d_listenerCount = 0;
		this.g2d_listenersOnce = [];
	}
	,__class__: com_genome2d_callbacks_GCallback
};
var com_genome2d_callbacks_GCallback0 = function() {
	com_genome2d_callbacks_GCallback.call(this,[]);
};
com_genome2d_callbacks_GCallback0.__name__ = true;
com_genome2d_callbacks_GCallback0.__super__ = com_genome2d_callbacks_GCallback;
com_genome2d_callbacks_GCallback0.prototype = $extend(com_genome2d_callbacks_GCallback.prototype,{
	dispatch: function() {
		this.g2d_iteratingDispatch = 0;
		while(this.g2d_iteratingDispatch < this.g2d_listenerCount) {
			this.g2d_listeners[this.g2d_iteratingDispatch]();
			this.g2d_iteratingDispatch++;
		}
		while(this.g2d_listenersOnce.length > 0) (this.g2d_listenersOnce.shift())();
	}
	,__class__: com_genome2d_callbacks_GCallback0
});
var com_genome2d_callbacks_GCallback1 = function(p_type) {
	com_genome2d_callbacks_GCallback.call(this,[p_type]);
};
com_genome2d_callbacks_GCallback1.__name__ = true;
com_genome2d_callbacks_GCallback1.__super__ = com_genome2d_callbacks_GCallback;
com_genome2d_callbacks_GCallback1.prototype = $extend(com_genome2d_callbacks_GCallback.prototype,{
	dispatch: function(p_value) {
		this.g2d_iteratingDispatch = 0;
		while(this.g2d_iteratingDispatch < this.g2d_listenerCount) {
			this.g2d_listeners[this.g2d_iteratingDispatch](p_value);
			this.g2d_iteratingDispatch++;
		}
		while(this.g2d_listenersOnce.length > 0) (this.g2d_listenersOnce.shift())(p_value);
	}
	,__class__: com_genome2d_callbacks_GCallback1
});
var com_genome2d_callbacks_GCallback2 = function(p_type1,p_type2) {
	com_genome2d_callbacks_GCallback.call(this,[p_type1,p_type2]);
};
com_genome2d_callbacks_GCallback2.__name__ = true;
com_genome2d_callbacks_GCallback2.__super__ = com_genome2d_callbacks_GCallback;
com_genome2d_callbacks_GCallback2.prototype = $extend(com_genome2d_callbacks_GCallback.prototype,{
	dispatch: function(p_value1,p_value2) {
		this.g2d_iteratingDispatch = 0;
		while(this.g2d_iteratingDispatch < this.g2d_listenerCount) {
			this.g2d_listeners[this.g2d_iteratingDispatch](p_value1,p_value2);
			this.g2d_iteratingDispatch++;
		}
		while(this.g2d_listenersOnce.length > 0) (this.g2d_listeners.shift())(p_value1,p_value2);
	}
	,__class__: com_genome2d_callbacks_GCallback2
});
var com_genome2d_proto_IGPrototypable = function() { };
com_genome2d_proto_IGPrototypable.__name__ = true;
com_genome2d_proto_IGPrototypable.prototype = {
	__class__: com_genome2d_proto_IGPrototypable
};
var com_genome2d_components_GComponent = function() {
	this.g2d_currentState = "default";
	this.g2d_active = true;
};
com_genome2d_components_GComponent.__name__ = true;
com_genome2d_components_GComponent.__interfaces__ = [com_genome2d_proto_IGPrototypable];
com_genome2d_components_GComponent.prototype = {
	get_userData: function() {
		if(this.g2d_userData == null) this.g2d_userData = new haxe_ds_StringMap();
		return this.g2d_userData;
	}
	,isActive: function() {
		return this.g2d_active;
	}
	,setActive: function(p_value) {
		this.g2d_active = p_value;
	}
	,get_node: function() {
		return this.g2d_node;
	}
	,init: function() {
	}
	,dispose: function() {
	}
	,g2d_dispose: function() {
		this.dispose();
		this.g2d_active = false;
		this.g2d_node = null;
	}
	,toReference: function() {
		return null;
	}
	,getPrototype: function(p_prototypeXml) {
		p_prototypeXml = com_genome2d_proto_GPrototypeFactory.g2d_getPrototype(this,p_prototypeXml,com_genome2d_components_GComponent.PROTOTYPE_NAME,com_genome2d_components_GComponent.PROTOTYPE_PROPERTY_NAMES,com_genome2d_components_GComponent.PROTOTYPE_PROPERTY_TYPES,com_genome2d_components_GComponent.PROTOTYPE_PROPERTY_DEFAULTS,com_genome2d_components_GComponent.PROTOTYPE_PROPERTY_EXTRAS);
		return p_prototypeXml;
	}
	,bindPrototype: function(p_prototypeXml) {
		com_genome2d_proto_GPrototypeFactory.g2d_bindPrototype(this,p_prototypeXml,com_genome2d_components_GComponent.PROTOTYPE_PROPERTY_NAMES,com_genome2d_components_GComponent.PROTOTYPE_PROPERTY_TYPES,com_genome2d_components_GComponent.PROTOTYPE_PROPERTY_EXTRAS);
	}
	,setPrototypeState: function(p_stateName) {
		if(this.g2d_currentState != p_stateName) {
			this.g2d_currentState = p_stateName;
			var state = this.g2d_prototypeStates.g2d_states.get(p_stateName);
			if(state != null) {
				var $it0 = state.keys();
				while( $it0.hasNext() ) {
					var propertyName = $it0.next();
					try {
						Reflect.setProperty(this,propertyName,__map_reserved[propertyName] != null?state.getReserved(propertyName):state.h[propertyName]);
					} catch( e ) {
						if (e instanceof js__$Boot_HaxeError) e = e.val;
					}
				}
			}
		}
	}
	,__class__: com_genome2d_components_GComponent
	,__properties__: {get_node:"get_node",get_userData:"get_userData"}
};
var com_genome2d_components_GCameraController = function() {
	this.renderTarget = null;
	this.backgroundAlpha = 0;
	this.backgroundBlue = 0;
	this.backgroundGreen = 0;
	this.backgroundRed = 0;
	this.g2d_capturedThisFrame = false;
	com_genome2d_components_GComponent.call(this);
};
com_genome2d_components_GCameraController.__name__ = true;
com_genome2d_components_GCameraController.__super__ = com_genome2d_components_GComponent;
com_genome2d_components_GCameraController.prototype = $extend(com_genome2d_components_GComponent.prototype,{
	getBackgroundColor: function() {
		var alpha = (this.backgroundAlpha * 255 | 0) << 24;
		var red = (this.backgroundRed * 255 | 0) << 16;
		var green = (this.backgroundGreen * 255 | 0) << 8;
		var blue = this.backgroundBlue * 255 | 0;
		return alpha + red + green + blue;
	}
	,get_contextCamera: function() {
		return this.g2d_contextCamera;
	}
	,setView: function(p_normalizedX,p_normalizedY,p_normalizedWidth,p_normalizedHeight) {
		this.g2d_contextCamera.normalizedViewX = p_normalizedX;
		this.g2d_contextCamera.normalizedViewY = p_normalizedY;
		this.g2d_contextCamera.normalizedViewWidth = p_normalizedWidth;
		this.g2d_contextCamera.normalizedViewHeight = p_normalizedHeight;
	}
	,get_zoom: function() {
		return this.g2d_contextCamera.scaleX;
	}
	,set_zoom: function(p_value) {
		return this.g2d_contextCamera.scaleX = this.g2d_contextCamera.scaleY = p_value;
	}
	,init: function() {
		this.g2d_contextCamera = new com_genome2d_context_GCamera();
		this.g2d_viewRectangle = new com_genome2d_geom_GRectangle();
		if(this.g2d_node != ((function($this) {
			var $r;
			if(com_genome2d_node_GNode.g2d_core == null) {
				if(com_genome2d_Genome2D.g2d_instance == null) {
					com_genome2d_Genome2D.g2d_instantiable = true;
					new com_genome2d_Genome2D();
					com_genome2d_Genome2D.g2d_instantiable = false;
				}
				com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
			}
			$r = com_genome2d_node_GNode.g2d_core;
			return $r;
		}(this))).get_root() && this.g2d_node.isOnStage()) ((function($this) {
			var $r;
			if(com_genome2d_node_GNode.g2d_core == null) {
				if(com_genome2d_Genome2D.g2d_instance == null) {
					com_genome2d_Genome2D.g2d_instantiable = true;
					new com_genome2d_Genome2D();
					com_genome2d_Genome2D.g2d_instantiable = false;
				}
				com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
			}
			$r = com_genome2d_node_GNode.g2d_core;
			return $r;
		}(this))).g2d_addCameraController(this);
		this.g2d_node.get_onAddedToStage().add($bind(this,this.g2d_onAddedToStage));
		this.g2d_node.get_onRemovedFromStage().add($bind(this,this.g2d_onRemovedFromStage));
	}
	,render: function() {
		if(!this.g2d_node.g2d_active) return;
		this.g2d_renderedNodesCount = 0;
		this.g2d_contextCamera.x = this.g2d_node.g2d_worldX;
		this.g2d_contextCamera.y = this.g2d_node.g2d_worldY;
		this.g2d_contextCamera.rotation = this.g2d_node.g2d_worldRotation;
		((function($this) {
			var $r;
			if(com_genome2d_node_GNode.g2d_core == null) {
				if(com_genome2d_Genome2D.g2d_instance == null) {
					com_genome2d_Genome2D.g2d_instantiable = true;
					new com_genome2d_Genome2D();
					com_genome2d_Genome2D.g2d_instantiable = false;
				}
				com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
			}
			$r = com_genome2d_node_GNode.g2d_core;
			return $r;
		}(this))).getContext().setActiveCamera(this.g2d_contextCamera);
		((function($this) {
			var $r;
			if(com_genome2d_node_GNode.g2d_core == null) {
				if(com_genome2d_Genome2D.g2d_instance == null) {
					com_genome2d_Genome2D.g2d_instantiable = true;
					new com_genome2d_Genome2D();
					com_genome2d_Genome2D.g2d_instantiable = false;
				}
				com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
			}
			$r = com_genome2d_node_GNode.g2d_core;
			return $r;
		}(this))).getContext().setRenderTarget(this.renderTarget);
		((function($this) {
			var $r;
			if(com_genome2d_node_GNode.g2d_core == null) {
				if(com_genome2d_Genome2D.g2d_instance == null) {
					com_genome2d_Genome2D.g2d_instantiable = true;
					new com_genome2d_Genome2D();
					com_genome2d_Genome2D.g2d_instantiable = false;
				}
				com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
			}
			$r = com_genome2d_node_GNode.g2d_core;
			return $r;
		}(this))).get_root().render(false,false,this.g2d_contextCamera,false,false);
	}
	,captureMouseInput: function(p_input) {
		if(this.g2d_capturedThisFrame || !this.g2d_node.g2d_active) return;
		this.g2d_capturedThisFrame = true;
		var stageRect = ((function($this) {
			var $r;
			if(com_genome2d_node_GNode.g2d_core == null) {
				if(com_genome2d_Genome2D.g2d_instance == null) {
					com_genome2d_Genome2D.g2d_instantiable = true;
					new com_genome2d_Genome2D();
					com_genome2d_Genome2D.g2d_instantiable = false;
				}
				com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
			}
			$r = com_genome2d_node_GNode.g2d_core;
			return $r;
		}(this))).getContext().getStageViewRect();
		this.g2d_viewRectangle.setTo(stageRect.width * this.g2d_contextCamera.normalizedViewX,stageRect.height * this.g2d_contextCamera.normalizedViewY,stageRect.width * this.g2d_contextCamera.normalizedViewWidth,stageRect.height * this.g2d_contextCamera.normalizedViewHeight);
		if(!this.g2d_viewRectangle.contains(p_input.contextX,p_input.contextY)) return;
		var tx = p_input.contextX - this.g2d_viewRectangle.x - this.g2d_viewRectangle.width / 2;
		var ty = p_input.contextY - this.g2d_viewRectangle.y - this.g2d_viewRectangle.height / 2;
		var cos = Math.cos(-this.g2d_node.g2d_worldRotation);
		var sin = Math.sin(-this.g2d_node.g2d_worldRotation);
		var rx = tx * cos - ty * sin;
		var ry = ty * cos + tx * sin;
		rx /= this.g2d_contextCamera.scaleX;
		ry /= this.g2d_contextCamera.scaleX;
		p_input.worldX = rx + this.g2d_node.g2d_worldX;
		p_input.worldY = ry + this.g2d_node.g2d_worldY;
		p_input.camera = this.g2d_contextCamera;
		((function($this) {
			var $r;
			if(com_genome2d_node_GNode.g2d_core == null) {
				if(com_genome2d_Genome2D.g2d_instance == null) {
					com_genome2d_Genome2D.g2d_instantiable = true;
					new com_genome2d_Genome2D();
					com_genome2d_Genome2D.g2d_instantiable = false;
				}
				com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
			}
			$r = com_genome2d_node_GNode.g2d_core;
			return $r;
		}(this))).get_root().captureMouseInput(p_input);
	}
	,dispose: function() {
		((function($this) {
			var $r;
			if(com_genome2d_node_GNode.g2d_core == null) {
				if(com_genome2d_Genome2D.g2d_instance == null) {
					com_genome2d_Genome2D.g2d_instantiable = true;
					new com_genome2d_Genome2D();
					com_genome2d_Genome2D.g2d_instantiable = false;
				}
				com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
			}
			$r = com_genome2d_node_GNode.g2d_core;
			return $r;
		}(this))).g2d_removeCameraController(this);
		this.g2d_node.get_onAddedToStage().remove($bind(this,this.g2d_onAddedToStage));
		this.g2d_node.get_onRemovedFromStage().remove($bind(this,this.g2d_onRemovedFromStage));
		com_genome2d_components_GComponent.prototype.dispose.call(this);
	}
	,g2d_onAddedToStage: function() {
		((function($this) {
			var $r;
			if(com_genome2d_node_GNode.g2d_core == null) {
				if(com_genome2d_Genome2D.g2d_instance == null) {
					com_genome2d_Genome2D.g2d_instantiable = true;
					new com_genome2d_Genome2D();
					com_genome2d_Genome2D.g2d_instantiable = false;
				}
				com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
			}
			$r = com_genome2d_node_GNode.g2d_core;
			return $r;
		}(this))).g2d_addCameraController(this);
	}
	,g2d_onRemovedFromStage: function() {
		((function($this) {
			var $r;
			if(com_genome2d_node_GNode.g2d_core == null) {
				if(com_genome2d_Genome2D.g2d_instance == null) {
					com_genome2d_Genome2D.g2d_instantiable = true;
					new com_genome2d_Genome2D();
					com_genome2d_Genome2D.g2d_instantiable = false;
				}
				com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
			}
			$r = com_genome2d_node_GNode.g2d_core;
			return $r;
		}(this))).g2d_removeCameraController(this);
	}
	,setViewport: function(p_width,p_height,p_resize) {
		if(p_resize == null) p_resize = true;
		if(this.viewport != null) this.viewport.dispose();
		this.viewport = new com_genome2d_context_GViewport(this,p_width,p_height,p_resize);
	}
	,getPrototype: function(p_prototypeXml) {
		p_prototypeXml = com_genome2d_proto_GPrototypeFactory.g2d_getPrototype(this,p_prototypeXml,com_genome2d_components_GCameraController.PROTOTYPE_NAME,com_genome2d_components_GCameraController.PROTOTYPE_PROPERTY_NAMES,com_genome2d_components_GCameraController.PROTOTYPE_PROPERTY_TYPES,com_genome2d_components_GCameraController.PROTOTYPE_PROPERTY_DEFAULTS,com_genome2d_components_GCameraController.PROTOTYPE_PROPERTY_EXTRAS);
		return com_genome2d_components_GComponent.prototype.getPrototype.call(this,p_prototypeXml);
	}
	,bindPrototype: function(p_prototypeXml) {
		com_genome2d_components_GComponent.prototype.bindPrototype.call(this,p_prototypeXml);
		com_genome2d_proto_GPrototypeFactory.g2d_bindPrototype(this,p_prototypeXml,com_genome2d_components_GCameraController.PROTOTYPE_PROPERTY_NAMES,com_genome2d_components_GCameraController.PROTOTYPE_PROPERTY_TYPES,com_genome2d_components_GCameraController.PROTOTYPE_PROPERTY_EXTRAS);
	}
	,__class__: com_genome2d_components_GCameraController
	,__properties__: $extend(com_genome2d_components_GComponent.prototype.__properties__,{set_zoom:"set_zoom",get_zoom:"get_zoom",get_contextCamera:"get_contextCamera"})
});
var com_genome2d_components_renderable_IGRenderable = function() { };
com_genome2d_components_renderable_IGRenderable.__name__ = true;
com_genome2d_components_renderable_IGRenderable.prototype = {
	__class__: com_genome2d_components_renderable_IGRenderable
};
var com_genome2d_components_renderable_GTexturedQuad = function() {
	this.ignoreMatrix = false;
	this.mousePixelTreshold = 0;
	this.mousePixelEnabled = false;
	this.blendMode = 1;
	com_genome2d_components_GComponent.call(this);
};
com_genome2d_components_renderable_GTexturedQuad.__name__ = true;
com_genome2d_components_renderable_GTexturedQuad.__interfaces__ = [com_genome2d_components_renderable_IGRenderable];
com_genome2d_components_renderable_GTexturedQuad.__super__ = com_genome2d_components_GComponent;
com_genome2d_components_renderable_GTexturedQuad.prototype = $extend(com_genome2d_components_GComponent.prototype,{
	render: function(p_camera,p_useMatrix) {
		if(this.texture != null) {
			if(p_useMatrix && !this.ignoreMatrix) {
				var matrix;
				matrix = ((function($this) {
					var $r;
					if(com_genome2d_node_GNode.g2d_core == null) {
						if(com_genome2d_Genome2D.g2d_instance == null) {
							com_genome2d_Genome2D.g2d_instantiable = true;
							new com_genome2d_Genome2D();
							com_genome2d_Genome2D.g2d_instantiable = false;
						}
						com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
					}
					$r = com_genome2d_node_GNode.g2d_core;
					return $r;
				}(this))).g2d_renderMatrix;
				((function($this) {
					var $r;
					if(com_genome2d_node_GNode.g2d_core == null) {
						if(com_genome2d_Genome2D.g2d_instance == null) {
							com_genome2d_Genome2D.g2d_instantiable = true;
							new com_genome2d_Genome2D();
							com_genome2d_Genome2D.g2d_instantiable = false;
						}
						com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
					}
					$r = com_genome2d_node_GNode.g2d_core;
					return $r;
				}(this))).getContext().drawMatrix(this.texture,matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty,this.g2d_node.g2d_worldRed,this.g2d_node.g2d_worldGreen,this.g2d_node.g2d_worldBlue,this.g2d_node.g2d_worldAlpha,this.blendMode,this.filter);
			} else ((function($this) {
				var $r;
				if(com_genome2d_node_GNode.g2d_core == null) {
					if(com_genome2d_Genome2D.g2d_instance == null) {
						com_genome2d_Genome2D.g2d_instantiable = true;
						new com_genome2d_Genome2D();
						com_genome2d_Genome2D.g2d_instantiable = false;
					}
					com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
				}
				$r = com_genome2d_node_GNode.g2d_core;
				return $r;
			}(this))).getContext().draw(this.texture,this.g2d_node.g2d_worldX,this.g2d_node.g2d_worldY,this.g2d_node.g2d_worldScaleX,this.g2d_node.g2d_worldScaleY,this.g2d_node.g2d_worldRotation,this.g2d_node.g2d_worldRed,this.g2d_node.g2d_worldGreen,this.g2d_node.g2d_worldBlue,this.g2d_node.g2d_worldAlpha,this.blendMode,this.filter);
		}
	}
	,hitTest: function(p_x,p_y) {
		var hit = false;
		if(this.texture != null) {
			p_x = p_x / this.texture.get_width() + .5;
			p_y = p_y / this.texture.get_height() + .5;
			hit = p_x >= -this.texture.get_pivotX() / this.texture.get_width() && p_x <= 1 - this.texture.get_pivotX() / this.texture.get_width() && p_y >= -this.texture.get_pivotY() / this.texture.get_height() && p_y <= 1 - this.texture.get_pivotY() / this.texture.get_height() && (!this.mousePixelEnabled || this.texture.getAlphaAtUV(p_x + this.texture.get_pivotX() / this.texture.get_width(),p_y + this.texture.get_pivotY() / this.texture.get_height()) <= this.mousePixelTreshold);
		}
		return hit;
	}
	,captureMouseInput: function(p_input) {
		p_input.g2d_captured = p_input.g2d_captured || this.hitTest(p_input.localX,p_input.localY);
	}
	,getBounds: function(p_bounds) {
		if(this.texture == null) {
			if(p_bounds != null) p_bounds.setTo(0,0,0,0); else p_bounds = new com_genome2d_geom_GRectangle(0,0,0,0);
		} else if(p_bounds != null) p_bounds.setTo(-this.texture.get_width() * .5 - this.texture.get_pivotX(),-this.texture.get_height() * .5 - this.texture.get_pivotY(),this.texture.get_width(),this.texture.get_height()); else p_bounds = new com_genome2d_geom_GRectangle(-this.texture.get_width() * .5 - this.texture.get_pivotX(),-this.texture.get_height() * .5 - this.texture.get_pivotY(),this.texture.get_width(),this.texture.get_height());
		return p_bounds;
	}
	,getPrototype: function(p_prototypeXml) {
		p_prototypeXml = com_genome2d_proto_GPrototypeFactory.g2d_getPrototype(this,p_prototypeXml,com_genome2d_components_renderable_GTexturedQuad.PROTOTYPE_NAME,com_genome2d_components_renderable_GTexturedQuad.PROTOTYPE_PROPERTY_NAMES,com_genome2d_components_renderable_GTexturedQuad.PROTOTYPE_PROPERTY_TYPES,com_genome2d_components_renderable_GTexturedQuad.PROTOTYPE_PROPERTY_DEFAULTS,com_genome2d_components_renderable_GTexturedQuad.PROTOTYPE_PROPERTY_EXTRAS);
		return com_genome2d_components_GComponent.prototype.getPrototype.call(this,p_prototypeXml);
	}
	,bindPrototype: function(p_prototypeXml) {
		com_genome2d_components_GComponent.prototype.bindPrototype.call(this,p_prototypeXml);
		com_genome2d_proto_GPrototypeFactory.g2d_bindPrototype(this,p_prototypeXml,com_genome2d_components_renderable_GTexturedQuad.PROTOTYPE_PROPERTY_NAMES,com_genome2d_components_renderable_GTexturedQuad.PROTOTYPE_PROPERTY_TYPES,com_genome2d_components_renderable_GTexturedQuad.PROTOTYPE_PROPERTY_EXTRAS);
	}
	,__class__: com_genome2d_components_renderable_GTexturedQuad
});
var com_genome2d_components_renderable_GSprite = function() {
	com_genome2d_components_renderable_GTexturedQuad.call(this);
};
com_genome2d_components_renderable_GSprite.__name__ = true;
com_genome2d_components_renderable_GSprite.__super__ = com_genome2d_components_renderable_GTexturedQuad;
com_genome2d_components_renderable_GSprite.prototype = $extend(com_genome2d_components_renderable_GTexturedQuad.prototype,{
	init: function() {
	}
	,render: function(p_camera,p_useMatrix) {
		if(this.frameAnimation != null) {
			this.frameAnimation.update(((function($this) {
				var $r;
				if(com_genome2d_node_GNode.g2d_core == null) {
					if(com_genome2d_Genome2D.g2d_instance == null) {
						com_genome2d_Genome2D.g2d_instantiable = true;
						new com_genome2d_Genome2D();
						com_genome2d_Genome2D.g2d_instantiable = false;
					}
					com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
				}
				$r = com_genome2d_node_GNode.g2d_core;
				return $r;
			}(this))).getCurrentFrameDeltaTime());
			this.texture = this.frameAnimation.currentFrameTexture;
		}
		if(this.texture != null) {
			if(p_useMatrix && !this.ignoreMatrix) {
				var matrix;
				matrix = ((function($this) {
					var $r;
					if(com_genome2d_node_GNode.g2d_core == null) {
						if(com_genome2d_Genome2D.g2d_instance == null) {
							com_genome2d_Genome2D.g2d_instantiable = true;
							new com_genome2d_Genome2D();
							com_genome2d_Genome2D.g2d_instantiable = false;
						}
						com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
					}
					$r = com_genome2d_node_GNode.g2d_core;
					return $r;
				}(this))).g2d_renderMatrix;
				((function($this) {
					var $r;
					if(com_genome2d_node_GNode.g2d_core == null) {
						if(com_genome2d_Genome2D.g2d_instance == null) {
							com_genome2d_Genome2D.g2d_instantiable = true;
							new com_genome2d_Genome2D();
							com_genome2d_Genome2D.g2d_instantiable = false;
						}
						com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
					}
					$r = com_genome2d_node_GNode.g2d_core;
					return $r;
				}(this))).getContext().drawMatrix(this.texture,matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty,this.g2d_node.g2d_worldRed,this.g2d_node.g2d_worldGreen,this.g2d_node.g2d_worldBlue,this.g2d_node.g2d_worldAlpha,this.blendMode,this.filter);
			} else ((function($this) {
				var $r;
				if(com_genome2d_node_GNode.g2d_core == null) {
					if(com_genome2d_Genome2D.g2d_instance == null) {
						com_genome2d_Genome2D.g2d_instantiable = true;
						new com_genome2d_Genome2D();
						com_genome2d_Genome2D.g2d_instantiable = false;
					}
					com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
				}
				$r = com_genome2d_node_GNode.g2d_core;
				return $r;
			}(this))).getContext().draw(this.texture,this.g2d_node.g2d_worldX,this.g2d_node.g2d_worldY,this.g2d_node.g2d_worldScaleX,this.g2d_node.g2d_worldScaleY,this.g2d_node.g2d_worldRotation,this.g2d_node.g2d_worldRed,this.g2d_node.g2d_worldGreen,this.g2d_node.g2d_worldBlue,this.g2d_node.g2d_worldAlpha,this.blendMode,this.filter);
		}
	}
	,getPrototype: function(p_prototypeXml) {
		p_prototypeXml = com_genome2d_proto_GPrototypeFactory.g2d_getPrototype(this,p_prototypeXml,com_genome2d_components_renderable_GSprite.PROTOTYPE_NAME,com_genome2d_components_renderable_GSprite.PROTOTYPE_PROPERTY_NAMES,com_genome2d_components_renderable_GSprite.PROTOTYPE_PROPERTY_TYPES,com_genome2d_components_renderable_GSprite.PROTOTYPE_PROPERTY_DEFAULTS,com_genome2d_components_renderable_GSprite.PROTOTYPE_PROPERTY_EXTRAS);
		return com_genome2d_components_renderable_GTexturedQuad.prototype.getPrototype.call(this,p_prototypeXml);
	}
	,bindPrototype: function(p_prototypeXml) {
		com_genome2d_components_renderable_GTexturedQuad.prototype.bindPrototype.call(this,p_prototypeXml);
		com_genome2d_proto_GPrototypeFactory.g2d_bindPrototype(this,p_prototypeXml,com_genome2d_components_renderable_GSprite.PROTOTYPE_PROPERTY_NAMES,com_genome2d_components_renderable_GSprite.PROTOTYPE_PROPERTY_TYPES,com_genome2d_components_renderable_GSprite.PROTOTYPE_PROPERTY_EXTRAS);
	}
	,__class__: com_genome2d_components_renderable_GSprite
});
var com_genome2d_components_renderable_particles_GSimpleParticleSystem = function() {
	this.g2d_activeParticles = 0;
	this.g2d_accumulatedEmission = 0;
	this.g2d_accumulatedTime = 0;
	this.burst = false;
	this.initialAngleVariance = 0;
	this.initialAngle = 0;
	this.dispersionAngleVariance = 0;
	this.dispersionAngle = 0;
	this.dispersionYVariance = 0;
	this.dispersionXVariance = 0;
	this.endAlphaVariance = 0;
	this.endAlpha = 1;
	this.endBlueVariance = 0;
	this.endBlue = 1;
	this.endGreenVariance = 0;
	this.endGreen = 1;
	this.endRedVariance = 0;
	this.endRed = 1;
	this.initialAlphaVariance = 0;
	this.initialAlpha = 1;
	this.initialBlueVariance = 0;
	this.initialBlue = 1;
	this.initialGreenVariance = 0;
	this.initialGreen = 1;
	this.initialRedVariance = 0;
	this.initialRed = 1;
	this.initialAngularVelocityVariance = 0;
	this.initialAngularVelocity = 0;
	this.initialAccelerationVariance = 0;
	this.initialAcceleration = 0;
	this.initialVelocityVariance = 0;
	this.initialVelocity = 0;
	this.emissionDelay = 0;
	this.emissionTime = 1;
	this.emissionVariance = 0;
	this.emission = 1;
	this.energyVariance = 0;
	this.energy = 0;
	this.endScaleVariance = 0;
	this.endScale = 1;
	this.initialScaleVariance = 0;
	this.initialScale = 1;
	this.useWorldSpace = false;
	this.emit = false;
	this.blendMode = 1;
	com_genome2d_components_GComponent.call(this);
};
com_genome2d_components_renderable_particles_GSimpleParticleSystem.__name__ = true;
com_genome2d_components_renderable_particles_GSimpleParticleSystem.__interfaces__ = [com_genome2d_components_renderable_IGRenderable];
com_genome2d_components_renderable_particles_GSimpleParticleSystem.__super__ = com_genome2d_components_GComponent;
com_genome2d_components_renderable_particles_GSimpleParticleSystem.prototype = $extend(com_genome2d_components_GComponent.prototype,{
	get_initialColor: function() {
		var red = (this.initialRed * 255 | 0) << 16;
		var green = (this.initialGreen * 255 | 0) << 8;
		var blue = this.initialBlue * 255 | 0;
		return red + green + blue;
	}
	,set_initialColor: function(p_value) {
		this.initialRed = (p_value >> 16 & 255 | 0) / 255;
		this.initialGreen = (p_value >> 8 & 255 | 0) / 255;
		this.initialBlue = (p_value & 255 | 0) / 255;
		return p_value;
	}
	,get_endColor: function() {
		var red = (this.endRed * 255 | 0) << 16;
		var green = (this.endGreen * 255 | 0) << 8;
		var blue = this.endBlue * 255 | 0;
		return red + green + blue | 0;
	}
	,set_endColor: function(p_value) {
		this.endRed = (p_value >> 16 & 255) / 255;
		this.endGreen = (p_value >> 8 & 255) / 255;
		this.endBlue = (p_value & 255) / 255;
		return p_value;
	}
	,get_settings: function() {
		return this.blendMode + "|" + Std.string(this.emit) + "|" + Std.string(this.useWorldSpace) + "|" + this.initialScale + "|" + this.initialScaleVariance + "|" + this.endScale + "|" + this.endScaleVariance + "|" + this.energy + "|" + this.energyVariance + "|" + this.emission + "|" + this.emissionVariance + "|" + this.emissionTime + "|" + this.emissionDelay + "|" + this.initialVelocity + "|" + this.initialVelocityVariance + "|" + this.initialAcceleration + "|" + this.initialAccelerationVariance + "|" + this.initialAngularVelocity + "|" + this.initialAngularVelocityVariance + "|" + this.initialRed + "|" + this.initialRedVariance + "|" + this.initialGreen + "|" + this.initialGreenVariance + "|" + this.initialBlue + "|" + this.initialBlueVariance + "|" + this.initialAlpha + "|" + this.initialAlphaVariance + "|" + this.endRed + "|" + this.endRedVariance + "|" + this.endGreen + "|" + this.endGreenVariance + "|" + this.endBlue + "|" + this.endBlueVariance + "|" + this.endAlpha + "|" + this.endAlphaVariance + "|" + this.dispersionXVariance + "|" + this.dispersionYVariance + "|" + this.dispersionAngle + "|" + this.dispersionAngleVariance + "|" + this.initialAngle + "|" + this.initialAngleVariance + "|" + Std.string(this.burst) + "|" + this.texture.g2d_id;
	}
	,set_settings: function(p_value) {
		var split = p_value.split("|");
		this.blendMode = Std.parseInt(split[0]);
		if(split[1] == "true") this.emit = true; else this.emit = false;
		if(split[2] == "true") this.useWorldSpace = true; else this.useWorldSpace = false;
		this.initialScale = parseFloat(split[3]);
		this.initialScaleVariance = parseFloat(split[4]);
		this.endScale = parseFloat(split[5]);
		this.endScaleVariance = parseFloat(split[6]);
		this.energy = parseFloat(split[7]);
		this.energyVariance = parseFloat(split[8]);
		this.emission = Std.parseInt(split[9]);
		this.emissionVariance = Std.parseInt(split[10]);
		this.emissionTime = parseFloat(split[11]);
		this.emissionDelay = parseFloat(split[12]);
		this.initialVelocity = parseFloat(split[13]);
		this.initialVelocityVariance = parseFloat(split[14]);
		this.initialAcceleration = parseFloat(split[15]);
		this.initialAccelerationVariance = parseFloat(split[16]);
		this.initialAngularVelocity = parseFloat(split[17]);
		this.initialAngularVelocityVariance = parseFloat(split[18]);
		this.initialRed = parseFloat(split[19]);
		this.initialRedVariance = parseFloat(split[20]);
		this.initialGreen = parseFloat(split[21]);
		this.initialGreenVariance = parseFloat(split[22]);
		this.initialBlue = parseFloat(split[23]);
		this.initialBlueVariance = parseFloat(split[24]);
		this.initialAlpha = parseFloat(split[25]);
		this.initialAlphaVariance = parseFloat(split[26]);
		this.endRed = parseFloat(split[27]);
		this.endRedVariance = parseFloat(split[28]);
		this.endGreen = parseFloat(split[29]);
		this.endGreenVariance = parseFloat(split[30]);
		this.endBlue = parseFloat(split[31]);
		this.endBlueVariance = parseFloat(split[32]);
		this.endAlpha = parseFloat(split[33]);
		this.endAlphaVariance = parseFloat(split[34]);
		this.dispersionXVariance = parseFloat(split[35]);
		this.dispersionYVariance = parseFloat(split[36]);
		this.dispersionAngle = parseFloat(split[37]);
		this.dispersionAngleVariance = parseFloat(split[38]);
		this.initialAngle = parseFloat(split[39]);
		this.initialAngleVariance = parseFloat(split[40]);
		if(split[41] == "true") this.burst = true; else this.burst = false;
		this.texture = com_genome2d_textures_GTextureManager.getTexture(split[42]);
		return p_value;
	}
	,setInitialParticlePosition: function(p_particle) {
		if(this.useWorldSpace) p_particle.g2d_x = this.g2d_node.g2d_worldX; else p_particle.g2d_x = 0;
		if(this.dispersionXVariance > 0) p_particle.g2d_x += this.dispersionXVariance * Math.random() - this.dispersionXVariance * .5;
		if(this.useWorldSpace) p_particle.g2d_y = this.g2d_node.g2d_worldY; else p_particle.g2d_y = 0;
		if(this.dispersionYVariance > 0) p_particle.g2d_y += this.dispersionYVariance * Math.random() - this.dispersionYVariance * .5;
		p_particle.g2d_rotation = this.initialAngle;
		if(this.initialAngleVariance > 0) p_particle.g2d_rotation += this.initialAngleVariance * Math.random();
		p_particle.g2d_scaleX = p_particle.g2d_scaleY = this.initialScale;
		if(this.initialScaleVariance > 0) {
			var sd = this.initialScaleVariance * Math.random();
			p_particle.g2d_scaleX += sd;
			p_particle.g2d_scaleY += sd;
		}
	}
	,init: function() {
		((function($this) {
			var $r;
			if(com_genome2d_node_GNode.g2d_core == null) {
				if(com_genome2d_Genome2D.g2d_instance == null) {
					com_genome2d_Genome2D.g2d_instantiable = true;
					new com_genome2d_Genome2D();
					com_genome2d_Genome2D.g2d_instantiable = false;
				}
				com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
			}
			$r = com_genome2d_node_GNode.g2d_core;
			return $r;
		}(this))).get_onUpdate().add($bind(this,this.update));
	}
	,setup: function(p_maxCount,p_precacheCount,p_disposeImmediately) {
		if(p_disposeImmediately == null) p_disposeImmediately = true;
		if(p_precacheCount == null) p_precacheCount = 0;
		if(p_maxCount == null) p_maxCount = 0;
		this.g2d_accumulatedTime = 0;
		this.g2d_accumulatedEmission = 0;
	}
	,g2d_createParticle: function() {
		var particle = com_genome2d_particles_GSimpleParticle.g2d_get();
		if(this.g2d_firstParticle != null) {
			particle.g2d_next = this.g2d_firstParticle;
			this.g2d_firstParticle.g2d_previous = particle;
			this.g2d_firstParticle = particle;
		} else {
			this.g2d_firstParticle = particle;
			this.g2d_lastParticle = particle;
		}
		return particle;
	}
	,forceBurst: function() {
		var currentEmission = Std["int"](this.emission + this.emissionVariance * Math.random());
		var _g = 0;
		while(_g < currentEmission) {
			var i = _g++;
			this.g2d_activateParticle();
		}
		this.emit = false;
	}
	,update: function(p_deltaTime) {
		this.g2d_lastUpdateTime = p_deltaTime;
		if(this.emit) {
			if(this.burst) this.forceBurst(); else {
				this.g2d_accumulatedTime += p_deltaTime * .001;
				var time = this.g2d_accumulatedTime % (this.emissionTime + this.emissionDelay);
				if(time <= this.emissionTime) {
					var updateEmission = this.emission;
					if(this.emissionVariance > 0) updateEmission += this.emissionVariance * Math.random();
					this.g2d_accumulatedEmission += updateEmission * p_deltaTime * .001;
					while(this.g2d_accumulatedEmission > 0) {
						this.g2d_activateParticle();
						this.g2d_accumulatedEmission--;
					}
				}
			}
		}
		var particle = this.g2d_firstParticle;
		while(particle != null) {
			var next = particle.g2d_next;
			particle.g2d_update(this,this.g2d_lastUpdateTime);
			particle = next;
		}
	}
	,render: function(p_camera,p_useMatrix) {
		if(this.texture == null) return;
		var particle = this.g2d_firstParticle;
		while(particle != null) {
			var next = particle.g2d_next;
			var tx;
			var ty;
			if(this.useWorldSpace) {
				tx = particle.g2d_x;
				ty = particle.g2d_y;
			} else {
				tx = this.g2d_node.g2d_worldX + particle.g2d_x;
				ty = this.g2d_node.g2d_worldY + particle.g2d_y;
			}
			((function($this) {
				var $r;
				if(com_genome2d_node_GNode.g2d_core == null) {
					if(com_genome2d_Genome2D.g2d_instance == null) {
						com_genome2d_Genome2D.g2d_instantiable = true;
						new com_genome2d_Genome2D();
						com_genome2d_Genome2D.g2d_instantiable = false;
					}
					com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
				}
				$r = com_genome2d_node_GNode.g2d_core;
				return $r;
			}(this))).getContext().draw(particle.g2d_texture,tx,ty,particle.g2d_scaleX * this.g2d_node.g2d_worldScaleX,particle.g2d_scaleY * this.g2d_node.g2d_worldScaleY,particle.g2d_rotation,particle.g2d_red,particle.g2d_green,particle.g2d_blue,particle.g2d_alpha,this.blendMode,null);
			particle = next;
		}
	}
	,g2d_activateParticle: function() {
		var particle = this.g2d_createParticle();
		this.setInitialParticlePosition(particle);
		particle.g2d_init(this);
	}
	,deactivateParticle: function(p_particle) {
		if(p_particle == this.g2d_lastParticle) this.g2d_lastParticle = this.g2d_lastParticle.g2d_previous;
		if(p_particle == this.g2d_firstParticle) this.g2d_firstParticle = this.g2d_firstParticle.g2d_next;
		p_particle.g2d_dispose();
	}
	,dispose: function() {
		while(this.g2d_firstParticle != null) this.deactivateParticle(this.g2d_firstParticle);
		((function($this) {
			var $r;
			if(com_genome2d_node_GNode.g2d_core == null) {
				if(com_genome2d_Genome2D.g2d_instance == null) {
					com_genome2d_Genome2D.g2d_instantiable = true;
					new com_genome2d_Genome2D();
					com_genome2d_Genome2D.g2d_instantiable = false;
				}
				com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
			}
			$r = com_genome2d_node_GNode.g2d_core;
			return $r;
		}(this))).get_onUpdate().remove($bind(this,this.update));
		com_genome2d_components_GComponent.prototype.dispose.call(this);
	}
	,clear: function(p_disposeCachedParticles) {
		if(p_disposeCachedParticles == null) p_disposeCachedParticles = false;
	}
	,getBounds: function(p_target) {
		return null;
	}
	,captureMouseInput: function(p_input) {
	}
	,hitTest: function(p_x,p_y) {
		return false;
	}
	,getPrototype: function(p_prototypeXml) {
		p_prototypeXml = com_genome2d_proto_GPrototypeFactory.g2d_getPrototype(this,p_prototypeXml,com_genome2d_components_renderable_particles_GSimpleParticleSystem.PROTOTYPE_NAME,com_genome2d_components_renderable_particles_GSimpleParticleSystem.PROTOTYPE_PROPERTY_NAMES,com_genome2d_components_renderable_particles_GSimpleParticleSystem.PROTOTYPE_PROPERTY_TYPES,com_genome2d_components_renderable_particles_GSimpleParticleSystem.PROTOTYPE_PROPERTY_DEFAULTS,com_genome2d_components_renderable_particles_GSimpleParticleSystem.PROTOTYPE_PROPERTY_EXTRAS);
		return com_genome2d_components_GComponent.prototype.getPrototype.call(this,p_prototypeXml);
	}
	,bindPrototype: function(p_prototypeXml) {
		com_genome2d_components_GComponent.prototype.bindPrototype.call(this,p_prototypeXml);
		com_genome2d_proto_GPrototypeFactory.g2d_bindPrototype(this,p_prototypeXml,com_genome2d_components_renderable_particles_GSimpleParticleSystem.PROTOTYPE_PROPERTY_NAMES,com_genome2d_components_renderable_particles_GSimpleParticleSystem.PROTOTYPE_PROPERTY_TYPES,com_genome2d_components_renderable_particles_GSimpleParticleSystem.PROTOTYPE_PROPERTY_EXTRAS);
	}
	,__class__: com_genome2d_components_renderable_particles_GSimpleParticleSystem
	,__properties__: $extend(com_genome2d_components_GComponent.prototype.__properties__,{set_settings:"set_settings",get_settings:"get_settings",set_endColor:"set_endColor",get_endColor:"get_endColor",set_initialColor:"set_initialColor",get_initialColor:"get_initialColor"})
});
var com_genome2d_context_GBlendMode = function() { };
com_genome2d_context_GBlendMode.__name__ = true;
com_genome2d_context_GBlendMode.addBlendMode = function(p_normalFactors,p_premultipliedFactors) {
	com_genome2d_context_GBlendMode.blendFactors[0].push(p_normalFactors);
	com_genome2d_context_GBlendMode.blendFactors[1].push(p_premultipliedFactors);
	return com_genome2d_context_GBlendMode.blendFactors[0].length;
};
com_genome2d_context_GBlendMode.setBlendMode = function(p_context,p_mode,p_premultiplied) {
	var p;
	if(p_premultiplied) p = 1; else p = 0;
	p_context.blendFunc(com_genome2d_context_GBlendMode.blendFactors[p][p_mode][0],com_genome2d_context_GBlendMode.blendFactors[p][p_mode][1]);
};
var com_genome2d_context_GCamera = function() {
	this.normalizedViewHeight = 1;
	this.normalizedViewWidth = 1;
	this.normalizedViewY = 0;
	this.normalizedViewX = 0;
	this.mask = 16777215;
	this.y = 0;
	this.x = 0;
	this.scaleY = 1;
	this.scaleX = 1;
	this.rotation = 0;
};
com_genome2d_context_GCamera.__name__ = true;
com_genome2d_context_GCamera.prototype = {
	__class__: com_genome2d_context_GCamera
};
var com_genome2d_context_GContextConfig = function(p_viewRect) {
	this.enableStats = false;
	this.nativeStage = window.document.getElementById("canvas");
	this.viewRect = p_viewRect;
	if(this.nativeStage == null) {
		if(p_viewRect == null) com_genome2d_debug_GDebug.error("No canvas found",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GContextConfig.hx", lineNumber : 38, className : "com.genome2d.context.GContextConfig", methodName : "new"});
		var _this = window.document;
		this.nativeStage = _this.createElement("canvas");
		this.nativeStage.width = this.viewRect.width | 0;
		this.nativeStage.height = this.viewRect.height | 0;
		window.document.body.appendChild(this.nativeStage);
	} else if(this.viewRect == null) this.viewRect = new com_genome2d_geom_GRectangle(0,0,this.nativeStage.width,this.nativeStage.height);
	this.contextClass = com_genome2d_context_webgl_GWebGLContext;
};
com_genome2d_context_GContextConfig.__name__ = true;
com_genome2d_context_GContextConfig.prototype = {
	__class__: com_genome2d_context_GContextConfig
};
var com_genome2d_context_GContextFeature = function() { };
com_genome2d_context_GContextFeature.__name__ = true;
var com_genome2d_context_GRequestAnimationFrame = function() { };
com_genome2d_context_GRequestAnimationFrame.__name__ = true;
com_genome2d_context_GRequestAnimationFrame.request = function(method) {
	var requestAnimationFrame = window.requestAnimationFrame || (window.webkitRequestAnimationFrame || (window.mozRequestAnimationFrame || (window.oRequestAnimationFrame || (window.msRequestAnimationFrame || function(method1,element) {
		window.setTimeout(method1,16.666666666666668);
	}))));
	requestAnimationFrame(method);
};
var com_genome2d_context_GViewport = function(p_cameraController,p_viewWidth,p_viewHeight,p_autoResize) {
	if(p_autoResize == null) p_autoResize = true;
	this.g2d_previousZoom = 1;
	this.g2d_hAlign = 1;
	this.g2d_vAlign = 1;
	this.g2d_cameraController = p_cameraController;
	this.viewLeft = 0;
	this.viewTop = 0;
	this.viewRight = p_viewWidth;
	this.viewBottom = p_viewHeight;
	var rect = ((function($this) {
		var $r;
		if(com_genome2d_Genome2D.g2d_instance == null) {
			com_genome2d_Genome2D.g2d_instantiable = true;
			new com_genome2d_Genome2D();
			com_genome2d_Genome2D.g2d_instantiable = false;
		}
		$r = com_genome2d_Genome2D.g2d_instance;
		return $r;
	}(this))).getContext().getStageViewRect();
	this.resize_handler(rect.width,rect.height);
	if(p_autoResize) ((function($this) {
		var $r;
		if(com_genome2d_Genome2D.g2d_instance == null) {
			com_genome2d_Genome2D.g2d_instantiable = true;
			new com_genome2d_Genome2D();
			com_genome2d_Genome2D.g2d_instantiable = false;
		}
		$r = com_genome2d_Genome2D.g2d_instance;
		return $r;
	}(this))).getContext().onResize.addWithPriority($bind(this,this.resize_handler));
};
com_genome2d_context_GViewport.__name__ = true;
com_genome2d_context_GViewport.prototype = {
	get_vAlign: function() {
		return this.g2d_vAlign;
	}
	,set_vAlign: function(p_value) {
		return this.g2d_vAlign = p_value;
	}
	,get_hAlign: function() {
		return this.g2d_hAlign;
	}
	,set_hAlign: function(p_value) {
		return this.g2d_hAlign = p_value;
	}
	,dispose: function() {
		((function($this) {
			var $r;
			if(com_genome2d_Genome2D.g2d_instance == null) {
				com_genome2d_Genome2D.g2d_instantiable = true;
				new com_genome2d_Genome2D();
				com_genome2d_Genome2D.g2d_instantiable = false;
			}
			$r = com_genome2d_Genome2D.g2d_instance;
			return $r;
		}(this))).getContext().onResize.remove($bind(this,this.resize_handler));
	}
	,resize_handler: function(p_width,p_height) {
		var aw = p_width / this.viewRight;
		var ah = p_height / this.viewBottom;
		this.aspectRatio = p_width / p_height;
		this.zoom = Math.min(aw,ah);
		this.g2d_cameraController.set_zoom(this.zoom);
		if(aw < ah) {
			this.screenLeft = 0;
			this.screenRight = this.viewRight;
			var _g = this.g2d_vAlign;
			switch(_g) {
			case 1:
				this.screenTop = (this.viewBottom * this.zoom - p_height) / (2 * this.zoom);
				this.screenBottom = this.viewBottom + (p_height - this.zoom * this.viewBottom) / (2 * this.zoom);
				this.g2d_cameraController.g2d_node.setPosition(this.viewRight * .5,this.viewBottom * .5);
				break;
			case 0:
				this.screenTop = 0;
				this.screenBottom = this.viewBottom + (p_height - this.zoom * this.viewBottom) / this.zoom;
				this.g2d_cameraController.g2d_node.setPosition(this.viewRight * .5,this.viewBottom * .5 + (p_height - this.zoom * this.viewBottom) / (2 * this.zoom));
				break;
			case 2:
				this.screenTop = (this.viewBottom * this.zoom - p_height) / this.zoom;
				this.screenBottom = p_height;
				this.g2d_cameraController.g2d_node.setPosition(this.viewRight * .5,this.viewBottom * .5 - (p_height - this.zoom * this.viewBottom) / (2 * this.zoom));
				break;
			}
		} else {
			var _g1 = this.g2d_hAlign;
			switch(_g1) {
			case 1:
				this.screenLeft = (this.zoom * this.viewRight - p_width) / (2 * this.zoom);
				this.screenRight = this.viewRight + (p_width - this.zoom * this.viewRight) / (2 * this.zoom);
				this.g2d_cameraController.g2d_node.setPosition(this.viewRight * .5,this.viewBottom * .5);
				break;
			case 0:
				this.screenLeft = 0;
				this.screenRight = this.viewRight + (p_width - this.zoom * this.viewRight) / this.zoom;
				this.g2d_cameraController.g2d_node.setPosition(this.viewRight * .5 + (p_width - this.zoom * this.viewRight) / (2 * this.zoom),this.viewBottom * .5);
				break;
			case 2:
				this.screenLeft = (this.zoom * this.viewRight - p_width) / this.zoom;
				this.screenRight = p_width;
				this.g2d_cameraController.g2d_node.setPosition(this.viewRight * .5 - (p_width - this.zoom * this.viewRight) / (2 * this.zoom),this.viewBottom * .5);
				break;
			}
			this.screenTop = 0;
			this.screenBottom = this.viewBottom;
		}
	}
	,__class__: com_genome2d_context_GViewport
	,__properties__: {set_hAlign:"set_hAlign",get_hAlign:"get_hAlign",set_vAlign:"set_vAlign",get_vAlign:"get_vAlign"}
};
var com_genome2d_context_filters_GFilter = function() {
	this.fragmentCode = "";
	this.overrideFragmentShader = false;
	this.g2d_id = Std.string(js_Boot.getClass(this));
};
com_genome2d_context_filters_GFilter.__name__ = true;
com_genome2d_context_filters_GFilter.prototype = {
	__class__: com_genome2d_context_filters_GFilter
};
var com_genome2d_context_stats_IGStats = function() { };
com_genome2d_context_stats_IGStats.__name__ = true;
com_genome2d_context_stats_IGStats.prototype = {
	__class__: com_genome2d_context_stats_IGStats
};
var com_genome2d_context_stats_GStats = function(p_canvas) {
	this.g2d_previousTime = 0;
	this.g2d_frames = 0;
	this.g2d_previousTime = new Date().getTime();
	com_genome2d_context_stats_GStats.fps = 0;
	var _this = window.document;
	this.g2d_container = _this.createElement("div");
	this.g2d_container.id = "stats";
	this.g2d_container.style.cssText = "width:" + p_canvas.clientWidth + "px;opacity:0.9;cursor:pointer";
	this.g2d_container.style.position = "absolute";
	this.g2d_container.style.left = p_canvas.offsetLeft + "px";
	this.g2d_container.style.top = p_canvas.offsetTop + "px";
	var _this1 = window.document;
	this.g2d_fpsDiv = _this1.createElement("div");
	this.g2d_fpsDiv.id = "fps";
	this.g2d_fpsDiv.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#002";
	this.g2d_container.appendChild(this.g2d_fpsDiv);
	var _this2 = window.document;
	this.g2d_fpsText = _this2.createElement("div");
	this.g2d_fpsText.id = "fpsText";
	this.g2d_fpsText.style.cssText = "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:10px;font-weight:bold;line-height:15px";
	this.g2d_fpsText.innerHTML = "FPS";
	this.g2d_fpsDiv.appendChild(this.g2d_fpsText);
	p_canvas.parentElement.appendChild(this.g2d_container);
};
com_genome2d_context_stats_GStats.__name__ = true;
com_genome2d_context_stats_GStats.__interfaces__ = [com_genome2d_context_stats_IGStats];
com_genome2d_context_stats_GStats.prototype = {
	render: function(p_context) {
		if(com_genome2d_context_stats_GStats.visible) {
			if(this.g2d_fpsDiv.parentElement == null) this.g2d_container.appendChild(this.g2d_fpsDiv);
			var time = new Date().getTime();
			this.g2d_frames++;
			if(time > this.g2d_previousTime + 1000) {
				com_genome2d_context_stats_GStats.fps = Math.round(this.g2d_frames * 1000 / (time - this.g2d_previousTime));
				this.g2d_fpsText.textContent = "FPS: " + com_genome2d_context_stats_GStats.fps + " Drawcalls: " + com_genome2d_context_stats_GStats.drawCalls;
				this.g2d_previousTime = time;
				this.g2d_frames = 0;
			}
		} else if(this.g2d_fpsDiv.parentElement != null) this.g2d_container.removeChild(this.g2d_fpsDiv);
	}
	,clear: function() {
		com_genome2d_context_stats_GStats.drawCalls = 0;
	}
	,__class__: com_genome2d_context_stats_GStats
};
var com_genome2d_input_IGInteractive = function() { };
com_genome2d_input_IGInteractive.__name__ = true;
var com_genome2d_context_webgl_GWebGLContext = function(p_config) {
	this.g2d_backgroundAlpha = 1;
	this.g2d_backgroundBlue = 0;
	this.g2d_backgroundGreen = 0;
	this.g2d_backgroundRed = 0;
	this.g2d_reinitialize = false;
	this.g2d_nativeStage = p_config.nativeStage;
	this.g2d_stageViewRect = p_config.viewRect;
	this.g2d_stats = new com_genome2d_context_stats_GStats(this.g2d_nativeStage);
	this.onInitialized = new com_genome2d_callbacks_GCallback0();
	this.onFailed = new com_genome2d_callbacks_GCallback1();
	this.onInvalidated = new com_genome2d_callbacks_GCallback0();
	this.onResize = new com_genome2d_callbacks_GCallback2();
	this.onFrame = new com_genome2d_callbacks_GCallback1();
	this.onMouseInput = new com_genome2d_callbacks_GCallback1();
	this.onKeyboardInput = new com_genome2d_callbacks_GCallback1();
};
com_genome2d_context_webgl_GWebGLContext.__name__ = true;
com_genome2d_context_webgl_GWebGLContext.__interfaces__ = [com_genome2d_input_IGInteractive];
com_genome2d_context_webgl_GWebGLContext.prototype = {
	hasFeature: function(p_feature) {
		switch(p_feature) {
		case 2:
			return true;
		}
		return false;
	}
	,getNativeStage: function() {
		return this.g2d_nativeStage;
	}
	,getNativeContext: function() {
		return this.g2d_nativeContext;
	}
	,setBackgroundColor: function(p_color,p_alpha) {
		if(p_alpha == null) p_alpha = 1;
		this.g2d_backgroundRed = (p_color >> 16 & 255 | 0) / 255;
		this.g2d_backgroundGreen = (p_color >> 8 & 255 | 0) / 255;
		this.g2d_backgroundBlue = (p_color & 255 | 0) / 255;
		this.g2d_backgroundAlpha = p_alpha;
	}
	,getActiveCamera: function() {
		return this.g2d_activeCamera;
	}
	,getDefaultCamera: function() {
		return this.g2d_defaultCamera;
	}
	,getStageViewRect: function() {
		return this.g2d_stageViewRect;
	}
	,init: function() {
		try {
			this.g2d_nativeContext = this.g2d_nativeStage.getContext("webgl");
			if(this.g2d_nativeContext == null) this.g2d_nativeContext = this.g2d_nativeStage.getContext("experimental-webgl");
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
		}
		if(this.g2d_nativeContext == null) {
			this.onFailed.dispatch("No WebGL support detected.");
			return;
		}
		com_genome2d_context_webgl_renderers_GRendererCommon.init();
		this.g2d_drawRenderer = new com_genome2d_context_webgl_renderers_GQuadTextureShaderRenderer();
		this.g2d_defaultCamera = new com_genome2d_context_GCamera();
		this.g2d_defaultCamera.x = this.g2d_stageViewRect.width / 2;
		this.g2d_defaultCamera.y = this.g2d_stageViewRect.height / 2;
		this.g2d_activeViewRect = new com_genome2d_geom_GRectangle();
		this.g2d_currentTime = new Date().getTime();
		this.g2d_nativeStage.addEventListener("mousedown",$bind(this,this.g2d_mouseEventHandler));
		this.g2d_nativeStage.addEventListener("mouseup",$bind(this,this.g2d_mouseEventHandler));
		this.g2d_nativeStage.addEventListener("mousemove",$bind(this,this.g2d_mouseEventHandler));
		this.g2d_nativeStage.addEventListener("touchstart",$bind(this,this.g2d_mouseEventHandler));
		this.g2d_nativeStage.addEventListener("touchend",$bind(this,this.g2d_mouseEventHandler));
		this.g2d_nativeStage.addEventListener("touchmove",$bind(this,this.g2d_mouseEventHandler));
		this.g2d_nativeContext.pixelStorei(37441,1);
		this.onInitialized.dispatch();
		com_genome2d_context_GRequestAnimationFrame.request($bind(this,this.g2d_enterFrameHandler));
	}
	,resize: function(p_rect) {
	}
	,setActiveCamera: function(p_camera) {
		this.g2d_projectionMatrix = new Float32Array([2.0 / this.g2d_stageViewRect.width,0.0,0.0,-1.0,0.0,-2. / this.g2d_stageViewRect.height,0.0,1.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0]);
	}
	,getMaskRect: function() {
		return null;
	}
	,setMaskRect: function(p_maskRect) {
	}
	,begin: function() {
		this.g2d_stats.clear();
		this.g2d_activeRenderer = null;
		this.setActiveCamera(this.g2d_defaultCamera);
		this.g2d_nativeContext.viewport(0,0,this.g2d_stageViewRect.width | 0,this.g2d_stageViewRect.height | 0);
		this.g2d_nativeContext.clearColor(this.g2d_backgroundRed,this.g2d_backgroundGreen,this.g2d_backgroundBlue,this.g2d_backgroundAlpha);
		this.g2d_nativeContext.clear(16640);
		this.g2d_nativeContext.disable(2929);
		this.g2d_nativeContext.enable(3042);
		com_genome2d_context_GBlendMode.setBlendMode(this.g2d_nativeContext,1,true);
		return true;
	}
	,draw: function(p_texture,p_x,p_y,p_scaleX,p_scaleY,p_rotation,p_red,p_green,p_blue,p_alpha,p_blendMode,p_filter) {
		if(p_blendMode == null) p_blendMode = 1;
		if(p_alpha == null) p_alpha = 1;
		if(p_blue == null) p_blue = 1;
		if(p_green == null) p_green = 1;
		if(p_red == null) p_red = 1;
		if(p_rotation == null) p_rotation = 0;
		if(p_scaleY == null) p_scaleY = 1;
		if(p_scaleX == null) p_scaleX = 1;
		this.bindRenderer(this.g2d_drawRenderer);
		this.g2d_drawRenderer.draw(p_x,p_y,p_scaleX,p_scaleY,p_rotation,p_red,p_green,p_blue,p_alpha,p_texture);
	}
	,drawMatrix: function(p_texture,p_a,p_b,p_c,p_d,p_tx,p_ty,p_red,p_green,p_blue,p_alpha,p_blendMode,p_filter) {
		if(p_blendMode == null) p_blendMode = 1;
		if(p_alpha == null) p_alpha = 1;
		if(p_blue == null) p_blue = 1;
		if(p_green == null) p_green = 1;
		if(p_red == null) p_red = 1;
	}
	,drawSource: function(p_texture,p_sourceX,p_sourceY,p_sourceWidth,p_sourceHeight,p_sourcePivotX,p_sourcePivotY,p_x,p_y,p_scaleX,p_scaleY,p_rotation,p_red,p_green,p_blue,p_alpha,p_blendMode,p_filter) {
		if(p_blendMode == null) p_blendMode = 1;
		if(p_alpha == null) p_alpha = 1;
		if(p_blue == null) p_blue = 1;
		if(p_green == null) p_green = 1;
		if(p_red == null) p_red = 1;
		if(p_rotation == null) p_rotation = 0;
		if(p_scaleY == null) p_scaleY = 1;
		if(p_scaleX == null) p_scaleX = 1;
	}
	,drawPoly: function(p_texture,p_vertices,p_uvs,p_x,p_y,p_scaleX,p_scaleY,p_rotation,p_red,p_green,p_blue,p_alpha,p_blendMode,p_filter) {
		if(p_blendMode == null) p_blendMode = 1;
		if(p_alpha == null) p_alpha = 1;
		if(p_blue == null) p_blue = 1;
		if(p_green == null) p_green = 1;
		if(p_red == null) p_red = 1;
		if(p_rotation == null) p_rotation = 0;
		if(p_scaleY == null) p_scaleY = 1;
		if(p_scaleX == null) p_scaleX = 1;
	}
	,bindRenderer: function(p_renderer) {
		if(p_renderer != this.g2d_activeRenderer || this.g2d_activeRenderer == null) {
			if(this.g2d_activeRenderer != null) {
				this.g2d_activeRenderer.push();
				this.g2d_activeRenderer.clear();
			}
			this.g2d_activeRenderer = p_renderer;
			this.g2d_activeRenderer.bind(this,this.g2d_reinitialize);
		}
	}
	,end: function() {
		if(this.g2d_activeRenderer != null) {
			this.g2d_activeRenderer.push();
			this.g2d_activeRenderer.clear();
		}
		this.g2d_reinitialize = false;
	}
	,clearStencil: function() {
	}
	,renderToStencil: function(p_stencilLayer) {
	}
	,renderToColor: function(p_stencilLayer) {
	}
	,getRenderTargetMatrix: function() {
		return null;
	}
	,getRenderTarget: function() {
		return null;
	}
	,setRenderTarget: function(p_texture,p_transform,p_clear) {
		if(p_clear == null) p_clear = false;
	}
	,g2d_enterFrameHandler: function() {
		var currentTime = new Date().getTime();
		this.g2d_currentDeltaTime = currentTime - this.g2d_currentTime;
		this.g2d_currentTime = currentTime;
		this.g2d_stats.render(this);
		this.onFrame.dispatch(this.g2d_currentDeltaTime);
		com_genome2d_context_GRequestAnimationFrame.request($bind(this,this.g2d_enterFrameHandler));
	}
	,g2d_mouseEventHandler: function(event) {
		var captured = false;
		event.preventDefault();
		event.stopPropagation();
		var mx;
		var my;
		if(js_Boot.__instanceof(event,MouseEvent)) {
			var me = event;
			mx = me.pageX - this.g2d_nativeStage.offsetLeft;
			my = me.pageY - this.g2d_nativeStage.offsetTop;
		} else {
			var te = event;
			mx = te.targetTouches[0].pageX;
			my = te.targetTouches[0].pageY;
		}
		var input = new com_genome2d_input_GMouseInput(this,this,com_genome2d_input_GMouseInputType.fromNative(event.type),mx,my);
		input.worldX = input.contextX = mx;
		input.worldY = input.contextY = my;
		input.buttonDown = false;
		input.ctrlKey = false;
		input.altKey = false;
		input.shiftKey = false;
		input.delta = 0;
		input.nativeCaptured = captured;
		this.onMouseInput.dispatch(input);
		this.g2d_onMouseInputInternal(input);
	}
	,dispose: function() {
		this.g2d_onMouseInputInternal = null;
	}
	,setDepthTest: function(p_depthMask,p_compareMode) {
	}
	,setRenderTargets: function(p_textures,p_transform,p_clear) {
		if(p_clear == null) p_clear = false;
	}
	,setBlendMode: function(p_blendMode,p_premultiplied) {
	}
	,__class__: com_genome2d_context_webgl_GWebGLContext
};
var com_genome2d_context_webgl_renderers_IGRenderer = function() { };
com_genome2d_context_webgl_renderers_IGRenderer.__name__ = true;
com_genome2d_context_webgl_renderers_IGRenderer.prototype = {
	__class__: com_genome2d_context_webgl_renderers_IGRenderer
};
var com_genome2d_context_webgl_renderers_GQuadTextureShaderRenderer = function() {
	this.g2d_useSeparatedAlphaPipeline = false;
	this.g2d_activeAlpha = false;
	this.g2d_quadCount = 0;
	this.g2d_initialized = false;
};
com_genome2d_context_webgl_renderers_GQuadTextureShaderRenderer.__name__ = true;
com_genome2d_context_webgl_renderers_GQuadTextureShaderRenderer.__interfaces__ = [com_genome2d_context_webgl_renderers_IGRenderer];
com_genome2d_context_webgl_renderers_GQuadTextureShaderRenderer.prototype = {
	getShader: function(shaderSrc,shaderType) {
		var shader = this.g2d_nativeContext.createShader(shaderType);
		this.g2d_nativeContext.shaderSource(shader,shaderSrc);
		this.g2d_nativeContext.compileShader(shader);
		if(!this.g2d_nativeContext.getShaderParameter(shader,35713)) {
			com_genome2d_debug_GDebug.error("Shader compilation error: " + this.g2d_nativeContext.getShaderInfoLog(shader),null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GQuadTextureShaderRenderer.hx", lineNumber : 152, className : "com.genome2d.context.webgl.renderers.GQuadTextureShaderRenderer", methodName : "getShader"});
			return null;
		}
		return shader;
	}
	,initialize: function(p_context) {
		this.g2d_context = p_context;
		this.g2d_nativeContext = this.g2d_context.g2d_nativeContext;
		var fragmentShader = this.getShader("\r\n\t\t\t//#ifdef GL_ES\r\n\t\t\tprecision lowp float;\r\n\t\t\t//#endif\r\n\r\n\t\t\tvarying vec2 vTexCoord;\r\n\t\t\tvarying vec4 vColor;\r\n\r\n\t\t\tuniform sampler2D sTexture;\r\n\r\n\t\t\tvoid main(void)\r\n\t\t\t{\r\n\t\t\t\tgl_FragColor = texture2D(sTexture, vTexCoord) * vColor;\r\n\t\t\t}\r\n\t\t",35632);
		var vertexShader = this.getShader("\r\n\t\t\tuniform mat4 projectionMatrix;\r\n\t\t\tuniform vec4 transforms[" + 120 + "];\r\n\r\n\t\t\tattribute vec2 aPosition;\r\n\t\t\tattribute vec2 aTexCoord;\r\n\t\t\tattribute vec4 aConstantIndex;\r\n\r\n\t\t\tvarying vec2 vTexCoord;\r\n\t\t\tvarying vec4 vColor;\r\n\r\n\t\t\tvoid main(void)\r\n\t\t\t{\r\n\t\t\t\tgl_Position = vec4(aPosition.x*transforms[int(aConstantIndex.z)].x, aPosition.y*transforms[int(aConstantIndex.z)].y, 0, 1);\r\n\t\t\t\tgl_Position = vec4(gl_Position.x - transforms[int(aConstantIndex.z)].z, gl_Position.y - transforms[int(aConstantIndex.z)].w, 0, 1);\r\n\t\t\t\tfloat c = cos(transforms[int(aConstantIndex.x)].z);\r\n\t\t\t\tfloat s = sin(transforms[int(aConstantIndex.x)].z);\r\n\t\t\t\tgl_Position = vec4(gl_Position.x * c - gl_Position.y * s, gl_Position.x * s + gl_Position.y * c, 0, 1);\r\n\t\t\t\tgl_Position = vec4(gl_Position.x+transforms[int(aConstantIndex.x)].x, gl_Position.y+transforms[int(aConstantIndex.x)].y, 0, 1);\r\n\t\t\t\tgl_Position = gl_Position * projectionMatrix;\r\n\r\n\t\t\t\tvTexCoord = vec2(aTexCoord.x*transforms[int(aConstantIndex.y)].z+transforms[int(aConstantIndex.y)].x, aTexCoord.y*transforms[int(aConstantIndex.y)].w+transforms[int(aConstantIndex.y)].y);\r\n\t\t\t\tvColor = transforms[int(aConstantIndex.w)];\r\n\t\t\t}\r\n\t\t ",35633);
		this.g2d_program = this.g2d_nativeContext.createProgram();
		this.g2d_nativeContext.attachShader(this.g2d_program,vertexShader);
		this.g2d_nativeContext.attachShader(this.g2d_program,fragmentShader);
		this.g2d_nativeContext.linkProgram(this.g2d_program);
		this.g2d_nativeContext.useProgram(this.g2d_program);
		var vertices = new Float32Array(240);
		var uvs = new Float32Array(240);
		var registerIndices = new Float32Array(360);
		var registerIndicesAlpha = new Float32Array(480);
		var _g = 0;
		while(_g < 30) {
			var i = _g++;
			vertices[i * 8] = com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_VERTICES[0];
			vertices[i * 8 + 1] = com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_VERTICES[1];
			vertices[i * 8 + 2] = com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_VERTICES[2];
			vertices[i * 8 + 3] = com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_VERTICES[3];
			vertices[i * 8 + 4] = com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_VERTICES[4];
			vertices[i * 8 + 5] = com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_VERTICES[5];
			vertices[i * 8 + 6] = com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_VERTICES[6];
			vertices[i * 8 + 7] = com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_VERTICES[7];
			uvs[i * 8] = com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_UVS[0];
			uvs[i * 8 + 1] = com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_UVS[1];
			uvs[i * 8 + 2] = com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_UVS[2];
			uvs[i * 8 + 3] = com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_UVS[3];
			uvs[i * 8 + 4] = com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_UVS[4];
			uvs[i * 8 + 5] = com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_UVS[5];
			uvs[i * 8 + 6] = com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_UVS[6];
			uvs[i * 8 + 7] = com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_UVS[7];
			var index = i * 3;
			registerIndices[index * 4] = index;
			registerIndices[index * 4 + 1] = index + 1;
			registerIndices[index * 4 + 2] = index + 2;
			registerIndices[index * 4 + 3] = index;
			registerIndices[index * 4 + 4] = index + 1;
			registerIndices[index * 4 + 5] = index + 2;
			registerIndices[index * 4 + 6] = index;
			registerIndices[index * 4 + 7] = index + 1;
			registerIndices[index * 4 + 8] = index + 2;
			registerIndices[index * 4 + 9] = index;
			registerIndices[index * 4 + 10] = index + 1;
			registerIndices[index * 4 + 11] = index + 2;
			var index1 = i * 4;
			registerIndicesAlpha[index1 * 4] = index1;
			registerIndicesAlpha[index1 * 4 + 1] = index1 + 1;
			registerIndicesAlpha[index1 * 4 + 2] = index1 + 2;
			registerIndicesAlpha[index1 * 4 + 3] = index1 + 3;
			registerIndicesAlpha[index1 * 4 + 4] = index1;
			registerIndicesAlpha[index1 * 4 + 5] = index1 + 1;
			registerIndicesAlpha[index1 * 4 + 6] = index1 + 2;
			registerIndicesAlpha[index1 * 4 + 7] = index1 + 3;
			registerIndicesAlpha[index1 * 4 + 8] = index1;
			registerIndicesAlpha[index1 * 4 + 9] = index1 + 1;
			registerIndicesAlpha[index1 * 4 + 10] = index1 + 2;
			registerIndicesAlpha[index1 * 4 + 11] = index1 + 3;
			registerIndicesAlpha[index1 * 4 + 12] = index1;
			registerIndicesAlpha[index1 * 4 + 13] = index1 + 1;
			registerIndicesAlpha[index1 * 4 + 14] = index1 + 2;
			registerIndicesAlpha[index1 * 4 + 15] = index1 + 3;
		}
		this.g2d_geometryBuffer = this.g2d_nativeContext.createBuffer();
		this.g2d_nativeContext.bindBuffer(34962,this.g2d_geometryBuffer);
		this.g2d_nativeContext.bufferData(34962,vertices,35040);
		this.g2d_uvBuffer = this.g2d_nativeContext.createBuffer();
		this.g2d_nativeContext.bindBuffer(34962,this.g2d_uvBuffer);
		this.g2d_nativeContext.bufferData(34962,uvs,35040);
		this.g2d_constantIndexBuffer = this.g2d_nativeContext.createBuffer();
		this.g2d_nativeContext.bindBuffer(34962,this.g2d_constantIndexBuffer);
		this.g2d_nativeContext.bufferData(34962,registerIndices,35040);
		this.g2d_constantIndexAlphaBuffer = this.g2d_nativeContext.createBuffer();
		this.g2d_nativeContext.bindBuffer(34962,this.g2d_constantIndexAlphaBuffer);
		this.g2d_nativeContext.bufferData(34962,registerIndicesAlpha,35040);
		var indices = new Uint16Array(180);
		var _g1 = 0;
		while(_g1 < 30) {
			var i1 = _g1++;
			var ao = i1 * 6;
			var io = i1 * 4;
			indices[ao] = io;
			indices[ao + 1] = io + 1;
			indices[ao + 2] = io + 2;
			indices[ao + 3] = io;
			indices[ao + 4] = io + 2;
			indices[ao + 5] = io + 3;
		}
		this.g2d_indexBuffer = this.g2d_nativeContext.createBuffer();
		this.g2d_nativeContext.bindBuffer(34963,this.g2d_indexBuffer);
		this.g2d_nativeContext.bufferData(34963,indices,35044);
		this.g2d_program.samplerUniform = this.g2d_nativeContext.getUniformLocation(this.g2d_program,"sTexture");
		this.g2d_program.positionAttribute = this.g2d_nativeContext.getAttribLocation(this.g2d_program,"aPosition");
		this.g2d_nativeContext.enableVertexAttribArray(this.g2d_program.positionAttribute);
		this.g2d_program.texCoordAttribute = this.g2d_nativeContext.getAttribLocation(this.g2d_program,"aTexCoord");
		this.g2d_nativeContext.enableVertexAttribArray(this.g2d_program.texCoordAttribute);
		this.g2d_program.constantIndexAttribute = this.g2d_nativeContext.getAttribLocation(this.g2d_program,"aConstantIndex");
		this.g2d_nativeContext.enableVertexAttribArray(this.g2d_program.constantIndexAttribute);
		this.g2d_transforms = new Float32Array(480);
		this.g2d_initialized = true;
	}
	,bind: function(p_context,p_reinitialize) {
		if(!this.g2d_initialized || p_reinitialize) this.initialize(p_context);
		this.g2d_nativeContext.uniformMatrix4fv(this.g2d_nativeContext.getUniformLocation(this.g2d_program,"projectionMatrix"),false,this.g2d_context.g2d_projectionMatrix);
		this.g2d_nativeContext.bindBuffer(34963,this.g2d_indexBuffer);
		this.g2d_nativeContext.bindBuffer(34962,this.g2d_geometryBuffer);
		this.g2d_nativeContext.vertexAttribPointer(this.g2d_program.positionAttribute,2,5126,false,0,0);
		this.g2d_nativeContext.bindBuffer(34962,this.g2d_uvBuffer);
		this.g2d_nativeContext.vertexAttribPointer(this.g2d_program.texCoordAttribute,2,5126,false,0,0);
		this.g2d_nativeContext.bindBuffer(34962,this.g2d_constantIndexAlphaBuffer);
		this.g2d_nativeContext.vertexAttribPointer(this.g2d_program.constantIndexAttribute,4,5126,false,0,0);
	}
	,draw: function(p_x,p_y,p_scaleX,p_scaleY,p_rotation,p_red,p_green,p_blue,p_alpha,p_texture) {
		var notSameTexture = this.g2d_activeNativeTexture != p_texture.g2d_nativeTexture;
		var useAlpha = !this.g2d_useSeparatedAlphaPipeline && !(p_red == 1 && p_green == 1 && p_blue == 1 && p_alpha == 1);
		var notSameUseAlpha = this.g2d_activeAlpha != useAlpha;
		this.g2d_activeAlpha = useAlpha;
		if(notSameTexture) {
			if(this.g2d_activeNativeTexture != null) {
				if(this.g2d_quadCount > 0) {
					com_genome2d_context_stats_GStats.drawCalls++;
					this.g2d_nativeContext.uniform4fv(this.g2d_nativeContext.getUniformLocation(this.g2d_program,"transforms"),this.g2d_transforms);
					this.g2d_nativeContext.drawElements(4,6 * this.g2d_quadCount,5123,0);
					this.g2d_quadCount = 0;
				}
			}
			if(notSameTexture) {
				this.g2d_activeNativeTexture = p_texture.g2d_nativeTexture;
				this.g2d_nativeContext.activeTexture(33984);
				this.g2d_nativeContext.bindTexture(3553,p_texture.g2d_nativeTexture);
				this.g2d_nativeContext.uniform1i(this.g2d_program.samplerUniform,0);
			}
		}
		if(this.g2d_activeAlpha) {
			p_red *= p_alpha;
			p_green *= p_alpha;
			p_blue *= p_alpha;
		}
		var offset = this.g2d_quadCount * 4 << 2;
		this.g2d_transforms[offset] = p_x;
		this.g2d_transforms[offset + 1] = p_y;
		this.g2d_transforms[offset + 2] = p_rotation;
		this.g2d_transforms[offset + 3] = 0;
		this.g2d_transforms[offset + 4] = p_texture.g2d_u;
		this.g2d_transforms[offset + 5] = p_texture.g2d_v;
		this.g2d_transforms[offset + 6] = p_texture.g2d_uScale;
		this.g2d_transforms[offset + 7] = p_texture.g2d_vScale;
		this.g2d_transforms[offset + 8] = p_scaleX * (p_texture.g2d_nativeWidth * p_texture.g2d_scaleFactor);
		this.g2d_transforms[offset + 9] = p_scaleY * (p_texture.g2d_nativeHeight * p_texture.g2d_scaleFactor);
		this.g2d_transforms[offset + 10] = p_scaleX * (p_texture.g2d_pivotX * p_texture.g2d_scaleFactor);
		this.g2d_transforms[offset + 11] = p_scaleY * (p_texture.g2d_pivotY * p_texture.g2d_scaleFactor);
		this.g2d_transforms[offset + 12] = p_red;
		this.g2d_transforms[offset + 13] = p_green;
		this.g2d_transforms[offset + 14] = p_blue;
		this.g2d_transforms[offset + 15] = p_alpha;
		this.g2d_quadCount++;
		if(this.g2d_quadCount == 30) {
			if(this.g2d_quadCount > 0) {
				com_genome2d_context_stats_GStats.drawCalls++;
				this.g2d_nativeContext.uniform4fv(this.g2d_nativeContext.getUniformLocation(this.g2d_program,"transforms"),this.g2d_transforms);
				this.g2d_nativeContext.drawElements(4,6 * this.g2d_quadCount,5123,0);
				this.g2d_quadCount = 0;
			}
		}
	}
	,push: function() {
		if(this.g2d_quadCount > 0) {
			com_genome2d_context_stats_GStats.drawCalls++;
			this.g2d_nativeContext.uniform4fv(this.g2d_nativeContext.getUniformLocation(this.g2d_program,"transforms"),this.g2d_transforms);
			this.g2d_nativeContext.drawElements(4,6 * this.g2d_quadCount,5123,0);
			this.g2d_quadCount = 0;
		}
	}
	,clear: function() {
		this.g2d_activeNativeTexture = null;
	}
	,__class__: com_genome2d_context_webgl_renderers_GQuadTextureShaderRenderer
};
var com_genome2d_context_webgl_renderers_GRendererCommon = function() { };
com_genome2d_context_webgl_renderers_GRendererCommon.__name__ = true;
com_genome2d_context_webgl_renderers_GRendererCommon.init = function() {
	com_genome2d_context_webgl_renderers_GRendererCommon.DEFAULT_CONSTANTS = [1,0,0,.5];
	com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_VERTICES = [-.5,.5,-.5,-.5,.5,-.5,.5,.5];
	com_genome2d_context_webgl_renderers_GRendererCommon.NORMALIZED_UVS = [.0,1.0,.0,.0,1.0,.0,1.0,1.0];
};
var com_genome2d_debug_GDebug = function() { };
com_genome2d_debug_GDebug.__name__ = true;
com_genome2d_debug_GDebug.__properties__ = {get_onDebug:"get_onDebug"}
com_genome2d_debug_GDebug.get_onDebug = function() {
	if(com_genome2d_debug_GDebug.g2d_onDebug == null) com_genome2d_debug_GDebug.g2d_onDebug = new com_genome2d_callbacks_GCallback1(String);
	return com_genome2d_debug_GDebug.g2d_onDebug;
};
com_genome2d_debug_GDebug.g2d_internal = function(p_priority,p_pos,p_arg1,p_arg2,p_arg3,p_arg4,p_arg5,p_arg6,p_arg7,p_arg8,p_arg9,p_arg10,p_arg11,p_arg12,p_arg13,p_arg14,p_arg15,p_arg16,p_arg17,p_arg18,p_arg19,p_arg20) {
	var args = [];
	if(p_arg1 != null) args.push(p_arg1);
	if(p_arg2 != null) args.push(p_arg2);
	if(p_arg3 != null) args.push(p_arg3);
	if(p_arg4 != null) args.push(p_arg4);
	if(p_arg5 != null) args.push(p_arg5);
	if(p_arg6 != null) args.push(p_arg6);
	if(p_arg7 != null) args.push(p_arg7);
	if(p_arg8 != null) args.push(p_arg8);
	if(p_arg9 != null) args.push(p_arg9);
	if(p_arg10 != null) args.push(p_arg10);
	if(p_arg11 != null) args.push(p_arg11);
	if(p_arg12 != null) args.push(p_arg12);
	if(p_arg13 != null) args.push(p_arg13);
	if(p_arg14 != null) args.push(p_arg14);
	if(p_arg15 != null) args.push(p_arg15);
	if(p_arg16 != null) args.push(p_arg16);
	if(p_arg17 != null) args.push(p_arg17);
	if(p_arg18 != null) args.push(p_arg18);
	if(p_arg19 != null) args.push(p_arg19);
	if(p_arg20 != null) args.push(p_arg20);
	com_genome2d_debug_GDebug.g2d_internal_args(p_priority,p_pos,args);
};
com_genome2d_debug_GDebug.debug = function(p_priority,p_arg1,p_arg2,p_arg3,p_arg4,p_arg5,p_arg6,p_arg7,p_arg8,p_arg9,p_arg10,p_arg11,p_arg12,p_arg13,p_arg14,p_arg15,p_arg16,p_arg17,p_arg18,p_arg19,p_arg20,pos) {
	if(com_genome2d_debug_GDebug.showPriority <= p_priority) com_genome2d_debug_GDebug.g2d_internal(p_priority,pos,p_arg1,p_arg2,p_arg3,p_arg4,p_arg5,p_arg6,p_arg7,p_arg8,p_arg9,p_arg10,p_arg11,p_arg12,p_arg13,p_arg14,p_arg15,p_arg16,p_arg17,p_arg18,p_arg19,p_arg20);
};
com_genome2d_debug_GDebug.dump = function(p_arg1,p_arg2,p_arg3,p_arg4,p_arg5,p_arg6,p_arg7,p_arg8,p_arg9,p_arg10,p_arg11,p_arg12,p_arg13,p_arg14,p_arg15,p_arg16,p_arg17,p_arg18,p_arg19,p_arg20,pos) {
};
com_genome2d_debug_GDebug.dump_args = function(p_args,pos) {
	if(com_genome2d_debug_GDebug.showPriority <= 2) com_genome2d_debug_GDebug.g2d_internal_args(2,pos,p_args);
};
com_genome2d_debug_GDebug.info = function(p_arg1,p_arg2,p_arg3,p_arg4,p_arg5,p_arg6,p_arg7,p_arg8,p_arg9,p_arg10,p_arg11,p_arg12,p_arg13,p_arg14,p_arg15,p_arg16,p_arg17,p_arg18,p_arg19,p_arg20,pos) {
};
com_genome2d_debug_GDebug.warning = function(p_arg1,p_arg2,p_arg3,p_arg4,p_arg5,p_arg6,p_arg7,p_arg8,p_arg9,p_arg10,p_arg11,p_arg12,p_arg13,p_arg14,p_arg15,p_arg16,p_arg17,p_arg18,p_arg19,p_arg20,pos) {
	if(com_genome2d_debug_GDebug.showPriority <= 4) com_genome2d_debug_GDebug.g2d_internal(4,pos,p_arg1,p_arg2,p_arg3,p_arg4,p_arg5,p_arg6,p_arg7,p_arg8,p_arg9,p_arg10,p_arg11,p_arg12,p_arg13,p_arg14,p_arg15,p_arg16,p_arg17,p_arg18,p_arg19,p_arg20);
};
com_genome2d_debug_GDebug.warning_handler = function(p_arg) {
	com_genome2d_debug_GDebug.g2d_internal(4,null,p_arg,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
};
com_genome2d_debug_GDebug.error = function(p_arg1,p_arg2,p_arg3,p_arg4,p_arg5,p_arg6,p_arg7,p_arg8,p_arg9,p_arg10,p_arg11,p_arg12,p_arg13,p_arg14,p_arg15,p_arg16,p_arg17,p_arg18,p_arg19,p_arg20,pos) {
	com_genome2d_debug_GDebug.g2d_internal(5,pos,p_arg1,p_arg2,p_arg3,p_arg4,p_arg5,p_arg6,p_arg7,p_arg8,p_arg9,p_arg10,p_arg11,p_arg12,p_arg13,p_arg14,p_arg15,p_arg16,p_arg17,p_arg18,p_arg19,p_arg20);
};
com_genome2d_debug_GDebug.error_handler = function(p_arg) {
	com_genome2d_debug_GDebug.g2d_internal(5,null,p_arg,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
};
com_genome2d_debug_GDebug.g2d_internal_args = function(p_priority,p_pos,p_args) {
	var msg;
	switch(p_priority) {
	case 0:
		msg = "INTERNAL_DUMP: ";
		break;
	case 1:
		msg = "AUTO_DUMP: ";
		break;
	case 2:
		msg = "DUMP: ";
		break;
	case 3:
		msg = "INFO: ";
		break;
	case 4:
		msg = "WARNING: ";
		break;
	case 5:
		msg = "ERROR: ";
		break;
	default:
		msg = "";
	}
	if(p_pos != null) msg += p_pos.fileName + ":" + p_pos.lineNumber + " : " + p_pos.methodName;
	if(p_args.length > 0) msg += " : " + p_args.toString();
	com_genome2d_debug_GDebug.g2d_console += msg;
	console.log(msg);
	if(com_genome2d_debug_GDebug.g2d_onDebug != null) com_genome2d_debug_GDebug.g2d_onDebug.dispatch(msg);
	if(p_priority == 5) throw new js__$Boot_HaxeError(msg);
};
com_genome2d_debug_GDebug.trace = function(p_msg) {
	com_genome2d_debug_GDebug.g2d_console += p_msg;
	console.log(p_msg);
	if(com_genome2d_debug_GDebug.g2d_onDebug != null) com_genome2d_debug_GDebug.g2d_onDebug.dispatch(p_msg);
};
var com_genome2d_debug_GDebugPriority = function() { };
com_genome2d_debug_GDebugPriority.__name__ = true;
var com_genome2d_geom_GMatrix = function(p_a,p_b,p_c,p_d,p_tx,p_ty) {
	if(p_ty == null) p_ty = 0;
	if(p_tx == null) p_tx = 0;
	if(p_d == null) p_d = 1;
	if(p_c == null) p_c = 0;
	if(p_b == null) p_b = 0;
	if(p_a == null) p_a = 1;
	this.a = p_a;
	this.b = p_b;
	this.c = p_c;
	this.d = p_d;
	this.tx = p_tx;
	this.ty = p_ty;
};
com_genome2d_geom_GMatrix.__name__ = true;
com_genome2d_geom_GMatrix.prototype = {
	copyFrom: function(p_from) {
		this.a = p_from.a;
		this.b = p_from.b;
		this.c = p_from.c;
		this.d = p_from.d;
		this.tx = p_from.tx;
		this.ty = p_from.ty;
	}
	,setTo: function(p_a,p_b,p_c,p_d,p_tx,p_ty) {
		this.a = p_a;
		this.b = p_b;
		this.c = p_c;
		this.d = p_d;
		this.tx = p_tx;
		this.ty = p_ty;
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	}
	,concat: function(p_matrix) {
		var a1 = this.a * p_matrix.a + this.b * p_matrix.c;
		this.b = this.a * p_matrix.b + this.b * p_matrix.d;
		this.a = a1;
		var c1 = this.c * p_matrix.a + this.d * p_matrix.c;
		this.d = this.c * p_matrix.b + this.d * p_matrix.d;
		this.c = c1;
		var tx1 = this.tx * p_matrix.a + this.ty * p_matrix.c + p_matrix.tx;
		this.ty = this.tx * p_matrix.b + this.ty * p_matrix.d + p_matrix.ty;
		this.tx = tx1;
	}
	,invert: function() {
		var n = this.a * this.d - this.b * this.c;
		if(n == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			n = 1 / n;
			var a1 = this.d * n;
			this.d = this.a * n;
			this.a = a1;
			this.b *= -n;
			this.c *= -n;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = tx1;
		}
		return this;
	}
	,__class__: com_genome2d_geom_GMatrix
};
var com_genome2d_geom_GMatrix3D = function() {
};
com_genome2d_geom_GMatrix3D.__name__ = true;
com_genome2d_geom_GMatrix3D.prototype = {
	identity: function() {
	}
	,prependTranslation: function(p_x,p_y,p_z) {
	}
	,__class__: com_genome2d_geom_GMatrix3D
};
var com_genome2d_geom_GMatrixUtils = function() { };
com_genome2d_geom_GMatrixUtils.__name__ = true;
com_genome2d_geom_GMatrixUtils.prependMatrix = function(p_matrix,p_by) {
	p_matrix.setTo(p_matrix.a * p_by.a + p_matrix.c * p_by.b,p_matrix.b * p_by.a + p_matrix.d * p_by.b,p_matrix.a * p_by.c + p_matrix.c * p_by.d,p_matrix.b * p_by.c + p_matrix.d * p_by.d,p_matrix.tx + p_matrix.a * p_by.tx + p_matrix.c * p_by.ty,p_matrix.ty + p_matrix.b * p_by.tx + p_matrix.d * p_by.ty);
};
var com_genome2d_geom_GPoint = function(p_x,p_y) {
	if(p_y == null) p_y = 0;
	if(p_x == null) p_x = 0;
	this.x = p_x;
	this.y = p_y;
};
com_genome2d_geom_GPoint.__name__ = true;
com_genome2d_geom_GPoint.prototype = {
	__class__: com_genome2d_geom_GPoint
};
var com_genome2d_geom_GRectangle = function(p_x,p_y,p_width,p_height) {
	if(p_height == null) p_height = 0;
	if(p_width == null) p_width = 0;
	if(p_y == null) p_y = 0;
	if(p_x == null) p_x = 0;
	this.x = p_x;
	this.y = p_y;
	this.width = p_width;
	this.height = p_height;
};
com_genome2d_geom_GRectangle.__name__ = true;
com_genome2d_geom_GRectangle.prototype = {
	get_bottom: function() {
		return this.y + this.height;
	}
	,set_bottom: function(p_value) {
		this.height = p_value - this.y;
		return p_value;
	}
	,get_left: function() {
		return this.x;
	}
	,set_left: function(p_value) {
		this.width -= p_value - this.x;
		this.x = p_value;
		return p_value;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,set_right: function(p_value) {
		this.width = p_value - this.x;
		return p_value;
	}
	,get_top: function() {
		return this.y;
	}
	,set_top: function(p_value) {
		this.height -= p_value - this.y;
		this.y = p_value;
		return p_value;
	}
	,setTo: function(p_x,p_y,p_width,p_height) {
		this.x = p_x;
		this.y = p_y;
		this.width = p_width;
		this.height = p_height;
	}
	,clone: function() {
		return new com_genome2d_geom_GRectangle(this.x,this.y,this.width,this.height);
	}
	,intersection: function(p_rect) {
		var result;
		var x0;
		if(this.x < p_rect.x) x0 = p_rect.x; else x0 = this.x;
		var x1;
		if(this.get_right() > p_rect.get_right()) x1 = p_rect.get_right(); else x1 = this.get_right();
		if(x1 <= x0) result = new com_genome2d_geom_GRectangle(); else {
			var y0;
			if(this.y < p_rect.y) y0 = p_rect.y; else y0 = this.y;
			var y1;
			if(this.get_bottom() > p_rect.get_bottom()) y1 = p_rect.get_bottom(); else y1 = this.get_bottom();
			if(y1 <= y0) result = new com_genome2d_geom_GRectangle(); else result = new com_genome2d_geom_GRectangle(x0,y0,x1 - x0,y1 - y0);
		}
		return result;
	}
	,contains: function(p_x,p_y) {
		return p_x >= this.x && p_y >= this.y && p_x < this.get_right() && p_y < this.get_bottom();
	}
	,__class__: com_genome2d_geom_GRectangle
	,__properties__: {set_top:"set_top",get_top:"get_top",set_right:"set_right",get_right:"get_right",set_left:"set_left",get_left:"get_left",set_bottom:"set_bottom",get_bottom:"get_bottom"}
};
var com_genome2d_input_GFocusManager = function() { };
com_genome2d_input_GFocusManager.__name__ = true;
com_genome2d_input_GFocusManager.setFocus = function(p_interactive) {
	com_genome2d_input_GFocusManager.activeFocus = p_interactive;
};
var com_genome2d_input_GKeyboardInput = function(p_type,p_keyCode,p_charCode) {
	this.type = p_type;
	this.keyCode = p_keyCode;
	this.charCode = p_charCode;
};
com_genome2d_input_GKeyboardInput.__name__ = true;
com_genome2d_input_GKeyboardInput.prototype = {
	__class__: com_genome2d_input_GKeyboardInput
};
var com_genome2d_input_GMouseInput = function(p_target,p_dispatcher,p_type,p_localX,p_localY) {
	this.delta = 0;
	this.nativeCaptured = false;
	this.shiftKey = false;
	this.altKey = false;
	this.ctrlKey = false;
	this.buttonDown = false;
	this.g2d_captured = false;
	this.dispatcher = p_dispatcher;
	this.target = p_target;
	this.type = p_type;
	this.localX = p_localX;
	this.localY = p_localY;
};
com_genome2d_input_GMouseInput.__name__ = true;
com_genome2d_input_GMouseInput.prototype = {
	clone: function(p_target,p_dispatcher,p_type) {
		var input = new com_genome2d_input_GMouseInput(p_target,p_dispatcher,p_type,this.localX,this.localY);
		input.contextX = this.contextX;
		input.contextY = this.contextY;
		input.worldX = this.worldX;
		input.worldY = this.worldY;
		input.buttonDown = this.buttonDown;
		input.ctrlKey = this.ctrlKey;
		input.altKey = this.altKey;
		input.shiftKey = this.shiftKey;
		input.nativeCaptured = this.nativeCaptured;
		input.delta = this.delta;
		input.camera = this.camera;
		return input;
	}
	,__class__: com_genome2d_input_GMouseInput
};
var com_genome2d_input_GMouseInputType = function() { };
com_genome2d_input_GMouseInputType.__name__ = true;
com_genome2d_input_GMouseInputType.fromNative = function(p_nativeType) {
	var type = "";
	switch(p_nativeType) {
	case "mousemove":case "touchmove":
		type = "mouseMove";
		break;
	case "mousedown":case "touchstart":
		type = "mouseDown";
		break;
	case "mouseup":case "touchend":
		type = "mouseUp";
		break;
	}
	return type;
};
var com_genome2d_macros_MGBuildID = function() { };
com_genome2d_macros_MGBuildID.__name__ = true;
var com_genome2d_macros_MGDebug = function() { };
com_genome2d_macros_MGDebug.__name__ = true;
var com_genome2d_macros_MGPrototypeProcessor = function() { };
com_genome2d_macros_MGPrototypeProcessor.__name__ = true;
var com_genome2d_node_GNode = function() {
	this.g2d_currentState = "default";
	this.g2d_localAlpha = 1;
	this.g2d_worldAlpha = 1;
	this.g2d_localBlue = 1;
	this.g2d_worldBlue = 1;
	this.g2d_localGreen = 1;
	this.g2d_worldGreen = 1;
	this.g2d_localRed = 1;
	this.g2d_worldRed = 1;
	this.g2d_localRotation = 0;
	this.g2d_worldRotation = 0;
	this.g2d_localScaleY = 1;
	this.g2d_worldScaleY = 1;
	this.g2d_localScaleX = 1;
	this.g2d_worldScaleX = 1;
	this.g2d_localUseMatrix = 0;
	this.g2d_localY = 0;
	this.g2d_worldY = 0;
	this.g2d_localX = 0;
	this.g2d_worldX = 0;
	this.visible = true;
	this.useWorldColor = false;
	this.useWorldSpace = false;
	this.g2d_colorDirty = false;
	this.g2d_transformDirty = false;
	this.g2d_matrixDirty = true;
	this.g2d_childCount = 0;
	this.g2d_componentCount = 0;
	this.mousePixelTreshold = 0;
	this.mousePixelEnabled = false;
	this.mouseEnabled = false;
	this.mouseChildren = true;
	this.g2d_disposed = false;
	this.g2d_active = true;
	this.g2d_usedAsMask = 0;
	this.cameraGroup = 0;
	this.g2d_id = com_genome2d_node_GNode.g2d_nodeCount++;
	this.name = "GNode#" + this.g2d_id;
	if(com_genome2d_node_GNode.g2d_cachedMatrix == null) {
		com_genome2d_node_GNode.g2d_cachedMatrix = new com_genome2d_geom_GMatrix();
		com_genome2d_node_GNode.g2d_cachedTransformMatrix = new com_genome2d_geom_GMatrix();
		com_genome2d_node_GNode.g2d_activeMasks = [];
	}
};
com_genome2d_node_GNode.__name__ = true;
com_genome2d_node_GNode.__interfaces__ = [com_genome2d_proto_IGPrototypable,com_genome2d_input_IGInteractive];
com_genome2d_node_GNode.create = function(p_name) {
	if(p_name == null) p_name = "";
	var node = new com_genome2d_node_GNode();
	if(p_name != "") node.name = p_name;
	return node;
};
com_genome2d_node_GNode.createWithComponent = function(p_componentClass,p_name) {
	if(p_name == null) p_name = "";
	var node = new com_genome2d_node_GNode();
	if(p_name != "") node.name = p_name;
	return node.addComponent(p_componentClass);
};
com_genome2d_node_GNode.createFromPrototype = function(p_prototype) {
	if(p_prototype == null) com_genome2d_debug_GDebug.error("Null proto",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 81, className : "com.genome2d.node.GNode", methodName : "createFromPrototype"});
	if(p_prototype.nodeType == Xml.Document) {
		if(p_prototype.nodeType != Xml.Document && p_prototype.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + p_prototype.nodeType);
		p_prototype = p_prototype.children[0];
	}
	if((function($this) {
		var $r;
		if(p_prototype.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + p_prototype.nodeType);
		$r = p_prototype.nodeName;
		return $r;
	}(this)) != com_genome2d_node_GNode.PROTOTYPE_NAME) com_genome2d_debug_GDebug.error("Incorrect GNode proto XML",(function($this) {
		var $r;
		if(p_prototype.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + p_prototype.nodeType);
		$r = p_prototype.nodeName;
		return $r;
	}(this)),null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 87, className : "com.genome2d.node.GNode", methodName : "createFromPrototype"});
	var node = new com_genome2d_node_GNode();
	if(p_prototype.get("mouseEnabled") == "true") node.mouseEnabled = true; else node.mouseEnabled = false;
	if(p_prototype.get("mouseChildren") == "true") node.mouseChildren = true; else node.mouseChildren = false;
	var it = p_prototype.elements();
	while(it.hasNext()) {
		var xml = it.next();
		if((function($this) {
			var $r;
			if(xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xml.nodeType);
			$r = xml.nodeName;
			return $r;
		}(this)) == "components") {
			var componentsIt = xml.elements();
			while(componentsIt.hasNext()) {
				var componentXml = componentsIt.next();
				node.addComponentPrototype(componentXml);
			}
		}
		if((function($this) {
			var $r;
			if(xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xml.nodeType);
			$r = xml.nodeName;
			return $r;
		}(this)) == "children") {
			var childIt = xml.elements();
			while(childIt.hasNext()) node.addChild(com_genome2d_node_GNode.createFromPrototype(childIt.next()));
		}
	}
	return node;
};
com_genome2d_node_GNode.prototype = {
	get_core: function() {
		if(com_genome2d_node_GNode.g2d_core == null) {
			if(com_genome2d_Genome2D.g2d_instance == null) {
				com_genome2d_Genome2D.g2d_instantiable = true;
				new com_genome2d_Genome2D();
				com_genome2d_Genome2D.g2d_instantiable = false;
			}
			com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
		}
		return com_genome2d_node_GNode.g2d_core;
	}
	,get_mask: function() {
		return this.g2d_mask;
	}
	,set_mask: function(p_value) {
		if(!((function($this) {
			var $r;
			if(com_genome2d_node_GNode.g2d_core == null) {
				if(com_genome2d_Genome2D.g2d_instance == null) {
					com_genome2d_Genome2D.g2d_instantiable = true;
					new com_genome2d_Genome2D();
					com_genome2d_Genome2D.g2d_instantiable = false;
				}
				com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
			}
			$r = com_genome2d_node_GNode.g2d_core;
			return $r;
		}(this))).getContext().hasFeature(1)) com_genome2d_debug_GDebug.error("Stencil masking feature not supported.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 162, className : "com.genome2d.node.GNode", methodName : "set_mask"});
		if(this.g2d_mask != null) this.g2d_mask.g2d_usedAsMask--;
		this.g2d_mask = p_value;
		this.g2d_mask.g2d_usedAsMask++;
		return this.g2d_mask;
	}
	,isActive: function() {
		return this.g2d_active;
	}
	,setActive: function(p_value) {
		if(p_value != this.g2d_active) {
			if(this.g2d_disposed) com_genome2d_debug_GDebug.error("Node already disposed.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 188, className : "com.genome2d.node.GNode", methodName : "setActive"});
			this.g2d_active = p_value;
			var _g1 = 0;
			var _g = this.g2d_componentCount;
			while(_g1 < _g) {
				var i = _g1++;
				this.g2d_components[i].setActive(p_value);
			}
			var child = this.g2d_firstChild;
			while(child != null) {
				var next = child.g2d_next;
				child.setActive(p_value);
				child = next;
			}
		}
	}
	,get_id: function() {
		return this.g2d_id;
	}
	,get_parent: function() {
		return this.g2d_parent;
	}
	,isDisposed: function() {
		return this.g2d_disposed;
	}
	,dispose: function() {
		if(this.g2d_disposed) return;
		this.disposeChildren();
		this.disposeComponents();
		if(this.g2d_parent != null) this.g2d_parent.removeChild(this);
		this.disposeCallbacks();
		this.g2d_disposed = true;
	}
	,disposeCallbacks: function() {
		if(this.g2d_onAddedToStage != null) {
			this.g2d_onAddedToStage.removeAll();
			this.g2d_onAddedToStage = null;
		}
		if(this.g2d_onRemovedFromStage != null) {
			this.g2d_onRemovedFromStage.removeAll();
			this.g2d_onRemovedFromStage = null;
		}
		if(this.g2d_onMouseClick != null) {
			this.g2d_onMouseClick.removeAll();
			this.g2d_onMouseClick = null;
		}
		if(this.g2d_onMouseDown != null) {
			this.g2d_onMouseDown.removeAll();
			this.g2d_onMouseDown = null;
		}
		if(this.g2d_onMouseMove != null) {
			this.g2d_onMouseMove.removeAll();
			this.g2d_onMouseMove = null;
		}
		if(this.g2d_onMouseOut != null) {
			this.g2d_onMouseOut.removeAll();
			this.g2d_onMouseOut = null;
		}
		if(this.g2d_onMouseOver != null) {
			this.g2d_onMouseOver.removeAll();
			this.g2d_onMouseOver = null;
		}
		if(this.g2d_onMouseUp != null) {
			this.g2d_onMouseUp.removeAll();
			this.g2d_onMouseUp = null;
		}
		if(this.g2d_onRightMouseClick != null) {
			this.g2d_onRightMouseClick.removeAll();
			this.g2d_onRightMouseClick = null;
		}
		if(this.g2d_onRightMouseDown != null) {
			this.g2d_onRightMouseDown.removeAll();
			this.g2d_onRightMouseDown = null;
		}
		if(this.g2d_onRightMouseUp != null) {
			this.g2d_onRightMouseUp.removeAll();
			this.g2d_onRightMouseUp = null;
		}
	}
	,hitTest: function(p_x,p_y,p_hierarchy) {
		if(p_hierarchy == null) p_hierarchy = false;
		if(this.g2d_active && this.visible) {
			if(p_hierarchy) {
				var child = this.g2d_lastChild;
				while(child != null) {
					var previous = child.g2d_previous;
					if(child.hitTest(p_x,p_y,true)) return true;
					child = previous;
				}
			}
			if(this.g2d_renderable != null || this.g2d_defaultRenderable != null) {
				var tx = p_x - this.g2d_worldX;
				var ty = p_y - this.g2d_worldY;
				if(this.g2d_worldRotation != 0) {
					var cos = Math.cos(-this.g2d_worldRotation);
					var sin = Math.sin(-this.g2d_worldRotation);
					var ox = tx;
					tx = tx * cos - ty * sin;
					ty = ty * cos + ox * sin;
				}
				tx /= this.g2d_worldScaleX;
				ty /= this.g2d_worldScaleY;
				if(this.g2d_defaultRenderable != null?this.g2d_defaultRenderable.hitTest(tx,ty):this.g2d_renderable.hitTest(tx,ty)) return true;
			}
		}
		return false;
	}
	,getPrototype: function(p_xml) {
		p_xml = this.getPrototypeDefault(p_xml);
		var componentsXml = Xml.parse("<components/>").firstElement();
		var _g1 = 0;
		var _g = this.g2d_componentCount;
		while(_g1 < _g) {
			var i = _g1++;
			componentsXml.addChild(this.g2d_components[i].getPrototype());
		}
		p_xml.addChild(componentsXml);
		var childrenXml = Xml.createElement("children");
		var child = this.g2d_firstChild;
		while(child != null) {
			var next = child.g2d_next;
			childrenXml.addChild(child.getPrototype());
			child = next;
		}
		p_xml.addChild(childrenXml);
		return p_xml;
	}
	,bindPrototype: function(p_xml) {
		this.bindPrototypeDefault(p_xml);
		var it = p_xml.elements();
		while(it.hasNext()) {
			var xml = it.next();
			if((function($this) {
				var $r;
				if(xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xml.nodeType);
				$r = xml.nodeName;
				return $r;
			}(this)) == "components") {
				var componentsIt = xml.elements();
				while(componentsIt.hasNext()) {
					var componentXml = componentsIt.next();
					this.addComponentPrototype(componentXml);
				}
			}
			if((function($this) {
				var $r;
				if(xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xml.nodeType);
				$r = xml.nodeName;
				return $r;
			}(this)) == "children") {
				var childIt = xml.elements();
				while(childIt.hasNext()) this.addChild(com_genome2d_node_GNode.createFromPrototype(childIt.next()));
			}
		}
	}
	,get_onMouseDown: function() {
		if(this.g2d_onMouseDown == null) this.g2d_onMouseDown = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
		return this.g2d_onMouseDown;
	}
	,get_onMouseMove: function() {
		if(this.g2d_onMouseMove == null) this.g2d_onMouseMove = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
		return this.g2d_onMouseMove;
	}
	,get_onMouseClick: function() {
		if(this.g2d_onMouseClick == null) this.g2d_onMouseClick = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
		return this.g2d_onMouseClick;
	}
	,get_onMouseUp: function() {
		if(this.g2d_onMouseUp == null) this.g2d_onMouseUp = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
		return this.g2d_onMouseUp;
	}
	,get_onMouseOver: function() {
		if(this.g2d_onMouseOver == null) this.g2d_onMouseOver = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
		return this.g2d_onMouseOver;
	}
	,get_onMouseOut: function() {
		if(this.g2d_onMouseOut == null) this.g2d_onMouseOut = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
		return this.g2d_onMouseOut;
	}
	,captureMouseInput: function(p_input) {
		if(!this.g2d_active || !this.visible || p_input.camera != null && (this.cameraGroup & p_input.camera.mask) == 0 && this.cameraGroup != 0) return;
		if(this.mouseChildren) {
			var child = this.g2d_lastChild;
			while(child != null) {
				var previous = child.g2d_previous;
				child.captureMouseInput(p_input);
				child = previous;
			}
		}
		if(this.mouseEnabled) {
			if(p_input.g2d_captured && p_input.type == "mouseUp") this.g2d_mouseDownNode = null;
			var previouslyCaptured = p_input.g2d_captured;
			if(this.g2d_renderable != null || this.g2d_defaultRenderable != null) {
				var tx = p_input.worldX - this.g2d_worldX;
				var ty = p_input.worldY - this.g2d_worldY;
				if(this.g2d_worldRotation != 0) {
					var cos = Math.cos(-this.g2d_worldRotation);
					var sin = Math.sin(-this.g2d_worldRotation);
					var ox = tx;
					tx = tx * cos - ty * sin;
					ty = ty * cos + ox * sin;
				}
				if(this.g2d_worldScaleX == 0) {
					p_input.localX = Infinity;
				} else p_input.localX = tx / this.g2d_worldScaleX;
				if(this.g2d_worldScaleY == 0) {
					p_input.localY = Infinity;
				} else p_input.localY = ty / this.g2d_worldScaleY;
				if(this.g2d_defaultRenderable != null) p_input.g2d_captured = p_input.g2d_captured || this.g2d_defaultRenderable.hitTest(p_input.localX,p_input.localY); else this.g2d_renderable.captureMouseInput(p_input);
			}
			if(!previouslyCaptured && p_input.g2d_captured) {
				this.g2d_dispatchMouseCallback(p_input.type,this,p_input);
				if(this.g2d_mouseOverNode != this) this.g2d_dispatchMouseCallback("mouseOver",this,p_input);
			} else if(this.g2d_mouseOverNode == this) this.g2d_dispatchMouseCallback("mouseOut",this,p_input);
		}
	}
	,g2d_dispatchMouseCallback: function(p_type,p_object,p_input) {
		if(this.mouseEnabled) {
			var mouseInput = p_input.clone(this,p_object,p_type);
			switch(p_type) {
			case "mouseDown":
				this.g2d_mouseDownNode = p_object;
				if(this.g2d_onMouseDown != null) this.g2d_onMouseDown.dispatch(mouseInput);
				break;
			case "mouseMove":
				if(this.g2d_onMouseMove != null) this.g2d_onMouseMove.dispatch(mouseInput);
				break;
			case "mouseUp":
				if(this.g2d_mouseDownNode == p_object && this.g2d_onMouseClick != null) {
					var mouseClickInput = p_input.clone(this,p_object,"mouseUp");
					this.g2d_onMouseClick.dispatch(mouseClickInput);
				}
				this.g2d_mouseDownNode = null;
				if(this.g2d_onMouseUp != null) this.g2d_onMouseUp.dispatch(mouseInput);
				break;
			case "mouseOver":
				this.g2d_mouseOverNode = p_object;
				if(this.g2d_onMouseOver != null) this.g2d_onMouseOver.dispatch(mouseInput);
				break;
			case "mouseOut":
				this.g2d_mouseOverNode = null;
				if(this.g2d_onMouseOut != null) this.g2d_onMouseOut.dispatch(mouseInput);
				break;
			}
		}
		if(this.g2d_parent != null) this.g2d_parent.g2d_dispatchMouseCallback(p_type,p_object,p_input);
	}
	,getComponent: function(p_componentClass) {
		if(this.g2d_disposed) com_genome2d_debug_GDebug.error("Node already disposed.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 605, className : "com.genome2d.node.GNode", methodName : "getComponent"});
		var _g1 = 0;
		var _g = this.g2d_componentCount;
		while(_g1 < _g) {
			var i = _g1++;
			var component = this.g2d_components[i];
			if(js_Boot.__instanceof(component,p_componentClass)) return component;
		}
		return null;
	}
	,getComponents: function() {
		return this.g2d_components;
	}
	,hasComponent: function(p_componentLookupClass) {
		if(this.g2d_disposed) com_genome2d_debug_GDebug.error("Node already disposed.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 621, className : "com.genome2d.node.GNode", methodName : "hasComponent"});
		return this.getComponent(p_componentLookupClass) != null;
	}
	,addComponent: function(p_componentClass) {
		if(this.g2d_disposed) com_genome2d_debug_GDebug.error("Node already disposed.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 631, className : "com.genome2d.node.GNode", methodName : "addComponent"});
		var lookup = this.getComponent(p_componentClass);
		if(lookup != null) return lookup;
		var component = Type.createInstance(p_componentClass,[]);
		if(component == null) com_genome2d_debug_GDebug.error("Invalid components.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 638, className : "com.genome2d.node.GNode", methodName : "addComponent"});
		component.g2d_node = this;
		if(js_Boot.__instanceof(component,com_genome2d_components_renderable_GSprite)) this.g2d_defaultRenderable = component; else if(js_Boot.__instanceof(component,com_genome2d_components_renderable_IGRenderable)) this.g2d_renderable = component;
		if(this.g2d_components == null) this.g2d_components = [];
		this.g2d_components.push(component);
		this.g2d_componentCount++;
		component.init();
		return component;
	}
	,addComponentPrototype: function(p_prototype) {
		if(this.g2d_disposed) com_genome2d_debug_GDebug.error("Node already disposed.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 658, className : "com.genome2d.node.GNode", methodName : "addComponentPrototype"});
		var componentClass = com_genome2d_proto_GPrototypeFactory.getPrototypeClass((function($this) {
			var $r;
			if(p_prototype.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + p_prototype.nodeType);
			$r = p_prototype.nodeName;
			return $r;
		}(this)));
		if(componentClass == null) com_genome2d_debug_GDebug.error("Non existing componentClass " + p_prototype.get("class"),null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 662, className : "com.genome2d.node.GNode", methodName : "addComponentPrototype"});
		var component = this.addComponent(componentClass);
		component.bindPrototype(p_prototype);
		return component;
	}
	,removeComponent: function(p_componentClass) {
		if(this.g2d_disposed) com_genome2d_debug_GDebug.error("Node already disposed.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 678, className : "com.genome2d.node.GNode", methodName : "removeComponent"});
		var component = this.getComponent(p_componentClass);
		if(component == null) return;
		HxOverrides.remove(this.g2d_components,component);
		this.g2d_componentCount--;
		if(js_Boot.__instanceof(component,com_genome2d_components_renderable_GSprite)) this.g2d_defaultRenderable = null; else if(js_Boot.__instanceof(component,com_genome2d_components_renderable_IGRenderable)) this.g2d_renderable = null;
		component.g2d_dispose();
	}
	,disposeComponents: function() {
		while(this.g2d_componentCount > 0) {
			this.g2d_components.pop().g2d_dispose();
			this.g2d_componentCount--;
		}
		this.g2d_defaultRenderable = null;
		this.g2d_renderable = null;
	}
	,get_firstChild: function() {
		return this.g2d_firstChild;
	}
	,get_lastChild: function() {
		return this.g2d_lastChild;
	}
	,get_next: function() {
		return this.g2d_next;
	}
	,get_previous: function() {
		return this.g2d_previous;
	}
	,get_childCount: function() {
		return this.g2d_childCount;
	}
	,get_onAddedToStage: function() {
		if(this.g2d_onAddedToStage == null) this.g2d_onAddedToStage = new com_genome2d_callbacks_GCallback0();
		return this.g2d_onAddedToStage;
	}
	,get_onRemovedFromStage: function() {
		if(this.g2d_onRemovedFromStage == null) this.g2d_onRemovedFromStage = new com_genome2d_callbacks_GCallback0();
		return this.g2d_onRemovedFromStage;
	}
	,addChild: function(p_child,p_before) {
		if(this.g2d_disposed) com_genome2d_debug_GDebug.error("Node already disposed.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 771, className : "com.genome2d.node.GNode", methodName : "addChild"});
		if(p_child == this) com_genome2d_debug_GDebug.error("Can't add child to itself.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 772, className : "com.genome2d.node.GNode", methodName : "addChild"});
		if(p_child.g2d_parent != null) p_child.g2d_parent.removeChild(p_child);
		p_child.g2d_parent = this;
		if(this.g2d_firstChild == null) {
			this.g2d_firstChild = p_child;
			this.g2d_lastChild = p_child;
		} else if(p_before == null) {
			this.g2d_lastChild.g2d_next = p_child;
			p_child.g2d_previous = this.g2d_lastChild;
			this.g2d_lastChild = p_child;
		} else {
			if(p_before != this.g2d_firstChild) p_before.g2d_previous.g2d_next = p_child; else this.g2d_firstChild = p_child;
			p_child.g2d_previous = p_before.g2d_previous;
			p_child.g2d_next = p_before;
			p_before.g2d_previous = p_child;
		}
		this.g2d_childCount++;
		if(this.g2d_childCount == 1 && (this.g2d_localScaleX != this.g2d_localScaleY && this.g2d_localRotation != 0)) {
			var _g = this;
			var _g1 = _g.g2d_localUseMatrix;
			_g.set_g2d_useMatrix(_g1 + 1);
			_g1;
		}
		if(this.isOnStage()) p_child.g2d_addedToStage();
		return p_child;
	}
	,addChildAt: function(p_child,p_index) {
		if(this.g2d_disposed) com_genome2d_debug_GDebug.error("Node already disposed.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 803, className : "com.genome2d.node.GNode", methodName : "addChildAt"});
		if(p_child == this) com_genome2d_debug_GDebug.error("Can't add child to itself.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 804, className : "com.genome2d.node.GNode", methodName : "addChildAt"});
		if(p_child.g2d_parent != null) p_child.g2d_parent.removeChild(p_child);
		var i = 0;
		var after = this.g2d_firstChild;
		while(i < p_index && after != null) {
			after = after.g2d_next;
			i++;
		}
		return this.addChild(p_child,after == null?null:after);
	}
	,getChildAt: function(p_index) {
		if(p_index >= this.g2d_childCount) com_genome2d_debug_GDebug.error("Index out of bounds.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 817, className : "com.genome2d.node.GNode", methodName : "getChildAt"});
		var child = this.g2d_firstChild;
		var _g = 0;
		while(_g < p_index) {
			var i = _g++;
			child = child.g2d_next;
		}
		return child;
	}
	,getChildIndex: function(p_child) {
		if(p_child.g2d_parent != this) return -1;
		var child = this.g2d_firstChild;
		var _g1 = 0;
		var _g = this.g2d_childCount;
		while(_g1 < _g) {
			var i = _g1++;
			if(child == p_child) return i;
			child = child.g2d_next;
		}
		return -1;
	}
	,setChildIndex: function(p_child,p_index) {
		if(p_child.g2d_parent != this) com_genome2d_debug_GDebug.error("Not a child of this node.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 836, className : "com.genome2d.node.GNode", methodName : "setChildIndex"});
		if(p_index >= this.g2d_childCount) com_genome2d_debug_GDebug.error("Index out of bounds.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 837, className : "com.genome2d.node.GNode", methodName : "setChildIndex"});
		var index = 0;
		var child = this.g2d_firstChild;
		while(child != null && index < p_index) {
			child = child.g2d_next;
			index++;
		}
		if(index == p_index && child != p_child) {
			if(p_child != this.g2d_lastChild) p_child.g2d_next.g2d_previous = p_child.g2d_previous; else this.g2d_lastChild = p_child.g2d_previous;
			if(p_child != this.g2d_firstChild) p_child.g2d_previous.g2d_next = p_child.g2d_next; else this.g2d_firstChild = p_child.g2d_next;
			if(child != this.g2d_firstChild) child.g2d_previous.g2d_next = p_child; else this.g2d_firstChild = p_child;
			p_child.g2d_previous = child.g2d_previous;
			p_child.g2d_next = child;
			child.g2d_previous = p_child;
		}
	}
	,swapChildrenAt: function(p_index1,p_index2) {
		this.swapChildren(this.getChildAt(p_index1),this.getChildAt(p_index2));
	}
	,swapChildren: function(p_child1,p_child2) {
		if(p_child1.g2d_parent != this || p_child2.g2d_parent != this) return;
		var temp = p_child1.g2d_next;
		if(p_child2.g2d_next == p_child1) p_child1.g2d_next = p_child2; else {
			p_child1.g2d_next = p_child2.g2d_next;
			if(p_child1.g2d_next != null) p_child1.g2d_next.g2d_previous = p_child1;
		}
		if(temp == p_child2) p_child2.g2d_next = p_child1; else {
			p_child2.g2d_next = temp;
			if(p_child2.g2d_next != null) p_child2.g2d_next.g2d_previous = p_child2;
		}
		temp = p_child1.g2d_previous;
		if(p_child2.g2d_previous == p_child1) p_child1.g2d_previous = p_child2; else {
			p_child1.g2d_previous = p_child2.g2d_previous;
			if(p_child1.g2d_previous != null) p_child1.g2d_previous.g2d_next = p_child1;
		}
		if(temp == p_child2) p_child2.g2d_previous = p_child1; else {
			p_child2.g2d_previous = temp;
			if(p_child2.g2d_previous != null) p_child2.g2d_previous.g2d_next = p_child2;
		}
		if(p_child1 == this.g2d_firstChild) this.g2d_firstChild = p_child2; else if(p_child2 == this.g2d_firstChild) this.g2d_firstChild = p_child1;
		if(p_child1 == this.g2d_lastChild) this.g2d_lastChild = p_child2; else if(p_child2 == this.g2d_lastChild) this.g2d_lastChild = p_child1;
	}
	,putChildToFront: function(p_child) {
		if(p_child.g2d_parent != this || p_child == this.g2d_lastChild) return;
		if(p_child.g2d_next != null) p_child.g2d_next.g2d_previous = p_child.g2d_previous;
		if(p_child.g2d_previous != null) p_child.g2d_previous.g2d_next = p_child.g2d_next;
		if(p_child == this.g2d_firstChild) this.g2d_firstChild = this.g2d_firstChild.g2d_next;
		if(this.g2d_lastChild != null) this.g2d_lastChild.g2d_next = p_child;
		p_child.g2d_previous = this.g2d_lastChild;
		p_child.g2d_next = null;
		this.g2d_lastChild = p_child;
	}
	,putChildToBack: function(p_child) {
		if(p_child.g2d_parent != this || p_child == this.g2d_firstChild) return;
		if(p_child.g2d_next != null) p_child.g2d_next.g2d_previous = p_child.g2d_previous;
		if(p_child.g2d_previous != null) p_child.g2d_previous.g2d_next = p_child.g2d_next;
		if(p_child == this.g2d_lastChild) this.g2d_lastChild = this.g2d_lastChild.g2d_previous;
		if(this.g2d_firstChild != null) this.g2d_firstChild.g2d_previous = p_child;
		p_child.g2d_previous = null;
		p_child.g2d_next = this.g2d_firstChild;
		this.g2d_firstChild = p_child;
	}
	,removeChild: function(p_child) {
		if(this.g2d_disposed) com_genome2d_debug_GDebug.error("Node already disposed.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 942, className : "com.genome2d.node.GNode", methodName : "removeChild"});
		if(p_child.g2d_parent != this) return null;
		if(p_child.g2d_previous != null) p_child.g2d_previous.g2d_next = p_child.g2d_next; else this.g2d_firstChild = this.g2d_firstChild.g2d_next;
		if(p_child.g2d_next != null) p_child.g2d_next.g2d_previous = p_child.g2d_previous; else this.g2d_lastChild = this.g2d_lastChild.g2d_previous;
		p_child.g2d_next = p_child.g2d_previous = p_child.g2d_parent = null;
		this.g2d_childCount--;
		if(this.g2d_childCount == 0 && (this.g2d_localScaleX != this.g2d_localScaleY && this.g2d_localRotation != 0)) {
			var _g = this;
			var _g1 = _g.g2d_localUseMatrix;
			_g.set_g2d_useMatrix(_g1 - 1);
			_g1;
		}
		if(this.isOnStage()) p_child.g2d_removedFromStage();
		return p_child;
	}
	,removeChildAt: function(p_index) {
		if(p_index >= this.g2d_childCount) com_genome2d_debug_GDebug.error("Index out of bounds.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GNode.hx", lineNumber : 966, className : "com.genome2d.node.GNode", methodName : "removeChildAt"});
		var index = 0;
		var child = this.g2d_firstChild;
		while(child != null && index < p_index) {
			child = child.g2d_next;
			index++;
		}
		return this.removeChild(child);
	}
	,disposeChildren: function() {
		while(this.g2d_firstChild != null) this.g2d_firstChild.dispose();
	}
	,g2d_addedToStage: function() {
		if(this.g2d_onAddedToStage != null) this.g2d_onAddedToStage.dispatch();
		com_genome2d_context_stats_GStats.nodeCount++;
		var child = this.g2d_firstChild;
		while(child != null) {
			var next = child.g2d_next;
			child.g2d_addedToStage();
			child = next;
		}
	}
	,g2d_removedFromStage: function() {
		if(this.g2d_onRemovedFromStage != null) this.g2d_onRemovedFromStage.dispatch();
		com_genome2d_context_stats_GStats.nodeCount--;
		var child = this.g2d_firstChild;
		while(child != null) {
			var next = child.g2d_next;
			child.g2d_removedFromStage();
			child = next;
		}
	}
	,isOnStage: function() {
		if(this == ((function($this) {
			var $r;
			if(com_genome2d_node_GNode.g2d_core == null) {
				if(com_genome2d_Genome2D.g2d_instance == null) {
					com_genome2d_Genome2D.g2d_instantiable = true;
					new com_genome2d_Genome2D();
					com_genome2d_Genome2D.g2d_instantiable = false;
				}
				com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
			}
			$r = com_genome2d_node_GNode.g2d_core;
			return $r;
		}(this))).get_root()) return true; else if(this.g2d_parent == null) return false; else return this.g2d_parent.isOnStage();
	}
	,getBounds: function(p_targetSpace,p_bounds) {
		if(p_targetSpace == null) p_targetSpace = ((function($this) {
			var $r;
			if(com_genome2d_node_GNode.g2d_core == null) {
				if(com_genome2d_Genome2D.g2d_instance == null) {
					com_genome2d_Genome2D.g2d_instantiable = true;
					new com_genome2d_Genome2D();
					com_genome2d_Genome2D.g2d_instantiable = false;
				}
				com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
			}
			$r = com_genome2d_node_GNode.g2d_core;
			return $r;
		}(this))).get_root();
		if(p_bounds == null) p_bounds = new com_genome2d_geom_GRectangle();
		var found = false;
		var minX = 10000000;
		var maxX = -10000000;
		var minY = 10000000;
		var maxY = -10000000;
		var aabb = new com_genome2d_geom_GRectangle(0,0,0,0);
		if(this.g2d_defaultRenderable != null) this.g2d_defaultRenderable.getBounds(aabb); else if(this.g2d_renderable != null) this.g2d_renderable.getBounds(aabb);
		if(aabb.width != 0 && aabb.height != 0) {
			var m = this.getTransformationMatrix(p_targetSpace,com_genome2d_node_GNode.g2d_cachedMatrix);
			var tx1 = com_genome2d_node_GNode.g2d_cachedMatrix.a * aabb.x + com_genome2d_node_GNode.g2d_cachedMatrix.c * aabb.y + com_genome2d_node_GNode.g2d_cachedMatrix.tx;
			var ty1 = com_genome2d_node_GNode.g2d_cachedMatrix.d * aabb.y + com_genome2d_node_GNode.g2d_cachedMatrix.b * aabb.x + com_genome2d_node_GNode.g2d_cachedMatrix.ty;
			var tx2 = com_genome2d_node_GNode.g2d_cachedMatrix.a * aabb.x + com_genome2d_node_GNode.g2d_cachedMatrix.c * aabb.get_bottom() + com_genome2d_node_GNode.g2d_cachedMatrix.tx;
			var ty2 = com_genome2d_node_GNode.g2d_cachedMatrix.d * aabb.get_bottom() + com_genome2d_node_GNode.g2d_cachedMatrix.b * aabb.x + com_genome2d_node_GNode.g2d_cachedMatrix.ty;
			var tx3 = com_genome2d_node_GNode.g2d_cachedMatrix.a * aabb.get_right() + com_genome2d_node_GNode.g2d_cachedMatrix.c * aabb.y + com_genome2d_node_GNode.g2d_cachedMatrix.tx;
			var ty3 = com_genome2d_node_GNode.g2d_cachedMatrix.d * aabb.y + com_genome2d_node_GNode.g2d_cachedMatrix.b * aabb.get_right() + com_genome2d_node_GNode.g2d_cachedMatrix.ty;
			var tx4 = com_genome2d_node_GNode.g2d_cachedMatrix.a * aabb.get_right() + com_genome2d_node_GNode.g2d_cachedMatrix.c * aabb.get_bottom() + com_genome2d_node_GNode.g2d_cachedMatrix.tx;
			var ty4 = com_genome2d_node_GNode.g2d_cachedMatrix.d * aabb.get_bottom() + com_genome2d_node_GNode.g2d_cachedMatrix.b * aabb.get_right() + com_genome2d_node_GNode.g2d_cachedMatrix.ty;
			if(minX > tx1) minX = tx1;
			if(minX > tx2) minX = tx2;
			if(minX > tx3) minX = tx3;
			if(minX > tx4) minX = tx4;
			if(minY > ty1) minY = ty1;
			if(minY > ty2) minY = ty2;
			if(minY > ty3) minY = ty3;
			if(minY > ty4) minY = ty4;
			if(maxX < tx1) maxX = tx1;
			if(maxX < tx2) maxX = tx2;
			if(maxX < tx3) maxX = tx3;
			if(maxX < tx4) maxX = tx4;
			if(maxY < ty1) maxY = ty1;
			if(maxY < ty2) maxY = ty2;
			if(maxY < ty3) maxY = ty3;
			if(maxY < ty4) maxY = ty4;
			found = true;
		}
		var child = this.g2d_firstChild;
		while(child != null) {
			var next = child.g2d_next;
			child.getBounds(p_targetSpace,aabb);
			if(aabb.width == 0 || aabb.height == 0) {
				child = next;
				continue;
			}
			if(minX > aabb.x) minX = aabb.x;
			if(maxX < aabb.get_right()) maxX = aabb.get_right();
			if(minY > aabb.y) minY = aabb.y;
			if(maxY < aabb.get_bottom()) maxY = aabb.get_bottom();
			found = true;
			child = next;
		}
		if(found) p_bounds.setTo(minX,minY,maxX - minX,maxY - minY);
		return p_bounds;
	}
	,getCommonParent: function(p_node) {
		var current = this;
		com_genome2d_node_GNode.g2d_cachedArray = [];
		while(current != null) {
			com_genome2d_node_GNode.g2d_cachedArray.push(current);
			current = current.g2d_parent;
		}
		current = p_node;
		while(current != null && Lambda.indexOf(com_genome2d_node_GNode.g2d_cachedArray,current) == -1) current = current.g2d_parent;
		return current;
	}
	,sortChildren: function(p_nodeSorter,p_ascending) {
		if(p_ascending == null) p_ascending = true;
		if(this.g2d_firstChild == null) return;
		var insize = 1;
		var psize;
		var qsize;
		var nmerges;
		var p;
		var q;
		var e;
		while(true) {
			p = this.g2d_firstChild;
			this.g2d_firstChild = null;
			this.g2d_lastChild = null;
			nmerges = 0;
			while(p != null) {
				nmerges++;
				q = p;
				psize = 0;
				var _g = 0;
				while(_g < insize) {
					var i = _g++;
					psize++;
					q = q.g2d_next;
					if(q == null) break;
				}
				qsize = insize;
				while(psize > 0 || qsize > 0 && q != null) {
					if(psize == 0) {
						e = q;
						q = q.g2d_next;
						qsize--;
					} else if(qsize == 0 || q == null) {
						e = p;
						p = p.g2d_next;
						psize--;
					} else if(p_ascending) {
						if(p_nodeSorter.getSortValue(p) >= p_nodeSorter.getSortValue(q)) {
							e = p;
							p = p.g2d_next;
							psize--;
						} else {
							e = q;
							q = q.g2d_next;
							qsize--;
						}
					} else if(p_nodeSorter.getSortValue(p) <= p_nodeSorter.getSortValue(q)) {
						e = p;
						p = p.g2d_next;
						psize--;
					} else {
						e = q;
						q = q.g2d_next;
						qsize--;
					}
					if(this.g2d_lastChild != null) this.g2d_lastChild.g2d_next = e; else this.g2d_firstChild = e;
					e.g2d_previous = this.g2d_lastChild;
					this.g2d_lastChild = e;
				}
				p = q;
			}
			this.g2d_lastChild.g2d_next = null;
			if(nmerges <= 1) return;
			insize *= 2;
		}
	}
	,sortChildrenOnY: function(p_ascending) {
		if(p_ascending == null) p_ascending = true;
		if(this.g2d_firstChild == null) return;
		var insize = 1;
		var psize;
		var qsize;
		var nmerges;
		var p;
		var q;
		var e;
		while(true) {
			p = this.g2d_firstChild;
			this.g2d_firstChild = null;
			this.g2d_lastChild = null;
			nmerges = 0;
			while(p != null) {
				nmerges++;
				q = p;
				psize = 0;
				var _g = 0;
				while(_g < insize) {
					var i = _g++;
					psize++;
					q = q.g2d_next;
					if(q == null) break;
				}
				qsize = insize;
				while(psize > 0 || qsize > 0 && q != null) {
					if(psize == 0) {
						e = q;
						q = q.g2d_next;
						qsize--;
					} else if(qsize == 0 || q == null) {
						e = p;
						p = p.g2d_next;
						psize--;
					} else if(p_ascending) {
						if(p.g2d_localY >= q.g2d_localY) {
							e = p;
							p = p.g2d_next;
							psize--;
						} else {
							e = q;
							q = q.g2d_next;
							qsize--;
						}
					} else if(p.g2d_localY <= q.g2d_localY) {
						e = p;
						p = p.g2d_next;
						psize--;
					} else {
						e = q;
						q = q.g2d_next;
						qsize--;
					}
					if(this.g2d_lastChild != null) this.g2d_lastChild.g2d_next = e; else this.g2d_firstChild = e;
					e.g2d_previous = this.g2d_lastChild;
					this.g2d_lastChild = e;
				}
				p = q;
			}
			this.g2d_lastChild.g2d_next = null;
			if(nmerges <= 1) return;
			insize *= 2;
		}
	}
	,toString: function() {
		return "[GNode " + this.name + "]";
	}
	,get_x: function() {
		return this.g2d_localX;
	}
	,set_x: function(p_value) {
		this.g2d_transformDirty = this.g2d_matrixDirty = true;
		return this.g2d_localX = this.g2d_worldX = p_value;
	}
	,get_y: function() {
		return this.g2d_localY;
	}
	,set_y: function(p_value) {
		this.g2d_transformDirty = this.g2d_matrixDirty = true;
		return this.g2d_localY = this.g2d_worldY = p_value;
	}
	,hasUniformRotation: function() {
		return this.g2d_localScaleX != this.g2d_localScaleY && this.g2d_localRotation != 0;
	}
	,get_g2d_useMatrix: function() {
		return this.g2d_localUseMatrix;
	}
	,set_g2d_useMatrix: function(p_value) {
		if(this.g2d_parent != null) {
			var _g = this.g2d_parent;
			_g.set_g2d_useMatrix(_g.g2d_localUseMatrix + (p_value - this.g2d_localUseMatrix));
		}
		this.g2d_localUseMatrix = p_value;
		return this.g2d_localUseMatrix;
	}
	,get_scaleX: function() {
		return this.g2d_localScaleX;
	}
	,set_scaleX: function(p_value) {
		if(this.g2d_localScaleX == this.g2d_localScaleY && p_value != this.g2d_localScaleY && this.g2d_localRotation != 0 && this.g2d_childCount > 0) {
			var _g = this;
			var _g1 = _g.g2d_localUseMatrix;
			_g.set_g2d_useMatrix(_g1 + 1);
			_g1;
		}
		if(this.g2d_localScaleX == this.g2d_localScaleY && p_value == this.g2d_localScaleY && this.g2d_localRotation != 0 && this.g2d_childCount > 0) {
			var _g2 = this;
			var _g11 = _g2.g2d_localUseMatrix;
			_g2.set_g2d_useMatrix(_g11 - 1);
			_g11;
		}
		this.g2d_transformDirty = this.g2d_matrixDirty = true;
		return this.g2d_localScaleX = this.g2d_worldScaleX = p_value;
	}
	,get_scaleY: function() {
		return this.g2d_localScaleY;
	}
	,set_scaleY: function(p_value) {
		if(this.g2d_localScaleX == this.g2d_localScaleY && p_value != this.g2d_localScaleX && this.g2d_localRotation != 0 && this.g2d_childCount > 0) {
			var _g = this;
			var _g1 = _g.g2d_localUseMatrix;
			_g.set_g2d_useMatrix(_g1 + 1);
			_g1;
		}
		if(this.g2d_localScaleX == this.g2d_localScaleY && p_value == this.g2d_localScaleX && this.g2d_localRotation != 0 && this.g2d_childCount > 0) {
			var _g2 = this;
			var _g11 = _g2.g2d_localUseMatrix;
			_g2.set_g2d_useMatrix(_g11 - 1);
			_g11;
		}
		this.g2d_transformDirty = this.g2d_matrixDirty = true;
		return this.g2d_localScaleY = this.g2d_worldScaleY = p_value;
	}
	,get_rotation: function() {
		return this.g2d_localRotation;
	}
	,set_rotation: function(p_value) {
		if(this.g2d_localRotation == 0 && p_value != 0 && this.g2d_localScaleX != this.g2d_localScaleY && this.g2d_childCount > 0) {
			var _g = this;
			var _g1 = _g.g2d_localUseMatrix;
			_g.set_g2d_useMatrix(_g1 + 1);
			_g1;
		}
		if(this.g2d_localRotation != 0 && p_value == 0 && this.g2d_localScaleX != this.g2d_localScaleY && this.g2d_childCount > 0) {
			var _g2 = this;
			var _g11 = _g2.g2d_localUseMatrix;
			_g2.set_g2d_useMatrix(_g11 - 1);
			_g11;
		}
		this.g2d_transformDirty = this.g2d_matrixDirty = true;
		return this.g2d_localRotation = this.g2d_worldRotation = p_value;
	}
	,get_red: function() {
		return this.g2d_localRed;
	}
	,set_red: function(p_value) {
		this.g2d_colorDirty = true;
		return this.g2d_localRed = this.g2d_worldRed = p_value;
	}
	,get_green: function() {
		return this.g2d_localGreen;
	}
	,set_green: function(p_value) {
		this.g2d_colorDirty = true;
		return this.g2d_localGreen = this.g2d_worldGreen = p_value;
	}
	,get_blue: function() {
		return this.g2d_localBlue;
	}
	,set_blue: function(p_value) {
		this.g2d_colorDirty = true;
		return this.g2d_localBlue = this.g2d_worldBlue = p_value;
	}
	,get_alpha: function() {
		return this.g2d_localAlpha;
	}
	,set_alpha: function(p_value) {
		this.g2d_colorDirty = true;
		return this.g2d_localAlpha = this.g2d_worldAlpha = p_value;
	}
	,set_color: function(p_value) {
		this.g2d_colorDirty = true;
		this.g2d_localRed = this.g2d_worldRed = (p_value >> 16 & 255) / 255;
		this.g2d_colorDirty = true;
		this.g2d_localGreen = this.g2d_worldGreen = (p_value >> 8 & 255) / 255;
		this.g2d_colorDirty = true;
		this.g2d_localBlue = this.g2d_worldBlue = (p_value & 255) / 255;
		return p_value;
	}
	,get_matrix: function() {
		if(this.g2d_matrixDirty) {
			if(this.g2d_matrix == null) this.g2d_matrix = new com_genome2d_geom_GMatrix();
			if(this.g2d_localRotation == 0.0) this.g2d_matrix.setTo(this.g2d_localScaleX,0.0,0.0,this.g2d_localScaleY,this.g2d_localX,this.g2d_localY); else {
				var cos = Math.cos(this.g2d_localRotation);
				var sin = Math.sin(this.g2d_localRotation);
				var a = this.g2d_localScaleX * cos;
				var b = this.g2d_localScaleX * sin;
				var c = this.g2d_localScaleY * -sin;
				var d = this.g2d_localScaleY * cos;
				var tx = this.g2d_localX;
				var ty = this.g2d_localY;
				this.g2d_matrix.setTo(a,b,c,d,tx,ty);
			}
			this.g2d_matrixDirty = false;
		}
		return this.g2d_matrix;
	}
	,getTransformationMatrix: function(p_targetSpace,p_resultMatrix) {
		if(p_resultMatrix == null) p_resultMatrix = new com_genome2d_geom_GMatrix(); else p_resultMatrix.identity();
		if(p_targetSpace == this.g2d_parent) p_resultMatrix.copyFrom(this.get_matrix()); else if(p_targetSpace != this) {
			var common = this.getCommonParent(p_targetSpace);
			if(common != null) {
				var current = this;
				while(common != current) {
					p_resultMatrix.concat(current.get_matrix());
					current = current.g2d_parent;
				}
				if(common != p_targetSpace) {
					com_genome2d_node_GNode.g2d_cachedTransformMatrix.identity();
					while(p_targetSpace != common) {
						com_genome2d_node_GNode.g2d_cachedTransformMatrix.concat(p_targetSpace.get_matrix());
						p_targetSpace = p_targetSpace.g2d_parent;
					}
					com_genome2d_node_GNode.g2d_cachedTransformMatrix.invert();
					p_resultMatrix.concat(com_genome2d_node_GNode.g2d_cachedTransformMatrix);
				}
			}
		}
		return p_resultMatrix;
	}
	,localToGlobal: function(p_local,p_result) {
		this.getTransformationMatrix(com_genome2d_node_GNode.g2d_core.g2d_root,com_genome2d_node_GNode.g2d_cachedTransformMatrix);
		if(p_result == null) p_result = new com_genome2d_geom_GPoint();
		p_result.x = com_genome2d_node_GNode.g2d_cachedTransformMatrix.a * p_local.x + com_genome2d_node_GNode.g2d_cachedTransformMatrix.c * p_local.y + com_genome2d_node_GNode.g2d_cachedTransformMatrix.tx;
		p_result.y = com_genome2d_node_GNode.g2d_cachedTransformMatrix.d * p_local.y + com_genome2d_node_GNode.g2d_cachedTransformMatrix.b * p_local.x + com_genome2d_node_GNode.g2d_cachedTransformMatrix.ty;
		return p_result;
	}
	,globalToLocal: function(p_global,p_result) {
		this.getTransformationMatrix(com_genome2d_node_GNode.g2d_core.g2d_root,com_genome2d_node_GNode.g2d_cachedTransformMatrix);
		com_genome2d_node_GNode.g2d_cachedTransformMatrix.invert();
		if(p_result == null) p_result = new com_genome2d_geom_GPoint();
		p_result.x = com_genome2d_node_GNode.g2d_cachedTransformMatrix.a * p_global.x + com_genome2d_node_GNode.g2d_cachedTransformMatrix.c * p_global.y + com_genome2d_node_GNode.g2d_cachedTransformMatrix.tx;
		p_result.y = com_genome2d_node_GNode.g2d_cachedTransformMatrix.d * p_global.y + com_genome2d_node_GNode.g2d_cachedTransformMatrix.b * p_global.x + com_genome2d_node_GNode.g2d_cachedTransformMatrix.ty;
		return p_result;
	}
	,setPosition: function(p_x,p_y) {
		this.g2d_transformDirty = this.g2d_matrixDirty = true;
		this.g2d_localX = this.g2d_worldX = p_x;
		this.g2d_localY = this.g2d_worldY = p_y;
	}
	,setScale: function(p_scaleX,p_scaleY) {
		this.g2d_transformDirty = this.g2d_matrixDirty = true;
		this.g2d_localScaleX = this.g2d_worldScaleX = p_scaleX;
		this.g2d_localScaleY = this.g2d_worldScaleY = p_scaleY;
	}
	,invalidate: function(p_invalidateParentTransform,p_invalidateParentColor) {
		if(p_invalidateParentTransform && !this.useWorldSpace) {
			if(this.g2d_parent.g2d_worldRotation != 0) {
				var cos = Math.cos(this.g2d_parent.g2d_worldRotation);
				var sin = Math.sin(this.g2d_parent.g2d_worldRotation);
				this.g2d_worldX = (this.g2d_localX * cos - this.g2d_localY * sin) * this.g2d_parent.g2d_worldScaleX + this.g2d_parent.g2d_worldX;
				this.g2d_worldY = (this.g2d_localY * cos + this.g2d_localX * sin) * this.g2d_parent.g2d_worldScaleY + this.g2d_parent.g2d_worldY;
			} else {
				this.g2d_worldX = this.g2d_localX * this.g2d_parent.g2d_worldScaleX + this.g2d_parent.g2d_worldX;
				this.g2d_worldY = this.g2d_localY * this.g2d_parent.g2d_worldScaleY + this.g2d_parent.g2d_worldY;
			}
			this.g2d_worldScaleX = this.g2d_localScaleX * this.g2d_parent.g2d_worldScaleX;
			this.g2d_worldScaleY = this.g2d_localScaleY * this.g2d_parent.g2d_worldScaleY;
			this.g2d_worldRotation = this.g2d_localRotation + this.g2d_parent.g2d_worldRotation;
			this.g2d_transformDirty = false;
		}
		if(p_invalidateParentColor && !this.useWorldColor) {
			this.g2d_worldRed = this.g2d_localRed * this.g2d_parent.g2d_worldRed;
			this.g2d_worldGreen = this.g2d_localGreen * this.g2d_parent.g2d_worldGreen;
			this.g2d_worldBlue = this.g2d_localBlue * this.g2d_parent.g2d_worldBlue;
			this.g2d_worldAlpha = this.g2d_localAlpha * this.g2d_parent.g2d_worldAlpha;
			this.g2d_colorDirty = false;
		}
	}
	,render: function(p_parentTransformUpdate,p_parentColorUpdate,p_camera,p_renderAsMask,p_useMatrix) {
		if(this.g2d_active) {
			var previousMaskRect = null;
			var hasMask = false;
			if(this.maskRect != null && this.maskRect != this.g2d_parent.maskRect) {
				hasMask = true;
				if(((function($this) {
					var $r;
					if(com_genome2d_node_GNode.g2d_core == null) {
						if(com_genome2d_Genome2D.g2d_instance == null) {
							com_genome2d_Genome2D.g2d_instantiable = true;
							new com_genome2d_Genome2D();
							com_genome2d_Genome2D.g2d_instantiable = false;
						}
						com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
					}
					$r = com_genome2d_node_GNode.g2d_core;
					return $r;
				}(this))).getContext().getMaskRect() == null) previousMaskRect = null; else previousMaskRect = ((function($this) {
					var $r;
					if(com_genome2d_node_GNode.g2d_core == null) {
						if(com_genome2d_Genome2D.g2d_instance == null) {
							com_genome2d_Genome2D.g2d_instantiable = true;
							new com_genome2d_Genome2D();
							com_genome2d_Genome2D.g2d_instantiable = false;
						}
						com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
					}
					$r = com_genome2d_node_GNode.g2d_core;
					return $r;
				}(this))).getContext().getMaskRect().clone();
				if(this.g2d_parent.maskRect != null) {
					var intersection = this.g2d_parent.maskRect.intersection(this.maskRect);
					((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) {
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
						}
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).getContext().setMaskRect(intersection);
				} else ((function($this) {
					var $r;
					if(com_genome2d_node_GNode.g2d_core == null) {
						if(com_genome2d_Genome2D.g2d_instance == null) {
							com_genome2d_Genome2D.g2d_instantiable = true;
							new com_genome2d_Genome2D();
							com_genome2d_Genome2D.g2d_instantiable = false;
						}
						com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
					}
					$r = com_genome2d_node_GNode.g2d_core;
					return $r;
				}(this))).getContext().setMaskRect(this.maskRect);
			}
			var invalidateTransform = p_parentTransformUpdate || this.g2d_transformDirty;
			var invalidateColor = p_parentColorUpdate || this.g2d_colorDirty;
			if(invalidateTransform || invalidateColor) this.invalidate(p_parentTransformUpdate,p_parentColorUpdate);
			if(this.g2d_active && this.visible && ((this.cameraGroup & p_camera.mask) != 0 || this.cameraGroup == 0) && (this.g2d_usedAsMask == 0 || p_renderAsMask)) {
				if(!p_renderAsMask && this.g2d_mask != null) {
					((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) {
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
						}
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).getContext().renderToStencil(com_genome2d_node_GNode.g2d_activeMasks.length);
					this.g2d_mask.render(true,false,p_camera,true,false);
					com_genome2d_node_GNode.g2d_activeMasks.push(this.g2d_mask);
					((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) {
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
						}
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).getContext().renderToColor(com_genome2d_node_GNode.g2d_activeMasks.length);
				}
				var useMatrix = p_useMatrix || this.g2d_localUseMatrix > 0;
				if(useMatrix) {
					if(((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) {
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
						}
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).g2d_renderMatrixArray.length <= ((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) {
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
						}
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).g2d_renderMatrixIndex) ((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) com_genome2d_node_GNode.g2d_core = (function($this) {
							var $r;
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							$r = com_genome2d_Genome2D.g2d_instance;
							return $r;
						}($this));
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).g2d_renderMatrixArray[((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) com_genome2d_node_GNode.g2d_core = (function($this) {
							var $r;
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							$r = com_genome2d_Genome2D.g2d_instance;
							return $r;
						}($this));
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).g2d_renderMatrixIndex] = new com_genome2d_geom_GMatrix();
					((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) {
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
						}
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).g2d_renderMatrixArray[((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) {
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
						}
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).g2d_renderMatrixIndex].copyFrom(((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) {
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
						}
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).g2d_renderMatrix);
					com_genome2d_geom_GMatrixUtils.prependMatrix(((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) {
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
						}
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).g2d_renderMatrix,this.get_matrix());
					((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) {
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
						}
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).g2d_renderMatrixIndex++;
				}
				if(this.g2d_defaultRenderable != null) this.g2d_defaultRenderable.render(p_camera,useMatrix); else if(this.g2d_renderable != null) this.g2d_renderable.render(p_camera,useMatrix);
				var child = this.g2d_firstChild;
				while(child != null) {
					var next = child.g2d_next;
					if(child.postProcess != null) child.postProcess.renderNode(invalidateTransform,invalidateColor,p_camera,child); else child.render(invalidateTransform,invalidateColor,p_camera,p_renderAsMask,useMatrix);
					child = next;
				}
				if(hasMask) ((function($this) {
					var $r;
					if(com_genome2d_node_GNode.g2d_core == null) {
						if(com_genome2d_Genome2D.g2d_instance == null) {
							com_genome2d_Genome2D.g2d_instantiable = true;
							new com_genome2d_Genome2D();
							com_genome2d_Genome2D.g2d_instantiable = false;
						}
						com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
					}
					$r = com_genome2d_node_GNode.g2d_core;
					return $r;
				}(this))).getContext().setMaskRect(previousMaskRect);
				if(!p_renderAsMask && this.g2d_mask != null) {
					com_genome2d_node_GNode.g2d_activeMasks.pop();
					if(com_genome2d_node_GNode.g2d_activeMasks.length == 0) ((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) {
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
						}
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).getContext().clearStencil();
					((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) {
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
						}
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).getContext().renderToColor(com_genome2d_node_GNode.g2d_activeMasks.length);
				}
				if(useMatrix) {
					((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) {
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
						}
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).g2d_renderMatrixIndex--;
					((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) {
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
						}
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).g2d_renderMatrix.copyFrom(((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) {
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
						}
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).g2d_renderMatrixArray[((function($this) {
						var $r;
						if(com_genome2d_node_GNode.g2d_core == null) {
							if(com_genome2d_Genome2D.g2d_instance == null) {
								com_genome2d_Genome2D.g2d_instantiable = true;
								new com_genome2d_Genome2D();
								com_genome2d_Genome2D.g2d_instantiable = false;
							}
							com_genome2d_node_GNode.g2d_core = com_genome2d_Genome2D.g2d_instance;
						}
						$r = com_genome2d_node_GNode.g2d_core;
						return $r;
					}(this))).g2d_renderMatrixIndex]);
				}
			}
		}
	}
	,getPrototypeDefault: function(p_prototypeXml) {
		p_prototypeXml = com_genome2d_proto_GPrototypeFactory.g2d_getPrototype(this,p_prototypeXml,com_genome2d_node_GNode.PROTOTYPE_NAME,com_genome2d_node_GNode.PROTOTYPE_PROPERTY_NAMES,com_genome2d_node_GNode.PROTOTYPE_PROPERTY_TYPES,com_genome2d_node_GNode.PROTOTYPE_PROPERTY_DEFAULTS,com_genome2d_node_GNode.PROTOTYPE_PROPERTY_EXTRAS);
		return p_prototypeXml;
	}
	,bindPrototypeDefault: function(p_prototypeXml) {
		com_genome2d_proto_GPrototypeFactory.g2d_bindPrototype(this,p_prototypeXml,com_genome2d_node_GNode.PROTOTYPE_PROPERTY_NAMES,com_genome2d_node_GNode.PROTOTYPE_PROPERTY_TYPES,com_genome2d_node_GNode.PROTOTYPE_PROPERTY_EXTRAS);
	}
	,toReference: function() {
		return "";
	}
	,setPrototypeState: function(p_stateName) {
		if(this.g2d_currentState != p_stateName) {
			this.g2d_currentState = p_stateName;
			var state = this.g2d_prototypeStates.g2d_states.get(p_stateName);
			if(state != null) {
				var $it0 = state.keys();
				while( $it0.hasNext() ) {
					var propertyName = $it0.next();
					try {
						Reflect.setProperty(this,propertyName,__map_reserved[propertyName] != null?state.getReserved(propertyName):state.h[propertyName]);
					} catch( e ) {
						if (e instanceof js__$Boot_HaxeError) e = e.val;
					}
				}
			}
		}
	}
	,__class__: com_genome2d_node_GNode
	,__properties__: {get_matrix:"get_matrix",set_color:"set_color",set_alpha:"set_alpha",get_alpha:"get_alpha",set_blue:"set_blue",get_blue:"get_blue",set_green:"set_green",get_green:"get_green",set_red:"set_red",get_red:"get_red",set_rotation:"set_rotation",get_rotation:"get_rotation",set_scaleY:"set_scaleY",get_scaleY:"get_scaleY",set_scaleX:"set_scaleX",get_scaleX:"get_scaleX",set_g2d_useMatrix:"set_g2d_useMatrix",get_g2d_useMatrix:"get_g2d_useMatrix",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x",get_onRemovedFromStage:"get_onRemovedFromStage",get_onAddedToStage:"get_onAddedToStage",get_childCount:"get_childCount",get_previous:"get_previous",get_next:"get_next",get_lastChild:"get_lastChild",get_firstChild:"get_firstChild",get_onMouseOut:"get_onMouseOut",get_onMouseOver:"get_onMouseOver",get_onMouseUp:"get_onMouseUp",get_onMouseClick:"get_onMouseClick",get_onMouseMove:"get_onMouseMove",get_onMouseDown:"get_onMouseDown",get_parent:"get_parent",get_id:"get_id",set_mask:"set_mask",get_mask:"get_mask",get_core:"get_core"}
};
var com_genome2d_node_GNodePool = function(p_prototype,p_maxCount,p_precacheCount) {
	if(p_precacheCount == null) p_precacheCount = 0;
	if(p_maxCount == null) p_maxCount = 0;
	this.g2d_cachedCount = 0;
	this.g2d_prototype = p_prototype;
	this.g2d_maxCount = p_maxCount;
	var _g = 0;
	while(_g < p_precacheCount) {
		var i = _g++;
		this.g2d_createNew(true);
	}
};
com_genome2d_node_GNodePool.__name__ = true;
com_genome2d_node_GNodePool.prototype = {
	getCachedCount: function() {
		return this.g2d_cachedCount;
	}
	,getNext: function() {
		var node;
		if(this.g2d_first == null || this.g2d_first.g2d_active) node = this.g2d_createNew(); else {
			node = this.g2d_first;
			this.g2d_putToBack(node);
			node.setActive(true);
		}
		return node;
	}
	,recycle: function(p_node,p_reset) {
		if(p_reset == null) p_reset = false;
		p_node.setActive(false);
		p_node.bindPrototype(this.g2d_prototype);
		this.g2d_putToFront(p_node);
	}
	,g2d_putToFront: function(p_node) {
		if(p_node == this.g2d_first) return;
		if(p_node.g2d_poolNext != null) p_node.g2d_poolNext.g2d_poolPrevious = p_node.g2d_poolPrevious;
		if(p_node.g2d_poolPrevious != null) p_node.g2d_poolPrevious.g2d_poolNext = p_node.g2d_poolNext;
		if(p_node == this.g2d_last) this.g2d_last = this.g2d_last.g2d_poolPrevious;
		if(this.g2d_first != null) this.g2d_first.g2d_poolPrevious = p_node;
		p_node.g2d_poolPrevious = null;
		p_node.g2d_poolNext = this.g2d_first;
		this.g2d_first = p_node;
	}
	,g2d_putToBack: function(p_node) {
		if(p_node == this.g2d_last) return;
		if(p_node.g2d_poolNext != null) p_node.g2d_poolNext.g2d_poolPrevious = p_node.g2d_poolPrevious;
		if(p_node.g2d_poolPrevious != null) p_node.g2d_poolPrevious.g2d_poolNext = p_node.g2d_poolNext;
		if(p_node == this.g2d_first) this.g2d_first = this.g2d_first.g2d_poolNext;
		if(this.g2d_last != null) this.g2d_last.g2d_poolNext = p_node;
		p_node.g2d_poolPrevious = this.g2d_last;
		p_node.g2d_poolNext = null;
		this.g2d_last = p_node;
	}
	,g2d_createNew: function(p_precache) {
		if(p_precache == null) p_precache = false;
		var node = null;
		if(this.g2d_maxCount == 0 || this.g2d_cachedCount < this.g2d_maxCount) {
			this.g2d_cachedCount++;
			node = com_genome2d_node_GNode.createFromPrototype(this.g2d_prototype);
			if(p_precache) node.setActive(false);
			node.g2d_pool = this;
			if(this.g2d_first == null) {
				this.g2d_first = node;
				this.g2d_last = node;
			} else {
				node.g2d_poolPrevious = this.g2d_last;
				this.g2d_last.g2d_poolNext = node;
				this.g2d_last = node;
			}
		}
		return node;
	}
	,dispose: function() {
		while(this.g2d_first != null) {
			var next = this.g2d_first.g2d_poolNext;
			this.g2d_first.dispose();
			this.g2d_first = next;
		}
	}
	,__class__: com_genome2d_node_GNodePool
};
var com_genome2d_node_IGNodeSorter = function() { };
com_genome2d_node_IGNodeSorter.__name__ = true;
com_genome2d_node_IGNodeSorter.prototype = {
	__class__: com_genome2d_node_IGNodeSorter
};
var com_genome2d_particles_GSimpleParticle = function() {
	this.g2d_id = 0;
	this.g2d_accumulatedEnergy = 0;
	this.g2d_endScale = 1;
	this.g2d_initialScale = 1;
	this.g2d_energy = 0;
	this.g2d_velocityY = 0;
	this.g2d_velocityX = 0;
	this.g2d_id = com_genome2d_particles_GSimpleParticle.g2d_instanceCount++;
};
com_genome2d_particles_GSimpleParticle.__name__ = true;
com_genome2d_particles_GSimpleParticle.precache = function(p_precacheCount) {
	if(p_precacheCount < com_genome2d_particles_GSimpleParticle.g2d_instanceCount) return;
	var precached = com_genome2d_particles_GSimpleParticle.g2d_get();
	while(com_genome2d_particles_GSimpleParticle.g2d_instanceCount < p_precacheCount) {
		var n = com_genome2d_particles_GSimpleParticle.g2d_get();
		n.g2d_previous = precached;
		precached = n;
	}
	while(precached != null) {
		var d = precached;
		precached = d.g2d_previous;
		d.g2d_dispose();
	}
};
com_genome2d_particles_GSimpleParticle.g2d_get = function() {
	var instance = com_genome2d_particles_GSimpleParticle.g2d_availableInstance;
	if(instance != null) {
		com_genome2d_particles_GSimpleParticle.g2d_availableInstance = instance.g2d_nextInstance;
		instance.g2d_nextInstance = null;
	} else instance = new com_genome2d_particles_GSimpleParticle();
	return instance;
};
com_genome2d_particles_GSimpleParticle.prototype = {
	g2d_init: function(p_emitter,p_invalidate) {
		if(p_invalidate == null) p_invalidate = true;
		this.g2d_accumulatedEnergy = 0;
		this.g2d_texture = p_emitter.texture;
		this.g2d_energy = p_emitter.energy * 1000;
		if(p_emitter.energyVariance > 0) this.g2d_energy += p_emitter.energyVariance * 1000 * Math.random();
		this.g2d_initialScale = p_emitter.initialScale;
		if(p_emitter.initialScaleVariance > 0) this.g2d_initialScale += p_emitter.initialScaleVariance * Math.random();
		this.g2d_endScale = p_emitter.endScale;
		if(p_emitter.endScaleVariance > 0) this.g2d_endScale += p_emitter.endScaleVariance * Math.random();
		var particleVelocityX;
		var particleVelocityY;
		var v = p_emitter.initialVelocity;
		if(p_emitter.initialVelocityVariance > 0) v += p_emitter.initialVelocityVariance * Math.random();
		var particleAccelerationX;
		var particleAccelerationY;
		var a = p_emitter.initialAcceleration;
		if(p_emitter.initialAccelerationVariance > 0) a += p_emitter.initialAccelerationVariance * Math.random();
		var vX = particleVelocityX = v;
		var vY = particleVelocityY = 0;
		var aX = particleAccelerationX = a;
		var aY = particleAccelerationY = 0;
		var rot = p_emitter.g2d_node.g2d_worldRotation;
		if(rot != 0) {
			var sin = Math.sin(rot);
			var cos = Math.cos(rot);
			vX = particleVelocityX = v * cos;
			vY = particleVelocityY = v * sin;
			aX = particleAccelerationX = a * cos;
			aY = particleAccelerationY = a * sin;
		}
		if(p_emitter.dispersionAngle != 0 || p_emitter.dispersionAngleVariance != 0) {
			var rangle = p_emitter.dispersionAngle;
			if(p_emitter.dispersionAngleVariance > 0) rangle += p_emitter.dispersionAngleVariance * Math.random();
			var sin1 = Math.sin(rangle);
			var cos1 = Math.cos(rangle);
			particleVelocityX = vX * cos1 - vY * sin1;
			particleVelocityY = vY * cos1 + vX * sin1;
			particleAccelerationX = aX * cos1 - aY * sin1;
			particleAccelerationY = aY * cos1 + aX * sin1;
		}
		this.g2d_initialVelocityX = this.g2d_velocityX = particleVelocityX * .001;
		this.g2d_initialVelocityY = this.g2d_velocityY = particleVelocityY * .001;
		this.g2d_initialAccelerationX = this.g2d_accelerationX = particleAccelerationX * .001;
		this.g2d_initialAccelerationY = this.g2d_accelerationY = particleAccelerationY * .001;
		this.g2d_initialVelocityAngular = p_emitter.initialAngularVelocity;
		if(p_emitter.initialAngularVelocityVariance > 0) this.g2d_initialVelocityAngular += p_emitter.initialAngularVelocityVariance * Math.random();
		this.g2d_initialRed = p_emitter.initialRed;
		if(p_emitter.initialRedVariance > 0) this.g2d_initialRed += p_emitter.initialRedVariance * Math.random();
		this.g2d_initialGreen = p_emitter.initialGreen;
		if(p_emitter.initialGreenVariance > 0) this.g2d_initialGreen += p_emitter.initialGreenVariance * Math.random();
		this.g2d_initialBlue = p_emitter.initialBlue;
		if(p_emitter.initialBlueVariance > 0) this.g2d_initialBlue += p_emitter.initialBlueVariance * Math.random();
		this.g2d_initialAlpha = p_emitter.initialAlpha;
		if(p_emitter.initialAlphaVariance > 0) this.g2d_initialAlpha += p_emitter.initialAlphaVariance * Math.random();
		this.g2d_endRed = p_emitter.endRed;
		if(p_emitter.endRedVariance > 0) this.g2d_endRed += p_emitter.endRedVariance * Math.random();
		this.g2d_endGreen = p_emitter.endGreen;
		if(p_emitter.endGreenVariance > 0) this.g2d_endGreen += p_emitter.endGreenVariance * Math.random();
		this.g2d_endBlue = p_emitter.endBlue;
		if(p_emitter.endBlueVariance > 0) this.g2d_endBlue += p_emitter.endBlueVariance * Math.random();
		this.g2d_endAlpha = p_emitter.endAlpha;
		if(p_emitter.endAlphaVariance > 0) this.g2d_endAlpha += p_emitter.endAlphaVariance * Math.random();
		this.g2d_redDif = this.g2d_endRed - this.g2d_initialRed;
		this.g2d_greenDif = this.g2d_endGreen - this.g2d_initialGreen;
		this.g2d_blueDif = this.g2d_endBlue - this.g2d_initialBlue;
		this.g2d_alphaDif = this.g2d_endAlpha - this.g2d_initialAlpha;
		this.g2d_scaleDif = this.g2d_endScale - this.g2d_initialScale;
	}
	,g2d_update: function(p_emitter,p_deltaTime) {
		this.g2d_accumulatedEnergy += p_deltaTime;
		if(this.g2d_accumulatedEnergy >= this.g2d_energy) {
			p_emitter.deactivateParticle(this);
			return;
		}
		var p = this.g2d_accumulatedEnergy / this.g2d_energy;
		this.g2d_velocityX += this.g2d_accelerationX * p_deltaTime;
		this.g2d_velocityY += this.g2d_accelerationY * p_deltaTime;
		this.g2d_red = this.g2d_redDif * p + this.g2d_initialRed;
		this.g2d_green = this.g2d_greenDif * p + this.g2d_initialGreen;
		this.g2d_blue = this.g2d_blueDif * p + this.g2d_initialBlue;
		this.g2d_alpha = this.g2d_alphaDif * p + this.g2d_initialAlpha;
		this.g2d_x += this.g2d_velocityX * p_deltaTime;
		this.g2d_y += this.g2d_velocityY * p_deltaTime;
		this.g2d_rotation += this.g2d_initialVelocityAngular * p_deltaTime;
		this.g2d_scaleX = this.g2d_scaleY = this.g2d_scaleDif * p + this.g2d_initialScale;
	}
	,g2d_dispose: function() {
		if(this.g2d_next != null) this.g2d_next.g2d_previous = this.g2d_previous;
		if(this.g2d_previous != null) this.g2d_previous.g2d_next = this.g2d_next;
		this.g2d_next = null;
		this.g2d_previous = null;
		this.g2d_nextInstance = com_genome2d_particles_GSimpleParticle.g2d_availableInstance;
		com_genome2d_particles_GSimpleParticle.g2d_availableInstance = this;
	}
	,__class__: com_genome2d_particles_GSimpleParticle
};
var com_genome2d_postprocess_GPostProcess = function(p_passes,p_filters) {
	if(p_passes == null) p_passes = 1;
	this.g2d_bottomMargin = 0;
	this.g2d_topMargin = 0;
	this.g2d_rightMargin = 0;
	this.g2d_leftMargin = 0;
	this.g2d_passes = 1;
	this.g2d_id = Std.string(com_genome2d_postprocess_GPostProcess.g2d_count++);
	if(p_passes < 1) com_genome2d_debug_GDebug.error("There are no passes.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GPostProcess.hx", lineNumber : 46, className : "com.genome2d.postprocess.GPostProcess", methodName : "new"});
	this.g2d_passes = p_passes;
	this.g2d_matrix = new com_genome2d_geom_GMatrix3D();
	this.g2d_passFilters = p_filters;
	this.g2d_passTextures = [];
	var _g1 = 0;
	var _g = this.g2d_passes;
	while(_g1 < _g) {
		var i = _g1++;
		this.g2d_passTextures.push(null);
	}
	this.createPassTextures();
};
com_genome2d_postprocess_GPostProcess.__name__ = true;
com_genome2d_postprocess_GPostProcess.prototype = {
	getPassCount: function() {
		return this.g2d_passes;
	}
	,setBounds: function(p_bounds) {
		this.g2d_definedBounds = p_bounds;
	}
	,setMargins: function(p_leftMargin,p_rightMargin,p_topMargin,p_bottomMargin) {
		if(p_bottomMargin == null) p_bottomMargin = 0;
		if(p_topMargin == null) p_topMargin = 0;
		if(p_rightMargin == null) p_rightMargin = 0;
		if(p_leftMargin == null) p_leftMargin = 0;
		this.g2d_leftMargin = p_leftMargin;
		this.g2d_rightMargin = p_rightMargin;
		this.g2d_topMargin = p_topMargin;
		this.g2d_bottomMargin = p_bottomMargin;
	}
	,render: function(p_source,p_x,p_y,p_bounds,p_target) {
		var bounds;
		if(p_bounds == null) bounds = this.g2d_definedBounds; else bounds = p_bounds;
		if(bounds.width > 4096) return;
		this.updatePassTextures(bounds);
		var context = ((function($this) {
			var $r;
			if(com_genome2d_Genome2D.g2d_instance == null) {
				com_genome2d_Genome2D.g2d_instantiable = true;
				new com_genome2d_Genome2D();
				com_genome2d_Genome2D.g2d_instantiable = false;
			}
			$r = com_genome2d_Genome2D.g2d_instance;
			return $r;
		}(this))).getContext();
		if(p_target == null) com_genome2d_utils_GRenderTargetStack.pushRenderTarget(context.getRenderTarget(),context.getRenderTargetMatrix());
		if(p_source == null) com_genome2d_debug_GDebug.error("Invalid source for post process.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GPostProcess.hx", lineNumber : 81, className : "com.genome2d.postprocess.GPostProcess", methodName : "render"});
		this.g2d_matrix.identity();
		this.g2d_matrix.prependTranslation(-bounds.x + this.g2d_leftMargin,-bounds.y + this.g2d_topMargin,0);
		context.setRenderTarget(this.g2d_passTextures[0],this.g2d_matrix,true);
		context.bindRenderer(context.g2d_drawRenderer);
		context.g2d_drawRenderer.draw(p_x,p_y,1,1,0,1,1,1,1,p_source);
		var zero = this.g2d_passTextures[0];
		var _g1 = 1;
		var _g = this.g2d_passes;
		while(_g1 < _g) {
			var i = _g1++;
			context.setRenderTarget(this.g2d_passTextures[i],null,true);
			context.bindRenderer(context.g2d_drawRenderer);
			context.g2d_drawRenderer.draw(0,0,1,1,0,1,1,1,1,this.g2d_passTextures[i - 1]);
		}
		if(p_target == null) {
			com_genome2d_utils_GRenderTargetStack.popRenderTarget(context);
			context.bindRenderer(context.g2d_drawRenderer);
			context.g2d_drawRenderer.draw(bounds.x - this.g2d_leftMargin,bounds.y - this.g2d_topMargin,1,1,0,1,1,1,1,this.g2d_passTextures[this.g2d_passes - 1]);
		} else {
			context.setRenderTarget(p_target);
			context.bindRenderer(context.g2d_drawRenderer);
			context.g2d_drawRenderer.draw(0,0,1,1,0,1,1,1,1,this.g2d_passTextures[this.g2d_passes - 1]);
		}
		this.g2d_passTextures[0] = zero;
	}
	,renderNode: function(p_parentTransformUpdate,p_parentColorUpdate,p_camera,p_node,p_bounds,p_source,p_target) {
		var bounds = p_bounds;
		if(bounds == null) if(this.g2d_definedBounds != null) bounds = this.g2d_definedBounds; else bounds = p_node.getBounds(null,this.g2d_activeBounds);
		if(bounds.width > 4096) return;
		this.updatePassTextures(bounds);
		var context = ((function($this) {
			var $r;
			if(com_genome2d_Genome2D.g2d_instance == null) {
				com_genome2d_Genome2D.g2d_instantiable = true;
				new com_genome2d_Genome2D();
				com_genome2d_Genome2D.g2d_instantiable = false;
			}
			$r = com_genome2d_Genome2D.g2d_instance;
			return $r;
		}(this))).getContext();
		com_genome2d_utils_GRenderTargetStack.pushRenderTarget(context.getRenderTarget(),context.getRenderTargetMatrix());
		if(p_source == null) {
			this.g2d_matrix.identity();
			this.g2d_matrix.prependTranslation(-bounds.x + this.g2d_leftMargin,-bounds.y + this.g2d_topMargin,0);
			context.setRenderTarget(this.g2d_passTextures[0],this.g2d_matrix,true);
			p_node.render(true,true,p_camera,false,false);
		}
		var zero = this.g2d_passTextures[0];
		if(p_source != null) this.g2d_passTextures[0] = p_source;
		var _g1 = 1;
		var _g = this.g2d_passes;
		while(_g1 < _g) {
			var i = _g1++;
			context.setRenderTarget(this.g2d_passTextures[i],null,true);
			context.bindRenderer(context.g2d_drawRenderer);
			context.g2d_drawRenderer.draw(0,0,1,1,0,1,1,1,1,this.g2d_passTextures[i - 1]);
		}
		if(p_target == null) {
			com_genome2d_utils_GRenderTargetStack.popRenderTarget(context);
			if(context.getRenderTarget() == null) context.setActiveCamera(p_camera);
			context.bindRenderer(context.g2d_drawRenderer);
			context.g2d_drawRenderer.draw(bounds.x - this.g2d_leftMargin,bounds.y - this.g2d_topMargin,1,1,0,1,1,1,1,this.g2d_passTextures[this.g2d_passes - 1]);
		} else {
			context.setRenderTarget(p_target);
			context.bindRenderer(context.g2d_drawRenderer);
			context.g2d_drawRenderer.draw(0,0,1,1,0,1,1,1,1,this.g2d_passTextures[this.g2d_passes - 1]);
		}
		this.g2d_passTextures[0] = zero;
	}
	,getPassTexture: function(p_pass) {
		return this.g2d_passTextures[p_pass];
	}
	,getPassFilter: function(p_pass) {
		return this.g2d_passFilters[p_pass];
	}
	,updatePassTextures: function(p_bounds) {
		var w = p_bounds.width + this.g2d_leftMargin + this.g2d_rightMargin | 0;
		var h = p_bounds.height + this.g2d_topMargin + this.g2d_bottomMargin | 0;
		if((this.g2d_passTextures[0].get_width() != w || this.g2d_passTextures[0].get_height() != h) && w > 0 && h > 0) {
			var i = this.g2d_passTextures.length - 1;
			while(i >= 0) {
				var texture = this.g2d_passTextures[i];
				texture.set_region(new com_genome2d_geom_GRectangle(0,0,w,h));
				texture.g2d_pivotX = -(texture.g2d_nativeWidth * texture.g2d_scaleFactor) / 2 / texture.g2d_scaleFactor;
				texture.g2d_pivotY = -(texture.g2d_nativeHeight * texture.g2d_scaleFactor) / 2 / texture.g2d_scaleFactor;
				texture.invalidateNativeTexture(true);
				i--;
			}
		}
	}
	,createPassTextures: function() {
		var _g1 = 0;
		var _g = this.g2d_passes;
		while(_g1 < _g) {
			var i = _g1++;
			var texture = com_genome2d_textures_GTextureManager.createRenderTexture("g2d_pp_" + this.g2d_id + "_" + i,2,2);
			texture.g2d_filteringType = 0;
			texture.g2d_pivotX = -(texture.g2d_nativeWidth * texture.g2d_scaleFactor) / 2 / texture.g2d_scaleFactor;
			texture.g2d_pivotY = -(texture.g2d_nativeHeight * texture.g2d_scaleFactor) / 2 / texture.g2d_scaleFactor;
			this.g2d_passTextures[i] = texture;
		}
	}
	,dispose: function() {
		var i = this.g2d_passTextures.length - 1;
		while(i >= 0) {
			this.g2d_passTextures[i].dispose();
			i--;
		}
	}
	,__class__: com_genome2d_postprocess_GPostProcess
};
var com_genome2d_proto_GPrototypeExtras = function() { };
com_genome2d_proto_GPrototypeExtras.__name__ = true;
var com_genome2d_proto_GPrototypeFactory = function() { };
com_genome2d_proto_GPrototypeFactory.__name__ = true;
com_genome2d_proto_GPrototypeFactory.initializePrototypes = function() {
	if(com_genome2d_proto_GPrototypeFactory.g2d_lookups != null) return;
	com_genome2d_proto_GPrototypeFactory.g2d_lookups = new haxe_ds_StringMap();
};
com_genome2d_proto_GPrototypeFactory.getPrototypeClass = function(p_prototypeName) {
	return com_genome2d_proto_GPrototypeFactory.g2d_lookups.get(p_prototypeName);
};
com_genome2d_proto_GPrototypeFactory.getPrototype = function(p_instance) {
	return p_instance.getPrototype();
};
com_genome2d_proto_GPrototypeFactory.createPrototype = function(p_prototype) {
	var prototypeXml;
	if(js_Boot.__instanceof(p_prototype,Xml)) if(p_prototype.nodeType == Xml.Document) prototypeXml = p_prototype.firstChild(); else prototypeXml = p_prototype; else prototypeXml = Xml.parse(p_prototype).firstElement();
	var prototypeName;
	if(prototypeXml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + prototypeXml.nodeType);
	prototypeName = prototypeXml.nodeName;
	var prototypeClass = com_genome2d_proto_GPrototypeFactory.g2d_lookups.get(prototypeName);
	if(prototypeClass == null) com_genome2d_debug_GDebug.error("Non existing prototype class " + prototypeName,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GPrototypeFactory.hx", lineNumber : 48, className : "com.genome2d.proto.GPrototypeFactory", methodName : "createPrototype"});
	var proto = Type.createInstance(prototypeClass,[]);
	if(proto == null) com_genome2d_debug_GDebug.error("Invalid prototype class " + prototypeName,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GPrototypeFactory.hx", lineNumber : 52, className : "com.genome2d.proto.GPrototypeFactory", methodName : "createPrototype"});
	proto.bindPrototype(prototypeXml);
	return proto;
};
com_genome2d_proto_GPrototypeFactory.createEmptyPrototype = function(p_prototypeName) {
	var prototypeClass = com_genome2d_proto_GPrototypeFactory.g2d_lookups.get(p_prototypeName);
	if(prototypeClass == null) com_genome2d_debug_GDebug.error("Non existing prototype class " + p_prototypeName,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GPrototypeFactory.hx", lineNumber : 62, className : "com.genome2d.proto.GPrototypeFactory", methodName : "createEmptyPrototype"});
	var proto = Type.createInstance(prototypeClass,[]);
	if(proto == null) com_genome2d_debug_GDebug.error("Invalid prototype class " + p_prototypeName,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GPrototypeFactory.hx", lineNumber : 66, className : "com.genome2d.proto.GPrototypeFactory", methodName : "createEmptyPrototype"});
	return proto;
};
com_genome2d_proto_GPrototypeFactory.g2d_getPrototype = function(p_instance,p_prototypeXml,p_prototypeName,p_propertyNames,p_propertyTypes,p_propertyDefaults,p_propertyExtras) {
	if(p_prototypeXml == null) p_prototypeXml = Xml.createElement(p_prototypeName);
	if(p_propertyNames != null) {
		var _g1 = 0;
		var _g = p_propertyNames.length;
		while(_g1 < _g) {
			var i = _g1++;
			var name = p_propertyNames[i];
			var type = p_propertyTypes[i];
			if(type.indexOf("Array") == 0) {
				var subtype = HxOverrides.substr(type,6,null);
				if(subtype != "Int" && subtype != "Bool" && subtype != "Float" && subtype != "String") {
					var xml = Xml.createElement(name);
					p_prototypeXml.addChild(xml);
					var items = Reflect.getProperty(p_instance,name);
					if(items != null) {
						var _g2 = 0;
						while(_g2 < items.length) {
							var item = items[_g2];
							++_g2;
							xml.addChild(item.getPrototype());
						}
					}
				} else {
					var value = Std.string(Reflect.getProperty(p_instance,name));
					p_prototypeXml.set(name,HxOverrides.substr(value,1,value.length - 2));
				}
			} else if(type.indexOf("R:") == 0) {
				var field = Reflect.field(p_instance,name);
				p_prototypeXml.set(name,field == null?"":field.toReference());
			} else if(type != "Int" && type != "Bool" && type != "Float" && type != "String") {
				var xml1 = Xml.createElement(name);
				var property = Reflect.getProperty(p_instance,name);
				if(property != null) {
					xml1.addChild(property.getPrototype());
					p_prototypeXml.addChild(xml1);
				}
			} else {
				var value1 = Reflect.getProperty(p_instance,name);
				if(value1 != p_propertyDefaults[i]) p_prototypeXml.set(name,Std.string(Reflect.getProperty(p_instance,name)));
			}
		}
	}
	return p_prototypeXml;
};
com_genome2d_proto_GPrototypeFactory.g2d_bindPrototype2 = function(p_instance,p_prototype,p_propertyNames,p_propertyTypes) {
	if(p_prototype == null) com_genome2d_debug_GDebug.error("Null prototype",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GPrototypeFactory.hx", lineNumber : 127, className : "com.genome2d.proto.GPrototypeFactory", methodName : "g2d_bindPrototype2"});
	var _g1 = 0;
	var _g = p_propertyNames.length;
	while(_g1 < _g) {
		var i = _g1++;
		var name = p_propertyNames[i];
		var type = p_propertyTypes[i];
		var realValue = null;
		if(p_prototype.exists(name)) {
			var value = p_prototype.get(name);
			if(type.indexOf("Array") == 0) {
				var subtype = HxOverrides.substr(type,6,null);
				switch(subtype) {
				case "Bool":
					realValue = [];
					break;
				case "Int":
					realValue = [];
					break;
				case "Float":
					realValue = [];
					break;
				case "String":
					realValue = [];
					break;
				default:
				}
				var split = value.split(",");
				var _g2 = 0;
				while(_g2 < split.length) {
					var item = split[_g2];
					++_g2;
					switch(subtype) {
					case "Bool":
						realValue.push(item != "false" && item != "0");
						break;
					case "Int":
						realValue.push(Std.parseInt(item));
						break;
					case "Float":
						realValue.push(parseFloat(item));
						break;
					case "String":
						realValue.push(item);
						break;
					default:
					}
				}
			} else if(type.indexOf("R:") == 0) {
				type = HxOverrides.substr(type,2,null);
				var c = com_genome2d_proto_GPrototypeFactory.getPrototypeClass(type);
				realValue = Reflect.callMethod(c,Reflect.field(c,"fromReference"),[value]);
			} else switch(type) {
			case "Bool":
				realValue = value != "false" && value != "0";
				break;
			case "Int":
				realValue = Std.parseInt(value);
				break;
			case "Float":
				realValue = parseFloat(value);
				break;
			case "String":
				realValue = value;
				break;
			default:
			}
		} else if(type != "Int" && type != "Bool" && type != "Float" && type != "String") {
			var it = p_prototype.elementsNamed(name);
			if(it.hasNext()) realValue = com_genome2d_proto_GPrototypeFactory.createPrototype(it.next().firstElement());
		}
		if(realValue != null) try {
			Reflect.setProperty(p_instance,name,realValue);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
		}
	}
};
com_genome2d_proto_GPrototypeFactory.g2d_bindPrototype = function(p_instance,p_prototype,p_propertyNames,p_propertyTypes,p_propertyExtras) {
	if(p_prototype == null) com_genome2d_debug_GDebug.error("Null prototype",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GPrototypeFactory.hx", lineNumber : 219, className : "com.genome2d.proto.GPrototypeFactory", methodName : "g2d_bindPrototype"});
	if(p_instance.g2d_prototypeStates == null) p_instance.g2d_prototypeStates = new com_genome2d_proto_GPrototypeStates();
	var attributes = p_prototype.attributes();
	while(attributes.hasNext()) {
		var attributeName = attributes.next();
		var attributeValue = p_prototype.get(attributeName);
		com_genome2d_proto_GPrototypeFactory.g2d_bindProperty(attributeName,attributeValue,p_instance,p_prototype,p_propertyNames,p_propertyTypes,p_propertyExtras);
	}
	var it = p_prototype.elements();
	while(it.hasNext()) {
		var xmlNode = it.next();
		if(((function($this) {
			var $r;
			if(xmlNode.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xmlNode.nodeType);
			$r = xmlNode.nodeName;
			return $r;
		}(this))).indexOf("p:") == 0) com_genome2d_proto_GPrototypeFactory.g2d_bindProperty((function($this) {
			var $r;
			var _this;
			{
				if(xmlNode.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xmlNode.nodeType);
				_this = xmlNode.nodeName;
			}
			$r = HxOverrides.substr(_this,2,null);
			return $r;
		}(this)),xmlNode,p_instance,p_prototype,p_propertyNames,p_propertyTypes,p_propertyExtras);
	}
};
com_genome2d_proto_GPrototypeFactory.g2d_bindProperty = function(p_propertyName,p_propertyValue,p_instance,p_prototype,p_propertyNames,p_propertyTypes,p_propertyExtras) {
	var split = p_propertyName.split(".");
	var propertyIndex = HxOverrides.indexOf(p_propertyNames,split[0],0);
	if(propertyIndex > -1) {
		var propertyType = p_propertyTypes[propertyIndex];
		var propertyExtras = p_propertyExtras[propertyIndex];
		var realValue;
		if(js_Boot.__instanceof(p_propertyValue,Xml)) realValue = com_genome2d_proto_GPrototypeFactory.g2d_convertXmlValue(p_propertyValue,propertyType); else if(p_propertyValue.indexOf("@") == 0) {
			p_propertyValue = p_propertyValue.substr(1);
			var c = com_genome2d_proto_GPrototypeFactory.getPrototypeClass(propertyType);
			realValue = Reflect.callMethod(c,Reflect.field(c,"fromReference"),[p_propertyValue]);
		} else realValue = com_genome2d_proto_GPrototypeFactory.g2d_convertStringValue(p_propertyValue,propertyType);
		if(realValue != null) {
			if(split.length == 1) {
				try {
					if(propertyExtras == "setter") Reflect.callMethod(p_instance,Reflect.field(p_instance,split[0]),[realValue]); else Reflect.setProperty(p_instance,split[0],realValue);
				} catch( e ) {
					if (e instanceof js__$Boot_HaxeError) e = e.val;
					com_genome2d_debug_GDebug.error("Error during prototype binding: ",e,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GPrototypeFactory.hx", lineNumber : 269, className : "com.genome2d.proto.GPrototypeFactory", methodName : "g2d_bindProperty"});
				}
				p_instance.g2d_prototypeStates.setProperty(split[0],realValue,null);
			} else p_instance.g2d_prototypeStates.setProperty(split[0],realValue,split[1]);
		}
	}
};
com_genome2d_proto_GPrototypeFactory.g2d_convertXmlValue = function(p_value,p_type) {
	var firstChild;
	if(p_value.nodeType != Xml.Document && p_value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + p_value.nodeType);
	firstChild = p_value.children[0];
	var realValue = null;
	switch(p_type) {
	case "Bool":
		if(firstChild.nodeType == Xml.CData) realValue = (function($this) {
			var $r;
			if(firstChild.nodeType == Xml.Document || firstChild.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + firstChild.nodeType);
			$r = firstChild.nodeValue;
			return $r;
		}(this)) != "false" && (function($this) {
			var $r;
			if(firstChild.nodeType == Xml.Document || firstChild.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + firstChild.nodeType);
			$r = firstChild.nodeValue;
			return $r;
		}(this)) != "0";
		break;
	case "Int":
		if(firstChild.nodeType == Xml.CData) realValue = Std.parseInt((function($this) {
			var $r;
			if(firstChild.nodeType == Xml.Document || firstChild.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + firstChild.nodeType);
			$r = firstChild.nodeValue;
			return $r;
		}(this)));
		break;
	case "Float":
		if(firstChild.nodeType == Xml.CData) realValue = Std.parseFloat((function($this) {
			var $r;
			if(firstChild.nodeType == Xml.Document || firstChild.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + firstChild.nodeType);
			$r = firstChild.nodeValue;
			return $r;
		}(this)));
		break;
	case "String":
		if(firstChild.nodeType == Xml.CData) {
			if(firstChild.nodeType == Xml.Document || firstChild.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + firstChild.nodeType);
			realValue = firstChild.nodeValue;
		}
		break;
	case "Dynamic":
		realValue = firstChild;
		break;
	default:
		var firstElement = p_value.firstElement();
		if(firstElement != null) realValue = com_genome2d_proto_GPrototypeFactory.createPrototype(firstElement);
	}
	return realValue;
};
com_genome2d_proto_GPrototypeFactory.g2d_convertStringValue = function(p_value,p_type) {
	var realValue = null;
	console.log(p_type);
	switch(p_type) {
	case "Bool":
		realValue = p_value != "false" && p_value != "0";
		break;
	case "Int":
		realValue = Std.parseInt(p_value);
		break;
	case "Float":
		realValue = parseFloat(p_value);
		break;
	case "String":case "Dynamic":
		realValue = p_value;
		break;
	default:
		com_genome2d_debug_GDebug.error("Error during prototype binding invalid value for type: " + p_type,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GPrototypeFactory.hx", lineNumber : 313, className : "com.genome2d.proto.GPrototypeFactory", methodName : "g2d_convertStringValue"});
	}
	return realValue;
};
var com_genome2d_proto_GPrototypeStates = function() {
	this.g2d_states = new haxe_ds_StringMap();
};
com_genome2d_proto_GPrototypeStates.__name__ = true;
com_genome2d_proto_GPrototypeStates.prototype = {
	setProperty: function(p_property,p_value,p_stateName) {
		if(p_stateName == null) p_stateName = "default";
		var state = this.g2d_states.get(p_stateName);
		if(state == null) {
			state = new haxe_ds_StringMap();
			this.g2d_states.set(p_stateName,state);
		}
		var value = p_value;
		state.set(p_property,value);
	}
	,getState: function(p_stateName) {
		if(p_stateName == null) p_stateName = "default";
		return this.g2d_states.get(p_stateName);
	}
	,__class__: com_genome2d_proto_GPrototypeStates
};
var com_genome2d_text_GFontManager = function() { };
com_genome2d_text_GFontManager.__name__ = true;
com_genome2d_text_GFontManager.getAllFonts = function() {
	return com_genome2d_text_GFontManager.g2d_fonts;
};
com_genome2d_text_GFontManager.init = function() {
	com_genome2d_text_GFontManager.g2d_fonts = new haxe_ds_StringMap();
};
com_genome2d_text_GFontManager.getFont = function(p_id) {
	return com_genome2d_text_GFontManager.g2d_fonts.get(p_id);
};
com_genome2d_text_GFontManager.createTextureFont = function(p_id,p_texture,p_fontXml) {
	var textureFont = new com_genome2d_text_GTextureFont(p_id,p_texture);
	var root = p_fontXml.firstElement();
	var common = root.elementsNamed("common").next();
	textureFont.lineHeight = Std.parseInt(common.get("lineHeight"));
	var it = root.elementsNamed("chars");
	it = it.next().elements();
	while(it.hasNext()) {
		var node = it.next();
		var w = Std.parseInt(node.get("width"));
		var h = Std.parseInt(node.get("height"));
		var region = new com_genome2d_geom_GRectangle(Std.parseInt(node.get("x")),Std.parseInt(node.get("y")),w,h);
		var $char = textureFont.addChar(node.get("id"),region,Std.parseFloat(node.get("xoffset")),Std.parseFloat(node.get("yoffset")),Std.parseFloat(node.get("xadvance")));
	}
	var kernings = root.elementsNamed("kernings").next();
	if(kernings != null) {
		it = kernings.elements();
		textureFont.kerning = new haxe_ds_IntMap();
		while(it.hasNext()) {
			var node1 = it.next();
			var first = Std.parseInt(node1.get("first"));
			var map = textureFont.kerning.h[first];
			if(map == null) {
				map = new haxe_ds_IntMap();
				textureFont.kerning.h[first] = map;
			}
			var second = Std.parseInt(node1.get("second"));
			var value = Std.parseInt("amount");
			map.h[second] = value;
		}
	}
	com_genome2d_text_GFontManager.g2d_fonts.set(p_id,textureFont);
	return textureFont;
};
var com_genome2d_text_GTextureChar = function(p_texture) {
	this.g2d_xadvance = 0;
	this.g2d_yoffset = 0;
	this.g2d_xoffset = 0;
	this.g2d_texture = p_texture;
};
com_genome2d_text_GTextureChar.__name__ = true;
com_genome2d_text_GTextureChar.prototype = {
	get_xoffset: function() {
		return this.g2d_xoffset * this.g2d_texture.g2d_scaleFactor;
	}
	,set_xoffset: function(p_value) {
		this.g2d_xoffset = p_value / this.g2d_texture.g2d_scaleFactor;
		return this.g2d_xoffset;
	}
	,get_yoffset: function() {
		return this.g2d_yoffset * this.g2d_texture.g2d_scaleFactor;
	}
	,set_yoffset: function(p_value) {
		this.g2d_yoffset = p_value / this.g2d_texture.g2d_scaleFactor;
		return this.g2d_yoffset;
	}
	,get_xadvance: function() {
		return this.g2d_xadvance * this.g2d_texture.g2d_scaleFactor;
	}
	,set_xadvance: function(p_value) {
		this.g2d_xadvance = p_value / this.g2d_texture.g2d_scaleFactor;
		return this.g2d_xadvance;
	}
	,get_texture: function() {
		return this.g2d_texture;
	}
	,__class__: com_genome2d_text_GTextureChar
	,__properties__: {get_texture:"get_texture",set_xadvance:"set_xadvance",get_xadvance:"get_xadvance",set_yoffset:"set_yoffset",get_yoffset:"get_yoffset",set_xoffset:"set_xoffset",get_xoffset:"get_xoffset"}
};
var com_genome2d_text_GTextureFont = function(p_id,p_texture) {
	this.g2d_currentState = "default";
	this.lineHeight = 0;
	this.id = p_id;
	this.texture = p_texture;
	this.g2d_chars = new haxe_ds_StringMap();
};
com_genome2d_text_GTextureFont.__name__ = true;
com_genome2d_text_GTextureFont.__interfaces__ = [com_genome2d_proto_IGPrototypable];
com_genome2d_text_GTextureFont.fromReference = function(p_reference) {
	return com_genome2d_text_GFontManager.getFont(p_reference);
};
com_genome2d_text_GTextureFont.prototype = {
	getChar: function(p_subId) {
		return this.g2d_chars.get(p_subId);
	}
	,addChar: function(p_charId,p_region,p_xoffset,p_yoffset,p_xadvance) {
		var charTexture = com_genome2d_textures_GTextureManager.createSubTexture(this.texture.g2d_id + "_" + p_charId,this.texture,p_region);
		charTexture.g2d_pivotX = -p_region.width / 2 / charTexture.g2d_scaleFactor;
		charTexture.g2d_pivotY = -p_region.height / 2 / charTexture.g2d_scaleFactor;
		var $char = new com_genome2d_text_GTextureChar(charTexture);
		$char.g2d_xoffset = p_xoffset / $char.g2d_texture.g2d_scaleFactor;
		$char.g2d_xoffset;
		$char.g2d_yoffset = p_yoffset / $char.g2d_texture.g2d_scaleFactor;
		$char.g2d_yoffset;
		$char.g2d_xadvance = p_xadvance / $char.g2d_texture.g2d_scaleFactor;
		$char.g2d_xadvance;
		this.g2d_chars.set(p_charId,$char);
		return $char;
	}
	,getKerning: function(p_first,p_second) {
		if(this.kerning != null && this.kerning.h.hasOwnProperty(p_first)) {
			var map = this.kerning.h[p_first];
			if(!map.h.hasOwnProperty(p_second)) return 0; else return map.h[p_second] * this.texture.g2d_scaleFactor;
		}
		return 0;
	}
	,getPrototype: function(p_prototypeXml) {
		p_prototypeXml = com_genome2d_proto_GPrototypeFactory.g2d_getPrototype(this,p_prototypeXml,com_genome2d_text_GTextureFont.PROTOTYPE_NAME,com_genome2d_text_GTextureFont.PROTOTYPE_PROPERTY_NAMES,com_genome2d_text_GTextureFont.PROTOTYPE_PROPERTY_TYPES,com_genome2d_text_GTextureFont.PROTOTYPE_PROPERTY_DEFAULTS,com_genome2d_text_GTextureFont.PROTOTYPE_PROPERTY_EXTRAS);
		return p_prototypeXml;
	}
	,bindPrototype: function(p_prototypeXml) {
		com_genome2d_proto_GPrototypeFactory.g2d_bindPrototype(this,p_prototypeXml,com_genome2d_text_GTextureFont.PROTOTYPE_PROPERTY_NAMES,com_genome2d_text_GTextureFont.PROTOTYPE_PROPERTY_TYPES,com_genome2d_text_GTextureFont.PROTOTYPE_PROPERTY_EXTRAS);
	}
	,toReference: function() {
		return "";
	}
	,setPrototypeState: function(p_stateName) {
		if(this.g2d_currentState != p_stateName) {
			this.g2d_currentState = p_stateName;
			var state = this.g2d_prototypeStates.g2d_states.get(p_stateName);
			if(state != null) {
				var $it0 = state.keys();
				while( $it0.hasNext() ) {
					var propertyName = $it0.next();
					try {
						Reflect.setProperty(this,propertyName,__map_reserved[propertyName] != null?state.getReserved(propertyName):state.h[propertyName]);
					} catch( e ) {
						if (e instanceof js__$Boot_HaxeError) e = e.val;
					}
				}
			}
		}
	}
	,__class__: com_genome2d_text_GTextureFont
};
var com_genome2d_textures_GTextureBase = function(p_context,p_id,p_source) {
	this.g2d_currentState = "default";
	this.g2d_dirty = true;
	this.g2d_context = p_context;
	this.g2d_id = p_id;
	this.g2d_nativeWidth = this.g2d_nativeHeight = 0;
	this.g2d_gpuWidth = this.g2d_gpuHeight = 0;
	this.g2d_region = new com_genome2d_geom_GRectangle(0,0,1,1);
	this.g2d_u = this.g2d_v = 0;
	this.g2d_uScale = this.g2d_vScale = 1;
	this.g2d_pivotX = this.g2d_pivotY = 0;
	this.g2d_initializedRenderTarget = false;
	this.premultiplied = true;
	this.g2d_dirty = true;
	this.g2d_scaleFactor = 1;
	com_genome2d_textures_GTextureBase.g2d_instanceCount++;
	this.g2d_contextId = com_genome2d_textures_GTextureBase.g2d_instanceCount;
	this.g2d_format = "bgra";
	this.g2d_repeatable = false;
	this.g2d_filteringType = com_genome2d_textures_GTextureManager.defaultFilteringType;
	this.setSource(p_source);
	com_genome2d_textures_GTextureManager.g2d_addTexture(this);
};
com_genome2d_textures_GTextureBase.__name__ = true;
com_genome2d_textures_GTextureBase.__interfaces__ = [com_genome2d_proto_IGPrototypable];
com_genome2d_textures_GTextureBase.fromReference = function(p_reference) {
	return com_genome2d_textures_GTextureManager.getTexture(p_reference);
};
com_genome2d_textures_GTextureBase.prototype = {
	get_onInvalidated: function() {
		if(this.g2d_onInvalidated == null) this.g2d_onInvalidated = new com_genome2d_callbacks_GCallback1(com_genome2d_textures_GTexture);
		return this.g2d_onInvalidated;
	}
	,get_onDisposed: function() {
		if(this.g2d_onDisposed == null) this.g2d_onDisposed = new com_genome2d_callbacks_GCallback1(com_genome2d_textures_GTexture);
		return this.g2d_onDisposed;
	}
	,isDirty: function() {
		return this.g2d_dirty;
	}
	,get_id: function() {
		return this.g2d_id;
	}
	,set_id: function(p_value) {
		com_genome2d_textures_GTextureManager.g2d_removeTexture(this);
		this.g2d_id = p_value;
		com_genome2d_textures_GTextureManager.g2d_addTexture(this);
		return this.g2d_id;
	}
	,get_pivotX: function() {
		return this.g2d_pivotX * this.g2d_scaleFactor;
	}
	,set_pivotX: function(p_value) {
		return this.g2d_pivotX = p_value / this.g2d_scaleFactor;
	}
	,get_pivotY: function() {
		return this.g2d_pivotY * this.g2d_scaleFactor;
	}
	,set_pivotY: function(p_value) {
		return this.g2d_pivotY = p_value / this.g2d_scaleFactor;
	}
	,get_nativeWidth: function() {
		return this.g2d_nativeWidth;
	}
	,get_nativeHeight: function() {
		return this.g2d_nativeHeight;
	}
	,get_width: function() {
		return this.g2d_nativeWidth * this.g2d_scaleFactor;
	}
	,get_height: function() {
		return this.g2d_nativeHeight * this.g2d_scaleFactor;
	}
	,get_scaleFactor: function() {
		return this.g2d_scaleFactor;
	}
	,set_scaleFactor: function(p_value) {
		this.g2d_scaleFactor = p_value;
		return this.g2d_scaleFactor;
	}
	,get_filteringType: function() {
		return this.g2d_filteringType;
	}
	,set_filteringType: function(p_value) {
		return this.g2d_filteringType = p_value;
	}
	,get_sourceType: function() {
		return this.g2d_sourceType;
	}
	,get_format: function() {
		return this.g2d_format;
	}
	,set_format: function(p_value) {
		this.g2d_format = p_value;
		this.g2d_dirty = true;
		return p_value;
	}
	,get_u: function() {
		return this.g2d_u;
	}
	,get_v: function() {
		return this.g2d_v;
	}
	,get_uScale: function() {
		return this.g2d_uScale;
	}
	,get_vScale: function() {
		return this.g2d_vScale;
	}
	,get_repeatable: function() {
		return this.g2d_repeatable;
	}
	,set_repeatable: function(p_value) {
		this.g2d_repeatable = p_value;
		this.g2d_dirty = true;
		return p_value;
	}
	,get_region: function() {
		return this.g2d_region;
	}
	,set_region: function(p_value) {
		this.g2d_region = p_value;
		this.g2d_nativeWidth = this.g2d_region.width | 0;
		this.g2d_nativeHeight = this.g2d_region.height | 0;
		this.invalidateUV();
		return this.g2d_region;
	}
	,getSource: function() {
		return this.g2d_source;
	}
	,setSource: function(p_value) {
		this.g2d_source = p_value;
		return this.g2d_source;
	}
	,invalidateUV: function() {
		this.g2d_u = this.g2d_region.x / this.g2d_gpuWidth;
		this.g2d_v = this.g2d_region.y / this.g2d_gpuHeight;
		this.g2d_uScale = this.g2d_region.width / this.g2d_gpuWidth;
		this.g2d_vScale = this.g2d_region.height / this.g2d_gpuHeight;
	}
	,usesRectangle: function() {
		return !this.g2d_repeatable && ((function($this) {
			var $r;
			if(com_genome2d_Genome2D.g2d_instance == null) {
				com_genome2d_Genome2D.g2d_instantiable = true;
				new com_genome2d_Genome2D();
				com_genome2d_Genome2D.g2d_instantiable = false;
			}
			$r = com_genome2d_Genome2D.g2d_instance;
			return $r;
		}(this))).getContext().hasFeature(2);
	}
	,needClearAsRenderTarget: function(p_clear) {
		if(!this.g2d_initializedRenderTarget || p_clear) {
			this.g2d_initializedRenderTarget = true;
			return true;
		}
		return false;
	}
	,dispose: function() {
		this.g2d_source = null;
		com_genome2d_textures_GTextureManager.g2d_removeTexture(this);
		if(this.g2d_onDisposed != null) {
			this.g2d_onDisposed.dispatch(this);
			this.g2d_onDisposed.removeAll();
		}
		if(this.g2d_onInvalidated != null) this.g2d_onInvalidated.removeAll();
	}
	,getAlphaAtUV: function(p_u,p_v) {
		return 1;
	}
	,parentInvalidated_handler: function(p_texture) {
		this.g2d_gpuWidth = p_texture.g2d_gpuWidth;
		this.g2d_gpuHeight = p_texture.g2d_gpuHeight;
		this.invalidateUV();
		if(this.g2d_onInvalidated != null) this.g2d_onInvalidated.dispatch(this);
	}
	,parentDisposed_handler: function(p_texture) {
		this.dispose();
	}
	,toString: function() {
		return "[Texture: " + this.g2d_id + "]";
	}
	,toReference: function() {
		return this.g2d_id;
	}
	,get_gpuWidth: function() {
		return this.g2d_gpuWidth;
	}
	,get_gpuHeight: function() {
		return this.g2d_gpuHeight;
	}
	,getPrototype: function(p_prototypeXml) {
		p_prototypeXml = com_genome2d_proto_GPrototypeFactory.g2d_getPrototype(this,p_prototypeXml,com_genome2d_textures_GTextureBase.PROTOTYPE_NAME,com_genome2d_textures_GTextureBase.PROTOTYPE_PROPERTY_NAMES,com_genome2d_textures_GTextureBase.PROTOTYPE_PROPERTY_TYPES,com_genome2d_textures_GTextureBase.PROTOTYPE_PROPERTY_DEFAULTS,com_genome2d_textures_GTextureBase.PROTOTYPE_PROPERTY_EXTRAS);
		return p_prototypeXml;
	}
	,bindPrototype: function(p_prototypeXml) {
		com_genome2d_proto_GPrototypeFactory.g2d_bindPrototype(this,p_prototypeXml,com_genome2d_textures_GTextureBase.PROTOTYPE_PROPERTY_NAMES,com_genome2d_textures_GTextureBase.PROTOTYPE_PROPERTY_TYPES,com_genome2d_textures_GTextureBase.PROTOTYPE_PROPERTY_EXTRAS);
	}
	,setPrototypeState: function(p_stateName) {
		if(this.g2d_currentState != p_stateName) {
			this.g2d_currentState = p_stateName;
			var state = this.g2d_prototypeStates.g2d_states.get(p_stateName);
			if(state != null) {
				var $it0 = state.keys();
				while( $it0.hasNext() ) {
					var propertyName = $it0.next();
					try {
						Reflect.setProperty(this,propertyName,__map_reserved[propertyName] != null?state.getReserved(propertyName):state.h[propertyName]);
					} catch( e ) {
						if (e instanceof js__$Boot_HaxeError) e = e.val;
					}
				}
			}
		}
	}
	,__class__: com_genome2d_textures_GTextureBase
	,__properties__: {get_gpuHeight:"get_gpuHeight",get_gpuWidth:"get_gpuWidth",set_region:"set_region",get_region:"get_region",set_repeatable:"set_repeatable",get_repeatable:"get_repeatable",get_vScale:"get_vScale",get_uScale:"get_uScale",get_v:"get_v",get_u:"get_u",set_format:"set_format",get_format:"get_format",get_sourceType:"get_sourceType",set_filteringType:"set_filteringType",get_filteringType:"get_filteringType",set_scaleFactor:"set_scaleFactor",get_scaleFactor:"get_scaleFactor",get_height:"get_height",get_width:"get_width",get_nativeHeight:"get_nativeHeight",get_nativeWidth:"get_nativeWidth",set_pivotY:"set_pivotY",get_pivotY:"get_pivotY",set_pivotX:"set_pivotX",get_pivotX:"get_pivotX",get_id:"get_id",get_onDisposed:"get_onDisposed",get_onInvalidated:"get_onInvalidated"}
};
var com_genome2d_textures_GTexture = function(p_context,p_id,p_source) {
	com_genome2d_textures_GTextureBase.call(this,p_context,p_id,p_source);
};
com_genome2d_textures_GTexture.__name__ = true;
com_genome2d_textures_GTexture.__super__ = com_genome2d_textures_GTextureBase;
com_genome2d_textures_GTexture.prototype = $extend(com_genome2d_textures_GTextureBase.prototype,{
	setSource: function(p_value) {
		if(this.g2d_source != p_value) {
			this.g2d_dirty = true;
			this.g2d_source = p_value;
			if(js_Boot.__instanceof(this.g2d_source,HTMLImageElement)) {
				var imageElement = this.g2d_source;
				this.g2d_sourceType = 8;
				this.g2d_nativeWidth = imageElement.width;
				this.g2d_nativeHeight = imageElement.height;
				this.premultiplied = true;
			} else if(js_Boot.__instanceof(this.g2d_source,com_genome2d_geom_GRectangle)) {
				this.g2d_sourceType = 3;
				this.g2d_nativeWidth = p_value.width;
				this.g2d_nativeHeight = p_value.height;
			} else if(js_Boot.__instanceof(this.g2d_source,com_genome2d_textures_GTexture)) {
				var parent = this.g2d_source;
				((function($this) {
					var $r;
					if(parent.g2d_onInvalidated == null) parent.g2d_onInvalidated = new com_genome2d_callbacks_GCallback1(com_genome2d_textures_GTexture);
					$r = parent.g2d_onInvalidated;
					return $r;
				}(this))).add($bind(this,this.parentInvalidated_handler));
				((function($this) {
					var $r;
					if(parent.g2d_onDisposed == null) parent.g2d_onDisposed = new com_genome2d_callbacks_GCallback1(com_genome2d_textures_GTexture);
					$r = parent.g2d_onDisposed;
					return $r;
				}(this))).add($bind(this,this.parentDisposed_handler));
				this.g2d_gpuWidth = parent.g2d_gpuWidth;
				this.g2d_gpuHeight = parent.g2d_gpuHeight;
				this.g2d_nativeWidth = parent.g2d_nativeWidth;
				this.g2d_nativeHeight = parent.g2d_nativeHeight;
				this.g2d_nativeTexture = parent.g2d_nativeTexture;
				this.g2d_sourceType = 7;
			} else com_genome2d_debug_GDebug.error("Invalid texture source.",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GTexture.hx", lineNumber : 50, className : "com.genome2d.textures.GTexture", methodName : "setSource"});
			this.g2d_dirty = true;
		}
		return this.g2d_source;
	}
	,invalidateNativeTexture: function(p_reinitialize) {
		if(js_Boot.__instanceof(this.g2d_context,com_genome2d_context_webgl_GWebGLContext)) {
			var webglContext = this.g2d_context;
			if(this.g2d_sourceType != 7) {
				if(!this.g2d_repeatable && ((function($this) {
					var $r;
					if(com_genome2d_Genome2D.g2d_instance == null) {
						com_genome2d_Genome2D.g2d_instantiable = true;
						new com_genome2d_Genome2D();
						com_genome2d_Genome2D.g2d_instantiable = false;
					}
					$r = com_genome2d_Genome2D.g2d_instance;
					return $r;
				}(this))).getContext().hasFeature(2)) this.g2d_gpuWidth = this.g2d_nativeWidth; else this.g2d_gpuWidth = com_genome2d_textures_GTextureUtils.getNextValidTextureSize(this.g2d_nativeWidth);
				if(!this.g2d_repeatable && ((function($this) {
					var $r;
					if(com_genome2d_Genome2D.g2d_instance == null) {
						com_genome2d_Genome2D.g2d_instantiable = true;
						new com_genome2d_Genome2D();
						com_genome2d_Genome2D.g2d_instantiable = false;
					}
					$r = com_genome2d_Genome2D.g2d_instance;
					return $r;
				}(this))).getContext().hasFeature(2)) this.g2d_gpuHeight = this.g2d_nativeHeight; else this.g2d_gpuHeight = com_genome2d_textures_GTextureUtils.getNextValidTextureSize(this.g2d_nativeHeight);
				var _g = this.g2d_sourceType;
				switch(_g) {
				case 8:
					if(this.g2d_nativeTexture == null || p_reinitialize) this.g2d_nativeTexture = webglContext.g2d_nativeContext.createTexture();
					webglContext.g2d_nativeContext.bindTexture(3553,this.g2d_nativeTexture);
					webglContext.g2d_nativeContext.texImage2D(3553,0,6408,6408,5121,this.g2d_source);
					webglContext.g2d_nativeContext.texParameteri(3553,10241,9729);
					webglContext.g2d_nativeContext.texParameteri(3553,10240,9729);
					webglContext.g2d_nativeContext.texParameteri(3553,10242,33071);
					webglContext.g2d_nativeContext.texParameteri(3553,10243,33071);
					webglContext.g2d_nativeContext.bindTexture(3553,null);
					break;
				default:
				}
			}
		} else {
		}
	}
	,get_nativeTexture: function() {
		return this.g2d_nativeTexture;
	}
	,hasSameGPUTexture: function(p_texture) {
		return p_texture.g2d_nativeTexture == this.g2d_nativeTexture;
	}
	,getPrototype: function(p_prototypeXml) {
		p_prototypeXml = com_genome2d_proto_GPrototypeFactory.g2d_getPrototype(this,p_prototypeXml,com_genome2d_textures_GTexture.PROTOTYPE_NAME,com_genome2d_textures_GTexture.PROTOTYPE_PROPERTY_NAMES,com_genome2d_textures_GTexture.PROTOTYPE_PROPERTY_TYPES,com_genome2d_textures_GTexture.PROTOTYPE_PROPERTY_DEFAULTS,com_genome2d_textures_GTexture.PROTOTYPE_PROPERTY_EXTRAS);
		return com_genome2d_textures_GTextureBase.prototype.getPrototype.call(this,p_prototypeXml);
	}
	,bindPrototype: function(p_prototypeXml) {
		com_genome2d_textures_GTextureBase.prototype.bindPrototype.call(this,p_prototypeXml);
		com_genome2d_proto_GPrototypeFactory.g2d_bindPrototype(this,p_prototypeXml,com_genome2d_textures_GTexture.PROTOTYPE_PROPERTY_NAMES,com_genome2d_textures_GTexture.PROTOTYPE_PROPERTY_TYPES,com_genome2d_textures_GTexture.PROTOTYPE_PROPERTY_EXTRAS);
	}
	,__class__: com_genome2d_textures_GTexture
	,__properties__: $extend(com_genome2d_textures_GTextureBase.prototype.__properties__,{get_nativeTexture:"get_nativeTexture"})
});
var com_genome2d_textures_GTextureFilteringType = function() { };
com_genome2d_textures_GTextureFilteringType.__name__ = true;
var com_genome2d_textures_GTextureManager = function() { };
com_genome2d_textures_GTextureManager.__name__ = true;
com_genome2d_textures_GTextureManager.init = function(p_context) {
	com_genome2d_textures_GTextureManager.g2d_context = p_context;
	com_genome2d_textures_GTextureManager.g2d_textures = new haxe_ds_StringMap();
};
com_genome2d_textures_GTextureManager.getAllTextures = function() {
	return com_genome2d_textures_GTextureManager.g2d_textures;
};
com_genome2d_textures_GTextureManager.g2d_addTexture = function(p_texture) {
	if(p_texture.g2d_id == null || p_texture.g2d_id.length == 0) com_genome2d_debug_GDebug.error("Invalid texture id",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GTextureManager.hx", lineNumber : 33, className : "com.genome2d.textures.GTextureManager", methodName : "g2d_addTexture"});
	if(com_genome2d_textures_GTextureManager.g2d_textures.exists(p_texture.g2d_id)) com_genome2d_debug_GDebug.error("Duplicate textures id: " + p_texture.g2d_id,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GTextureManager.hx", lineNumber : 34, className : "com.genome2d.textures.GTextureManager", methodName : "g2d_addTexture"});
	com_genome2d_textures_GTextureManager.g2d_textures.set(p_texture.g2d_id,p_texture);
};
com_genome2d_textures_GTextureManager.g2d_removeTexture = function(p_texture) {
	com_genome2d_textures_GTextureManager.g2d_textures.remove(p_texture.g2d_id);
};
com_genome2d_textures_GTextureManager.getTexture = function(p_id) {
	return com_genome2d_textures_GTextureManager.g2d_textures.get(p_id);
};
com_genome2d_textures_GTextureManager.getTextures = function(p_ids) {
	var textures = [];
	var _g = 0;
	while(_g < p_ids.length) {
		var id = p_ids[_g];
		++_g;
		textures.push(com_genome2d_textures_GTextureManager.g2d_textures.get(id));
	}
	return textures;
};
com_genome2d_textures_GTextureManager.findTextures = function(p_regExp) {
	var found = [];
	var $it0 = com_genome2d_textures_GTextureManager.g2d_textures.iterator();
	while( $it0.hasNext() ) {
		var tex = $it0.next();
		if(p_regExp != null) {
			if(p_regExp.match(tex.g2d_id)) found.push(tex);
		} else found.push(tex);
	}
	return found;
};
com_genome2d_textures_GTextureManager.disposeAll = function() {
	var $it0 = com_genome2d_textures_GTextureManager.g2d_textures.iterator();
	while( $it0.hasNext() ) {
		var texture = $it0.next();
		texture.dispose();
	}
};
com_genome2d_textures_GTextureManager.invalidateAll = function(p_force) {
	var $it0 = com_genome2d_textures_GTextureManager.g2d_textures.iterator();
	while( $it0.hasNext() ) {
		var texture = $it0.next();
		texture.invalidateNativeTexture(p_force);
	}
};
com_genome2d_textures_GTextureManager.createTexture = function(p_id,p_source,p_scaleFactor,p_repeatable,p_format) {
	if(p_format == null) p_format = "bgra";
	if(p_repeatable == null) p_repeatable = false;
	if(p_scaleFactor == null) p_scaleFactor = 1;
	var texture = null;
	if(js_Boot.__instanceof(p_source,com_genome2d_assets_GImageAsset)) {
		var imageAsset = p_source;
		var _g = imageAsset.g2d_type;
		switch(_g) {
		case 2:
			texture = new com_genome2d_textures_GTexture(com_genome2d_textures_GTextureManager.g2d_context,p_id,imageAsset.g2d_imageElement);
			break;
		}
	} else if(js_Boot.__instanceof(p_source,HTMLImageElement)) texture = new com_genome2d_textures_GTexture(com_genome2d_textures_GTextureManager.g2d_context,p_id,p_source); else if(js_Boot.__instanceof(p_source,com_genome2d_geom_GRectangle)) texture = new com_genome2d_textures_GTexture(com_genome2d_textures_GTextureManager.g2d_context,p_id,p_source);
	if(texture != null) {
		texture.g2d_repeatable = p_repeatable;
		texture.g2d_dirty = true;
		p_repeatable;
		texture.g2d_scaleFactor = p_scaleFactor;
		texture.g2d_scaleFactor;
		texture.invalidateNativeTexture(false);
	}
	return texture;
};
com_genome2d_textures_GTextureManager.createSubTexture = function(p_id,p_texture,p_region,p_frame,p_prefixParentId) {
	if(p_prefixParentId == null) p_prefixParentId = true;
	var texture = new com_genome2d_textures_GTexture(com_genome2d_textures_GTextureManager.g2d_context,p_prefixParentId?p_texture.g2d_id + "_" + p_id:p_id,p_texture);
	texture.g2d_region = p_region;
	texture.g2d_nativeWidth = texture.g2d_region.width | 0;
	texture.g2d_nativeHeight = texture.g2d_region.height | 0;
	texture.invalidateUV();
	texture.g2d_region;
	if(p_frame != null) {
		texture.g2d_frame = p_frame;
		texture.g2d_pivotX = ((p_frame.width - p_region.width) * .5 + p_frame.x) / texture.g2d_scaleFactor;
		texture.g2d_pivotY = ((p_frame.height - p_region.height) * .5 + p_frame.y) / texture.g2d_scaleFactor;
	}
	return texture;
};
com_genome2d_textures_GTextureManager.createRenderTexture = function(p_id,p_width,p_height,p_scaleFactor) {
	if(p_scaleFactor == null) p_scaleFactor = 1;
	var texture = new com_genome2d_textures_GTexture(com_genome2d_textures_GTextureManager.g2d_context,p_id,new com_genome2d_geom_GRectangle(0,0,p_width,p_height));
	texture.invalidateNativeTexture(false);
	return texture;
};
com_genome2d_textures_GTextureManager.createSubTextures = function(p_texture,p_xml,p_prefixParentId) {
	if(p_prefixParentId == null) p_prefixParentId = true;
	var textures = [];
	var root = p_xml.firstElement();
	var it = root.elements();
	while(it.hasNext()) {
		var node = it.next();
		var region = new com_genome2d_geom_GRectangle(Std.parseInt(node.get("x")),Std.parseInt(node.get("y")),Std.parseInt(node.get("width")),Std.parseInt(node.get("height")));
		var frame = null;
		if(node.get("frameX") != null && node.get("frameWidth") != null && node.get("frameY") != null && node.get("frameHeight") != null) frame = new com_genome2d_geom_GRectangle(Std.parseInt(node.get("frameX")),Std.parseInt(node.get("frameY")),Std.parseInt(node.get("frameWidth")),Std.parseInt(node.get("frameHeight")));
		textures.push(com_genome2d_textures_GTextureManager.createSubTexture(node.get("name"),p_texture,region,frame,p_prefixParentId));
	}
	return textures;
};
var com_genome2d_textures_GTextureSourceType = function() { };
com_genome2d_textures_GTextureSourceType.__name__ = true;
var com_genome2d_textures_GTextureUtils = function() { };
com_genome2d_textures_GTextureUtils.__name__ = true;
com_genome2d_textures_GTextureUtils.isValidTextureSize = function(p_size) {
	return com_genome2d_textures_GTextureUtils.getNextValidTextureSize(p_size) == p_size;
};
com_genome2d_textures_GTextureUtils.getNextValidTextureSize = function(p_size) {
	var size = 1;
	while(p_size > size) size *= 2;
	return size;
};
com_genome2d_textures_GTextureUtils.getPreviousValidTextureSize = function(p_size) {
	return com_genome2d_textures_GTextureUtils.getNextValidTextureSize(p_size) >> 1;
};
com_genome2d_textures_GTextureUtils.getNearestValidTextureSize = function(p_size) {
	var previous = com_genome2d_textures_GTextureUtils.getPreviousValidTextureSize(p_size);
	var next = com_genome2d_textures_GTextureUtils.getNextValidTextureSize(p_size);
	if(p_size - previous < next - p_size) return previous; else return next;
};
var com_genome2d_ui_element_GUIElement = function(p_skin) {
	this.g2d_currentState = "default";
	this.g2d_numChildren = 0;
	this.g2d_preferredHeight = 0;
	this.g2d_finalHeight = 0;
	this.g2d_minHeight = 0;
	this.g2d_preferredWidth = 0;
	this.g2d_finalWidth = 0;
	this.g2d_minWidth = 0;
	this.expand = true;
	this.g2d_pivotY = 0;
	this.g2d_pivotX = 0;
	this.g2d_bottom = 0;
	this.g2d_right = 0;
	this.g2d_top = 0;
	this.g2d_left = 0;
	this.g2d_anchorBottom = 0;
	this.g2d_anchorRight = 0;
	this.g2d_anchorTop = 0;
	this.g2d_anchorLeft = 0;
	this.g2d_anchorY = 0;
	this.g2d_anchorX = 0;
	this.g2d_dirty = true;
	this.g2d_model = "";
	this.g2d_mouseMove = "";
	this.g2d_mouseOut = "";
	this.g2d_mouseOver = "";
	this.g2d_mouseClick = "";
	this.g2d_mouseUp = "";
	this.g2d_mouseDown = "";
	this.g2d_dragging = false;
	this.g2d_scrollable = false;
	this.name = "";
	this.flushBatch = false;
	this.visible = true;
	this.mouseChildren = true;
	this.mouseEnabled = true;
	this.alpha = 1;
	this.blue = 1;
	this.green = 1;
	this.red = 1;
	this.g2d_onModelChanged = new com_genome2d_callbacks_GCallback1();
	if(p_skin != null) {
		if(p_skin == null || this.g2d_skin == null || (p_skin.g2d_origin == null?p_skin.g2d_id:p_skin.g2d_origin.g2d_id) != this.g2d_skin.get_id()) {
			if(this.g2d_skin != null) this.g2d_skin.remove(true);
			if(p_skin != null) this.g2d_skin = p_skin.attach(this); else this.g2d_skin = p_skin;
			this.g2d_activeSkin = this.g2d_skin;
			this.setDirty();
		}
		this.g2d_skin;
	}
};
com_genome2d_ui_element_GUIElement.__name__ = true;
com_genome2d_ui_element_GUIElement.__interfaces__ = [com_genome2d_input_IGInteractive,com_genome2d_proto_IGPrototypable];
com_genome2d_ui_element_GUIElement.prototype = {
	get_color: function() {
		var color = 0;
		color += (this.red * 255 | 0) << 16;
		color += (this.green * 255 | 0) << 8;
		color += this.blue * 255 | 0;
		return color;
	}
	,set_color: function(p_value) {
		this.red = (p_value >> 16 & 255 | 0) / 255;
		this.green = (p_value >> 8 & 255 | 0) / 255;
		this.blue = (p_value & 255 | 0) / 255;
		return p_value;
	}
	,get_scrollable: function() {
		return this.g2d_scrollable;
	}
	,set_scrollable: function(p_value) {
		if(!this.g2d_scrollable && p_value) ((function($this) {
			var $r;
			if($this.g2d_onMouseDown == null) $this.g2d_onMouseDown = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
			$r = $this.g2d_onMouseDown;
			return $r;
		}(this))).add($bind(this,this.mouseDown_handler)); else if(this.g2d_scrollable && !p_value) ((function($this) {
			var $r;
			if($this.g2d_onMouseDown == null) $this.g2d_onMouseDown = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
			$r = $this.g2d_onMouseDown;
			return $r;
		}(this))).remove($bind(this,this.mouseDown_handler));
		this.g2d_scrollable = p_value;
		return this.g2d_scrollable;
	}
	,getController: function() {
		if(this.g2d_controller != null) return this.g2d_controller; else if(this.g2d_parent != null) return this.g2d_parent.getController(); else return null;
	}
	,setController: function(p_value) {
		this.g2d_controller = p_value;
		this.invalidateController();
	}
	,invalidateController: function() {
		var newController = this.getController();
		if(newController != this.g2d_currentController) {
			if(this.g2d_mouseDown != "" && this.g2d_currentController != null) {
				var mdf = Reflect.field(this.g2d_currentController,this.g2d_mouseDown);
				if(mdf != null) ((function($this) {
					var $r;
					if($this.g2d_onMouseDown == null) $this.g2d_onMouseDown = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
					$r = $this.g2d_onMouseDown;
					return $r;
				}(this))).remove(mdf);
			}
			if(this.g2d_mouseUp != "" && this.g2d_currentController != null) {
				var mdf1 = Reflect.field(this.g2d_currentController,this.g2d_mouseUp);
				if(mdf1 != null) ((function($this) {
					var $r;
					if($this.g2d_onMouseUp == null) $this.g2d_onMouseUp = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
					$r = $this.g2d_onMouseUp;
					return $r;
				}(this))).remove(mdf1);
			}
			this.g2d_currentController = newController;
			if(this.g2d_mouseDown != "" && this.g2d_currentController != null) {
				var mdf2 = Reflect.field(this.g2d_currentController,this.g2d_mouseDown);
				if(mdf2 != null) ((function($this) {
					var $r;
					if($this.g2d_onMouseDown == null) $this.g2d_onMouseDown = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
					$r = $this.g2d_onMouseDown;
					return $r;
				}(this))).add(mdf2);
			}
			if(this.g2d_mouseUp != "" && this.g2d_currentController != null) {
				var mdf3 = Reflect.field(this.g2d_currentController,this.g2d_mouseUp);
				if(mdf3 != null) ((function($this) {
					var $r;
					if($this.g2d_onMouseUp == null) $this.g2d_onMouseUp = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
					$r = $this.g2d_onMouseUp;
					return $r;
				}(this))).add(mdf3);
			}
			var _g1 = 0;
			var _g = this.g2d_numChildren;
			while(_g1 < _g) {
				var i = _g1++;
				this.g2d_children[i].invalidateController();
			}
		}
	}
	,setAlign: function(p_align) {
		this.g2d_anchorLeft = this.g2d_anchorRight = (p_align - 1) % 3 * 0.5;
		this.g2d_anchorTop = this.g2d_anchorBottom = ((p_align - 1) / 3 | 0) * 0.5;
		this.g2d_pivotX = (p_align - 1) % 3 * 0.5;
		this.g2d_pivotY = ((p_align - 1) / 3 | 0) * 0.5;
		this.setDirty();
	}
	,setAnchorAlign: function(p_align) {
		this.g2d_anchorLeft = this.g2d_anchorRight = (p_align - 1) % 3 * 0.5;
		this.g2d_anchorTop = this.g2d_anchorBottom = ((p_align - 1) / 3 | 0) * 0.5;
		this.setDirty();
	}
	,setPivotAlign: function(p_align) {
		this.g2d_pivotX = (p_align - 1) % 3 * 0.5;
		this.g2d_pivotY = ((p_align - 1) / 3 | 0) * 0.5;
		this.setDirty();
	}
	,get_mouseDown: function() {
		return this.g2d_mouseDown;
	}
	,set_mouseDown: function(p_value) {
		if(this.g2d_mouseDown != "" && this.g2d_currentController != null) {
			var mdf = Reflect.field(this.g2d_currentController,this.g2d_mouseDown);
			if(mdf != null) ((function($this) {
				var $r;
				if($this.g2d_onMouseDown == null) $this.g2d_onMouseDown = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
				$r = $this.g2d_onMouseDown;
				return $r;
			}(this))).remove(mdf);
		}
		this.g2d_mouseDown = p_value;
		if(this.g2d_mouseDown != "" && this.g2d_currentController != null) {
			var mdf1 = Reflect.field(this.g2d_currentController,this.g2d_mouseDown);
			if(mdf1 != null) ((function($this) {
				var $r;
				if($this.g2d_onMouseDown == null) $this.g2d_onMouseDown = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
				$r = $this.g2d_onMouseDown;
				return $r;
			}(this))).add(mdf1);
		}
		return this.g2d_mouseDown;
	}
	,get_mouseUp: function() {
		return this.g2d_mouseUp;
	}
	,set_mouseUp: function(p_value) {
		if(this.g2d_mouseUp != "" && this.g2d_currentController != null) {
			var mdf = Reflect.field(this.g2d_currentController,this.g2d_mouseUp);
			if(mdf != null) ((function($this) {
				var $r;
				if($this.g2d_onMouseUp == null) $this.g2d_onMouseUp = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
				$r = $this.g2d_onMouseUp;
				return $r;
			}(this))).remove(mdf);
		}
		this.g2d_mouseUp = p_value;
		if(this.g2d_mouseUp != "" && this.g2d_currentController != null) {
			var mdf1 = Reflect.field(this.g2d_currentController,this.g2d_mouseUp);
			if(mdf1 != null) ((function($this) {
				var $r;
				if($this.g2d_onMouseUp == null) $this.g2d_onMouseUp = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
				$r = $this.g2d_onMouseUp;
				return $r;
			}(this))).add(mdf1);
		}
		return this.g2d_mouseUp;
	}
	,get_mouseClick: function() {
		return this.g2d_mouseClick;
	}
	,set_mouseClick: function(p_value) {
		if(this.g2d_mouseClick != "" && this.g2d_currentController != null) {
			var mdf = Reflect.field(this.g2d_currentController,this.g2d_mouseClick);
			if(mdf != null) ((function($this) {
				var $r;
				if($this.g2d_onMouseClick == null) $this.g2d_onMouseMove = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
				$r = $this.g2d_onMouseClick;
				return $r;
			}(this))).remove(mdf);
		}
		this.g2d_mouseClick = p_value;
		if(this.g2d_mouseClick != "" && this.g2d_currentController != null) {
			var mdf1 = Reflect.field(this.g2d_currentController,this.g2d_mouseClick);
			if(mdf1 != null) ((function($this) {
				var $r;
				if($this.g2d_onMouseClick == null) $this.g2d_onMouseMove = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
				$r = $this.g2d_onMouseClick;
				return $r;
			}(this))).add(mdf1);
		}
		return this.g2d_mouseClick;
	}
	,get_mouseOver: function() {
		return this.g2d_mouseOver;
	}
	,set_mouseOver: function(p_value) {
		if(this.g2d_mouseOver != "" && this.g2d_currentController != null) {
			var mdf = Reflect.field(this.g2d_currentController,this.g2d_mouseOver);
			if(mdf != null) ((function($this) {
				var $r;
				if($this.g2d_onMouseOver == null) $this.g2d_onMouseOver = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
				$r = $this.g2d_onMouseOver;
				return $r;
			}(this))).remove(mdf);
		}
		this.g2d_mouseOver = p_value;
		if(this.g2d_mouseOver != "" && this.g2d_currentController != null) {
			var mdf1 = Reflect.field(this.g2d_currentController,this.g2d_mouseOver);
			if(mdf1 != null) ((function($this) {
				var $r;
				if($this.g2d_onMouseOver == null) $this.g2d_onMouseOver = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
				$r = $this.g2d_onMouseOver;
				return $r;
			}(this))).add(mdf1);
		}
		return this.g2d_mouseOver;
	}
	,get_mouseOut: function() {
		return this.g2d_mouseOut;
	}
	,set_mouseOut: function(p_value) {
		if(this.g2d_mouseOut != "" && this.g2d_currentController != null) {
			var mdf = Reflect.field(this.g2d_currentController,this.g2d_mouseOut);
			if(mdf != null) ((function($this) {
				var $r;
				if($this.g2d_onMouseOut == null) $this.g2d_onMouseOut = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
				$r = $this.g2d_onMouseOut;
				return $r;
			}(this))).remove(mdf);
		}
		this.g2d_mouseOut = p_value;
		if(this.g2d_mouseOut != "" && this.g2d_currentController != null) {
			var mdf1 = Reflect.field(this.g2d_currentController,this.g2d_mouseOut);
			if(mdf1 != null) ((function($this) {
				var $r;
				if($this.g2d_onMouseOut == null) $this.g2d_onMouseOut = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
				$r = $this.g2d_onMouseOut;
				return $r;
			}(this))).add(mdf1);
		}
		return this.g2d_mouseOut;
	}
	,get_mouseMove: function() {
		return this.g2d_mouseMove;
	}
	,set_mouseMove: function(p_value) {
		if(this.g2d_mouseMove != "" && this.g2d_currentController != null) {
			var mdf = Reflect.field(this.g2d_currentController,this.g2d_mouseMove);
			if(mdf != null) ((function($this) {
				var $r;
				if($this.g2d_onMouseMove == null) $this.g2d_onMouseMove = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
				$r = $this.g2d_onMouseMove;
				return $r;
			}(this))).remove(mdf);
		}
		this.g2d_mouseMove = p_value;
		if(this.g2d_mouseMove != "" && this.g2d_currentController != null) {
			var mdf1 = Reflect.field(this.g2d_currentController,this.g2d_mouseMove);
			if(mdf1 != null) ((function($this) {
				var $r;
				if($this.g2d_onMouseMove == null) $this.g2d_onMouseMove = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
				$r = $this.g2d_onMouseMove;
				return $r;
			}(this))).add(mdf1);
		}
		return this.g2d_mouseMove;
	}
	,getModel: function() {
		return this.g2d_model;
	}
	,setModel: function(p_value) {
		if(js_Boot.__instanceof(p_value,Xml)) {
			var xml;
			xml = js_Boot.__cast(p_value , Xml);
			var it = xml.elements();
			if(!it.hasNext()) {
				if((function($this) {
					var $r;
					if(xml.nodeType != Xml.Document && xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + xml.nodeType);
					$r = xml.children[0];
					return $r;
				}(this)) != null && ((function($this) {
					var $r;
					if(xml.nodeType != Xml.Document && xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + xml.nodeType);
					$r = xml.children[0];
					return $r;
				}(this))).nodeType == Xml.PCData) this.g2d_model = ((function($this) {
					var $r;
					if(xml.nodeType != Xml.Document && xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + xml.nodeType);
					$r = xml.children[0];
					return $r;
				}(this))).get_nodeValue(); else this.g2d_model = "";
			} else while(it.hasNext()) {
				var childXml = it.next();
				var child = this.getChildByName((function($this) {
					var $r;
					if(childXml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + childXml.nodeType);
					$r = childXml.nodeName;
					return $r;
				}(this)),true);
				if(child != null) child.setModel(childXml);
			}
		} else if(typeof(p_value) == "string") this.g2d_model = p_value; else {
			var _g = 0;
			var _g1 = Reflect.fields(p_value);
			while(_g < _g1.length) {
				var it1 = _g1[_g];
				++_g;
				var child1 = this.getChildByName(it1);
				if(child1 != null) child1.setModel(Reflect.field(p_value,it1));
			}
		}
		this.g2d_onModelChanged.dispatch(this);
	}
	,get_onModelChanged: function() {
		return this.g2d_onModelChanged;
	}
	,get_layout: function() {
		return this.g2d_layout;
	}
	,set_layout: function(p_value) {
		this.g2d_layout = p_value;
		this.setDirty();
		return this.g2d_layout;
	}
	,get_skin: function() {
		return this.g2d_skin;
	}
	,set_skin: function(p_value) {
		if(p_value == null || this.g2d_skin == null || (p_value.g2d_origin == null?p_value.g2d_id:p_value.g2d_origin.g2d_id) != this.g2d_skin.get_id()) {
			if(this.g2d_skin != null) this.g2d_skin.remove(true);
			if(p_value != null) this.g2d_skin = p_value.attach(this); else this.g2d_skin = p_value;
			this.g2d_activeSkin = this.g2d_skin;
			this.setDirty();
		}
		return this.g2d_skin;
	}
	,setDirty: function() {
		this.g2d_dirty = true;
		if(this.g2d_parent != null) this.g2d_parent.setDirty();
	}
	,get_anchorX: function() {
		return this.g2d_anchorX;
	}
	,set_anchorX: function(p_value) {
		this.g2d_anchorX = p_value;
		this.setDirty();
		return this.g2d_anchorX;
	}
	,get_anchorY: function() {
		return this.g2d_anchorY;
	}
	,set_anchorY: function(p_value) {
		this.g2d_anchorY = p_value;
		this.setDirty();
		return this.g2d_anchorY;
	}
	,get_anchorLeft: function() {
		return this.g2d_anchorLeft;
	}
	,set_anchorLeft: function(p_value) {
		this.g2d_anchorLeft = p_value;
		this.setDirty();
		return this.g2d_anchorLeft;
	}
	,get_anchorTop: function() {
		return this.g2d_anchorTop;
	}
	,set_anchorTop: function(p_value) {
		this.g2d_anchorTop = p_value;
		this.setDirty();
		return this.g2d_anchorTop;
	}
	,get_anchorRight: function() {
		return this.g2d_anchorRight;
	}
	,set_anchorRight: function(p_value) {
		this.g2d_anchorRight = p_value;
		this.setDirty();
		return this.g2d_anchorRight;
	}
	,get_anchorBottom: function() {
		return this.g2d_anchorBottom;
	}
	,set_anchorBottom: function(p_value) {
		this.g2d_anchorBottom = p_value;
		this.setDirty();
		return this.g2d_anchorBottom;
	}
	,get_left: function() {
		return this.g2d_left;
	}
	,set_left: function(p_value) {
		this.g2d_left = p_value;
		this.setDirty();
		return this.g2d_left;
	}
	,get_top: function() {
		return this.g2d_top;
	}
	,set_top: function(p_value) {
		this.g2d_top = p_value;
		this.setDirty();
		return this.g2d_top;
	}
	,get_right: function() {
		return this.g2d_right;
	}
	,set_right: function(p_value) {
		this.g2d_right = p_value;
		this.setDirty();
		return this.g2d_right;
	}
	,get_bottom: function() {
		return this.g2d_bottom;
	}
	,set_bottom: function(p_value) {
		this.g2d_bottom = p_value;
		this.setDirty();
		return this.g2d_bottom;
	}
	,get_pivotX: function() {
		return this.g2d_pivotX;
	}
	,set_pivotX: function(p_value) {
		this.g2d_pivotX = p_value;
		this.setDirty();
		return this.g2d_pivotX;
	}
	,get_pivotY: function() {
		return this.g2d_pivotY;
	}
	,set_pivotY: function(p_value) {
		this.g2d_pivotY = p_value;
		this.setDirty();
		return this.g2d_pivotY;
	}
	,get_preferredWidth: function() {
		return this.g2d_preferredWidth;
	}
	,set_preferredWidth: function(p_value) {
		this.g2d_preferredWidth = p_value;
		this.setDirty();
		return this.g2d_preferredWidth;
	}
	,get_preferredHeight: function() {
		return this.g2d_preferredHeight;
	}
	,set_preferredHeight: function(p_value) {
		this.g2d_preferredHeight = p_value;
		this.setDirty();
		return this.g2d_preferredHeight;
	}
	,get_parent: function() {
		return this.g2d_parent;
	}
	,get_numChildren: function() {
		return this.g2d_numChildren;
	}
	,get_children: function() {
		return this.g2d_children;
	}
	,isParent: function(p_element) {
		if(p_element == this.g2d_parent) return true;
		if(this.g2d_parent == null) return false;
		return this.g2d_parent.isParent(p_element);
	}
	,setRect: function(p_left,p_top,p_right,p_bottom) {
		var w = p_right - p_left;
		var h = p_bottom - p_top;
		if(this.g2d_parent != null) {
			var worldAnchorLeft = this.g2d_parent.g2d_worldLeft + this.g2d_parent.g2d_finalWidth * this.g2d_anchorLeft;
			var worldAnchorRight = this.g2d_parent.g2d_worldLeft + this.g2d_parent.g2d_finalWidth * this.g2d_anchorRight;
			var worldAnchorTop = this.g2d_parent.g2d_worldTop + this.g2d_parent.g2d_finalHeight * this.g2d_anchorTop;
			var worldAnchorBottom = this.g2d_parent.g2d_worldTop + this.g2d_parent.g2d_finalHeight * this.g2d_anchorBottom;
			if(this.g2d_anchorLeft != this.g2d_anchorRight) {
				this.g2d_left = p_left - worldAnchorLeft;
				this.g2d_right = worldAnchorRight - p_right;
			} else this.g2d_anchorX = p_left - worldAnchorLeft + w * this.g2d_pivotX;
			if(this.g2d_anchorTop != this.g2d_anchorBottom) {
				this.g2d_top = p_top - worldAnchorTop;
				this.g2d_bottom = worldAnchorBottom - p_bottom;
			} else this.g2d_anchorY = p_top - worldAnchorTop + h * this.g2d_pivotY;
		} else {
			this.g2d_worldLeft = p_left;
			this.g2d_worldTop = p_top;
			this.g2d_worldRight = p_right;
			this.g2d_worldBottom = p_bottom;
			this.g2d_finalWidth = w;
			this.g2d_finalHeight = h;
		}
		this.g2d_preferredWidth = w;
		this.g2d_preferredHeight = h;
		this.setDirty();
	}
	,addChild: function(p_child) {
		if(p_child.g2d_parent == this) return;
		if(this.g2d_children == null) this.g2d_children = [];
		if(p_child.g2d_parent != null) p_child.g2d_parent.removeChild(p_child);
		this.g2d_children.push(p_child);
		this.g2d_numChildren++;
		p_child.g2d_parent = this;
		p_child.invalidateController();
		this.setDirty();
	}
	,addChildAt: function(p_child,p_index) {
		if(this.g2d_children == null) this.g2d_children = [];
		if(p_child.g2d_parent != null) p_child.g2d_parent.removeChild(p_child);
		this.g2d_children.splice(p_index,0,p_child);
		this.g2d_numChildren++;
		p_child.g2d_parent = this;
		p_child.invalidateController();
		this.setDirty();
	}
	,removeChild: function(p_child) {
		if(p_child.g2d_parent != this) return;
		HxOverrides.remove(this.g2d_children,p_child);
		this.g2d_numChildren--;
		p_child.g2d_parent = null;
		p_child.invalidateController();
		this.setDirty();
	}
	,getChildAt: function(p_index) {
		if(p_index >= 0 && p_index < this.g2d_numChildren) return this.g2d_children[p_index]; else return null;
	}
	,getChildByName: function(p_name,p_recursive) {
		if(p_recursive == null) p_recursive = false;
		var _g1 = 0;
		var _g = this.g2d_numChildren;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.g2d_children[i].name == p_name) return this.g2d_children[i];
			if(p_recursive) {
				var childByName = this.g2d_children[i].getChildByName(p_name,true);
				if(childByName != null) return childByName;
			}
		}
		return null;
	}
	,getChildIndex: function(p_child) {
		return HxOverrides.indexOf(this.g2d_children,p_child,0);
	}
	,calculateWidth: function() {
		if(this.g2d_dirty) {
			if(this.g2d_layout != null) this.g2d_layout.calculateWidth(this); else {
				if(this.g2d_activeSkin != null) this.g2d_minWidth = this.g2d_activeSkin.getMinWidth(); else this.g2d_minWidth = 0;
				var _g1 = 0;
				var _g = this.g2d_numChildren;
				while(_g1 < _g) {
					var i = _g1++;
					this.g2d_children[i].calculateWidth();
				}
			}
		}
	}
	,calculateHeight: function() {
		if(this.g2d_dirty) {
			if(this.g2d_layout != null) this.g2d_layout.calculateHeight(this); else {
				if(this.g2d_activeSkin != null) this.g2d_minHeight = this.g2d_activeSkin.getMinHeight(); else this.g2d_minHeight = 0;
				var _g1 = 0;
				var _g = this.g2d_numChildren;
				while(_g1 < _g) {
					var i = _g1++;
					this.g2d_children[i].calculateHeight();
				}
			}
		}
	}
	,invalidateWidth: function() {
		if(this.g2d_dirty) {
			if(this.g2d_parent != null) {
				if(this.g2d_parent.g2d_layout == null) {
					var worldAnchorLeft = this.g2d_parent.g2d_worldLeft + this.g2d_parent.g2d_finalWidth * this.g2d_anchorLeft;
					var worldAnchorRight = this.g2d_parent.g2d_worldLeft + this.g2d_parent.g2d_finalWidth * this.g2d_anchorRight;
					var w;
					if(this.g2d_preferredWidth > this.g2d_minWidth || !this.expand) w = this.g2d_preferredWidth; else w = this.g2d_minWidth;
					if(this.g2d_anchorLeft != this.g2d_anchorRight) {
						this.g2d_worldLeft = worldAnchorLeft + this.g2d_left;
						this.g2d_worldRight = worldAnchorRight - this.g2d_right;
					} else {
						this.g2d_worldLeft = worldAnchorLeft + this.g2d_anchorX - w * this.g2d_pivotX;
						this.g2d_worldRight = worldAnchorLeft + this.g2d_anchorX + w * (1 - this.g2d_pivotX);
					}
					this.g2d_finalWidth = this.g2d_worldRight - this.g2d_worldLeft;
				}
				if(this.g2d_layout != null) this.g2d_layout.invalidateWidth(this); else {
					var _g1 = 0;
					var _g = this.g2d_numChildren;
					while(_g1 < _g) {
						var i = _g1++;
						this.g2d_children[i].invalidateWidth();
					}
				}
			} else {
				var _g11 = 0;
				var _g2 = this.g2d_numChildren;
				while(_g11 < _g2) {
					var i1 = _g11++;
					this.g2d_children[i1].invalidateWidth();
				}
			}
		}
	}
	,invalidateHeight: function() {
		if(this.g2d_dirty) {
			if(this.g2d_parent != null) {
				if(this.g2d_parent.g2d_layout == null || !this.g2d_parent.g2d_layout.isVerticalLayout()) {
					var worldAnchorTop = this.g2d_parent.g2d_worldTop + this.g2d_parent.g2d_finalHeight * this.g2d_anchorTop;
					var worldAnchorBottom = this.g2d_parent.g2d_worldTop + this.g2d_parent.g2d_finalHeight * this.g2d_anchorBottom;
					var h;
					if(this.g2d_preferredHeight > this.g2d_minHeight || !this.expand) h = this.g2d_preferredHeight; else h = this.g2d_minHeight;
					if(this.g2d_anchorTop != this.g2d_anchorBottom) {
						this.g2d_worldTop = worldAnchorTop + this.g2d_top;
						this.g2d_worldBottom = worldAnchorBottom - this.g2d_bottom;
					} else {
						this.g2d_worldTop = worldAnchorTop + this.g2d_anchorY - h * this.g2d_pivotY;
						this.g2d_worldBottom = worldAnchorTop + this.g2d_anchorY + h * (1 - this.g2d_pivotY);
					}
					this.g2d_finalHeight = this.g2d_worldBottom - this.g2d_worldTop;
				}
				if(this.g2d_layout != null) this.g2d_layout.invalidateHeight(this); else {
					var _g1 = 0;
					var _g = this.g2d_numChildren;
					while(_g1 < _g) {
						var i = _g1++;
						this.g2d_children[i].invalidateHeight();
					}
				}
			} else {
				var _g11 = 0;
				var _g2 = this.g2d_numChildren;
				while(_g11 < _g2) {
					var i1 = _g11++;
					this.g2d_children[i1].invalidateHeight();
				}
			}
		}
	}
	,render: function(p_red,p_green,p_blue,p_alpha) {
		if(p_alpha == null) p_alpha = 1;
		if(p_blue == null) p_blue = 1;
		if(p_green == null) p_green = 1;
		if(p_red == null) p_red = 1;
		if(this.visible) {
			var worldRed = p_red * this.red;
			var worldGreen = p_green * this.green;
			var worldBlue = p_blue * this.blue;
			var worldAlpha = p_alpha * this.alpha;
			var context = ((function($this) {
				var $r;
				if(com_genome2d_Genome2D.g2d_instance == null) {
					com_genome2d_Genome2D.g2d_instantiable = true;
					new com_genome2d_Genome2D();
					com_genome2d_Genome2D.g2d_instantiable = false;
				}
				$r = com_genome2d_Genome2D.g2d_instance;
				return $r;
			}(this))).getContext();
			var previousMask = context.getMaskRect();
			var camera = context.getActiveCamera();
			if(this.flushBatch || !this.expand) com_genome2d_ui_skin_GUISkin.flushBatch();
			if(!this.expand) context.setMaskRect(new com_genome2d_geom_GRectangle(this.g2d_worldLeft * camera.scaleX,this.g2d_worldTop * camera.scaleY,(this.g2d_worldRight - this.g2d_worldLeft) * camera.scaleX,(this.g2d_worldBottom - this.g2d_worldTop) * camera.scaleY));
			if(this.g2d_activeSkin != null) this.g2d_activeSkin.render(this.g2d_worldLeft,this.g2d_worldTop,this.g2d_worldRight,this.g2d_worldBottom,worldRed,worldGreen,worldBlue,worldAlpha);
			var _g1 = 0;
			var _g = this.g2d_numChildren;
			while(_g1 < _g) {
				var i = _g1++;
				this.g2d_children[i].render(worldRed,worldGreen,worldBlue,worldAlpha);
			}
			if(!this.expand) context.setMaskRect(previousMask);
		}
	}
	,getPrototype: function(p_prototypeXml) {
		if(p_prototypeXml == null) p_prototypeXml = Xml.createElement(com_genome2d_ui_element_GUIElement.PROTOTYPE_NAME);
		if(this.expand != true) p_prototypeXml.set("expand",Std.string(this.g2d_anchorX));
		if(this.g2d_anchorX != 0) p_prototypeXml.set("anchorX",Std.string(this.g2d_anchorX));
		if(this.g2d_anchorY != 0) p_prototypeXml.set("anchorY",Std.string(this.g2d_anchorY));
		if(this.g2d_anchorLeft != 0) p_prototypeXml.set("anchorLeft",Std.string(this.g2d_anchorLeft));
		if(this.g2d_anchorRight != 0) p_prototypeXml.set("anchorRight",Std.string(this.g2d_anchorRight));
		if(this.g2d_anchorTop != 0) p_prototypeXml.set("anchorTop",Std.string(this.g2d_anchorTop));
		if(this.g2d_anchorBottom != 0) p_prototypeXml.set("anchorBottom",Std.string(this.g2d_anchorBottom));
		if(this.g2d_pivotX != 0) p_prototypeXml.set("pivotX",Std.string(this.g2d_pivotX));
		if(this.g2d_pivotY != 0) p_prototypeXml.set("pivotY",Std.string(this.g2d_pivotY));
		if(this.g2d_left != 0) p_prototypeXml.set("left",Std.string(this.g2d_left));
		if(this.g2d_right != 0) p_prototypeXml.set("right",Std.string(this.g2d_right));
		if(this.g2d_top != 0) p_prototypeXml.set("top",Std.string(this.g2d_top));
		if(this.g2d_bottom != 0) p_prototypeXml.set("bottom",Std.string(this.g2d_bottom));
		if(this.g2d_preferredWidth != 0) p_prototypeXml.set("preferredWidth",Std.string(this.g2d_preferredWidth));
		if(this.g2d_preferredHeight != 0) p_prototypeXml.set("preferredHeight",Std.string(this.g2d_preferredHeight));
		if(this.name != "") p_prototypeXml.set("name",this.name);
		if(this.g2d_skin != null) p_prototypeXml.set("skin",this.g2d_skin.get_id());
		if(this.mouseEnabled != true) p_prototypeXml.set("mouseEnabled",Std.string(this.mouseEnabled));
		if(this.mouseChildren != true) p_prototypeXml.set("mouseChildren",Std.string(this.mouseChildren));
		if(this.visible != true) p_prototypeXml.set("visible",Std.string(this.visible));
		if(this.flushBatch != false) p_prototypeXml.set("flushBatch",Std.string(this.flushBatch));
		if(this.g2d_scrollable != false) p_prototypeXml.set("scrollable",Std.string(this.g2d_scrollable));
		if(this.g2d_mouseDown != "") p_prototypeXml.set("mouseDown",this.g2d_mouseDown);
		if(this.g2d_mouseUp != "") p_prototypeXml.set("mouseUp",this.g2d_mouseUp);
		if(this.g2d_mouseClick != "") p_prototypeXml.set("mouseClick",this.g2d_mouseClick);
		if(this.g2d_mouseOver != "") p_prototypeXml.set("mouseOver",this.g2d_mouseOver);
		if(this.g2d_mouseOut != "") p_prototypeXml.set("mouseOut",this.g2d_mouseOut);
		if(this.g2d_mouseMove != "") p_prototypeXml.set("mouseMove",this.g2d_mouseMove);
		if(this.g2d_model != "") {
			var valueXml = Xml.createPCData(this.g2d_model);
			p_prototypeXml.addChild(valueXml);
		}
		if(this.g2d_layout != null) p_prototypeXml.addChild(this.g2d_layout.getPrototype());
		var _g1 = 0;
		var _g = this.g2d_numChildren;
		while(_g1 < _g) {
			var i = _g1++;
			p_prototypeXml.addChild(this.g2d_children[i].getPrototype());
		}
		return p_prototypeXml;
	}
	,bindPrototype: function(p_prototypeXml) {
		var it = p_prototypeXml.elements();
		while(it.hasNext()) {
			var xml = it.next();
			if(((function($this) {
				var $r;
				if(xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xml.nodeType);
				$r = xml.nodeName;
				return $r;
			}(this))).indexOf("p:") != 0) {
				var prototype = com_genome2d_proto_GPrototypeFactory.createPrototype(xml);
				if(js_Boot.__instanceof(prototype,com_genome2d_ui_element_GUIElement)) this.addChild(prototype); else if(js_Boot.__instanceof(prototype,com_genome2d_ui_layout_GUILayout)) {
					this.g2d_layout = prototype;
					this.setDirty();
					this.g2d_layout;
				}
			}
		}
		this.bindPrototypeDefault(p_prototypeXml);
	}
	,disposeChildren: function() {
		while(this.g2d_numChildren > 0) this.g2d_children[this.g2d_numChildren - 1].dispose();
	}
	,dispose: function() {
		this.setDirty();
		if(this.g2d_parent != null) this.g2d_parent.removeChild(this);
	}
	,get_onMouseDown: function() {
		if(this.g2d_onMouseDown == null) this.g2d_onMouseDown = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
		return this.g2d_onMouseDown;
	}
	,get_onMouseUp: function() {
		if(this.g2d_onMouseUp == null) this.g2d_onMouseUp = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
		return this.g2d_onMouseUp;
	}
	,get_onMouseMove: function() {
		if(this.g2d_onMouseMove == null) this.g2d_onMouseMove = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
		return this.g2d_onMouseMove;
	}
	,get_onMouseOver: function() {
		if(this.g2d_onMouseOver == null) this.g2d_onMouseOver = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
		return this.g2d_onMouseOver;
	}
	,get_onMouseOut: function() {
		if(this.g2d_onMouseOut == null) this.g2d_onMouseOut = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
		return this.g2d_onMouseOut;
	}
	,get_onMouseClick: function() {
		if(this.g2d_onMouseClick == null) this.g2d_onMouseMove = new com_genome2d_callbacks_GCallback1(com_genome2d_input_GMouseInput);
		return this.g2d_onMouseClick;
	}
	,captureMouseInput: function(p_input) {
		if(this.visible) {
			if(this.mouseChildren) {
				var i = this.g2d_numChildren;
				while(i > 0) {
					i--;
					this.g2d_children[i].captureMouseInput(p_input);
				}
			}
			if(this.mouseEnabled) {
				if(p_input.g2d_captured && p_input.type == "mouseUp") this.g2d_mouseDownElement = null;
				p_input.localX = p_input.worldX - this.g2d_worldLeft;
				p_input.localY = p_input.worldY - this.g2d_worldTop;
				if(!p_input.g2d_captured && p_input.worldX > this.g2d_worldLeft && p_input.worldX < this.g2d_worldRight && p_input.worldY > this.g2d_worldTop && p_input.worldY < this.g2d_worldBottom) {
					if(this.g2d_activeSkin != null) this.g2d_activeSkin.captureMouseInput(p_input);
					p_input.g2d_captured = true;
					com_genome2d_input_GFocusManager.activeFocus = this;
					this.g2d_dispatchMouseCallback(p_input.type,this,p_input);
					if(this.g2d_mouseOverElement != this) this.g2d_dispatchMouseCallback("mouseOver",this,p_input);
				} else if(this.g2d_mouseOverElement == this) this.g2d_dispatchMouseCallback("mouseOut",this,p_input);
			}
		}
	}
	,mouseDown_handler: function(p_input) {
		this.g2d_movedMouseX = this.g2d_movedMouseY = 0;
		this.g2d_previousMouseX = p_input.contextX;
		this.g2d_previousMouseY = p_input.contextY;
		((function($this) {
			var $r;
			if(com_genome2d_Genome2D.g2d_instance == null) {
				com_genome2d_Genome2D.g2d_instantiable = true;
				new com_genome2d_Genome2D();
				com_genome2d_Genome2D.g2d_instantiable = false;
			}
			$r = com_genome2d_Genome2D.g2d_instance;
			return $r;
		}(this))).getContext().onMouseInput.add($bind(this,this.contextMouseInput_handler));
		this.g2d_parent.get_onMouseMove().add($bind(this,this.parentMouseMove_handler));
	}
	,parentMouseMove_handler: function(p_input) {
		this.g2d_movedMouseX += p_input.contextX - this.g2d_previousMouseX;
		if(this.g2d_dragging || Math.abs(this.g2d_movedMouseX) > com_genome2d_ui_element_GUIElement.dragSensitivity || Math.abs(this.g2d_movedMouseY) > com_genome2d_ui_element_GUIElement.dragSensitivity) {
			var _g = this;
			_g.g2d_anchorX = _g.g2d_anchorX + (p_input.contextX - this.g2d_previousMouseX) / p_input.camera.scaleX;
			_g.setDirty();
			_g.g2d_anchorX;
			if(this.g2d_anchorX > 0) {
				this.g2d_anchorX = 0;
				this.setDirty();
				this.g2d_anchorX;
			}
			if(this.g2d_anchorX < this.g2d_parent.g2d_finalWidth - this.g2d_minWidth) {
				this.g2d_anchorX = this.g2d_parent.g2d_finalWidth - this.g2d_minWidth;
				this.setDirty();
				this.g2d_anchorX;
			}
			this.g2d_dragging = true;
		}
		this.g2d_previousMouseX = p_input.contextX;
		this.g2d_previousMouseY = p_input.contextY;
	}
	,contextMouseInput_handler: function(p_input) {
		if(p_input.type == "mouseUp") {
			this.g2d_dragging = false;
			this.g2d_parent.get_onMouseMove().remove($bind(this,this.parentMouseMove_handler));
			((function($this) {
				var $r;
				if(com_genome2d_Genome2D.g2d_instance == null) {
					com_genome2d_Genome2D.g2d_instantiable = true;
					new com_genome2d_Genome2D();
					com_genome2d_Genome2D.g2d_instantiable = false;
				}
				$r = com_genome2d_Genome2D.g2d_instance;
				return $r;
			}(this))).getContext().onMouseInput.remove($bind(this,this.contextMouseInput_handler));
		}
	}
	,g2d_dispatchMouseCallback: function(p_type,p_element,p_input) {
		if(this.mouseEnabled) {
			var mouseInput = p_input.clone(this,p_element,p_type);
			switch(p_type) {
			case "mouseDown":
				this.g2d_mouseDownElement = p_element;
				if(this.g2d_onMouseDown != null) this.g2d_onMouseDown.dispatch(mouseInput);
				break;
			case "mouseMove":
				if(this.g2d_onMouseMove != null) this.g2d_onMouseMove.dispatch(mouseInput);
				break;
			case "mouseUp":
				if(this.g2d_mouseDownElement == p_element && this.g2d_onMouseClick != null) {
					var mouseClickInput = p_input.clone(this,p_element,"mouseUp");
					this.g2d_onMouseClick.dispatch(mouseClickInput);
				}
				this.g2d_mouseDownElement = null;
				if(this.g2d_onMouseUp != null) this.g2d_onMouseUp.dispatch(mouseInput);
				break;
			case "mouseOver":
				this.g2d_mouseOverElement = p_element;
				if(this.g2d_onMouseOver != null) this.g2d_onMouseOver.dispatch(mouseInput);
				break;
			case "mouseOut":
				this.g2d_mouseOverElement = null;
				if(this.g2d_onMouseOut != null) this.g2d_onMouseOut.dispatch(mouseInput);
				break;
			}
		}
		if(this.g2d_parent != null) this.g2d_parent.g2d_dispatchMouseCallback(p_type,p_element,p_input);
	}
	,setState: function(p_stateName) {
		this.setPrototypeState(p_stateName);
		if(this.g2d_children != null) {
			var _g = 0;
			var _g1 = this.g2d_children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.setState(p_stateName);
			}
		}
	}
	,getPrototypeDefault: function(p_prototypeXml) {
		p_prototypeXml = com_genome2d_proto_GPrototypeFactory.g2d_getPrototype(this,p_prototypeXml,com_genome2d_ui_element_GUIElement.PROTOTYPE_NAME,com_genome2d_ui_element_GUIElement.PROTOTYPE_PROPERTY_NAMES,com_genome2d_ui_element_GUIElement.PROTOTYPE_PROPERTY_TYPES,com_genome2d_ui_element_GUIElement.PROTOTYPE_PROPERTY_DEFAULTS,com_genome2d_ui_element_GUIElement.PROTOTYPE_PROPERTY_EXTRAS);
		return p_prototypeXml;
	}
	,bindPrototypeDefault: function(p_prototypeXml) {
		com_genome2d_proto_GPrototypeFactory.g2d_bindPrototype(this,p_prototypeXml,com_genome2d_ui_element_GUIElement.PROTOTYPE_PROPERTY_NAMES,com_genome2d_ui_element_GUIElement.PROTOTYPE_PROPERTY_TYPES,com_genome2d_ui_element_GUIElement.PROTOTYPE_PROPERTY_EXTRAS);
	}
	,toReference: function() {
		return "";
	}
	,setPrototypeState: function(p_stateName) {
		if(this.g2d_currentState != p_stateName) {
			this.g2d_currentState = p_stateName;
			var state = this.g2d_prototypeStates.g2d_states.get(p_stateName);
			if(state != null) {
				var $it0 = state.keys();
				while( $it0.hasNext() ) {
					var propertyName = $it0.next();
					try {
						Reflect.setProperty(this,propertyName,__map_reserved[propertyName] != null?state.getReserved(propertyName):state.h[propertyName]);
					} catch( e ) {
						if (e instanceof js__$Boot_HaxeError) e = e.val;
					}
				}
			}
		}
	}
	,__class__: com_genome2d_ui_element_GUIElement
	,__properties__: {get_onMouseClick:"get_onMouseClick",get_onMouseOut:"get_onMouseOut",get_onMouseOver:"get_onMouseOver",get_onMouseMove:"get_onMouseMove",get_onMouseUp:"get_onMouseUp",get_onMouseDown:"get_onMouseDown",get_children:"get_children",get_numChildren:"get_numChildren",get_parent:"get_parent",set_preferredHeight:"set_preferredHeight",get_preferredHeight:"get_preferredHeight",set_preferredWidth:"set_preferredWidth",get_preferredWidth:"get_preferredWidth",set_pivotY:"set_pivotY",get_pivotY:"get_pivotY",set_pivotX:"set_pivotX",get_pivotX:"get_pivotX",set_bottom:"set_bottom",get_bottom:"get_bottom",set_right:"set_right",get_right:"get_right",set_top:"set_top",get_top:"get_top",set_left:"set_left",get_left:"get_left",set_anchorBottom:"set_anchorBottom",get_anchorBottom:"get_anchorBottom",set_anchorRight:"set_anchorRight",get_anchorRight:"get_anchorRight",set_anchorTop:"set_anchorTop",get_anchorTop:"get_anchorTop",set_anchorLeft:"set_anchorLeft",get_anchorLeft:"get_anchorLeft",set_anchorY:"set_anchorY",get_anchorY:"get_anchorY",set_anchorX:"set_anchorX",get_anchorX:"get_anchorX",set_skin:"set_skin",get_skin:"get_skin",set_layout:"set_layout",get_layout:"get_layout",get_onModelChanged:"get_onModelChanged",set_mouseMove:"set_mouseMove",get_mouseMove:"get_mouseMove",set_mouseOut:"set_mouseOut",get_mouseOut:"get_mouseOut",set_mouseOver:"set_mouseOver",get_mouseOver:"get_mouseOver",set_mouseClick:"set_mouseClick",get_mouseClick:"get_mouseClick",set_mouseUp:"set_mouseUp",get_mouseUp:"get_mouseUp",set_mouseDown:"set_mouseDown",get_mouseDown:"get_mouseDown",set_scrollable:"set_scrollable",get_scrollable:"get_scrollable",set_color:"set_color",get_color:"get_color"}
};
var com_genome2d_ui_layout_GUILayout = function() {
	this.g2d_currentState = "default";
	this.type = 2;
};
com_genome2d_ui_layout_GUILayout.__name__ = true;
com_genome2d_ui_layout_GUILayout.__interfaces__ = [com_genome2d_proto_IGPrototypable];
com_genome2d_ui_layout_GUILayout.prototype = {
	calculateWidth: function(p_element) {
	}
	,invalidateWidth: function(p_element) {
	}
	,calculateHeight: function(p_element) {
	}
	,invalidateHeight: function(p_element) {
	}
	,isHorizontalLayout: function() {
		return this.type == 2;
	}
	,isVerticalLayout: function() {
		return this.type == 1;
	}
	,toReference: function() {
		return null;
	}
	,getPrototype: function(p_prototypeXml) {
		p_prototypeXml = com_genome2d_proto_GPrototypeFactory.g2d_getPrototype(this,p_prototypeXml,com_genome2d_ui_layout_GUILayout.PROTOTYPE_NAME,com_genome2d_ui_layout_GUILayout.PROTOTYPE_PROPERTY_NAMES,com_genome2d_ui_layout_GUILayout.PROTOTYPE_PROPERTY_TYPES,com_genome2d_ui_layout_GUILayout.PROTOTYPE_PROPERTY_DEFAULTS,com_genome2d_ui_layout_GUILayout.PROTOTYPE_PROPERTY_EXTRAS);
		return p_prototypeXml;
	}
	,bindPrototype: function(p_prototypeXml) {
		com_genome2d_proto_GPrototypeFactory.g2d_bindPrototype(this,p_prototypeXml,com_genome2d_ui_layout_GUILayout.PROTOTYPE_PROPERTY_NAMES,com_genome2d_ui_layout_GUILayout.PROTOTYPE_PROPERTY_TYPES,com_genome2d_ui_layout_GUILayout.PROTOTYPE_PROPERTY_EXTRAS);
	}
	,setPrototypeState: function(p_stateName) {
		if(this.g2d_currentState != p_stateName) {
			this.g2d_currentState = p_stateName;
			var state = this.g2d_prototypeStates.g2d_states.get(p_stateName);
			if(state != null) {
				var $it0 = state.keys();
				while( $it0.hasNext() ) {
					var propertyName = $it0.next();
					try {
						Reflect.setProperty(this,propertyName,__map_reserved[propertyName] != null?state.getReserved(propertyName):state.h[propertyName]);
					} catch( e ) {
						if (e instanceof js__$Boot_HaxeError) e = e.val;
					}
				}
			}
		}
	}
	,__class__: com_genome2d_ui_layout_GUILayout
};
var com_genome2d_ui_layout_GUIHorizontalLayout = function() {
	this.gap = 0;
};
com_genome2d_ui_layout_GUIHorizontalLayout.__name__ = true;
com_genome2d_ui_layout_GUIHorizontalLayout.__super__ = com_genome2d_ui_layout_GUILayout;
com_genome2d_ui_layout_GUIHorizontalLayout.prototype = $extend(com_genome2d_ui_layout_GUILayout.prototype,{
	calculateWidth: function(p_element) {
		p_element.g2d_preferredWidth = p_element.g2d_minWidth = 0;
		var _g1 = 0;
		var _g = p_element.g2d_numChildren;
		while(_g1 < _g) {
			var i = _g1++;
			var child = p_element.g2d_children[i];
			child.calculateWidth();
			p_element.g2d_minWidth += child.g2d_minWidth + this.gap;
			p_element.g2d_preferredWidth += (child.g2d_preferredWidth > child.g2d_minWidth?child.g2d_preferredWidth:child.g2d_minWidth) + this.gap;
		}
	}
	,invalidateWidth: function(p_element) {
		var offsetX = 0;
		var rest = p_element.g2d_finalWidth - p_element.g2d_minWidth;
		if(rest < 0) rest = 0;
		var _g1 = 0;
		var _g = p_element.g2d_numChildren;
		while(_g1 < _g) {
			var i = _g1++;
			var child = p_element.g2d_children[i];
			child.g2d_worldLeft = p_element.g2d_worldLeft + offsetX;
			var childDif;
			if(child.g2d_preferredWidth > child.g2d_minWidth) childDif = child.g2d_preferredWidth - child.g2d_minWidth; else childDif = 0;
			if(rest < childDif) childDif = rest; else childDif = childDif;
			rest -= childDif;
			child.g2d_worldRight = child.g2d_worldLeft + child.g2d_minWidth + childDif;
			child.g2d_finalWidth = child.g2d_worldRight - child.g2d_worldLeft;
			offsetX += child.g2d_finalWidth + this.gap;
			child.invalidateWidth();
		}
	}
	,calculateHeight: function(p_element) {
		p_element.g2d_preferredHeight = p_element.g2d_minHeight = 0;
		var _g1 = 0;
		var _g = p_element.g2d_numChildren;
		while(_g1 < _g) {
			var i = _g1++;
			var child = p_element.g2d_children[i];
			child.calculateHeight();
			if(p_element.g2d_minHeight < child.g2d_minHeight) p_element.g2d_minHeight = child.g2d_minHeight; else p_element.g2d_minHeight = p_element.g2d_minHeight;
		}
	}
	,invalidateHeight: function(p_element) {
		var _g1 = 0;
		var _g = p_element.g2d_numChildren;
		while(_g1 < _g) {
			var i = _g1++;
			var child = p_element.g2d_children[i];
			child.invalidateHeight();
		}
	}
	,getPrototype: function(p_prototypeXml) {
		p_prototypeXml = com_genome2d_proto_GPrototypeFactory.g2d_getPrototype(this,p_prototypeXml,com_genome2d_ui_layout_GUIHorizontalLayout.PROTOTYPE_NAME,com_genome2d_ui_layout_GUIHorizontalLayout.PROTOTYPE_PROPERTY_NAMES,com_genome2d_ui_layout_GUIHorizontalLayout.PROTOTYPE_PROPERTY_TYPES,com_genome2d_ui_layout_GUIHorizontalLayout.PROTOTYPE_PROPERTY_DEFAULTS,com_genome2d_ui_layout_GUIHorizontalLayout.PROTOTYPE_PROPERTY_EXTRAS);
		return com_genome2d_ui_layout_GUILayout.prototype.getPrototype.call(this,p_prototypeXml);
	}
	,bindPrototype: function(p_prototypeXml) {
		com_genome2d_ui_layout_GUILayout.prototype.bindPrototype.call(this,p_prototypeXml);
		com_genome2d_proto_GPrototypeFactory.g2d_bindPrototype(this,p_prototypeXml,com_genome2d_ui_layout_GUIHorizontalLayout.PROTOTYPE_PROPERTY_NAMES,com_genome2d_ui_layout_GUIHorizontalLayout.PROTOTYPE_PROPERTY_TYPES,com_genome2d_ui_layout_GUIHorizontalLayout.PROTOTYPE_PROPERTY_EXTRAS);
	}
	,__class__: com_genome2d_ui_layout_GUIHorizontalLayout
});
var com_genome2d_ui_layout_GUILayoutType = function() { };
com_genome2d_ui_layout_GUILayoutType.__name__ = true;
var com_genome2d_ui_layout_GUIVerticalLayout = function() {
	this.gap = 0;
	com_genome2d_ui_layout_GUILayout.call(this);
	this.type = 1;
};
com_genome2d_ui_layout_GUIVerticalLayout.__name__ = true;
com_genome2d_ui_layout_GUIVerticalLayout.__super__ = com_genome2d_ui_layout_GUILayout;
com_genome2d_ui_layout_GUIVerticalLayout.prototype = $extend(com_genome2d_ui_layout_GUILayout.prototype,{
	calculateWidth: function(p_element) {
		p_element.g2d_preferredWidth = p_element.g2d_minWidth = 0;
		var _g1 = 0;
		var _g = p_element.g2d_numChildren;
		while(_g1 < _g) {
			var i = _g1++;
			var child = p_element.g2d_children[i];
			child.calculateWidth();
			if(p_element.g2d_minWidth < child.g2d_minWidth) p_element.g2d_minWidth = child.g2d_minWidth; else p_element.g2d_minWidth = p_element.g2d_minWidth;
		}
	}
	,invalidateWidth: function(p_element) {
		var offsetX = 0;
		var rest = p_element.g2d_finalWidth - p_element.g2d_minWidth;
		if(rest < 0) rest = 0;
		var _g1 = 0;
		var _g = p_element.g2d_numChildren;
		while(_g1 < _g) {
			var i = _g1++;
			var child = p_element.g2d_children[i];
			child.g2d_worldLeft = p_element.g2d_worldLeft;
			child.g2d_worldRight = child.g2d_worldLeft + p_element.g2d_finalWidth;
			child.g2d_finalWidth = p_element.g2d_finalWidth;
			child.invalidateWidth();
		}
	}
	,calculateHeight: function(p_element) {
		p_element.g2d_preferredHeight = p_element.g2d_minHeight = 0;
		var _g1 = 0;
		var _g = p_element.g2d_numChildren;
		while(_g1 < _g) {
			var i = _g1++;
			var child = p_element.g2d_children[i];
			child.calculateHeight();
			p_element.g2d_minHeight += child.g2d_minHeight + this.gap;
			p_element.g2d_preferredHeight += child.g2d_preferredHeight + this.gap;
		}
	}
	,invalidateHeight: function(p_element) {
		var offsetY = 0;
		var rest = p_element.g2d_finalHeight - p_element.g2d_minHeight;
		if(rest < 0) rest = 0;
		var _g1 = 0;
		var _g = p_element.g2d_numChildren;
		while(_g1 < _g) {
			var i = _g1++;
			var child = p_element.g2d_children[i];
			child.g2d_worldTop = p_element.g2d_worldTop + offsetY;
			var childDif;
			if(child.g2d_preferredHeight > child.g2d_minHeight) childDif = child.g2d_preferredHeight - child.g2d_minHeight; else childDif = 0;
			if(rest < childDif) childDif = rest; else childDif = childDif;
			rest -= childDif;
			child.g2d_worldBottom = child.g2d_worldTop + child.g2d_minHeight + childDif;
			child.g2d_finalHeight = child.g2d_worldBottom - child.g2d_worldTop;
			offsetY += child.g2d_finalHeight + this.gap;
			child.invalidateHeight();
		}
	}
	,getPrototype: function(p_prototypeXml) {
		p_prototypeXml = com_genome2d_proto_GPrototypeFactory.g2d_getPrototype(this,p_prototypeXml,com_genome2d_ui_layout_GUIVerticalLayout.PROTOTYPE_NAME,com_genome2d_ui_layout_GUIVerticalLayout.PROTOTYPE_PROPERTY_NAMES,com_genome2d_ui_layout_GUIVerticalLayout.PROTOTYPE_PROPERTY_TYPES,com_genome2d_ui_layout_GUIVerticalLayout.PROTOTYPE_PROPERTY_DEFAULTS,com_genome2d_ui_layout_GUIVerticalLayout.PROTOTYPE_PROPERTY_EXTRAS);
		return com_genome2d_ui_layout_GUILayout.prototype.getPrototype.call(this,p_prototypeXml);
	}
	,bindPrototype: function(p_prototypeXml) {
		com_genome2d_ui_layout_GUILayout.prototype.bindPrototype.call(this,p_prototypeXml);
		com_genome2d_proto_GPrototypeFactory.g2d_bindPrototype(this,p_prototypeXml,com_genome2d_ui_layout_GUIVerticalLayout.PROTOTYPE_PROPERTY_NAMES,com_genome2d_ui_layout_GUIVerticalLayout.PROTOTYPE_PROPERTY_TYPES,com_genome2d_ui_layout_GUIVerticalLayout.PROTOTYPE_PROPERTY_EXTRAS);
	}
	,__class__: com_genome2d_ui_layout_GUIVerticalLayout
});
var com_genome2d_ui_skin_GUISkin = function(p_id,p_origin) {
	if(p_id == null) p_id = "";
	this.g2d_currentState = "default";
	com_genome2d_ui_skin_GUISkin.g2d_instanceCount++;
	this.g2d_origin = p_origin;
	if(this.g2d_origin == null) {
		this.set_id(p_id != ""?p_id:"GUISkin" + com_genome2d_ui_skin_GUISkin.g2d_instanceCount);
		this.g2d_clones = [];
	}
};
com_genome2d_ui_skin_GUISkin.__name__ = true;
com_genome2d_ui_skin_GUISkin.__interfaces__ = [com_genome2d_proto_IGPrototypable];
com_genome2d_ui_skin_GUISkin.batchRender = function(p_skin) {
	var batched = false;
	if(com_genome2d_ui_skin_GUISkin.g2d_currentBatchTexture != null && p_skin.getTexture() != null && !p_skin.getTexture().hasSameGPUTexture(com_genome2d_ui_skin_GUISkin.g2d_currentBatchTexture)) {
		com_genome2d_ui_skin_GUISkin.g2d_batchQueue.push(p_skin);
		batched = true;
	} else if(com_genome2d_ui_skin_GUISkin.g2d_currentBatchTexture == null && p_skin.getTexture() != null) com_genome2d_ui_skin_GUISkin.g2d_currentBatchTexture = p_skin.getTexture();
	return batched;
};
com_genome2d_ui_skin_GUISkin.flushBatch = function() {
	com_genome2d_ui_skin_GUISkin.g2d_currentBatchTexture = null;
	var queueLength = com_genome2d_ui_skin_GUISkin.g2d_batchQueue.length;
	var _g = 0;
	while(_g < queueLength) {
		var i = _g++;
		com_genome2d_ui_skin_GUISkin.g2d_batchQueue.shift().flushRender();
	}
	if(com_genome2d_ui_skin_GUISkin.g2d_batchQueue.length > 0) com_genome2d_ui_skin_GUISkin.flushBatch();
	com_genome2d_ui_skin_GUISkin.g2d_currentBatchTexture = null;
};
com_genome2d_ui_skin_GUISkin.fromReference = function(p_reference) {
	return com_genome2d_ui_skin_GUISkinManager.getSkin(p_reference);
};
com_genome2d_ui_skin_GUISkin.prototype = {
	get_id: function() {
		if(this.g2d_origin == null) return this.g2d_id; else return this.g2d_origin.g2d_id;
	}
	,set_id: function(p_value) {
		if(p_value != this.g2d_id && p_value.length > 0) {
			if(com_genome2d_ui_skin_GUISkinManager.getSkin(p_value) != null) com_genome2d_debug_GDebug.error("Duplicate style id: " + p_value,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,{ fileName : "GUISkin.hx", lineNumber : 46, className : "com.genome2d.ui.skin.GUISkin", methodName : "set_id"});
			com_genome2d_ui_skin_GUISkinManager.g2d_references.set(p_value,this);
			if(com_genome2d_ui_skin_GUISkinManager.getSkin(this.g2d_id) != null) com_genome2d_ui_skin_GUISkinManager.g2d_references.remove(this.g2d_id);
			this.g2d_id = p_value;
		}
		return this.g2d_id;
	}
	,getMinWidth: function() {
		return 0;
	}
	,getMinHeight: function() {
		return 0;
	}
	,render: function(p_left,p_top,p_right,p_bottom,p_red,p_green,p_blue,p_alpha) {
		this.g2d_renderLeft = p_left;
		this.g2d_renderTop = p_top;
		this.g2d_renderRight = p_right;
		this.g2d_renderBottom = p_bottom;
		this.g2d_renderRed = p_red;
		this.g2d_renderGreen = p_green;
		this.g2d_renderBlue = p_blue;
		this.g2d_renderAlpha = p_alpha;
		return !com_genome2d_ui_skin_GUISkin.batchRender(this);
	}
	,flushRender: function() {
		this.render(this.g2d_renderLeft,this.g2d_renderTop,this.g2d_renderRight,this.g2d_renderBottom,this.g2d_renderRed,this.g2d_renderGreen,this.g2d_renderBlue,this.g2d_renderAlpha);
	}
	,getTexture: function() {
		return null;
	}
	,attach: function(p_element) {
		var origin;
		if(this.g2d_origin == null) origin = this; else origin = this.g2d_origin;
		var clone = origin.clone();
		clone.g2d_element = p_element;
		clone.elementModelChanged_handler(p_element);
		p_element.g2d_onModelChanged.add($bind(clone,clone.elementModelChanged_handler));
		origin.g2d_clones.push(clone);
		return clone;
	}
	,remove: function(p_removedByElement) {
		if(this.g2d_origin != null) {
			if(!p_removedByElement) {
				this.g2d_element.set_skin(null);
				HxOverrides.remove(this.g2d_origin.g2d_clones,this);
			}
			if(this.g2d_element != null) {
				this.g2d_element.g2d_onModelChanged.remove($bind(this,this.elementModelChanged_handler));
				this.g2d_element = null;
			}
		}
	}
	,elementModelChanged_handler: function(p_element) {
	}
	,captureMouseInput: function(p_input) {
	}
	,clone: function() {
		return null;
	}
	,dispose: function() {
		if(this.g2d_origin == null) {
			while(this.g2d_clones.length > 0) this.g2d_clones[0].remove(false);
			if(com_genome2d_ui_skin_GUISkinManager.getSkin(this.g2d_origin == null?this.g2d_id:this.g2d_origin.g2d_id) != null) com_genome2d_ui_skin_GUISkinManager.g2d_removeSkin(this.g2d_origin == null?this.g2d_id:this.g2d_origin.g2d_id);
		} else this.g2d_origin.dispose();
	}
	,toReference: function() {
		return this.g2d_id;
	}
	,getPrototype: function(p_prototypeXml) {
		p_prototypeXml = com_genome2d_proto_GPrototypeFactory.g2d_getPrototype(this,p_prototypeXml,com_genome2d_ui_skin_GUISkin.PROTOTYPE_NAME,com_genome2d_ui_skin_GUISkin.PROTOTYPE_PROPERTY_NAMES,com_genome2d_ui_skin_GUISkin.PROTOTYPE_PROPERTY_TYPES,com_genome2d_ui_skin_GUISkin.PROTOTYPE_PROPERTY_DEFAULTS,com_genome2d_ui_skin_GUISkin.PROTOTYPE_PROPERTY_EXTRAS);
		return p_prototypeXml;
	}
	,bindPrototype: function(p_prototypeXml) {
		com_genome2d_proto_GPrototypeFactory.g2d_bindPrototype(this,p_prototypeXml,com_genome2d_ui_skin_GUISkin.PROTOTYPE_PROPERTY_NAMES,com_genome2d_ui_skin_GUISkin.PROTOTYPE_PROPERTY_TYPES,com_genome2d_ui_skin_GUISkin.PROTOTYPE_PROPERTY_EXTRAS);
	}
	,setPrototypeState: function(p_stateName) {
		if(this.g2d_currentState != p_stateName) {
			this.g2d_currentState = p_stateName;
			var state = this.g2d_prototypeStates.g2d_states.get(p_stateName);
			if(state != null) {
				var $it0 = state.keys();
				while( $it0.hasNext() ) {
					var propertyName = $it0.next();
					try {
						Reflect.setProperty(this,propertyName,__map_reserved[propertyName] != null?state.getReserved(propertyName):state.h[propertyName]);
					} catch( e ) {
						if (e instanceof js__$Boot_HaxeError) e = e.val;
					}
				}
			}
		}
	}
	,__class__: com_genome2d_ui_skin_GUISkin
	,__properties__: {set_id:"set_id",get_id:"get_id"}
};
var com_genome2d_ui_skin_GUISkinManager = function() { };
com_genome2d_ui_skin_GUISkinManager.__name__ = true;
com_genome2d_ui_skin_GUISkinManager.init = function() {
	com_genome2d_ui_skin_GUISkin.g2d_batchQueue = [];
	com_genome2d_ui_skin_GUISkinManager.g2d_references = new haxe_ds_StringMap();
};
com_genome2d_ui_skin_GUISkinManager.getSkin = function(p_id) {
	return com_genome2d_ui_skin_GUISkinManager.g2d_references.get(p_id);
};
com_genome2d_ui_skin_GUISkinManager.g2d_addSkin = function(p_id,p_value) {
	com_genome2d_ui_skin_GUISkinManager.g2d_references.set(p_id,p_value);
};
com_genome2d_ui_skin_GUISkinManager.g2d_removeSkin = function(p_id) {
	com_genome2d_ui_skin_GUISkinManager.g2d_references.remove(p_id);
};
com_genome2d_ui_skin_GUISkinManager.getAllSkins = function() {
	return com_genome2d_ui_skin_GUISkinManager.g2d_references;
};
var com_genome2d_utils_GHAlignType = function() { };
com_genome2d_utils_GHAlignType.__name__ = true;
var com_genome2d_utils_GRenderTargetStack = function() { };
com_genome2d_utils_GRenderTargetStack.__name__ = true;
com_genome2d_utils_GRenderTargetStack.pushRenderTarget = function(p_target,p_transform) {
	if(com_genome2d_utils_GRenderTargetStack.g2d_stack == null) {
		com_genome2d_utils_GRenderTargetStack.g2d_stack = [];
		com_genome2d_utils_GRenderTargetStack.g2d_transforms = [];
	}
	com_genome2d_utils_GRenderTargetStack.g2d_stack.push(p_target);
	com_genome2d_utils_GRenderTargetStack.g2d_transforms.push(p_transform);
};
com_genome2d_utils_GRenderTargetStack.popRenderTarget = function(p_context) {
	if(com_genome2d_utils_GRenderTargetStack.g2d_stack == null) return null;
	p_context.setRenderTarget(com_genome2d_utils_GRenderTargetStack.g2d_stack.pop(),com_genome2d_utils_GRenderTargetStack.g2d_transforms.pop(),false);
};
var com_genome2d_utils_GVAlignType = function() { };
com_genome2d_utils_GVAlignType.__name__ = true;
var examples_basic_BasicExample6Particles = function() {
	this.initGenome();
};
examples_basic_BasicExample6Particles.__name__ = true;
examples_basic_BasicExample6Particles.main = function() {
	var inst = new examples_basic_BasicExample6Particles();
};
examples_basic_BasicExample6Particles.prototype = {
	initGenome: function() {
		if(com_genome2d_Genome2D.g2d_instance == null) {
			com_genome2d_Genome2D.g2d_instantiable = true;
			new com_genome2d_Genome2D();
			com_genome2d_Genome2D.g2d_instantiable = false;
		}
		this.genome = com_genome2d_Genome2D.g2d_instance;
		this.genome.g2d_onFailed.addOnce($bind(this,this.genomeFailed_handler));
		this.genome.g2d_onInitialized.addOnce($bind(this,this.genomeInitialized_handler));
		this.genome.init(new com_genome2d_context_GContextConfig());
	}
	,genomeFailed_handler: function(p_msg) {
	}
	,genomeInitialized_handler: function() {
		this.loadAssets();
	}
	,loadAssets: function() {
		com_genome2d_assets_GAssetManager.addFromUrl("atlas.png");
		com_genome2d_assets_GAssetManager.addFromUrl("atlas.xml");
		com_genome2d_assets_GAssetManager.g2d_onQueueFailed.add($bind(this,this.assetsFailed_handler));
		com_genome2d_assets_GAssetManager.g2d_onQueueLoaded.addOnce($bind(this,this.assetsLoaded_handler));
		com_genome2d_assets_GAssetManager.loadQueue();
	}
	,assetsFailed_handler: function(p_asset) {
	}
	,assetsLoaded_handler: function() {
		this.initExample();
	}
	,initExample: function() {
		com_genome2d_assets_GAssetManager.generateTextures();
		var particleSystem = com_genome2d_node_GNode.createWithComponent(com_genome2d_components_renderable_particles_GSimpleParticleSystem);
		particleSystem.texture = com_genome2d_textures_GTextureManager.getTexture("atlas_particle");
		com_genome2d_context_stats_GStats.visible = true;
		particleSystem.emission = 128;
		particleSystem.emit = true;
		particleSystem.dispersionAngleVariance = Math.PI * 2;
		particleSystem.energy = 1;
		particleSystem.initialVelocity = 50;
		particleSystem.initialVelocityVariance = 100;
		particleSystem.initialAngleVariance = 5;
		particleSystem.endAlpha = 0;
		particleSystem.initialScale = 2;
		particleSystem.endScale = .2;
		particleSystem.g2d_node.setPosition(400,300);
		((function($this) {
			var $r;
			if(com_genome2d_Genome2D.g2d_instance == null) {
				com_genome2d_Genome2D.g2d_instantiable = true;
				new com_genome2d_Genome2D();
				com_genome2d_Genome2D.g2d_instantiable = false;
			}
			$r = com_genome2d_Genome2D.g2d_instance;
			return $r;
		}(this))).get_root().addChild(particleSystem.g2d_node);
	}
	,__class__: examples_basic_BasicExample6Particles
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
haxe_Http.__name__ = true;
haxe_Http.prototype = {
	request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				s = null;
			}
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) if(r.responseText != null) s = 200; else s = 404;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1;
			h1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe_Http
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
haxe__$Int64__$_$_$Int64.__name__ = true;
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	__class__: haxe_ds_IntMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
haxe_ds__$StringMap_StringMapIterator.__name__ = true;
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; return $x; };
var haxe_io_FPHelper = function() { };
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_xml_Parser = function() { };
haxe_xml_Parser.__name__ = true;
haxe_xml_Parser.parse = function(str,strict) {
	if(strict == null) strict = false;
	var doc = Xml.createDocument();
	haxe_xml_Parser.doParse(str,strict,0,doc);
	return doc;
};
haxe_xml_Parser.doParse = function(str,strict,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	var escapeNext = 1;
	var attrValQuote = -1;
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				buf.addSub(str,start,p - start);
				var child = Xml.createPCData(buf.b);
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw new js__$Boot_HaxeError("Expected <![CDATA[");
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw new js__$Boot_HaxeError("Expected <!DOCTYPE");
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw new js__$Boot_HaxeError("Expected <!--"); else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw new js__$Boot_HaxeError("Expected node name");
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw new js__$Boot_HaxeError("Expected node name");
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw new js__$Boot_HaxeError("Expected attribute name");
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw new js__$Boot_HaxeError("Duplicate attribute");
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected =");
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				buf = new StringBuf();
				state = 8;
				start = p + 1;
				attrValQuote = c;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected \"");
			}
			break;
		case 8:
			switch(c) {
			case 38:
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 8;
				start = p + 1;
				break;
			case 62:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val = buf.b;
					buf = new StringBuf();
					xml.set(aname,val);
					state = 0;
					next = 4;
				}
				break;
			case 60:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val1 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val1);
					state = 0;
					next = 4;
				}
				break;
			default:
				if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val2 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val2);
					state = 0;
					next = 4;
				}
			}
			break;
		case 9:
			p = haxe_xml_Parser.doParse(str,strict,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw new js__$Boot_HaxeError("Expected node name");
				var v = HxOverrides.substr(str,start,p - start);
				if(v != (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + parent.nodeType);
					$r = parent.nodeName;
					return $r;
				}(this))) throw new js__$Boot_HaxeError("Expected </" + (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw "Bad node type, expected Element but found " + parent.nodeType;
					$r = parent.nodeName;
					return $r;
				}(this)) + ">");
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProcessingInstruction(str1));
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var c1;
					if(s.charCodeAt(1) == 120) c1 = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else c1 = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.b += String.fromCharCode(c1);
				} else if(!haxe_xml_Parser.escapes.exists(s)) {
					if(strict) throw new js__$Boot_HaxeError("Undefined entity: " + s);
					buf.b += Std.string("&" + s + ";");
				} else buf.add(haxe_xml_Parser.escapes.get(s));
				start = p + 1;
				state = escapeNext;
			} else if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45) && c != 35) {
				if(strict) throw new js__$Boot_HaxeError("Invalid character in entity: " + String.fromCharCode(c));
				buf.b += "&";
				buf.addSub(str,start,p - start);
				p--;
				start = p;
				state = escapeNext;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) {
			buf.addSub(str,start,p - start);
			parent.addChild(Xml.createPCData(buf.b));
		}
		return p;
	}
	if(!strict && state == 18 && escapeNext == 13) {
		buf.b += "&";
		buf.addSub(str,start,p - start);
		parent.addChild(Xml.createPCData(buf.b));
		return p;
	}
	throw new js__$Boot_HaxeError("Unexpected end");
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
var js_Browser = function() { };
js_Browser.__name__ = true;
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
js_html_compat_ArrayBuffer.__name__ = true;
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
js_html_compat_DataView.__name__ = true;
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
js_html_compat_Uint8Array.__name__ = true;
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
var ArrayBuffer = typeof(window) != "undefined" && window.ArrayBuffer || typeof(global) != "undefined" && global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = typeof(window) != "undefined" && window.DataView || typeof(global) != "undefined" && global.DataView || js_html_compat_DataView;
var Uint8Array = typeof(window) != "undefined" && window.Uint8Array || typeof(global) != "undefined" && global.Uint8Array || js_html_compat_Uint8Array._new;
com_genome2d_proto_GPrototypeHelper.GComponent = "com.genome2d.components.GComponent";
com_genome2d_proto_GPrototypeHelper.GSimpleParticleSystem = "com.genome2d.components.renderable.particles.GSimpleParticleSystem";
com_genome2d_proto_GPrototypeHelper.GNode = "com.genome2d.node.GNode";
com_genome2d_proto_GPrototypeHelper.node = "com.genome2d.node.GNode";
com_genome2d_proto_GPrototypeHelper.GUISkin = "com.genome2d.ui.skin.GUISkin";
com_genome2d_proto_GPrototypeHelper.GUIElement = "com.genome2d.ui.element.GUIElement";
com_genome2d_proto_GPrototypeHelper.element = "com.genome2d.ui.element.GUIElement";
com_genome2d_proto_GPrototypeHelper.GUILayout = "com.genome2d.ui.layout.GUILayout";
com_genome2d_proto_GPrototypeHelper.layout = "com.genome2d.ui.layout.GUILayout";
com_genome2d_proto_GPrototypeHelper.GUIHorizontalLayout = "com.genome2d.ui.layout.GUIHorizontalLayout";
com_genome2d_proto_GPrototypeHelper.horizontal = "com.genome2d.ui.layout.GUIHorizontalLayout";
com_genome2d_proto_GPrototypeHelper.GCameraController = "com.genome2d.components.GCameraController";
com_genome2d_proto_GPrototypeHelper.GTextureFont = "com.genome2d.text.GTextureFont";
com_genome2d_proto_GPrototypeHelper.GTexturedQuad = "com.genome2d.components.renderable.GTexturedQuad";
com_genome2d_proto_GPrototypeHelper.GSprite = "com.genome2d.components.renderable.GSprite";
com_genome2d_proto_GPrototypeHelper.GTextureBase = "com.genome2d.textures.GTextureBase";
com_genome2d_proto_GPrototypeHelper.GTexture = "com.genome2d.textures.GTexture";
com_genome2d_proto_GPrototypeHelper.GUIVerticalLayout = "com.genome2d.ui.layout.GUIVerticalLayout";
com_genome2d_proto_GPrototypeHelper.vertical = "com.genome2d.ui.layout.GUIVerticalLayout";
Xml.Element = 0;
Xml.PCData = 1;
Xml.CData = 2;
Xml.Comment = 3;
Xml.DocType = 4;
Xml.ProcessingInstruction = 5;
Xml.Document = 6;
com_genome2d_Genome2D.VERSION = "1.1";
com_genome2d_Genome2D.BUILD = "3b14c5dd577c69bddb4f9cc7ab6cc3ab";
com_genome2d_Genome2D.DATE = "2015-07-15 17:30:34";
com_genome2d_Genome2D.g2d_instantiable = false;
com_genome2d_assets_GAsset.__meta__ = { obj : { prototypeName : ["asset"]}, fields : { id : { prototype : null}, url : { prototype : null}}};
com_genome2d_assets_GAssetManager.PATH_REGEX = new EReg("([^\\?/\\\\]+?)(?:\\.([\\w\\-]+))?(?:\\?.*)?$","");
com_genome2d_assets_GAssetManager.ignoreFailed = false;
com_genome2d_assets_GImageAssetType.BITMAPDATA = 0;
com_genome2d_assets_GImageAssetType.ATF = 1;
com_genome2d_assets_GImageAssetType.IMAGEELEMENT = 2;
com_genome2d_components_GComponent.PROTOTYPE_PROPERTY_DEFAULTS = [];
com_genome2d_components_GComponent.PROTOTYPE_PROPERTY_NAMES = [];
com_genome2d_components_GComponent.PROTOTYPE_PROPERTY_TYPES = [];
com_genome2d_components_GComponent.PROTOTYPE_PROPERTY_EXTRAS = [];
com_genome2d_components_GComponent.PROTOTYPE_NAME = "GComponent";
com_genome2d_components_GCameraController.PROTOTYPE_PROPERTY_DEFAULTS = [];
com_genome2d_components_GCameraController.PROTOTYPE_PROPERTY_NAMES = [];
com_genome2d_components_GCameraController.PROTOTYPE_PROPERTY_TYPES = [];
com_genome2d_components_GCameraController.PROTOTYPE_PROPERTY_EXTRAS = [];
com_genome2d_components_GCameraController.PROTOTYPE_NAME = "GCameraController";
com_genome2d_components_renderable_GTexturedQuad.__meta__ = { fields : { blendMode : { prototype : null}, texture : { prototype : null}}};
com_genome2d_components_renderable_GTexturedQuad.PROTOTYPE_PROPERTY_DEFAULTS = [1,null];
com_genome2d_components_renderable_GTexturedQuad.PROTOTYPE_PROPERTY_NAMES = ["blendMode","texture"];
com_genome2d_components_renderable_GTexturedQuad.PROTOTYPE_PROPERTY_TYPES = ["Int","GTexture"];
com_genome2d_components_renderable_GTexturedQuad.PROTOTYPE_PROPERTY_EXTRAS = ["default","default"];
com_genome2d_components_renderable_GTexturedQuad.PROTOTYPE_NAME = "GTexturedQuad";
com_genome2d_components_renderable_GSprite.PROTOTYPE_PROPERTY_DEFAULTS = [];
com_genome2d_components_renderable_GSprite.PROTOTYPE_PROPERTY_NAMES = [];
com_genome2d_components_renderable_GSprite.PROTOTYPE_PROPERTY_TYPES = [];
com_genome2d_components_renderable_GSprite.PROTOTYPE_PROPERTY_EXTRAS = [];
com_genome2d_components_renderable_GSprite.PROTOTYPE_NAME = "GSprite";
com_genome2d_components_renderable_particles_GSimpleParticleSystem.__meta__ = { fields : { settings : { prototype : null}}};
com_genome2d_components_renderable_particles_GSimpleParticleSystem.PROTOTYPE_PROPERTY_DEFAULTS = [""];
com_genome2d_components_renderable_particles_GSimpleParticleSystem.PROTOTYPE_PROPERTY_NAMES = ["settings"];
com_genome2d_components_renderable_particles_GSimpleParticleSystem.PROTOTYPE_PROPERTY_TYPES = ["String"];
com_genome2d_components_renderable_particles_GSimpleParticleSystem.PROTOTYPE_PROPERTY_EXTRAS = ["default"];
com_genome2d_components_renderable_particles_GSimpleParticleSystem.PROTOTYPE_NAME = "GSimpleParticleSystem";
com_genome2d_context_GBlendMode.blendFactors = [[[1,0],[770,771],[770,32970],[32968,771],[770,1],[0,771]],[[1,0],[1,771],[1,1],[32968,771],[1,769],[0,771]]];
com_genome2d_context_GBlendMode.NONE = 0;
com_genome2d_context_GBlendMode.NORMAL = 1;
com_genome2d_context_GBlendMode.ADD = 2;
com_genome2d_context_GBlendMode.MULTIPLY = 3;
com_genome2d_context_GBlendMode.SCREEN = 4;
com_genome2d_context_GBlendMode.ERASE = 5;
com_genome2d_context_GContextFeature.STENCIL_MASKING = 1;
com_genome2d_context_GContextFeature.RECTANGLE_TEXTURES = 2;
com_genome2d_context_stats_GStats.fps = 0;
com_genome2d_context_stats_GStats.drawCalls = 0;
com_genome2d_context_stats_GStats.nodeCount = 0;
com_genome2d_context_stats_GStats.x = 0;
com_genome2d_context_stats_GStats.y = 0;
com_genome2d_context_stats_GStats.scaleX = 1;
com_genome2d_context_stats_GStats.scaleY = 1;
com_genome2d_context_stats_GStats.visible = false;
com_genome2d_context_webgl_renderers_GQuadTextureShaderRenderer.BATCH_SIZE = 30;
com_genome2d_context_webgl_renderers_GQuadTextureShaderRenderer.TRANSFORM_PER_VERTEX = 3;
com_genome2d_context_webgl_renderers_GQuadTextureShaderRenderer.TRANSFORM_PER_VERTEX_ALPHA = 4;
com_genome2d_context_webgl_renderers_GQuadTextureShaderRenderer.VERTEX_SHADER_CODE_ALPHA = "\r\n\t\t\tuniform mat4 projectionMatrix;\r\n\t\t\tuniform vec4 transforms[" + 120 + "];\r\n\r\n\t\t\tattribute vec2 aPosition;\r\n\t\t\tattribute vec2 aTexCoord;\r\n\t\t\tattribute vec4 aConstantIndex;\r\n\r\n\t\t\tvarying vec2 vTexCoord;\r\n\t\t\tvarying vec4 vColor;\r\n\r\n\t\t\tvoid main(void)\r\n\t\t\t{\r\n\t\t\t\tgl_Position = vec4(aPosition.x*transforms[int(aConstantIndex.z)].x, aPosition.y*transforms[int(aConstantIndex.z)].y, 0, 1);\r\n\t\t\t\tgl_Position = vec4(gl_Position.x - transforms[int(aConstantIndex.z)].z, gl_Position.y - transforms[int(aConstantIndex.z)].w, 0, 1);\r\n\t\t\t\tfloat c = cos(transforms[int(aConstantIndex.x)].z);\r\n\t\t\t\tfloat s = sin(transforms[int(aConstantIndex.x)].z);\r\n\t\t\t\tgl_Position = vec4(gl_Position.x * c - gl_Position.y * s, gl_Position.x * s + gl_Position.y * c, 0, 1);\r\n\t\t\t\tgl_Position = vec4(gl_Position.x+transforms[int(aConstantIndex.x)].x, gl_Position.y+transforms[int(aConstantIndex.x)].y, 0, 1);\r\n\t\t\t\tgl_Position = gl_Position * projectionMatrix;\r\n\r\n\t\t\t\tvTexCoord = vec2(aTexCoord.x*transforms[int(aConstantIndex.y)].z+transforms[int(aConstantIndex.y)].x, aTexCoord.y*transforms[int(aConstantIndex.y)].w+transforms[int(aConstantIndex.y)].y);\r\n\t\t\t\tvColor = transforms[int(aConstantIndex.w)];\r\n\t\t\t}\r\n\t\t ";
com_genome2d_context_webgl_renderers_GQuadTextureShaderRenderer.FRAGMENT_SHADER_CODE_ALPHA = "\r\n\t\t\t//#ifdef GL_ES\r\n\t\t\tprecision lowp float;\r\n\t\t\t//#endif\r\n\r\n\t\t\tvarying vec2 vTexCoord;\r\n\t\t\tvarying vec4 vColor;\r\n\r\n\t\t\tuniform sampler2D sTexture;\r\n\r\n\t\t\tvoid main(void)\r\n\t\t\t{\r\n\t\t\t\tgl_FragColor = texture2D(sTexture, vTexCoord) * vColor;\r\n\t\t\t}\r\n\t\t";
com_genome2d_debug_GDebug.g2d_console = "";
com_genome2d_debug_GDebug.showPriority = 1;
com_genome2d_debug_GDebug.stackTrace = true;
com_genome2d_debug_GDebugPriority.INTERNAL_DUMP = 0;
com_genome2d_debug_GDebugPriority.AUTO_DUMP = 1;
com_genome2d_debug_GDebugPriority.DUMP = 2;
com_genome2d_debug_GDebugPriority.INFO = 3;
com_genome2d_debug_GDebugPriority.WARNING = 4;
com_genome2d_debug_GDebugPriority.ERROR = 5;
com_genome2d_debug_GDebugPriority.PROFILE = 100;
com_genome2d_input_GMouseInputType.MOUSE_DOWN = "mouseDown";
com_genome2d_input_GMouseInputType.MOUSE_MOVE = "mouseMove";
com_genome2d_input_GMouseInputType.MOUSE_UP = "mouseUp";
com_genome2d_input_GMouseInputType.MOUSE_OVER = "mouseOver";
com_genome2d_input_GMouseInputType.MOUSE_OUT = "mouseOut";
com_genome2d_input_GMouseInputType.RIGHT_MOUSE_DOWN = "rightMouseDown";
com_genome2d_input_GMouseInputType.RIGHT_MOUSE_UP = "rightMouseUp";
com_genome2d_input_GMouseInputType.MOUSE_WHEEL = "mouseWheel";
com_genome2d_node_GNode.__meta__ = { obj : { prototypeName : ["node"]}, fields : { useWorldSpace : { prototype : null}, useWorldColor : { prototype : null}, x : { prototype : null}, y : { prototype : null}, scaleX : { prototype : null}, scaleY : { prototype : null}, rotation : { prototype : null}, red : { prototype : null}, green : { prototype : null}, blue : { prototype : null}, alpha : { prototype : null}}};
com_genome2d_node_GNode.g2d_nodeCount = 0;
com_genome2d_node_GNode.PROTOTYPE_PROPERTY_DEFAULTS = [false,false,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
com_genome2d_node_GNode.PROTOTYPE_PROPERTY_NAMES = ["useWorldSpace","useWorldColor","x","y","scaleX","scaleY","rotation","red","green","blue","alpha"];
com_genome2d_node_GNode.PROTOTYPE_PROPERTY_TYPES = ["Bool","Bool","Float","Float","Float","Float","Float","Float","Float","Float","Float"];
com_genome2d_node_GNode.PROTOTYPE_PROPERTY_EXTRAS = ["default","default","default","default","default","default","default","default","default","default","default"];
com_genome2d_node_GNode.PROTOTYPE_NAME = "node";
com_genome2d_particles_GSimpleParticle.g2d_instanceCount = 0;
com_genome2d_postprocess_GPostProcess.g2d_count = 0;
com_genome2d_proto_GPrototypeExtras.DEFAULT = "default";
com_genome2d_proto_GPrototypeExtras.SETTER = "setter";
com_genome2d_proto_GPrototypeFactory.g2d_lookupsInitialized = false;
com_genome2d_text_GTextureFont.__meta__ = { fields : { texture : { prototype : null}, id : { prototype : null}, lineHeight : { prototype : null}}};
com_genome2d_text_GTextureFont.PROTOTYPE_PROPERTY_DEFAULTS = [null,"",0];
com_genome2d_text_GTextureFont.PROTOTYPE_PROPERTY_NAMES = ["texture","id","lineHeight"];
com_genome2d_text_GTextureFont.PROTOTYPE_PROPERTY_TYPES = ["GTexture","String","Int"];
com_genome2d_text_GTextureFont.PROTOTYPE_PROPERTY_EXTRAS = ["default","default","default"];
com_genome2d_text_GTextureFont.PROTOTYPE_NAME = "GTextureFont";
com_genome2d_textures_GTextureBase.g2d_instanceCount = 0;
com_genome2d_textures_GTextureBase.PROTOTYPE_PROPERTY_DEFAULTS = [];
com_genome2d_textures_GTextureBase.PROTOTYPE_PROPERTY_NAMES = [];
com_genome2d_textures_GTextureBase.PROTOTYPE_PROPERTY_TYPES = [];
com_genome2d_textures_GTextureBase.PROTOTYPE_PROPERTY_EXTRAS = [];
com_genome2d_textures_GTextureBase.PROTOTYPE_NAME = "GTextureBase";
com_genome2d_textures_GTexture.PROTOTYPE_PROPERTY_DEFAULTS = [];
com_genome2d_textures_GTexture.PROTOTYPE_PROPERTY_NAMES = [];
com_genome2d_textures_GTexture.PROTOTYPE_PROPERTY_TYPES = [];
com_genome2d_textures_GTexture.PROTOTYPE_PROPERTY_EXTRAS = [];
com_genome2d_textures_GTexture.PROTOTYPE_NAME = "GTexture";
com_genome2d_textures_GTextureFilteringType.NEAREST = 0;
com_genome2d_textures_GTextureFilteringType.LINEAR = 1;
com_genome2d_textures_GTextureManager.defaultFilteringType = 1;
com_genome2d_textures_GTextureSourceType.BITMAPDATA = 1;
com_genome2d_textures_GTextureSourceType.BYTEARRAY = 2;
com_genome2d_textures_GTextureSourceType.RENDER_TARGET = 3;
com_genome2d_textures_GTextureSourceType.ATF_BGRA = 4;
com_genome2d_textures_GTextureSourceType.ATF_COMPRESSED = 5;
com_genome2d_textures_GTextureSourceType.ATF_COMPRESSEDALPHA = 6;
com_genome2d_textures_GTextureSourceType.TEXTURE = 7;
com_genome2d_textures_GTextureSourceType.IMAGE = 8;
com_genome2d_ui_element_GUIElement.__meta__ = { obj : { prototypeName : ["element"]}, fields : { color : { prototype : null}, mouseEnabled : { prototype : null}, mouseChildren : { prototype : null}, visible : { prototype : null}, flushBatch : { prototype : null}, name : { prototype : null}, scrollable : { prototype : null}, setAlign : { prototype : null}, setAnchorAlign : { prototype : null}, setPivotAlign : { prototype : null}, mouseDown : { prototype : null}, mouseUp : { prototype : null}, mouseClick : { prototype : null}, mouseOver : { prototype : null}, mouseOut : { prototype : null}, mouseMove : { prototype : null}, setModel : { prototype : null}, layout : { prototype : null}, skin : { prototype : null}, anchorX : { prototype : null}, anchorY : { prototype : null}, anchorLeft : { prototype : null}, anchorTop : { prototype : null}, anchorRight : { prototype : null}, anchorBottom : { prototype : null}, left : { prototype : null}, top : { prototype : null}, right : { prototype : null}, bottom : { prototype : null}, pivotX : { prototype : null}, pivotY : { prototype : null}, expand : { prototype : null}, preferredWidth : { prototype : null}, preferredHeight : { prototype : null}}};
com_genome2d_ui_element_GUIElement.dragSensitivity = 0;
com_genome2d_ui_element_GUIElement.PROTOTYPE_PROPERTY_DEFAULTS = [0,true,true,true,false,"",false,null,null,null,"","","","","","",null,null,null,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,true,0.0,0.0];
com_genome2d_ui_element_GUIElement.PROTOTYPE_PROPERTY_NAMES = ["color","mouseEnabled","mouseChildren","visible","flushBatch","name","scrollable","setAlign","setAnchorAlign","setPivotAlign","mouseDown","mouseUp","mouseClick","mouseOver","mouseOut","mouseMove","setModel","layout","skin","anchorX","anchorY","anchorLeft","anchorTop","anchorRight","anchorBottom","left","top","right","bottom","pivotX","pivotY","expand","preferredWidth","preferredHeight"];
com_genome2d_ui_element_GUIElement.PROTOTYPE_PROPERTY_TYPES = ["Int","Bool","Bool","Bool","Bool","String","Bool","Int","Int","Int","String","String","String","String","String","String","Dynamic","GUILayout","GUISkin","Float","Float","Float","Float","Float","Float","Float","Float","Float","Float","Float","Float","Bool","Float","Float"];
com_genome2d_ui_element_GUIElement.PROTOTYPE_PROPERTY_EXTRAS = ["default","default","default","default","default","default","default","setter","setter","setter","default","default","default","default","default","default","setter","default","default","default","default","default","default","default","default","default","default","default","default","default","default","default","default","default"];
com_genome2d_ui_element_GUIElement.PROTOTYPE_NAME = "element";
com_genome2d_ui_layout_GUILayout.__meta__ = { obj : { prototypeName : ["layout"]}, fields : { type : { prototype : null}}};
com_genome2d_ui_layout_GUILayout.PROTOTYPE_PROPERTY_DEFAULTS = [2];
com_genome2d_ui_layout_GUILayout.PROTOTYPE_PROPERTY_NAMES = ["type"];
com_genome2d_ui_layout_GUILayout.PROTOTYPE_PROPERTY_TYPES = ["Int"];
com_genome2d_ui_layout_GUILayout.PROTOTYPE_PROPERTY_EXTRAS = ["default"];
com_genome2d_ui_layout_GUILayout.PROTOTYPE_NAME = "layout";
com_genome2d_ui_layout_GUIHorizontalLayout.__meta__ = { obj : { prototypeName : ["horizontal"]}, fields : { gap : { prototype : null}}};
com_genome2d_ui_layout_GUIHorizontalLayout.PROTOTYPE_PROPERTY_DEFAULTS = [0];
com_genome2d_ui_layout_GUIHorizontalLayout.PROTOTYPE_PROPERTY_NAMES = ["gap"];
com_genome2d_ui_layout_GUIHorizontalLayout.PROTOTYPE_PROPERTY_TYPES = ["Float"];
com_genome2d_ui_layout_GUIHorizontalLayout.PROTOTYPE_PROPERTY_EXTRAS = ["default"];
com_genome2d_ui_layout_GUIHorizontalLayout.PROTOTYPE_NAME = "horizontal";
com_genome2d_ui_layout_GUILayoutType.VERTICAL = 1;
com_genome2d_ui_layout_GUILayoutType.HORIZONTAL = 2;
com_genome2d_ui_layout_GUILayoutType.GRID_VERTICAL = 3;
com_genome2d_ui_layout_GUILayoutType.GRID_HORIZONTAL = 4;
com_genome2d_ui_layout_GUIVerticalLayout.__meta__ = { obj : { prototypeName : ["vertical"]}, fields : { gap : { prototype : null}}};
com_genome2d_ui_layout_GUIVerticalLayout.PROTOTYPE_PROPERTY_DEFAULTS = [0];
com_genome2d_ui_layout_GUIVerticalLayout.PROTOTYPE_PROPERTY_NAMES = ["gap"];
com_genome2d_ui_layout_GUIVerticalLayout.PROTOTYPE_PROPERTY_TYPES = ["Float"];
com_genome2d_ui_layout_GUIVerticalLayout.PROTOTYPE_PROPERTY_EXTRAS = ["default"];
com_genome2d_ui_layout_GUIVerticalLayout.PROTOTYPE_NAME = "vertical";
com_genome2d_ui_skin_GUISkin.__meta__ = { fields : { id : { prototype : null}}};
com_genome2d_ui_skin_GUISkin.g2d_instanceCount = 0;
com_genome2d_ui_skin_GUISkin.PROTOTYPE_PROPERTY_DEFAULTS = [""];
com_genome2d_ui_skin_GUISkin.PROTOTYPE_PROPERTY_NAMES = ["id"];
com_genome2d_ui_skin_GUISkin.PROTOTYPE_PROPERTY_TYPES = ["String"];
com_genome2d_ui_skin_GUISkin.PROTOTYPE_PROPERTY_EXTRAS = ["default"];
com_genome2d_ui_skin_GUISkin.PROTOTYPE_NAME = "GUISkin";
com_genome2d_utils_GHAlignType.LEFT = 0;
com_genome2d_utils_GHAlignType.CENTER = 1;
com_genome2d_utils_GHAlignType.RIGHT = 2;
com_genome2d_utils_GVAlignType.TOP = 0;
com_genome2d_utils_GVAlignType.MIDDLE = 1;
com_genome2d_utils_GVAlignType.BOTTOM = 2;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
haxe_xml_Parser.escapes = (function($this) {
	var $r;
	var h = new haxe_ds_StringMap();
	if(__map_reserved.lt != null) h.setReserved("lt","<"); else h.h["lt"] = "<";
	if(__map_reserved.gt != null) h.setReserved("gt",">"); else h.h["gt"] = ">";
	if(__map_reserved.amp != null) h.setReserved("amp","&"); else h.h["amp"] = "&";
	if(__map_reserved.quot != null) h.setReserved("quot","\""); else h.h["quot"] = "\"";
	if(__map_reserved.apos != null) h.setReserved("apos","'"); else h.h["apos"] = "'";
	$r = h;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
examples_basic_BasicExample6Particles.main();
})(typeof console != "undefined" ? console : {log:function(){}});