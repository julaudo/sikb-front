import requireContext from "require-context.macro";


const rc = function(path, deep, filter) {
    return requireContext(path, deep, filter);
}

exports.requireContext2 = rc;