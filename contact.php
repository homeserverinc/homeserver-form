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
        <form method="POST" action="contact" >
            <!-- Site UUID to be related with this contact -->
            <input type="hidden" name="site_uuid" value="037bd1ad-5f46-4163-a3a3-e7d3769ae128">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" class="form-control" value="<?php echo $old->name; ?>">
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
                        <label for="contact_preference_div">Contact Preference</label>
                        <div class="card" id="contact_preference_div">
                            <div class="card-body">
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="contact_phone" name="contact_type_preference" class="custom-control-input" value="phone" <?php echo (!isset($old->contact_type_preference)) ? ' checked' : ($old->contact_type_preference == 'phone') ? ' checked' : ''; ?>>
                                    <label class="custom-control-label" for="contact_phone">Phone</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline mr-auto">
                                    <input type="radio" id="contact_email" name="contact_type_preference" class="custom-control-input" value="email" <?php echo ($old->contact_type_preference == 'email') ? ' checked' : ''; ?>>
                                    <label class="custom-control-label" for="contact_email">E-mail</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <label for="contact_time_div">Contact Time</label>
                        <div class="card" id="contact_time_div">
                            <div class="card-body">
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="contact_morning" name="contact_time_preference" class="custom-control-input" value="morning" <?php echo (!isset($old->contact_time_preference)) ? ' checked' : ($old->contact_time_preference == 'morning') ? ' checked' : ''; ?>>
                                    <label class="custom-control-label" for="contact_morning">Morning</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline mr-auto">
                                    <input type="radio" id="contact_afternoon" name="contact_time_preference" class="custom-control-input" value="afternoon" <?php echo ($old->contact_time_preference == 'afternoon') ? ' checked' : ''; ?>>
                                    <label class="custom-control-label" for="contact_afternoon">Afternoon</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline mr-auto">
                                    <input type="radio" id="contact_evening" name="contact_time_preference" class="custom-control-input" value="evening" <?php echo ($old->contact_time_preference == 'evening') ? ' checked' : ''; ?>>
                                    <label class="custom-control-label" for="contact_evening">Evening</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea name="message" id="message" cols="30" rows="4" class="form-control"><?php echo $old->message; ?></textarea>
            </div>
            <div class="form-group">
                <button type="submit" name="submit" class="btn btn-success float-right">Send</button>
            </div>
        </form>
    </div>
    </body>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAXEKDJ6apFhd92r8DaBoNuFru26-8aR_I&libraries=places"></script>
</html>