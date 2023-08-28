// Backend api
import { uploadBytesResumable, ref as sRef, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, doc, setDoc, getDoc, getDocs, deleteDoc, updateDoc, arrayRemove, where, query } from "firebase/firestore";
import { storage, fstore } from './FirebaseConfig';


export const searchNovel = (queryString) => {
	const novelRef = collection(fstore, 'novels');
	const normalizedQuery = queryString.toLowerCase().replace(/ /g, '-');
	const searchQuery = query(novelRef, where("normalized_title", ">=", normalizedQuery));
	return new Promise((resolve, reject) => {
		getDocs(searchQuery)
		.then((docs) => {
			const matchingNovels = [];
			docs.forEach((doc) => {
				matchingNovels.push(doc.data())
			})
			if(matchingNovels.length === 0)
				resolve([])
			else
				resolve(matchingNovels)
		})
		.catch((error) => {
			console.error("An error occured while searching for novel: ", error, queryString)
			reject(error)
		})
	})
}

export const changeChapterView = (id, view) => {
	const chapterRef = doc(fstore, 'chapters/', id);
	return new Promise((resolve, reject) => {
		updateDoc(chapterRef, {view: view})
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
	const novelRef = doc(fstore, 'novels/', id);
	return new Promise((resolve, reject) => {
		updateDoc(novelRef, {view: view})
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
	const chapterRef = doc(fstore, 'chapters/', id);
	return new Promise((resolve, reject) => {
		updateDoc(chapterRef, {like: like})
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
	const novelRef = doc(fstore, 'novels/', id);
	return new Promise((resolve, reject) => {
		updateDoc(novelRef, {like: like})
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
			if(novel_id === null) {
				resolve(true)
				return;
			}
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
				deleteChapter(chapter, null)
				return 1;
			})

			deleteDoc(novelRef)
			.then(() => {
				// Delete novel thumbnail
				if(novel.image_path !== "") {
					console.log(novel.image_path)
					deleteObject(sRef(storage, novel.image_path))
					.catch((error) => {
						console.error("Possibly the file has already been deleted", error)
					})
					.then(() => {
						resolve(true)
					})
				}
			})
			.catch((error) => {
				console.warn("Possibly the file has already been deleted", error)
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
		author_id: "",
		normalized_title: "",
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
		const filePath = genNovelKey();
		const novelThumbsRef = sRef(storage, filePath);
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

