<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Mockup form</title>

    <link rel="stylesheet" href="public/css/app.css">
</head>
<body>
    <div class="card">
        <div class="card-header">
            Question Form Title
        </div>
    </div>
    <div class="card-body">
        <div class="form-group">
            <label for="contact_time_div">When would you like to get this done?</label>
            <div class="card" id="contact_time_div">
                <div class="card-body">
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="contact_morning" name="contact_time_preference" class="custom-control-input" value="morning" checked>
                        <label class="custom-control-label" for="contact_morning">I'm flexible</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="contact_afternoon" name="contact_time_preference" class="custom-control-input" value="afternoon">
                        <label class="custom-control-label" for="contact_afternoon">Within 48 hours</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="contact_night" name="contact_time_preference" class="custom-control-input" value="night">
                        <label class="custom-control-label" for="contact_night">Whitin a week</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="month" name="contact_time_preference" class="custom-control-input" value="night">
                        <label class="custom-control-label custom-control-inline" for="month">Whitin a month</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="year" name="contact_time_preference" class="custom-control-input" value="night">
                        <label class="custom-control-label" for="year">Whitin a year</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="obs">Anything else to tell the pros?</label>
            <textarea name="obs" id="obs" cols="30" rows="4" class="form-control"></textarea>
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col">
                    <label for="name">Name</label>
                    <input type="text" name="name" id="name" class="form-control">
                </div>
                <div class="col">
                <label for="last">Last name</label>
                    <input type="text" name="name" id="last" class="form-control">
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="phone">Phone</label>
            <input type="text" name="" id="phone" class="form-control">
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <input type="text" name="" id="email" class="form-control">
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col">
                    <label for="address">Address</label>
                    <input type="text" name="" id="address" class="form-control">
                </div>
            </div>
            <div class="row">
                <div class="col col-sm-8">
                    <label for="city">City</label>
                    <input type="text" name="" id="city" class="form-control">
                </div>
                <div class="col col-sm-2">
                    <label for="state">State</label>
                    <input type="text" name="" id="state" class="form-control">
                </div>
                <div class="col col-sm-2">
                    <label for="zip">Zip</label>
                    <input type="text" name="" id="zip" class="form-control">
                </div>
            </div>
        </div>
    </div>
</body>
</html>