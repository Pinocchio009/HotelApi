const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("guest")
 .readOwn("profile")
 .updateOwn("profile")
 
 
ac.grant("admin")
 .extend("guest")
 .updateAny("profile")
 .deleteAny("profile")
 
return ac;
})();