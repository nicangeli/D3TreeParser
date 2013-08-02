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
				root = {name: paths[i][0], children: []}
				current_at_depth[0] = root;
				previousLength = 1;
			} else {
				var currentLength = paths[i].length;
				var parent = current_at_depth[currentLength-2];
				var tmp = {name: paths[i][currentLength-1], children: []};
				parent.children.push(tmp);
				current_at_depth[currentLength-1] = tmp;
				previousLength = currentLength;
			}
		}
		return root; 
	}
}