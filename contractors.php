<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Home Server Form</title>

        <link rel="stylesheet" href="public/css/app.css">
    </head>
    <body>
    <?php 
        if (isset($errors)) {
            /* error messages */
            foreach ($errors as $error) {
                echo '<div class="alert alert-danger alert-dismissible fade show">'.$error->message.'
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>';
            }
        }
    ?>

    <?php 
        if (isset($success)) {
            /* success message */
            echo '<div class="alert alert-success alert-dismissible fade show">'.$success.'
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>';
        }
    ?>
    <div class="card">
        <div class="card-header">Contact form</div>
    </div>
    <div class="card-body">
        <form method="POST" action="contractors" >
            <div class="form-group">
                <div class="row">
                    <div class="col">
                        <label for="name">Name</label>
                        <input type="text" name="name" id="name" class="form-control" value="<?php echo $old->name; ?>">
                    </div>
                    <div class="col">
                    <label for="company">Company</label>
                        <input type="text" name="company" id="company" class="form-control" value="<?php echo $old->company; ?>">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col">
                        <label for="phone">Phone</label>
                        <input type="number" name="phone" id="phone" class="form-control" value="<?php echo $old->phone; ?>">
                    </div>
                    <div class="col">
                        <label for="email">E-mail</label>
                        <input type="text" name="email" id="email" class="form-control" value="<?php echo $old->email; ?>">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col">
                        <label for="address">Address</label>
                        <input type="text" name="address" id="address" class="form-control"  value="<?php echo $old->address; ?>">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col">
                        <label for="categories_div">Categories</label>
                        <div class="card" id="categories_div">
                            <div class="card-body">
                                <?php 
                                    foreach($categories as $category) {
                                        echo '<div class="custom-control custom-checkbox custom-control-inline">';
                                        echo '<input type="checkbox" id="categories" name="categories[]" class="custom-control-input" value="'.$category->uuid.'">';
                                        echo '<label class="custom-control-label" for="categories">'.$category->category.'</label>';
                                        echo '</div>';
                                    }
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <button type="submit" name="submit" class="btn btn-success float-right">Send</button>
            </div>
        </form>
    </div>
    </body>
    <script>
            function enableAddressAutocomplete() {
                var autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'));
            }
    </script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAXEKDJ6apFhd92r8DaBoNuFru26-8aR_I&libraries=places&callback=enableAddressAutocomplete"></script>
</html>