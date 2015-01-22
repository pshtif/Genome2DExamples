package examples;

import com.genome2d.components.GCameraController;
import com.genome2d.signals.GUIMouseSignal;
import com.genome2d.assets.GAsset;
import com.genome2d.ui.GUIElement;
import flash.Lib;
import com.genome2d.ui.skin.GUISkin;
import com.genome2d.ui.GUIElement;
import Xml;
import com.genome2d.proto.GPrototypeFactory;
import com.genome2d.proto.IGPrototypable;
import com.genome2d.components.ui.GUI;
import com.genome2d.textures.GTexture;
import com.genome2d.context.stats.GStats;
import com.genome2d.Genome2D;
import com.genome2d.Genome2D;
import com.genome2d.node.GNode;
import com.genome2d.Genome2D;
import com.genome2d.context.GContextConfig;
import com.genome2d.assets.GAssetManager;

class UIEdit {

    static public function main() {
        var inst = new UIEdit();
    }

    private var genome:Genome2D;
    private var treelist:TreeList;
    private var anchorGizmo:AnchorGizmo;
    private var rectGizmo:RectGizmo;
    private var ui:GUI;

    public function new() {
        initGenome();
    }

    private function initGenome():Void {
        trace("initGenome");

        genome = Genome2D.getInstance();
        genome.onInitialized.add(genomeInitializedHandler);
        genome.init(new GContextConfig());
    }

    private function genomeInitializedHandler():Void {
        trace("genomeInitializedHandler");

        GStats.visible = true;

        initAssets();
    }

    private function initAssets():Void {
        trace("initAssets");

        GAssetManager.init();
        GAssetManager.addFromUrl("ui.png");
        GAssetManager.addFromUrl("ui.xml");
        GAssetManager.addFromUrl("font_ui.png");
        GAssetManager.addFromUrl("font_ui.fnt");
        GAssetManager.loadQueue(assetsInitializedHandler);
    }

    private function assetsInitializedHandler():Void {
        trace("assetsInitializedHandler");

        initExample();
    }

    private var xmlDef:String = "<def>"+
                                    "<textureSkin id='xpSkin' textureId='ui.png_btn_xp' />"+
                                    "<textureSkin id='energySkin' textureId='ui.png_btn_energy' />"+
                                    "<textureSkin id='goldSkin' textureId='ui.png_btn_gold' />"+
                                    "<textureSkin id='gemSkin' textureId='ui.png_btn_gem' />"+
                                    "<fontSkin id='xpLabelSkin' fontAtlasId='font_ui.png' text='Hello world' />"+

                                    "<element anchorX='0' anchorY='0' anchorLeft='0' anchorTop='0' anchorRight='0' anchorBottom='0' pivotX='0' pivotY='0'>"+
                                        "<layout><GUILayout gap='10'/></layout>"+
                                        "<element normalSkinId='xpSkin'/>"+
                                        "<element normalSkinId='energySkin'/>"+
                                        "<element normalSkinId='goldSkin'/>"+
                                        "<element normalSkinId='xpLabelSkin'/>"+
                                    "</element>"+
                                    /**/
                                "</def>";

    @:access(com.genome2d.textures.GTexture)
    private function initExample():Void {
        GAssetManager.generateTextures(.5);

        var camera:GCameraController = cast GNode.createWithComponent(GCameraController);
        camera.setViewport(2048,1536,true);
        genome.root.addChild(camera.node);


        ui = cast GNode.createWithComponent(GUI);
        ui.node.transform.setPosition(0,0);
        ui.node.mouseEnabled = true;
        genome.root.addChild(ui.node);


        var xml:Xml = Xml.parse(xmlDef).firstChild();
        for (i in xml.elements()) {
            var p:IGPrototypable = GPrototypeFactory.createPrototype(i);
            trace(p.getPrototype());
            if (Std.is(p,GUIElement)) {
                var element:GUIElement = cast p;
                element.id = "container";
                element.mouseEnabled = true;
                element.anchorX = 300;
                element.anchorY = 300;
                ui.root.addChild(element);
            }
        }
        /*
        ui = cast GNode.createWithComponent(GUI);
        ui.root.setRect(0,0,2038,1536);
        ui.node.mouseEnabled = true;
        genome.root.addChild(ui.node);

        var scrollContainer:GUIElement = new GUIElement();
        scrollContainer.id = "container";
        scrollContainer.anchorLeft = scrollContainer.anchorRight = 0;
        scrollContainer.pivotX = 0;
        scrollContainer.mouseEnabled = true;
        scrollContainer.onMouseDown.add(mouseDownHandler);
        scrollContainer.layout = new GUILayout();
        ui.root.addChild(scrollContainer);

        for (i in 0...5) {
            var skin:GUITextureSkin = new GUITextureSkin();
            //skin.textureId = "ui.png_img_shop_card_cleen";

            var card:GUIElement = new GUIElement();
            card.value = {value:"ui.png_img_shop_card_cleen"};
            card.normalSkin = skin;
            scrollContainer.addChild(card);

            var image:GUIElement = new GUIElement();
            image.normalSkin = new GUITextureSkin();
            image.anchorTop = image.anchorBottom = .3;
            card.addChild(image);
        }
        /**/
        rectGizmo = new RectGizmo();
        Lib.current.addChild(rectGizmo);

        anchorGizmo = new AnchorGizmo();
        Lib.current.addChild(anchorGizmo);

        treelist = new TreeList();
        treelist.parseData(ui.root);
        treelist.x = 0;
        treelist.y = 300;
        treelist.onSelect.add(selectHandler);
        genome.getContext().getNativeStage().addChild(treelist);
        /**/
    }

    private function mouseDownHandler(signal:GUIMouseSignal):Void {
        trace(signal.target, signal.target.normalSkin!=null?signal.target.normalSkinId:"");
    }

    private function selectHandler(p_element:GUIElement):Void {
        ui.invalidate();
        rectGizmo.setElement(p_element);
        anchorGizmo.setElement(p_element);
    }
}