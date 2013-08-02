var build_paths = function(lines) {
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



/*
	Algorithm for inserting
	1) Loop over all paths
	2) If path length = 1, add root
	3) Find parent node
	4) add child
*/

var build_tree = function(paths) {
	var current_at_depth = [];
	var root;
	var previousLength = 1; 
	for(var i = 0; i < paths.length; i++) {
		if(paths[i].length == 1) { // this is the root node
			root = {name: paths[i][0], children: []}
			current_at_depth[0] = root;
			previousLength = 1;
		} else {
			//for(var j = 0; j < paths[i].length; i++) {
				var currentLength = paths[i].length;
				//if(previousLength < currentLength) { // are we adding a child?
					var parent = current_at_depth[currentLength-2];
					var tmp = {name: paths[i][currentLength-1], children: []};
					parent.children.push(tmp);
					current_at_depth[currentLength-1] = tmp;
					previousLength = currentLength;
				//} else if(previousLength == currentLength) {

				//	previousLength = currentLength;
				//}
			//}
			//previousLength = paths[i].length;
		}
	}
	return root; 
}



var string = 	
"ROOT \
-NODE1 \
--NODE2 \
---NODE3 \
----NODE4 \
-NODE5 \
-NODE6 \
--NODE7 \
---NODE8 \
--NODE9\
";


var fragments = build_paths(string.split(" "));
var tree_data = build_tree(fragments)
