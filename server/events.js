Events = new Mongo.Collection("events");

Meteor.startup(function () {
    if (Events.find().count() === 0) {
        var events = [
            {
                'name': 'Apero time !',
                'description': 'Can we please just drink one beer ?'
            },{
                'name': 'Restaurant time !',
                'description': 'Can we have some glass of wine ??'
            },{
                'name': 'Blabla event',
                'description': 'Bla bla event can be everywhere if we can have some good beers.'
            },{
                'name': 'Apero time again ',
                'description': 'Often come after a first apero time and a nice restaurant.'
            },{
                'name': 'Dancing Event',
                'description': 'You can be ready to dance on the table my lord !!'
            },{
                'name': 'End event ?',
                'description': 'It can never be stopped !!!'
            },{
                'name': 'After event',
                'description': 'Only the brave ! Diesel.'
            }

        ];

        for (var i = 0; i < events.length; i++) {
            Events.insert(events[i]);
        }
    }
});

