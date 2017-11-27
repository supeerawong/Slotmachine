<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style>
            table, th, td {
                border: 3px solid black;
                border-collapse: collapse;
            }
               
                
        </style>
    </head>
    <body>
        <?php
            $submitbutton= $_POST['submit'];
            $KAsset = "<img src=\"img/KAsset.gif\" alt=\"KAsset\" width=100% height=100%/>";
            $krungsri = "<img src=\"img/krungsri.gif\" alt=\"krungsri\" width=100% height=100%/>";
            $KTAM = "<img src=\"img/KTAM.gif\" alt=\"KTAM\" width=100% height=100%/>";
            $CLF= "<img src=\"img/CLF.gif\" alt=\"CLF\" width=100% height=100%/>";
            $faces = array ($KAsset,$krungsri,$KTAM,$CLF);
            $payouts = array (
            $KAsset.'|'.$KAsset.'|'.$KAsset,
            $krungsri.'|'.$krungsri.'|'.$krungsri ,
            $KTAM.'|'.$KTAM.'|'.$KTAM ,
            $CLF.'|'.$CLF.'|'.$CLF ,
            );
            $wheel1 = array();
            foreach ($faces as $face) {
                $wheel1[] = $face;
            }
            $wheel2 = array_reverse($wheel1);
            $wheel3 = $wheel1;
            $result1 = $wheel1[rand(count($wheel1), 10*count($wheel1)) % count($wheel1)];
            $result2 = $wheel2[rand(count($wheel2), 10*count($wheel2)) % count($wheel2)];
            $result3 = $wheel3[rand(count($wheel3), 10*count($wheel3)) % count($wheel3)];
            //IncreaseClickCountWhenClickRandomButton
            if( isset($_POST['submit']) ) { 
                incrementClickCount();
            }
            //GetClickCount
            function getClickCount(){
                return (int)file_get_contents("clickcount.txt");
            }
            //IncreaseClickCount
            function incrementClickCount(){
                $count = getClickCount() + 1;
                file_put_contents("clickcount.txt", $count);
            }
        ?>
    <form action="" method="POST">
    <br><center>Random Success<br><br>
    <?php 
        if ($submitbutton){
            //Congratulation when you are lucky!!!
            if (isset($payouts[$result1.'|'.$result2.'|'.$result3])){
                echo '<table width=90% bgcolor="DodgerBlue"><tr><th>'.$result1.'</th><th>'.$result2.'</th><th>'.$result3.'</th></tr></table>';
                //echo $result1.' || '.$result2.' || '.$result3.'<br>';
                echo '<h1 style="border: 5px solid Tomato;">Congratulation</h1>';
                echo '<img src=\'img/gif_firework.gif\' height=\'300\' width=\'400\'>';
                file_put_contents("clickcount.txt", 0);
            }
            //Congratulation when you are not lucky! 
            else if(getClickCount() == 7){
                $result1 = $wheel1[rand(count($wheel1), 10*count($wheel1)) % count($wheel1)];
                $result2 = $result1;
                $result3 = $result1;
                echo '<table width=90% bgcolor="DodgerBlue"><tr><th>'.$result1.'</th><th>'.$result2.'</th><th>'.$result3.'</th></tr></table>';
                //echo $result1.' || '.$result2.' || '.$result3.'<br>';
                echo '<h1 style="border: 5px solid Tomato;">Congratulation</h1>';
                echo '<img src=\'img/gif_firework.gif\' height=\'300\' width=\'400\'>';
                file_put_contents("clickcount.txt", 0);
            }
            //Not Congratulation
            else{
                echo '<table width=90% bgcolor="DodgerBlue"><tr><th>'.$result1.'</th><th>'.$result2.'</th><th>'.$result3.'</th></tr></table>';
                //echo $result1.' || '.$result2.' || '.$result3.'<br>';
                echo '<h1 style="border: 5px solid Violet;">Try Again</h1>';
                echo '<img src=\'img/gif_cry.gif\' height=\'300\' width=\'400\'>';
            }
        }
    ?>
<br><br><input type="submit" name="submit" value="Random"/><br><br></center>
</form>
    </body>
</html>
