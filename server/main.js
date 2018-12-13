import { Meteor } from 'meteor/meteor';
import '../imports/git/git_methods'

const updateCall = function() {
  Meteor.call('updatePipeLines')

}

Meteor.startup(() => {
  Meteor.setInterval(updateCall, 60000);
});
