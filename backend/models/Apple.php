<?php
declare(strict_types=1);
namespace backend\models;

use Yii;
use yii\base\Exception;

/**
 * This is the model class for table "apple".
 *
 * @property int $id
 * @property int $created_at время, когда яблоко созрело на дереве
 * @property int|null $dropped_at время, когда яблоко упало с дерева
 * @property string $color цвет яблока
 * @property int|null $status статус (на дереве - 0, упало - 1
 * @property int|null $percent Процент откушенной части яблока
 */
class Apple extends \yii\db\ActiveRecord
{
    public static function tableName()
    {
        return 'apple';
    }

    public function rules()
    {
        return [
            [['created_at'], 'required'],
            [['created_at', 'dropped_at', 'status'], 'integer'],
            [['color'], 'string', 'max' => 100],
            ['percent', 'integer', 'max' => 100, 'min'=> 0],
        ];
    }
}
