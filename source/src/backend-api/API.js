// Backend api
import {ref, push, set, child, get} from 'firebase/database';
import { uploadBytesResumable, ref as sRef, getDownloadURL } from 'firebase/storage';
import {database, storage} from './FirebaseConfig';

export const emptyNovel = () => {
	return {
		id: "",
		title: "",
		thumbnail: "",
		image_path: "",
		genre: [""],
		status: "",
		content: [""],
		like: 0,
		view: 0,
		comment_section: "",
		description: ""
	}
}

export const pushNovel = (novel, key=null) => {
	const novelRef = ref(database, 'novels')

	// This will add a new novel to 'novels' with 'custom_key'
	if(key != null)
		return set(child(novelRef, key), novel)

	// This will add a new novel to 'novels' and Firebase will generate a unique 'push key'
	else 
		return push(novelRef, novel)
}

export const getNovel = (id) => {
	const novelRef = ref(database, 'novels/' + id)
	return new Promise((resolve, reject) => {
		get(novelRef)
		.then((snapshot) => {
			if (snapshot.exists()) {
				const data = snapshot.val();
				resolve(data)
			} else {
				resolve(emptyNovel())
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
					// const filePath = downloadURL.split(storage.app.options.storageBucket)[1];
					const filePath = selectedFile.name;
					resolve({downloadURL, filePath})
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