<?php

/* @var $this yii\web\View */
/* @var $apples array */

$this->title = 'My Yii Application';
?>
<div class="site-index">
    <?if(isset($apples)): ?>
        <div class="tree">
            <? foreach ($apples as $apple): ?>
                <ul style="display: flex">
                    <li><?= $apple['image'] ?></li>
                    <a href="">Сорвать яблоко</a>
                    <a href="">Съесть яблоко</a>
                </ul>
            <?endforeach; ?>
        </div>
    <?else: ?>

    <? endif; ?>
</div>
