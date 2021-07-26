import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewnote =()=>{

    return async (dispatch, getState)=>{
        const uid= getState().auth.uid;
        
        const newNote ={
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc =await db.collection(`${uid}/journal/notes`).add(newNote);

        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote));
    }
}

 export const activeNote = (id, note)=>({
     type: types.notesActive,
     payload:{
         id,
         ...note
     }
 })

 export const addNewNote=(id, note)=>({
     type: types.notesAddnew,
     payload: {
         id, ...note
     }
 })

 export const startLoadingNotes = (uid)=>{
     return async (dispatch)=>{
         const notes = await loadNotes(uid);
         dispatch(setNotes(notes));
     }
 }


 export const setNotes = ( notes ) =>({
     type: types.notesLoad,
     payload: notes
 });

 export const startSaveNote =(note)=>{
     return async (dispatch, getState)=>{
         if(!note.url){
             delete note.url;
         }

        const {uid} =getState().auth;
        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
         dispatch(refreshNote(note.id, noteToFirestore));

         Swal.fire('Saved', note.title, 'success');
     }
 }

 export const refreshNote = (id, note)=>({
     type: types.notesUpdated,
     payload: {
         id, 
         note: {
             id,
             ...note
         }
     }
 })

 export const startUploading = (file)=>{
     
    return async(dispatch, getState)=>{
        
        const { active: activeNote} = getState().notes;
        Swal.fire({
            title: 'Uploading',
            text: ' Please wait',
            allowOutsideClick: false,
            onBeforeOpen: ()=>{
                Swal.showLoading();
            }
        })
        const fileUrl = await fileUpload(file);
        
        activeNote.url=fileUrl;
        dispatch(startSaveNote(activeNote));

        Swal.close();
     }
 }

 export const startDeleting = (id)=>{
     return async(dispatch, getState)=>{
         const uid = getState().auth.uid;
         await db.doc(`${uid}/journal/notes/${id}`).delete();
         dispatch(deleNote(id));
     }
 }

 export const deleNote = (id)=>({
     type: types.notesDelete,
     payload: id
 })

 export const noteLogout=()=>({
     type: types.notesLogoutCleaning
 })