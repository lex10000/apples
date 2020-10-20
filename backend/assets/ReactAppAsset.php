<?php

namespace backend\assets;

use yii\web\AssetBundle;

/**
 * Main frontend application asset bundle.
 */
class ReactAppAsset extends AssetBundle
{
    public $css = [
    ];
    public $js = [
        'js/app.js'
    ];
    public $depends = [
        'backend\assets\ReactAsset'
    ];
    public $jsOptions = [
      'type' => 'module'
    ];
}
