import requireContext from 'require-context.macro';

exports.loadMessagesFiles = function() {
    return requireContext('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
}
