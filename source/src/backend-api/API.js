// Backend api
import {ref, push, set, child, get} from 'firebase/database';
import { uploadBytesResumable, ref as sRef, getDownloadURL } from 'firebase/storage';
import {database, storage} from './FirebaseConfig';

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
		comment_section: "",
		description: ""
	}
}

const pushNovel = (novel) => {
	const novelRef = ref(database, 'novels')

	// This will add a new novel to 'novels' with 'custom_key'
	set(child(novelRef, 'custom_key'), novel)

	// This will add a new novel to 'novels' and Firebase will generate a unique 'push key'
	//push(novelRef, novel)
}

const getNovel = (id) => {
	const novelRef = ref(database, 'novels/' + id)
	return new Promise((resolve, reject) => {
		get(novelRef)
		.then((snapshot) => {
			if (snapshot.exists()) {
				const data = snapshot.val();
				resolve(data)
			}
		})
		.catch((error) => {
			console.error("An error occured while fetching data: ", error)
			reject(error)
		})
	})
}

//TODO: getNovels(string) a function to return multiple novels with titles contain the string

//TODO: uploadImage(file) returns a promise which can resolve to a file URL

export const uploadImage = (selectedFile) => {
	if (selectedFile) {
		const novelThumbsRef = sRef(storage, selectedFile.name);
		const uploadTask = uploadBytesResumable(novelThumbsRef, selectedFile)

		return new Promise((resolve, reject) => {
			uploadTask.on('state_changed',
			(snapshot) => {
				// We can check for current state of the upload in here
				// Check if it's paused, canceled, running and handle them in here
				// Or even check their progress
			}, 
			(error) => {
				console.error("Error uploading file: ", error)
				reject(error)
			}, 
			async () => {
				try {
					const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
					resolve(downloadURL)
				}
				catch (error) {
					console.error("Error while fetching URL: ", error)
					reject(error)
				}
			})
		})
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
	.catch((error) => {
		// Cry
	})
}