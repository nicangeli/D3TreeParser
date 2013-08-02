function Parser() {
	this.build_paths = function(lines) {
		var holder = [];
		
		lines.forEach(function(line) {
			var stack = [];
			var indent = line.match(/-/g) == null ? 0 : line.match(/-/g).length;
			stack[indent] = line.substr(indent);
			stack.splice(indent+1, stack.length);
			//console.log(stack);
			holder.push(stack);
		})
		return holder;
	}

	this.build_tree = function(paths) {
		var current_at_depth = [];
		var root;
		var previousLength = 1; 
		for(var i = 0; i < paths.length; i++) {

			if(paths[i].length == 1) { // this is the root node
				var details = paths[i][0].split("|");
				root = {name: details[0], title: details[1], wte: details[2], children: []}
				current_at_depth[0] = root;
				previousLength = 1;
			} else {
				var currentLength = paths[i].length;
				var parent = current_at_depth[currentLength-2];
				var full = paths[i][currentLength-1].split("|");
				var tmp = {name: full[0], title: full[1], wte: details[2], children: []};
				parent.children.push(tmp);
				current_at_depth[currentLength-1] = tmp;
				previousLength = currentLength;
			}
		}
		return root; 
	}

	this.clear_empty = function(data) {
    for (var key in data) {
        var item = data[key];
        // see if this item is an array
        if (Array.isArray(item)) {
            // see if the array is empty
            if (item.length == 0) {
                // remove this item from the parent object
                delete data[key];
            }
        // if this item is an object, then recurse into it 
        // to remove empty arrays in it too
        } else if (typeof item == "object") {
            clear_empty(item);
        }
    }
    return data;    
	}
}