// Backend api
import {ref, push, set, child, get} from 'firebase/database'
import {database} from './FirebaseConfig'

const emptyNovel = () => {
	return {
		id: "",
		title: "",
		thumbnail: "",
		genre: [""],
		status: "",
		content: [""],
		like: 0,
		view: 0,
		comment_section: ""
	}
}

const pushNovel = (novel) => {
	const novelRef = ref(database, 'novels')

	// This will add a new novel to 'novels' with 'custom_key'
	set(child(novelRef, 'custom_key'), novel)

	// This will add a new novel to 'novels' and Firebase will generate a unique 'push key'
	//push(novelRef, novel)
}

const getNovel = async (id) => {
	const novelRef = ref(database, 'novels/' + id)
	const snapshot = await get(novelRef)
	
    if (snapshot.exists()) {
		const data = snapshot.val();
		return data
	} else {
		console.log('No data available');
		return emptyNovel()
	}
}

// Example:
export const test = () => { 
	let novel = emptyNovel();
	// Change some data
	novel.id = "custom_key"
	novel.title = "hHA"
	pushNovel(novel);

	getNovel("custom_key")
	.then((novelData) => {
		// In here we should check if novelData is not empty
		// then we can return a novel card parsing in the novelData
		
		/*
		if (novelData != emptyNovel())
			return <NovelCard data={novelData}/>
		else 
			return something
		*/
		
		console.log(novelData)
	})
	// We might need to handle errors here
}