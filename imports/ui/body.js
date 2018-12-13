import { Template } from 'meteor/templating';
import { Pipelines } from '/imports/git/git_methods.js'
import './body.html';


Template.pipelines.helpers({
    git_methods() {
        return Pipelines.find().fetch()
    }
})

