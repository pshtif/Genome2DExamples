package examples.basic;
import com.genome2d.components.renderables.GMovieClip;
import com.genome2d.node.factory.GNodeFactory;
import com.genome2d.textures.factories.GTextureAtlasFactory;
import com.genome2d.Genome2D;
import com.genome2d.context.GContextConfig;
import com.genome2d.textures.GTextureAtlas;
import com.genome2d.assets.GAssetManager;

class BasicExample2MovieClip {
    static public function main() {
        var inst = new BasicExample2MovieClip();
    }

    private var _assetManager:GAssetManager;

    public function new() {
        initGenome();
    }

    private function initGenome():Void {
        trace("initGenome");

        Genome2D.getInstance().onInitialized.add(genomeInitializedHandler);
        Genome2D.getInstance().init(new GContextConfig());
    }

    private function genomeInitializedHandler():Void {
        trace("genomeInitializedHandler");

        initAssets();
    }

    private function initAssets():Void {
        trace("initAssets");

        _assetManager = new GAssetManager();
        _assetManager.addUrl("atlas_gfx", "atlas.png");
        _assetManager.addUrl("atlas_xml", "atlas.xml");
        _assetManager.onAllLoaded.add(assetsInitializedHandler);
        _assetManager.load();
    }

    private function assetsInitializedHandler():Void {
        trace("assetsInitializedHandler");

        initExample();
    }

    private function initExample():Void {
        trace("initExample");

        GTextureAtlasFactory.createFromAssets("atlas", cast _assetManager.getAssetById("atlas_gfx"), cast _assetManager.getAssetById("atlas_xml"));

        var clip:GMovieClip;

        clip = createMovieClip(300,200, ["atlas_1","atlas_2","atlas_3","atlas_4","atlas_5","atlas_6","atlas_7"]);

        clip = createMovieClip(500,200, ["atlas_1","atlas_2","atlas_3","atlas_4","atlas_5","atlas_6","atlas_7"]);
        clip.node.transform.setScale(2,2);

        clip = createMovieClip(300,400, ["atlas_1","atlas_2","atlas_3","atlas_4","atlas_5","atlas_6","atlas_7"]);
        clip.node.transform.rotation = 0.753;

        clip = createMovieClip(500,400, ["atlas_1","atlas_2","atlas_3","atlas_4","atlas_5","atlas_6","atlas_7"]);
        clip.node.transform.rotation = 0.753;
        clip.node.transform.setScale(2,2);

        clip = createMovieClip(300,300, ["atlas_1","atlas_2","atlas_3","atlas_4","atlas_5","atlas_6","atlas_7"]);
        clip.node.transform.alpha = .5;

        clip = createMovieClip(500,300, ["atlas_1","atlas_2","atlas_3","atlas_4","atlas_5","atlas_6","atlas_7"]);
        clip.node.transform.color = 0x00FF00;
    }

    private function createMovieClip(p_x:Float, p_y:Float, p_frames:Array<String>):GMovieClip {
        var clip:GMovieClip = cast GNodeFactory.createNodeWithComponent(GMovieClip);
        clip.frameRate = 10;
        clip.frameTextureIds = p_frames;
        clip.node.transform.setPosition(p_x, p_y);
        Genome2D.getInstance().root.addChild(clip.node);
        return clip;
    }
}