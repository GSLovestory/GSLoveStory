<?php 

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Retrieve data from the POST request
        $message = $_POST["message"];

        $myfile = fopen("message.txt", "w") or die("Unable to open file!");
        fwrite($myfile, $message);
        fclose($myfile);
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Template</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" class="m-3">
        <div class="mb-3">
            <label for="message" class="form-label">Template</label>
            <?php 
                $template = fopen("message.txt", "r") or die("Unable to open file!");
            ?>
            <textarea class="form-control" name="message" rows="30">
                <?php echo fread($template,filesize("message.txt")); ?>
            </textarea>
            <?php fclose($template); ?>
        </div>

        <div>
            <button class="btn btn-success">Submit</button>
        </div>
    </form>
</body>
</html>