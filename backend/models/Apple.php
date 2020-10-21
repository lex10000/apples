<?php
declare(strict_types=1);

namespace backend\models;

use Yii;
use yii\base\Exception;

/**
 * ActiveRecord модель таблицы.
 * @property int $id
 * @property int $created_at время, когда яблоко созрело на дереве
 * @property int|null $dropped_at время, когда яблоко упало с дерева
 * @property string $color цвет яблока
 * @property int|null $status статус (на дереве - 0, упало - 1, сгнило - 2)
 * @property int|null $percent Процент откушенной части яблока
 */
class Apple extends \yii\db\ActiveRecord
{
    const STATUS_NOT_PICKED = 0;
    const STATUS_PICKED = 1;
    const STATUS_ROTTEN = 2;

    const MESSAGE_STATUS_EATEN = 10;
    const MESSAGE_STATUS_OVERHEAD = 9;
    const MESSAGE_STATUS_NOT_FOUND = 8;
    const MESSAGE_STATUS_EATED_PARTIAL = 7;

    /**
     * @var string[]
     */
    private $colors;

    public function __construct($config = [])
    {
        $this->colors = ['green', 'red', 'yellow', 'orange'];
        parent::__construct($config);
    }

    public static function tableName()
    {
        return 'apple';
    }

    public function rules()
    {
        return [
            ['percent', 'integer', 'max' => 1, 'min' => 0.1],
        ];
    }

    /**
     * Создание яблока. Цвет выбирается рандомно из массива, время созревания тоже рандомное.
     * @return array
     */
    public function generateApple(): array
    {
        $this->color = $this->colors[array_rand($this->colors)];
        $this->created_at = mt_rand(1, time());
        $this->status = 0;
        $this->percent = 0;
        $this->save(false);
        return $this->toArray();
    }

    public static function getApples(): ?array
    {
        return self::find()->asArray()->all();
    }

    public function pick(int $apple_id):?int
    {
        $apple = self::findOne($apple_id);
        if ($apple) {
            $apple->status = self::STATUS_PICKED;
            $apple->dropped_at = time();
            $apple->save(false);
            return intval($apple->dropped_at);
        } else return null;
    }

    public function eatApple(int $apple_id, float $percent): int
    {
        $apple = self::findOne($apple_id);

        if ($apple) {
            if ($apple->status == self::STATUS_NOT_PICKED) {
                return self::STATUS_NOT_PICKED;
            }
            if ((time() - $apple->dropped_at) < 60) {
                if ($this->validate($percent)) {
                    $apple->percent = intval($apple->percent + $percent * 100);
                    if ($apple->percent == 100) {
                        $apple->delete();
                        return self::MESSAGE_STATUS_EATEN;
                    } elseif ($apple->percent > 100) {
                        return self::MESSAGE_STATUS_OVERHEAD;
                    } else {
                        $apple->save(false);
                        return self::MESSAGE_STATUS_EATED_PARTIAL;
                    }
                }
            } else {
                return self::STATUS_ROTTEN;
            }
        } else return self::MESSAGE_STATUS_NOT_FOUND;
    }

    public function markAsRotten(int $apple_id) :bool
    {
        $apple = self::findOne($apple_id);
        if ($apple) {
            $apple->status = self::STATUS_ROTTEN;
            return $apple->save(false);
        } else return false;
    }
}
