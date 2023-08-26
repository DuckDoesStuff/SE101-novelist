// Backend api
import {ref, push, set, child, get, remove, update} from 'firebase/database';
import { uploadBytesResumable, ref as sRef, getDownloadURL } from 'firebase/storage';
import {database, storage} from './FirebaseConfig';


export const changeChapterView = (id, view) => {
	const chapterRef = ref(database, 'chapters/' + id);
	return new Promise((resolve, reject) => {
		update(chapterRef, {view: view})
		.then(() => {
			resolve(true)
		})
		.catch((error) => {
			console.error("An error occured while updating chapter view: ", error, id)
			reject(error)
		})
	})
}

export const changeNovelView = (id, view) => {
	const novelRef = ref(database, 'novels/' + id);
	return new Promise((resolve, reject) => {
		update(novelRef, {view: view})
		.then(() => {
			resolve(true)
		})
		.catch((error) => {
			console.error("An error occured while updating novel view: ", error, id)
			reject(error)
		})
	})
}

export const changeChapterLike = (id, like) => {
	const chapterRef = ref(database, 'chapters/' + id);
	return new Promise((resolve, reject) => {
		update(chapterRef, {like: like})
		.then(() => {
			resolve(true)
		})
		.catch((error) => {
			console.error("An error occured while updating chapter like: ", error, id)
			reject(error)
		})
	})
}

export const changeNovelLike = (id, like) => {
	const novelRef = ref(database, 'novels/' + id);
	return new Promise((resolve, reject) => {
		update(novelRef, {like: like})
		.then(() => {
			resolve(true)
		})
		.catch((error) => {
			console.error("An error occured while updating novel like: ", error, id)
			reject(error)
		})
	})
}

export const deleteChapter = (id, novel_id) => {
	const chapterRef = ref(database, 'chapters/' + id);
	return new Promise((resolve, reject) => {
		remove(chapterRef)
		.then(() => {
			// Update novel chapter_id list
			console.log(novel_id, id)
			const novelChapterRef = ref(database, 'novels/' + novel_id);
			getNovel(novel_id).then((novel) => {
				const newChapterID = novel.chapter_id.filter((chapter) => {
					return chapter !== id;
				})
				update(novelChapterRef, {chapter_id: newChapterID})
				resolve(true)
			})
		})
		.catch((error) => {
			console.error("An error occured while deleting chapter: ", error, id)
			reject(error)
		})
	})
}

export const deleteNovel = (id) => {
	const novelRef = ref(database, 'novels/' + id);
	return new Promise((resolve, reject) => {
		getNovel(id)
		.then((novel) => {
			novel.chapter_id.map((chapter) => {
				deleteChapter(chapter, id)
				return 1;
			})
			remove(novelRef)
			.then(() => {
				resolve(true);
			})
			.catch((error) => {
				console.error("An error occured while deleting novel: ", error, id)
				reject(error)
			})
		})
		
	})
}

export const genChapterKey = () => {
	return push(ref(database, 'chapters')).key
}

export const genNovelKey = () => {
	return push(ref(database, 'novels')).key
}

export const emptyChapter = () => {
	return {
		id: "",
		novel_id: "",
		title: "",
		content: "",
		like: 0,
		view: 0,
	}
}

// Returns an empty novel object, useful for creating a new novel
export const emptyNovel = () => {
	return {
		id: "",
		title: "",
		thumbnail: "",
		description: "",
		image_path: "",
		comment_section: "",
		genre: [],
		chapter_id: [],
		status: "",
		like: 0,
		view: 0,
	}
}

// Parse in a chapter object and a key (if you want to set a custom key)
export const pushChapter = (chapter, key=null) => {
	const chapterRef = ref(database, 'chapters')

	// This will add a new chapter to 'chapters' with 'custom_key'
	if(key != null) {
		return set(child(chapterRef, key), chapter)
	}

	// This will add a new chapter to 'chapters' and Firebase will generate a unique 'push key'
	else {
		return push(chapterRef, chapter)
	} 
}

// Parse in a novel object and a key (if you want to set a custom key)
export const pushNovel = (novel, key=null) => {
	const novelRef = ref(database, 'novels')

	// This will add a new novel to 'novels' with 'custom_key'
	if(key != null)
		return set(child(novelRef, key), novel)

	// This will add a new novel to 'novels' and Firebase will generate a unique 'push key'
	else 
		return push(novelRef, novel)
}

// Parse in a chapter id and it will return a promise which contains the chapter data
// If the chapter doesn't exist, it will return an empty chapter
export const getChapter = (id) => {
	const chapterRef = ref(database, 'chapters/' + id);
	return new Promise((resolve, reject) => {
		get(chapterRef)
		.then((snapshot) => {
			if (snapshot.exists()) {
				const data = snapshot.val();
				resolve(data)
			} else {
				resolve(emptyChapter())
			}
		})
		.catch((error) => {
			console.error("An error occured while fetching data: ", error)
			reject(error)
		})
	})
}

// Parse in a novel id and it will return a promise which contains the novel data
// If the novel doesn't exist, it will return an empty novel
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

// Parse in a File object and it will return a promise which contains the downloadURL and filePath
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
					// Currently filePath is just the file name
					// If we ever want to change the file path instead of uploading to root
					// We need to do some handle in here.
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

