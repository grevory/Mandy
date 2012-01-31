(function( $ ) {
// Establish jQuery
var jQ = jQuery;
jQ.fn.mandatory = function() {
    
    // Configure the default values of the plugin
    // fields: A list of mandatory fields that will be validated for values
    // debug: Whether or not the failed validations should be outputted as JS errors
    var config = {
        fields: {},
        message: 'This field is mandatory.',
        debug: true
    };

    // Save 'this' as a local var to make it easy to manipulate for later without affecting the chain
    var $this = this;
    // Shortcut this method
    var mand = jQ.fn.mandatory;
    // Store the arguments as "a"
    var a = arguments;
    //console.log('Arguments',a);
    // Establish the options var for handling options set by the developer
    var options = {};
    // The combined settings of config and deveoper assigned settings
    var s;
    // Form fields
    var ff = ['input', 'select', 'textarea'];
    
    mand.settings = jQ.extend(mand.settings, config);
    
    // Mandatory is only executed when the form it is set up on is submitted
    $this.submit(function(){
    
        if (a.length==1 && typeof a[0] == "object")
            options = a[0];
        
        //log('split:',a[0].split(','));
        // Handle a list of fields by default
        if (typeof a[0] == "string")
        {
            options.fields = {};
            var f = (a.length==1 ? a[0].split(',') : a);
            options.fields = mand.a2o(f);
        }
        
        //mand.log('Config',config);
        //mand.log('Options',options);
        s = mand.settings = jQ.extend(config, options);// = mand.settings
        
        //mand.log('mand.count(s.fields): '+mand.count(s.fields));
        var fd = [];
        if (mand.count(s.fields) < 1)
        {
            var ffs = ff.join();
            //mand.log('ffs',ffs);
            jQ(ffs,$this).each(function(i,v){
                //log('Field '+i,v.name);
                fd.push(v.name);
            });
            //log('fd:',fd);
            //log('array_to_object(fd): ',a2o(fd));
            s.fields = mand.a2o(fd);
        }
        mand.log('Mandatory fields for this form:');
            //mand.log('s.fields: ',s.fields);
        for (var fid in s.fields)
        {
            
            // Set the selector for each field that is mandatory
            var sel = '';
            for (var i = 0; i<ff.length; i++)
            {
                if (ff[i]==s.fields[fid])
                {
                    info('You named one of you\'re fields "'+ff[i]+'"? You\'re silly.');
                    log('I\'m going to asssume you wanted to set all '+ff[i]+' fields as mandatory. If you only want the field named "'+ff[i]+'" enter the name with a period preceeding. Like this:');
                    log('".'+ff[i]+'"');
                    sel = ff[i];
                }
            }
            if (sel.length===0) sel='[name='+s.fields[fid]+']';
            
            // Assign the mandatory tag
            var mt = $(sel,$this).get(0);
            // Assign the name of that tag
            var n = mt.tagName;
            log('<'+n+'> '+s.fields[fid]);
            if (!s.debug)
                console.log('Debug is off but the field that is mandatory is "<'+n+'> '+s.fields[fid]+'"');
        }    
        return false;
    }); // End submit
    
    // Shortcut for the log method
    function log(m,o) { mand.log(m,o); }
     // Shortcut for the error method
    function error(m,o) { mand.error(m,o); }
     // Shortcut for the info method
    function info(m,o) { mand.info(m,o); }
    
    return this;

};

jQ.fn.mandatory.settings = {};

// Log messages in the console
jQ.fn.mandatory.log = function (m,obj) {
    // Only display logs if it is turned on in the config and the console.log exists
    if (jQ.fn.mandatory.settings.debug && window.console && window.console.log)
    {
        // Display errors
        if (window.console.error && obj=="e")
            return window.console.error(m);
        // Display info
        if (window.console.info && obj=="i")
            return window.console.info(m);
        // Display warnings
        if (window.console.warning && obj=="w")
            return window.console.info(m);
        if (typeof obj == "object") return window.console.log(m,obj);
        var prep = '';
        if (obj=="e") prep="ERROR: "; else if (obj=="w") prep="WARNING: "; else if (obj=="i") prep="INFO: ";
        window.console.log(prep+m);
    }
};
   
// Count the number of keys in an object
jQ.fn.mandatory.count = function ($obj) {
    //console.log('count($obj)',$obj);
    //console.log('Object.keys($obj).length',Object.keys($obj).length);
    return Object.keys($obj).length;
};

// Array to Object - Converts an array variable to an object variable
jQ.fn.mandatory.a2o = function (arr)
{
    var r = {}; for (var i=0; i<arr.length; i++) r[i]=arr[i];
    return r;
};

// Shortcut for debugging errors
jQ.fn.mandatory.error = function (m) { jQ.fn.mandatory.log(m,'e'); };
// Shortcut for debugging info
jQ.fn.mandatory.info = function (m) { jQ.fn.mandatory.log(m,'i'); };
// Shortcut for debugging warnings
jQ.fn.mandatory.warn = function (m) { jQ.fn.mandatory.log(m,'w'); };

// Pet name for mandatory = Mandy ;)
jQ.fn.Mandy = jQ.fn.mandatory;
})( jQuery );