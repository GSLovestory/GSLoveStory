<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invite</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
    <form action="/invite/" class="m-3">
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" name="name" placeholder="Invitation Name" value="<?php echo @$_GET['name']; ?>">
        </div>

        <?php
            if ($_GET['name']) {
                $inputContent = file_get_contents('../template/message.txt');
                
                $link = "https://gslovestory.github.io/?key=".base64_encode($_GET['name']);

                $newTemplate = str_replace("[LINK]", $link, $inputContent);
                $newTemplate = str_replace("[NAMA]", @$_GET['name'], $newTemplate);
        ?>
                <textarea class="form-control mb-3" name="message" id="message" rows="25">
                    <?php echo $newTemplate; ?>
                </textarea>
        <?php 
            }
        ?>

        <?php if (!$_GET['name']) {?>
        <div>
            <button class="btn btn-success">Submit</button>
        </div>
        <?php } else { ?>
            <div>
                <button type="button" class="btn btn-danger" onclick="location.href='/invite/';">Reset</button>
                <button type="button" class="btn btn-success" onclick="copyToClipboard()">Copy</button>
            </div>
        <?php } ?>
    </form>
</body>
<script>
    function copyToClipboard() {
        // Select the textarea
        var textarea = document.getElementById("message");
        
        // Select its content
        textarea.select();
        
        // Copy the selected content
        document.execCommand("copy");
        
        // Deselect the textarea
        textarea.setSelectionRange(0, 0);
        
        // Alert the user
        alert("Text copied to clipboard!");
    }
</script>
</html>