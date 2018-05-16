const initialState = {
	names: [
		{
			name: "Loading..."
		}
	],
	sortDirection: "A-Z",
	inputValue: "",
	searchResults: []
};

const reducerInformation = (state = initialState, action) => {
    switch(action.type){
		case "LIST_PEOPLE_RECEIVED":
			if(action.errorMessage === ""){
				let _names = action.payload.map((payload) => {
					return {name: payload.name}
				});

				state = {
					...state,
					names: _names
				}
			} else {
				console.log("ERROR Retrieving data from API: " + action.errorMessage);
				return [{name: "Error loading data"}];
			}

			break;

		case "SEARCH_INPUT_CHANGED":
			state = {
				...state,
				inputValue: action.payload
			}
			break;

		case "LIST_PEOPLE_SORT":
			if(state.sortDirection === "A-Z"){
				state = {
					...state,
					names: state.names.sort(sort_az),
					sortDirection: "Z-A"
				}
			} else {
				state = {
					...state,
					names: state.names.sort(sort_za),
					sortDirection: "A-Z"
				}
			}
			break;

		case "LIST_PEOPLE_SEARCH":
			let resultsFound = [];
			let stateNames = state.names.map((person) => {
				if(person.name.includes(state.inputValue)){
					resultsFound.push({
						name: person.name
					});
				}
			});

			console.log("resultsFound", resultsFound);

			let _names = resultsFound.map((payload) => {
				return {name: payload.name}
			});

			state = {
				...state,
				searchResults: _names
			}
			break;

		default:
			break;
    }

    return state;
};

function sort_az(a, b){
	if(a.name < b.name){
		return -1;
	}

	if(a.name > b.name){
		return 1;
	}

	return 0;
}

function sort_za(a, b){
	if(a.name > b.name){
		return -1;
	}

	if(a.name < b.name){
		return 1;
	}

	return 0;
}

export default reducerInformation;
