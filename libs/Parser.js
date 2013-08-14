

function Parser() {

	var self = this;

	this.build_paths = function(lines) {
		var holder = [];
		lines.forEach(function(line) {
			var stack = [];
			var indent = self.get_indent(line);
			stack[indent] = line.substr(indent);
			stack.splice(indent+1, stack.length);
			//console.log(stack);
			holder.push(stack);
		})
		return holder;
	}

	this.get_indent = function(string) {
		var indent = 0;
		for(var i = 0; i < string.length; i++) {
			var character = string[i];
			if(character == '-') {
				indent++;
			} else {
				break;
			}
		}
		return indent;
	}


	this.build_tree = function(paths) {
		var current_at_depth = [];
		var root;
		var previousLength = 1; 
		for(var i = 0; i < paths.length; i++) {

			if(paths[i].length == 1) { // this is the root node
				console.log('i should only be called once');
				var details = paths[i][0].split("|");
				root = {name: details[0], title: details[1], wte: details[2], children: []}
				current_at_depth[0] = root;
				previousLength = 1;
			} else {
				var currentLength = paths[i].length;
				var parent = current_at_depth[currentLength-2];
				var full = paths[i][currentLength-1].split("|");
				var tmp = {name: full[0], title: full[1], wte: full[2], children: []};
				parent.children.push(tmp);
				current_at_depth[currentLength-1] = tmp;
				previousLength = currentLength;
			}
		}
		return root; 
	}

	this.clear_empty = function(data) {
		data = JSON.stringify(data);
		data = data.replace(/,"children":\[\]/g, '');
		return data;
	}
}