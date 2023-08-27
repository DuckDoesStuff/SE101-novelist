// Backend api
import {ref, push, set, child, get, remove, update} from 'firebase/database';
import { uploadBytesResumable, ref as sRef, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, doc, setDoc, getDoc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { database, storage, fstore } from './FirebaseConfig';


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
	const chapterRef = doc(fstore, 'chapters', id);
	return new Promise((resolve, reject) => {
		deleteDoc(chapterRef)
		.then(() => {
			// Update novel chapter_id list
			const novelChapterRef = doc(fstore, 'novels', novel_id)
			updateDoc(novelChapterRef, {
				chapter_id: arrayRemove(id)
			})
			.then(() => {
				resolve(true)
			})
			.catch((error) => {
				console.error("An error occured while updating novel chapter list: ", error, id, novel_id)
				reject(error)
			})
		})
		.catch((error) => {
			console.error("An error occured while deleting chapter: ", error, id)
			reject(error)
		})
	})
}

export const deleteNovel = (id) => {
	const novelRef = doc(fstore, 'novels/', id);
	return new Promise((resolve, reject) => {
		getNovel(id)
		.then((novel) => {
			novel.chapter_id.map((chapter) => {
				deleteChapter(chapter, id)
				return 1;
			})

			deleteDoc(novelRef)
			.then(() => {
				// Delete novel image
				
			})
			.catch((error) => {
				console.error("Possibly the file has already been deleted", error)
			})
		})
		.catch((error) => {
			console.error("An error occured while deleting novel: ", error, id)
			reject(error)
		})
	})
}

export const genChapterKey = () => {
	return doc(collection(fstore, 'chapters')).id
}

export const genNovelKey = () => {
	return doc(collection(fstore, 'novels')).id
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
export const pushChapter = async (chapter, key=null) => {
	if(key) {
		const chapterRef = doc(fstore, 'chapters', key)
		await setDoc(chapterRef, chapter, {merge: true});
	}else {
		const chapterRef = collection(fstore, 'chapters')
		await addDoc(chapterRef, chapter);
	}
}

// Parse in a novel object and a key (if you want to set a custom key)
export const pushNovel = async (novelData, key=null) => {
	if(key) {
		const novelRef = doc(fstore, 'novels', key)
		await setDoc(novelRef, novelData, {merge: true});
	}else {
		const novelRef = collection(fstore, 'novels')
		await addDoc(novelRef, novelData);
	}
};

// Parse in a chapter id and it will return a promise which contains the chapter data
// If the chapter doesn't exist, it will return an empty chapter
export const getChapter = (id) => {
	return new Promise((resolve, reject) => {
		if(id === null) {
			resolve(emptyChapter())
			return;
		}
		const chapterRef = doc(fstore, 'chapters', id);
		getDoc(chapterRef)
		.then((doc) => {
			if (doc.exists()) {
				const data = doc.data();
				resolve(data)
			} else {
				resolve(emptyChapter())
			}
		})
		.catch((error) => {
			console.error("An error occured while fetching chapter: ", error, id)
			reject(error)
		})
	})
}

// Parse in a novel id and it will return a promise which contains the novel data
// If the novel doesn't exist, it will return an empty novel
export const getNovel = (id) => {
	return new Promise((resolve, reject) => {
		if (id === null) {
			resolve(emptyNovel())
			return;
		}
		const novelRef = doc(fstore, 'novels', id);
		getDoc(novelRef)
		.then((doc) => {
			if (doc.exists()) {
				const data = doc.data();
				resolve(data)
			} else {
				resolve(emptyNovel())
			}
		})
		.catch((error) => {
			console.error("An error occured while fetching novel: ", error, id)
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

