package;

/**
 * ...
 * @author ...
 */
class Examples
{
	static public function main() {
        var inst = new Examples();
    }

    /**
        Genome2D singleton instance
     **/
    private var genome:Genome2D;

    public function new() {
        initGenome();
    }

    /**
        Initialize Genome2D
     **/
    private function initGenome():Void {
        genome = Genome2D.getInstance();
		genome.onFailed.addOnce(genomeFailed_handler);
        genome.onInitialized.addOnce(genomeInitialized_handler);
        genome.init(new GContextConfig());
    }

	/**
        Genome2D failed handler
     **/
    private function genomeFailed_handler(p_msg:String):Void {
        // Here we can check why Genome2D initialization failed
    }
	
    /**
        Genome2D initialized handler
     **/
    private function genomeInitialized_handler():Void {
        loadAssets();
    }
	
	/**	
	 * 	Asset loading
	 */
	private function loadAssets():Void {
		GAssetManager.addFromUrl("atlas.png");
        GAssetManager.addFromUrl("atlas.xml");
		GAssetManager.addFromUrl("texture.png");
		GAssetManager.onQueueFailed.add(assetsFailed_handler);
        GAssetManager.onQueueLoaded.addOnce(assetsLoaded_handler);
        GAssetManager.loadQueue();
	}
	
	/**
	 * 	Asset loading failed
	 */
	private function assetsFailed(p_asset:GAsset):Void {
		// Asset loading failed at p_asset
	}
	
	/**
	 * 	Asset loading completed
	 */
	private function assetsLoaded_handler():Void {
		// Loading of assets was succesfull so we can do our stuff
	}	
}