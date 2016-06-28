<html>
<body>
<?php

    if (isset($_POST["submit"])) {
        $user = $_POST["user"];
        $pass = $_POST["pass"];
        if ($_POST["user"] == $_COOKIE["user"]) {
            echo "Username has been used!";
        } else {
            setcookie("user", $user, time() + 3000);
            setcookie("pass", $pass, time() + 3000);
            echo "Register Successed";
        }
    }
?>
</body>
</html>