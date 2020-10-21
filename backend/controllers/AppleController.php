<?php
namespace backend\controllers;
use backend\models\Apple;
use Yii;
use yii\web\BadRequestHttpException;
use yii\web\Controller;

class AppleController extends Controller
{
    /**
     * Генерация случайных яблок. (только если post-запрос)
     * @return \yii\web\Response массив с яблоками (10 штук)
     * @throws BadRequestHttpException
     */
    public function actionGenerate()
    {
        if(Yii::$app->request->isPost) {
            $apples = [];
            for ($i=0;$i<5;$i++) {
                $apple = new Apple();
                $apples[$i] = $apple->generateApple();
            }

            return $this->asJson([
                'apples' => $apples
            ]);
        } else throw new BadRequestHttpException('ошибка в запросе');
    }

    /**
     * Получить все яблоки из базы
     * @return \yii\web\Response
     */
    public function actionGetApples()
    {
        return $this->asJson([
            'status' => 'success',
            'apples' => Apple::getApples()
        ]);
    }

    /**
     * Сорвать яблоко с дерева
     * @return \yii\web\Response
     */
    public function actionPickApple()
    {
        $apple_id = intval(Yii::$app->request->post('id'));
        $apple = new Apple();
        if($dropped_at = $apple->pick($apple_id)) {
            return $this->asJson([
                'status' => 'success',
                'dropped_at' => $dropped_at
            ]);
        }
    }

    /**
     * Съесть яблоко.
     * @return \yii\web\Response статус работы метода eatApple из модели (вся логика едьбы находится там).
     */
    public function actionEatApple()
    {
        $apple_id = intval(Yii::$app->request->post('id'));
        $percent = doubleval(Yii::$app->request->post('percent'));
        $apple = new Apple();
        $status = $apple->eatApple($apple_id,$percent);
        return $this->asJson([
            'status' => $status
        ]);
    }

    /**
     * Удалить яблоко из таблицы (когда полностью съедено)
     * @return \yii\web\Response
     * @throws \Throwable
     * @throws \yii\db\StaleObjectException
     */
    public function actionDeleteApple()
    {
        $apple_id = intval(Yii::$app->request->post('id'));
        $apple = Apple::findOne($apple_id);
        if($apple) {
            if($apple->delete()) {
                return $this->asJson([
                    'status' => 'success'
                ]);
            }
        }
    }

    /**
     * Пометить яблоко как испорченное
     * @return \yii\web\Response
     */
    public function actionMarkAsRotten()
    {
        $apple_id = intval(Yii::$app->request->post('id'));
        if((new Apple())->markAsRotten($apple_id)) {
            return $this->asJson([
                'status' => 'success'
            ]);
        }
    }
}