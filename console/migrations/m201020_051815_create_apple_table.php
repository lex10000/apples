<?php

use yii\db\Migration;


class m201020_051815_create_apple_table extends Migration
{

    public function safeUp()
    {
        $this->createTable('{{%apple}}', [
            'id' => $this->primaryKey(),
            'created_at' => $this->integer()->notNull()->comment('время, когда яблоко созрело на дереве'),
            'dropped_at' => $this->integer()->comment('время, когда яблоко упало с дерева'),
            'color' => $this->string(100)->notNull()->defaultValue('green')->comment('цвет яблока'),
            'status' => $this->smallInteger()->defaultValue(0)->comment('статус (на дереве - 0, упало - 1, 2 - испорчено)'),
            'percent' => $this->integer()->defaultValue(0)->comment('Процент откушенной части яблока')
        ]);
    }

    public function safeDown()
    {
        $this->dropTable('{{%apple}}');
    }
}
