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
    const STATUS_EATEN = 'eaten';
    const STATUS_OVERHEAD= 'overhead';
    const STATUS_NOT_PICKED = 'not picked';
    const STATUS_NOT_FOUND = 'not found';
    const STATUS_EATED_PARTIAL = 'eated partial';
    public array $colors = ['green', 'red', 'yellow', 'orange'];

    public static function tableName()
    {
        return 'apple';
    }

    public function rules()
    {
        return [
            ['percent', 'integer', 'max' => 1, 'min'=> 0.1],
        ];
    }

    public function generateApple() :array
    {
       $this->color = $this->colors[array_rand($this->colors)];
       $this->created_at = mt_rand(1, time());
       $this->status = 0;
       $this->percent = 0;
       $this->save(false);
       return $this->toArray();
    }

    public static function getApples() :?array
    {
        return self::find()->asArray()->all();
    }

    public function pick(int $apple_id) :bool
    {
        $apple = self::findOne($apple_id);
        if($apple) {
            $apple->status = 1;
            $apple->dropped_at = time();
            return $apple->save(false);
        } else return false;
    }

    public function eatApple(int $apple_id, float $percent) :string
    {
        $apple = self::findOne($apple_id);
        if($apple) {
            if($apple->status==0) {
                return self::STATUS_NOT_PICKED;
            }
            if($this->validate($percent)) {
                $apple->percent = intval($apple->percent + $percent*100);
                if($apple->percent == 100) {
                    $apple->delete();
                    return self::STATUS_EATEN;
                } elseif ($apple->percent > 100) {
                    return self::STATUS_OVERHEAD;
                }
                else {
                    $apple->save(false);
                    return self::STATUS_EATED_PARTIAL;
                }
            }

        } else return self::STATUS_NOT_FOUND;
    }
}
