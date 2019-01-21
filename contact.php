<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Contact</title>

    <link rel="stylesheet" href="public/css/app.css">
</head>
<body>
    <div class="card">
        <div class="card-header">Contact form</div>
    </div>
    <div class="card-body">
        <form method="POST" action="contact" >
            <!-- Site UUID to be related with this contact -->
            <input type="hidden" name="site_uuid" value="037bd1ad-5f46-4163-a3a3-e7d3769ae128">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" class="form-control">
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col">
                        <label for="phone">Phone</label>
                        <input type="number" name="phone" id="phone" class="form-control">
                    </div>
                    <div class="col">
                        <label for="email">E-mail</label>
                        <input type="text" name="email" id="email" class="form-control">
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
                                    <input type="radio" id="contact_phone" name="contact_type_preference" class="custom-control-input" value="phone" checked>
                                    <label class="custom-control-label" for="contact_phone">Phone</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline mr-auto">
                                    <input type="radio" id="contact_email" name="contact_type_preference" class="custom-control-input" value="email">
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
                                    <input type="radio" id="contact_morning" name="contact_time_preference" class="custom-control-input" value="morning" checked>
                                    <label class="custom-control-label" for="contact_morning">Morning</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline mr-auto">
                                    <input type="radio" id="contact_afternoon" name="contact_time_preference" class="custom-control-input" value="afternoon">
                                    <label class="custom-control-label" for="contact_afternoon">Afternoon</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline mr-auto">
                                    <input type="radio" id="contact_night" name="contact_time_preference" class="custom-control-input" value="evening">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea name="message" id="message" cols="30" rows="4" class="form-control"></textarea>
            </div>
            <div class="form-group">
                <button type="submit" name="submit" class="btn btn-success float-right">Send</button>
            </div>
        </form>
    </div>
</body>
</html>