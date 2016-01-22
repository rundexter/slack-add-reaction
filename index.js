var util = require('./util.js'),
    _ = require('lodash'),
    SlackClient = require('slack-node');

var pickInputs = {
        'name': 'name',
        'file': 'file',
        'file_comment': 'file_comment',
        'channel': 'channel',
        'timestamp': 'timestamp'
    },
    pickOutputs = {
        'ok': 'ok'
    };

module.exports = {
    /**
     * Allows the authenticating users to follow the user specified in the ID parameter.
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var inputs = util.pickInputs(step, pickInputs),
            validateErrors = util.checkValidateErrors(inputs, pickInputs),
            token = dexter.provider('slack').credentials('access_token'),
            slack = new SlackClient(token);

        if (validateErrors)
            return this.fail(validateErrors);

        // Follow befriended
        slack.api('reactions.add', _.omit(params, 'token'), function (error, data) {
            if (error)
                this.fail(error);
            else
                this.complete(util.pickOutputs(data, pickOutputs));
        }.bind(this));
    }
};
